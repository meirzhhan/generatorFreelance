/* global artifacts, web3 */

const EnergyLossCalculator = artifacts.require("EnergyLossCalculator");

module.exports = function (deployer) {
  deployer.deploy(EnergyLossCalculator);
};
