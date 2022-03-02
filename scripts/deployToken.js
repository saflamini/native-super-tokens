const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-ethers");

const hre = require("hardhat");
require("dotenv")
const ISuperTokenFactory = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol/ISuperTokenFactory.json");
const ISuperTokenFactoryABI = ISuperTokenFactory.abi;
const kovanSuperTokenFactoryAddress = "0x94f26B4c8AD12B18c12f38E878618f7664bdcCE2";
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

async function main() {

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Deploying the Proxy...");
  console.log("Creator address: " + signer.address);
  
  const NativeSuperTokenProxy = await ethers.getContractFactory("NativeSuperTokenProxy");
  const nativeSuperTokenProxy = await NativeSuperTokenProxy.deploy();
  await nativeSuperTokenProxy.deployed();

  console.log('native super token proxy deployed to: ', nativeSuperTokenProxy.address);

  const superTokenFactory = new ethers.Contract(kovanSuperTokenFactoryAddress, ISuperTokenFactoryABI, signer);

  console.log("Invoking initializeCustomSuperToken...");
  
  await superTokenFactory.initializeCustomSuperToken(nativeSuperTokenProxy.address).then(console.log);
  
  console.log("Invoking Initialize on the token contract...");
  
  await nativeSuperTokenProxy.initialize("My Native Super Token", "MNST", "1000000000000", {gasPrice: 200000000, gasLimit: 300000}).then(console.log)
}

// {gasPrice: 20000000000, gasLimit: 30000000}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
