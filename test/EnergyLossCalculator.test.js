const EnergyLossCalculator = artifacts.require("EnergyLossCalculator");

contract("EnergyLossCalculator", accounts => {
  let expect;
  before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
  });

  const [generator, consumer] = accounts;
  const energyGenerated = 1000;
  const lossCoefficient = 5;

  let instance;

  beforeEach(async () => {
    instance = await EnergyLossCalculator.new();
  });

  it("should calculate energy loss correctly", async () => {
    await instance.calculateEnergyLoss(generator, consumer, energyGenerated, lossCoefficient, { from: generator });

    const count = await instance.getEnergyTransferCount();
    expect(count.toNumber()).to.equal(1);

    const transfer = await instance.getEnergyTransfer(0);
    expect(transfer.generator).to.equal(generator);
    expect(transfer.consumer).to.equal(consumer);
    expect(transfer.energyGenerated.toNumber()).to.equal(energyGenerated);

    const expectedEnergyLoss = (energyGenerated * lossCoefficient) / 100;
    const expectedEnergyReceived = energyGenerated - expectedEnergyLoss;
    const expectedCost = expectedEnergyReceived * 10; // PRICE_PER_KWH = 10 cents

    expect(transfer.energyLoss.toNumber()).to.equal(expectedEnergyLoss);
    expect(transfer.energyReceived.toNumber()).to.equal(expectedEnergyReceived);
    expect(transfer.cost.toNumber()).to.equal(expectedCost);
  });

  it("should revert if energyGenerated is zero", async () => {
    try {
      await instance.calculateEnergyLoss(generator, consumer, 0, lossCoefficient, { from: generator });
      expect.fail("Expected revert not received");
    } catch (error) {
      expect(error.reason).to.equal("Energy generated must be greater than zero");
    }
  });

  it("should revert if lossCoefficient is out of range", async () => {
    try {
      await instance.calculateEnergyLoss(generator, consumer, energyGenerated, 150, { from: generator });
      expect.fail("Expected revert not received");
    } catch (error) {
      expect(error.reason).to.equal("Loss coefficient must be between 0 and 100");
    }
  });
});
