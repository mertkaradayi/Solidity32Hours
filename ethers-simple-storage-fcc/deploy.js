const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  //http://127.0.0.1:7545

  //Provider is our ganache http.
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  //ethers-simple-storage-fcc/SimpleStorage_sol_SimpleStorage.bin
  const abi = fs.readFileSync(
    "../ethers-simple-storage-fcc/SimpleStorage_sol_SimpleStorage.abi",
    "utf8"
  );
  const binary = fs.readFileSync(
    "../ethers-simple-storage-fcc/SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy(); // Stop here wait for the contract to deploy.
  await contract.deployTransaction.wait(1);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated Favorite Number is: ${updatedFavoriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
