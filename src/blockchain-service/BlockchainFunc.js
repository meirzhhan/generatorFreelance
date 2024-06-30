const Web3 = require('web3');
const contract = require('@truffle/contract');
const path = require('path');

// Путь к вашему контракту JSON
const contractPath = path.resolve(__dirname, '/Users/abdisadykov/WebstormProjects/projectFreelance/build/contracts/EnergyLossCalculator.json');
const energyLossCalculatorJSON = require(contractPath);

// Подключение к Ganache
const web3 = new Web3('http://127.0.0.1:7545');

// Создание экземпляра контракта
const EnergyLossCalculator = contract(energyLossCalculatorJSON);
EnergyLossCalculator.setProvider(web3.currentProvider);

// Основная функция
async function main() {
  // Получение аккаунтов
  const accounts = await web3.eth.getAccounts();

  // Развертывание контракта
  const instance = await EnergyLossCalculator.deployed();

  // Параметры для вызова calculateEnergyLoss
  const generator = accounts[0]; // Адрес генератора
  const consumer = accounts[1]; // Адрес потребителя
  const energyGenerated = 1000; // Пример: 1000 кВт
  const lossCoefficient = 5; // Пример: 5%

  // Вызов метода calculateEnergyLoss
  await instance.calculateEnergyLoss(generator, consumer, energyGenerated, lossCoefficient, { from: generator });
  console.log('calculateEnergyLoss вызван успешно');

  // Проверка количества записей
  const count = await instance.getEnergyTransferCount();
  console.log(`Количество записей об энергопередаче: ${count.toString()}`);

  // Получение информации о первой передаче энергии
  if (count > 0) {
    const transfer = await instance.getEnergyTransfer(0);
    console.log(`Информация о передаче энергии: ${JSON.stringify(transfer)}`);
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
