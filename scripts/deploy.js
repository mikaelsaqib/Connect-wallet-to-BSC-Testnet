const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const SimpleWallet = await hre.ethers.getContractFactory("SimpleWallet");

  // Deploy the contract
  const wallet = await SimpleWallet.deploy();

  // Wait until the contract is mined
  await wallet.waitForDeployment();

  console.log("Contract deployed to:", wallet.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
