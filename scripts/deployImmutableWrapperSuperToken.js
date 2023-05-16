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
  
  const ImmutableWrapperSuperToken = await ethers.getContractFactory("ImmutableWrapperSuperToken");
  //if we uncomment this and use the 'constructor' method vs initialize, we get an error
  const immutableWrapperSuperToken = await ImmutableWrapperSuperToken.deploy(
    "0xEB796bdb90fFA0f28255275e16936D25d3418603", //host address on mumbai
    "0xA794C9ee519FD31BbCE643e8D8138f735E97D1DB", //fTUSD address on mumbai
    "18",
    "Sam Token",
    "SamX",
    // "10000000000",
    // signer.address
  );
  // const nativeSuperTokenProxy = await NativeSuperTokenProxy.deploy();
  const addr = await immutableWrapperSuperToken.deployed();
  console.log(addr.address)
  // await nativeSuperTokenProxy.mintTokens(signer.address, 1000).then(console.log);

  console.log('immutable wrapper token deployed to: ', addr.address);

  // await nativeSuperTokenProxy.initialize("My Native Super Token", "MNST", "1000000000000", signer.address).then(console.log);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
