const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-ethers");
const { Framework } = require("@superfluid-finance/sdk-core");
require("dotenv");

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

async function main() {

  const sf = await Framework.create({
    chainId: 80001,
    provider
  });

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const daix = await sf.loadSuperToken("0xDd29A99c9d32F23c8e8500de3fAeE2F75C2Ac066"); // enter the token contract address here

  const createFlowOperation = daix.createFlow({
      receiver: "0x796cf26ee956f790920d178aac373c90da7b8f79", //enter your address here
      flowRate: "1000000000000000"
  });

  const txn = await createFlowOperation.exec(signer);

  const receipt = await txn.wait();

  console.log(receipt);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
