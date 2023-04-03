const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //http://127.0.0.1:7545

  //Provider is our ganache http.
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "d87ef76e9860cf80e6074ff292d910963b9c1935b26119a97b9d30f722de27d4",
    provider
  );
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
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
