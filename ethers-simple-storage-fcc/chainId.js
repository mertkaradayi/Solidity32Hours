const ethers = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");

async function getChainId() {
  const chainId = await provider
    .getNetwork()
    .then((network) => network.chainId);
  console.log(chainId);
}

getChainId();
