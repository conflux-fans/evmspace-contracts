const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const GLDToken = await hre.ethers.getContractFactory("GLDToken777");
  const token = await GLDToken.deploy("10000000000000000000000", []);

  console.log("Deploy hash: ", token.deployTransaction.hash);

  await token.deployed();

  console.log("Token deployed to:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
