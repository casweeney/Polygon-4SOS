import { ethers } from "hardhat";

async function main() {
  const Precious = await ethers.getContractFactory("Mood");
  const mood = await Precious.deploy();

  await mood.deployed();

  console.log(`Mood contract deployed to ${mood.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
