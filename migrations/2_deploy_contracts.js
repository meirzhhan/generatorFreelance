/* global artifacts */

const EnergyTransfer = artifacts.require("EnergyTransfer");

module.exports = function (deployer) {
  deployer.deploy(EnergyTransfer);
};
