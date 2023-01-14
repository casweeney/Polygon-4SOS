import { ethers } from "hardhat";

async function main() {
  const Mood = await ethers.getContractFactory("MoodDiary");
  const mood = await Mood.deploy();

  await mood.deployed();

  console.log(`MoodDiary contract deployed to ${mood.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
