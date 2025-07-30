const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther, formatEther } = require("ethers");

describe("SimpleWallet", function () {
  let wallet, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const Wallet = await ethers.getContractFactory("SimpleWallet");
    wallet = await Wallet.deploy();
  });

  it("Should accept deposits", async function () {
    // Send 1 ether to the contract
    await owner.sendTransaction({
      to: await wallet.getAddress(), // getAddress() is required in v6
      value: ethers.parseEther("1.0"),
    });

    const balance = await ethers.provider.getBalance(await wallet.getAddress());
    expect(balance).to.equal(ethers.parseEther("1.0"));
  });

  it("Should allow owner to withdraw all", async function () {
    await owner.sendTransaction({
      to: await wallet.getAddress(),
      value: ethers.parseEther("2.0"),
    });

    const tx = await wallet.withdrawAll();
    await tx.wait();

    const balance = await ethers.provider.getBalance(wallet.getAddress());
    expect(balance).to.equal(0n); // notice the `n` for bigint
  });

  it("Should allow owner to transfer funds", async function () {
    await owner.sendTransaction({
      to: wallet.getAddress(),
      value: parseEther("3"),
    });

    await wallet.transfer(addr1.getAddress(), parseEther("1"));

    const newBalance = await ethers.provider.getBalance(wallet.getAddress());
    expect(formatEther(newBalance)).to.equal("2.0");
  });

  it("Should prevent non-owner from transferring", async function () {
    await expect(
      wallet.connect(addr1).transfer(owner.address, parseEther("1"))
    ).to.be.revertedWith("Not the contract owner");
  });
});
