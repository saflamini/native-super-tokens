// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-ethers");

const hre = require("hardhat");
require("dotenv")
const INativeSuperToken = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/tokens/INativeSuperToken.sol/INativeSuperToken.json");
const INativeSuperTokenABI = INativeSuperToken.abi;
const ISuperTokenFactory = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol/ISuperTokenFactory.json");
const ISuperTokenFactoryABI = ISuperTokenFactory.abi;
const kovanSuperTokenFactoryAddress = "0xF5F666AC8F581bAef8dC36C7C8828303Bd4F8561";
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);



async function main() {

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Deploying the Proxy...");
  console.log("Creator address: " + signer.address);
  
  const NativeSuperTokenProxy = await ethers.getContractFactory("NativeSuperTokenProxy");
  const nativeSuperTokenProxy = await NativeSuperTokenProxy.deploy();
  await nativeSuperTokenProxy.deployed();


  const superTokenFactory = new ethers.Contract(kovanSuperTokenFactoryAddress, ISuperTokenFactoryABI, signer);

  console.log("Invoking initializeCustomSuperToken...");
  
  await superTokenFactory.initializeCustomSuperToken(nativeSuperTokenProxy.address).then(console.log);
  
  console.log("Invoking Initialize on the token contract...");
  
  await nativeSuperTokenProxy.initialize("My Native Super Token", "MST", 10000000000).then(console.log)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
