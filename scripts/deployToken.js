const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-ethers");

const hre = require("hardhat");
require("dotenv")
const ISuperTokenFactory = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol/ISuperTokenFactory.json");
const ISuperTokenFactoryABI = ISuperTokenFactory.abi;
//note - need to change this address to the super token factory on your network. this is for kovan
const SuperTokenFactoryAddress = "0xF5F666AC8F581bAef8dC36C7C8828303Bd4F8561";
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

async function main() {

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Deploying the Proxy...");
  console.log("Creator address: " + signer.address);
  
  const NativeSuperTokenProxy = await ethers.getContractFactory("NativeSuperTokenProxy");
  const nativeSuperTokenProxy = await NativeSuperTokenProxy.deploy();
  await nativeSuperTokenProxy.deployed();

  console.log('native super token proxy deployed to: ', nativeSuperTokenProxy.address);

  const superTokenFactory = new ethers.Contract(SuperTokenFactoryAddress, ISuperTokenFactoryABI, signer);

  console.log("Invoking initializeCustomSuperToken...");
  
  await superTokenFactory.initializeCustomSuperToken(nativeSuperTokenProxy.address).then(console.log);
  
  console.log("Invoking Initialize on the token contract...");
  
  let updatedNonce;
  updatedNonce = await provider.getTransactionCount(signer.address, "latest") + 1;
  
  //may need to update gas price and limit
  await nativeSuperTokenProxy.initialize("My Native Super Token", "MNST", "1000000000000").then(console.log)
}

//{gasPrice: 200000000000, gasLimit: 30000000}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
