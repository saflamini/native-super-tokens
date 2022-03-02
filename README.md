# This Repo will help you deploy your own native super token

1) Add your own RPC URL, private key (for deploying the contract), and etherscan api key to a .env file
2) Add custom logic in your NativeSuperTokenProxy.sol contract if you would like
3) Deploy the token using the deployToken script. Make sure you include your own super token name, symbol, and supply
4) Verify the contract using ```npx hardhat verify --network YOUR_NETWORK DEPLOYED_CONTRACT_ADDRESS```
5) On Etherscan in the contract's 'Code' section, select Options > Is this a proxy? > Verify the proxy contract 


# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
