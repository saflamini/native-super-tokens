const { ethers } = require("hardhat");
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

const NativeSuperTokenProxy = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/tokens/INativeSuperToken.sol/INativeSuperToken.json");

const NativeSuperTokenProxyABI = NativeSuperTokenProxy.abi;

//note: need to replace the address here with your token
const nativeSuperToken = new ethers.Contract("0xebd2371d3411ec42ad57f3c5d58e871858e34610", NativeSuperTokenProxyABI, provider);

async function main() {

const name = await nativeSuperToken.name();
const symbol = await nativeSuperToken.symbol();
const initialSupply = await nativeSuperToken.totalSupply();

console.log(name);
console.log(symbol);
// console.log(initialSupply);


}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });




