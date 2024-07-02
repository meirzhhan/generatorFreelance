import Web3 from 'web3';
import contract from '@truffle/contract';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

// Получение текущего пути файла и директории
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к вашему контракту JSON
const contractPath = path.resolve(__dirname, '../../build/contracts/EnergyTransfer.json');

// Чтение JSON файла
const energyTransferJSON = JSON.parse(await readFile(contractPath, 'utf-8'));

// Подключение к Ganache
const web3 = new Web3('http://127.0.0.1:7545');

// Создание экземпляра контракта
const EnergyTransfer = contract(energyTransferJSON);
EnergyTransfer.setProvider(web3.currentProvider);

// Основная функция
async function main() {
  try {
    // Получение аккаунтов из Ganache
    const accounts = await web3.eth.getAccounts();
    const generator = accounts[0]; // Первый аккаунт
    const consumer = accounts[1]; // Второй аккаунт

    // Проверка адреса контракта
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = energyTransferJSON.networks[networkId];
    if (!deployedNetwork) {
      throw new Error(`Contract not deployed on network with id ${networkId}`);
    }

    // Создание экземпляра контракта
    const instance = new web3.eth.Contract(
      energyTransferJSON.abi,
      deployedNetwork.address
    );

    // Параметры для вызова logEnergyTransfer
    const energyGenerated = 1000; // Пример: 1000 кВт
    const lossCoefficient = 5; // Пример: 5%

    // Вызов метода logEnergyTransfer с увеличенным лимитом газа
    await instance.methods.logEnergyTransfer(generator, consumer, energyGenerated, lossCoefficient).send({ from: generator, gas: 500000 });
    console.log('logEnergyTransfer вызван успешно');

    // Проверка количества записей
    const count = await instance.methods.getTransferCount().call();
    console.log(`Количество записей об энергопередаче: ${count}`);

    // Получение информации о трансферах, связанных с определенным кошельком
    const transfers = await instance.methods.getTransfersByAddress(generator).call();
    console.log(`Информация о всех трансферах для генератора: ${JSON.stringify(transfers)}`);
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

main();
