// src/contract.js

import Web3 from 'web3';
import EnergyTransfer from '../build/contracts/EnergyTransfer.json'; // Убедитесь, что путь к файлу правильный

const web3 = new Web3('http://127.0.0.1:7545');

const getContract = async () => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = EnergyTransfer.networks[networkId];
  const contract = new web3.eth.Contract(
    EnergyTransfer.abi,
    deployedNetwork && deployedNetwork.address,
  );
  return contract;
};

export const getAccounts = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts;
};

export const logEnergyTransfer = async (
  generator,
  consumer,
  energyGenerated,
  lossCoefficient,
) => {
  const contract = await getContract();
  await contract.methods
    .logEnergyTransfer(generator, consumer, energyGenerated, lossCoefficient)
    .send({ from: generator, gas: 500000 });
};

export const getTransferCount = async () => {
  const contract = await getContract();
  const count = await contract.methods.getTransferCount().call();
  return count;
};

export const getTransfer = async (index) => {
  const contract = await getContract();
  const transfer = await contract.methods.getTransfer(index).call();
  return transfer;
};

export const getTransfersByAddress = async (address) => {
  const contract = await getContract();
  const transfers = await contract.methods
    .getTransfersByAddress(address)
    .call();
  return transfers;
};
