const host = '0xF0d7d1D47109bA426B9D8A3Cde1941327af1eea3';
const USDCx = '0x25b5cd2e6ebaedaa5e21d0ecf25a567ee9704aa7';
require("@nomiclabs/hardhat-ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
  
    const { deployer } = await getNamedAccounts();
    console.log(deployer);
  
    await deploy("SamToken", {
      from: deployer,
      proxy: true,
      args: ['Sam Token', 'SAM', 1000000],
      log: true,
    })
}

module.exports.tags = ["SamToken"];