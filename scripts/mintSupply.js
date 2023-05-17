const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-ethers");

const hre = require("hardhat");
require("dotenv")
const ISuperTokenFactory = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol/ISuperTokenFactory.json");
const ISuperTokenFactoryABI = ISuperTokenFactory.abi;
//note - need to change this address to the super token factory on your network. this is for polygon
const SuperTokenFactoryAddress = "0x2C90719f25B10Fc5646c82DA3240C76Fa5BcCF34";
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const vanillaPureTokenABI = require("../artifacts/contracts/VanillaPureToken.sol/VanillaPureSuperToken.json").abi

async function main() {

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Sending tx from address: " + signer.address);

  const tokenAddress = "0xDd29A99c9d32F23c8e8500de3fAeE2F75C2Ac066"; //enter the token contract address here
  const vanillaPureSuperToken = new ethers.Contract(tokenAddress, vanillaPureTokenABI, signer);

  console.log('token being minted');
  await vanillaPureSuperToken.connect(signer).mintInitialSupply().then(console.log);
  
  console.log('token minted');

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
