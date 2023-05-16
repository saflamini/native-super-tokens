const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-ethers");

const hre = require("hardhat");
require("dotenv")
const ISuperTokenFactory = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol/ISuperTokenFactory.json");
const ISuperTokenFactoryABI = ISuperTokenFactory.abi;
//note - need to change this address to the super token factory on your network. this is for polygon
const SuperTokenFactoryAddress = "0x2C90719f25B10Fc5646c82DA3240C76Fa5BcCF34";
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

async function main() {

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Deploying the Proxy...");
  console.log("Creator address: " + signer.address);
  
  const NativeSuperTokenProxy = await ethers.getContractFactory("NativeSuperTokenProxy");
  const nativeSuperTokenProxy = await NativeSuperTokenProxy.deploy();
  await nativeSuperTokenProxy.deployed();

  console.log('native super token proxy deployed to: ', nativeSuperTokenProxy.address);

  // const superTokenFactory = new ethers.Contract(SuperTokenFactoryAddress, ISuperTokenFactoryABI, provider);

  // console.log("Invoking initializeCustomSuperToken...");

  // const initializeCustomSuperTokenEstimate = await superTokenFactory.estimateGas.initializeCustomSuperToken(nativeSuperTokenProxy.address);

  // console.log("initialize custom token gas estimation: ", initializeCustomSuperTokenEstimate.toString());
  
  // await superTokenFactory.connect(signer).initializeCustomSuperToken(nativeSuperTokenProxy.address, {gasPrice: 100000000000, gasLimit: initializeCustomSuperTokenEstimate})
  
  // console.log("Invoking Initialize on the token contract...");

  // const initializeEstimate = await nativeSuperTokenProxy.estimateGas.initialize("My Native Super Token", "MNST", "1000000000000");
  
  // console.log("initialize custom token gas estimation: ", initializeCustomSuperTokenEstimate);

  // let updatedNonce;
  // updatedNonce = await provider.getTransactionCount(signer.address, "latest") + 1;
  
  // //may need to update gas price and limit
  // await nativeSuperTokenProxy.initialize("My Native Super Token", "MNST", "1000000000000", {nonce: updatedNonce, gasPrice: 100000000000, gasLimit: initializeEstimate });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
