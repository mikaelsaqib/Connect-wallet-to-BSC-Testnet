const { expect } = require("chai");

describe("Counter", function () {
  let Counter, counter;

  beforeEach(async function () {
    Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
    // await counter.deployed();
  });

  it("Should start at zero", async function () {
    expect(await counter.getCount()).to.equal(0);
  });

  it("Should increment correctly", async function () {
    await counter.increment();
    expect(await counter.getCount()).to.equal(1);
  });

  it("Should decrement correctly", async function () {
    await counter.increment(); // count = 1
    await counter.decrement(); // count = 0
    expect(await counter.getCount()).to.equal(0);
  });

  it("Should not allow decrement below zero", async function () {
    await expect(counter.decrement()).to.be.revertedWith(
      "Count is already zero"
    );
  });
});
