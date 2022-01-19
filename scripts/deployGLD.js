const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();
  // We get the contract to deploy
  const GLDToken = await hre.ethers.getContractFactory("GLDToken");
  const token = await GLDToken.deploy("10000000000000000000000");

  console.log("Deploy hash: ", token.deployTransaction.hash);

  await token.deployed();

  console.log("Token deployed to:", token.address);

  const name = await token.name();
  const symbol = await token.symbol();
  console.log(`Token name ${name} symbol ${symbol}`, name, symbol);

  const balance = await token.balanceOf(accounts[0].address);
  console.log(`Balance of ${accounts[0].address} is ${balance}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
