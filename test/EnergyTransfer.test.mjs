const EnergyTransfer = artifacts.require("EnergyTransfer");
const { expect } = require("chai");

contract("EnergyTransfer", accounts => {
  const [generator, consumer] = accounts;
  const energyGenerated = 1000;
  const lossCoefficient = 5;

  let instance;

  beforeEach(async () => {
    instance = await EnergyTransfer.new();
  });

  it("should log energy transfer correctly", async () => {
    await instance.logEnergyTransfer(generator, consumer, energyGenerated, lossCoefficient, { from: generator });

    const count = await instance.getTransferCount();
    expect(count.toNumber()).to.equal(1);

    const transfer = await instance.getTransfer(0);
    expect(transfer.generator).to.equal(generator);
    expect(transfer.consumer).to.equal(consumer);
    expect(transfer.energyGenerated.toNumber()).to.equal(energyGenerated);

    const expectedEnergyLoss = (energyGenerated * lossCoefficient) / 100;
    const expectedEnergyReceived = energyGenerated - expectedEnergyLoss;
    const expectedCost = expectedEnergyReceived * 10; // PRICE_PER_KWH = 10 cents

    expect(transfer.energyReceived.toNumber()).to.equal(expectedEnergyReceived);
    expect(transfer.cost.toNumber()).to.equal(expectedCost);
  });

  it("should revert if energyGenerated is zero", async () => {
    try {
      await instance.logEnergyTransfer(generator, consumer, 0, lossCoefficient, { from: generator });
      expect.fail("Expected revert not received");
    } catch (error) {
      expect(error.reason).to.equal("Energy generated must be greater than zero");
    }
  });

  it("should revert if lossCoefficient is out of range", async () => {
    try {
      await instance.logEnergyTransfer(generator, consumer, energyGenerated, 150, { from: generator });
      expect.fail("Expected revert not received");
    } catch (error) {
      expect(error.reason).to.equal("Loss coefficient must be between 0 and 100");
    }
  });

  it("should return transfers by address", async () => {
    await instance.logEnergyTransfer(generator, consumer, energyGenerated, lossCoefficient, { from: generator });

    const transfers = await instance.getTransfersByAddress(generator);
    expect(transfers.length).to.equal(1);
    expect(transfers[0].generator).to.equal(generator);
    expect(transfers[0].consumer).to.equal(consumer);

    const transfersByConsumer = await instance.getTransfersByAddress(consumer);
    expect(transfersByConsumer.length).to.equal(1);
    expect(transfersByConsumer[0].generator).to.equal(generator);
    expect(transfersByConsumer[0].consumer).to.equal(consumer);
  });
});
