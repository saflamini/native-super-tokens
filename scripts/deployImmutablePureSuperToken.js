const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-ethers");

const hre = require("hardhat");
require("dotenv")
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

async function main() {

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Deploying the Token...");
  console.log("Creator address: " + signer.address);
  
  const ImmutablePureSuperToken = await ethers.getContractFactory("VanillaPureSuperToken");

  const immutablePureSuperToken = await ImmutablePureSuperToken.deploy(
    "0xEB796bdb90fFA0f28255275e16936D25d3418603",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "VANILLA PURE SUPER TOKEN",
    "VST",
    "0x0000000000000000000000000000000000000000",
    18,
    "0x969105CB4503Bf98A734c850685A198C530c2Fdb"
  )
  const addr = await immutablePureSuperToken.deployed();
  console.log(addr.address)

  console.log('token deployed to: ', addr.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
