import Web3 from 'web3';
import { InfoDataType } from '../App';

import EnergyTransfer from '../../build/contracts/EnergyTransfer.json'; // Импорт ABI и адресов контракта EnergyTransfer

interface Edge {
  to: number; // ID узла(точки), в который ведет это ребро
  weight: number; // потери до этого ребра
}

interface NodeE {
  id: number; // ID узла(точки)
  edges: Edge[]; // Список ребер(точек), исходящих из этого узла
}

interface Graph {
  [key: number]: NodeE; // Граф, где ключ - ID узла, а значение - узел с его ребрами
}

interface Distance {
  [key: number]: number; // Расстояния(потери) от начального узла до каждого другого узла
}

interface Previous {
  [key: number]: number | null; // Предыдущий узел в оптимальном пути для каждого узла
}

interface OptimalPath {
  generator: number; // ID генератора
  path: number[]; // Оптимальный путь от генератора до потребителя
  loss: number; // Потери на этом пути
  availableEnergy: number; // Доступная энергия у генератора
}

const web3 = new Web3('http://127.0.0.1:7545'); // Создание экземпляра Web3 и подключение

const getContract = async () => {
  const networkId = await web3.eth.net.getId(); // @ts-ignore // Получение идентификатора сети
  const deployedNetwork = EnergyTransfer.networks[networkId]; // Получение информации о развернутой сети контракта
  const contract = new web3.eth.Contract( // @ts-ignore // Создание экземпляра контракта
    EnergyTransfer.abi,
    deployedNetwork && deployedNetwork.address,
  );

  return contract;
};

// Функция для получения аккаунтов
const getAccounts = async () => {
  const accounts = await web3.eth.getAccounts(); // Получение списка аккаунтов

  return accounts;
};

const logEnergyTransfer = async (
  generator: string, // Адрес генератора
  consumer: string, // Адрес потребителя
  energyGenerated: number, // Полученное кол-во энергии
  lossCoefficient: number, // Потери
) => {
  const contract = await getContract(); // Получение контракта

  const PRICE_PER_MWH = 23000; // Цена за мегаватт-час в тенге
  const etherPrice = 1435467; // Цена эфира в тенге

  const lossCoefficientPercent = Math.floor(lossCoefficient * 100); // Преобразование коэффициента потерь в проценты
  const energyGeneratedInt = Math.floor(energyGenerated); // Округление сгенерированной энергии до целого числа

  // Пересчёт затрат
  const energyReceived = Math.floor(energyGenerated - lossCoefficient); // Расчет полученной энергии
  const costInTenge = energyGenerated * PRICE_PER_MWH; // Стоимость в тенге
  const costInEther = (costInTenge / etherPrice).toString(); // Стоимость в эфире
  const costInEtherWei = web3.utils.toWei(costInEther, 'ether'); // Стоимость в Wei

  console.log('etherPrice= ' + etherPrice);
  console.log('PRICE_PER_MWH= ' + PRICE_PER_MWH);
  console.log('energyGeneratedInt= ' + energyGeneratedInt);
  console.log('lossCoefficientPercent= ' + lossCoefficientPercent);
  console.log('energyReceived= ' + energyReceived);
  console.log('costInTenge= ' + costInTenge);
  console.log('Cost in ether= ' + costInEther);
  console.log('Cost in Wei= ' + costInEtherWei);

  // вызов метода контракта с передачей полученных данных
  await contract.methods
    .logEnergyTransfer(
      generator,
      consumer,
      energyGeneratedInt,
      lossCoefficientPercent,
      costInEtherWei,
      PRICE_PER_MWH
    )
    .send({
      from: consumer,
      value: costInEtherWei,
      gas: 5000000,
    });
};

// Функция для получения данных о транзакциях для определенного ID
const getTransfersByAddress = async (address: string) => {
  const contract = await getContract(); // Получение контракта
  const transfers = await contract.methods
    .getTransfersByAddress(address) // Вызов метода контракта для получения передач по адресу
    .call();

  return transfers;
};

// Функция для создания графа из списка ребер
function createGraph(edges: [number, number, number][]): Graph {
  const graph: Graph = {}; // Инициализация пустого графа

  edges.forEach(([from, to, weight]) => {
    if (!graph[from]) graph[from] = { id: from, edges: [] }; // Если узел 'from' еще не существует в графе, создаем его
    if (!graph[to]) graph[to] = { id: to, edges: [] }; // Если узел 'to' еще не существует в графе, создаем его

    graph[from].edges.push({ to, weight }); // Добавление ребра от 'from' к 'to'
    graph[to].edges.push({ to: from, weight }); // Добавление обратного ребра от 'to' к 'from'
  });

  return graph; // Возвращает созданный граф
}

// Алгоритм Дейкстры
function dijkstra(
  graph: Graph,
  startNode: number,
): { distances: Distance; previous: Previous } {
  const distances: Distance = {}; // Расстояния от начального узла до других узлов
  const previous: Previous = {}; // Предыдущие узлы в оптимальном пути
  const nodes: Set<number> = new Set(Object.keys(graph).map(Number)); // Множество всех узлов в графе

  // Инициализация
  nodes.forEach((node) => {
    distances[node] = Infinity; // Расстояние до всех узлов как бесконечность
    previous[node] = null; // Предыдущий узел пока неизвестен
  });
  distances[startNode] = 0; // Расстояние до начального узла равно нулю

  while (nodes.size > 0) {
    // Найти путь с минимальными потерями
    let closestNode = Array.from(nodes).reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode,
    );

    nodes.delete(closestNode); // Удаление этого узла из множества узлов

    // Обновление расстояний до соседних узлов
    graph[closestNode].edges.forEach((edge) => {
      const alt = distances[closestNode] + edge.weight; // Новое расстояние до соседнего узла

      // Если новое расстояние меньше текущего
      if (alt < distances[edge.to]) {
        distances[edge.to] = alt; // Обновление расстояния(потери)
        previous[edge.to] = closestNode; // Установка текущего узла как предыдущий для соседнего
      }
    });
  }

  return { distances, previous }; // Возвращает расстояния и предыдущие узлы
}

// Функция для получения пути от начального узла до целевого узла (для отрисовки во фронте)
function getPath(
  previous: Previous,
  startNodeGenerator: number, // генератор
  endNode: number, // потребитель
): number[] {
  const path: number[] = []; // Инициализация пустого пути
  let currentNode: number | null = endNode; // Начинает с целевого узла

  while (currentNode !== null) {
    path.unshift(currentNode); // Добавление текущего узла в начало пути
    currentNode = previous[currentNode]; // Переход к предыдущему узлу
  }

  if (path[0] !== startNodeGenerator) {
    return []; // Путь не найден (условие не сработает. От любого потребителя проложен путь к генератору)
  }

  return path; // найденный путь
}

// Функция для нахождения лучшего генератора для данного потребителя
function findOptimalPathForConsumer(
  graph: Graph,
  generators: number[], // список генераторов
  consumer: number, // ID потребителя
  generatorEnergy: { [key: number]: number }, // энергия генераторов. Пример: 1 = 100, 2 = 120
): OptimalPath | null {
  let optimalGenerator = -1; // Инициализация переменной для лучшего генератора
  let minLoss = Infinity; // Инициализация переменной для минимальных потерь
  let bestPath: number[] = []; // Инициализация переменной для лучшего пути
  let availableEnergy = 0; // Инициализация переменной для доступной энергии

  // Проходит по всем генераторам
  generators.forEach((generator) => {
    const { distances, previous } = dijkstra(graph, generator); // Вычисление расстояния и предыдущие узлы от генератора

    // Если текущее расстояние меньше минимального и у генератора есть энергия
    if (distances[consumer] < minLoss && generatorEnergy[generator] > 0) {
      minLoss = distances[consumer]; // Обновление минимальных потерь
      optimalGenerator = generator; // Установка текущего генератора как оптимальный
      bestPath = getPath(previous, generator, consumer); // Нахождение пути от генератора до потребителя
      availableEnergy = generatorEnergy[generator]; // Обновление доступной энергии
    }
  });

  // Если не найден оптимальный генератор, возвращает null (Условие не отработает, все пути проложены)
  if (optimalGenerator === -1) return null;

  return {
    generator: optimalGenerator,
    path: bestPath,
    loss: minLoss,
    availableEnergy,
  };
}

// Массив ребер(точек) графа. from, to, потери
export const edges: [number, number, number][] = [
  [1, 2, 0.109], //
  [1, 15, 0.54], //
  [1, 16, 0.126], //
  [1, 17, 0.492], //
  [2, 3, 0.469], //
  [3, 4, 0.006], //
  [4, 5, 0.088], //
  [4, 6, 0.221], //
  [6, 7, 0.036], //
  [6, 8, 0.578], //
  [8, 9, 3.174], //
  [9, 10, 0.383], //
  [9, 11, 0.491], //
  [9, 12, 0.145], //
  [9, 13, 0.48], //
  [13, 14, 0.068], //
  [13, 15, 0.059], //
  [3, 15, 0.345], //
  [4, 18, 0], //
  [5, 6, 0.186], //
  [7, 8, 0.957], //
  [10, 12, 0.025], //
  [11, 13, 0.07], //
  [12, 13, 0.126], //
  [12, 16, 0.112], //
  [12, 17, 0.004], //
  [14, 15, 0.292], //
  [18, 19, 0.129], //
  [19, 20, 0.013], //
  [21, 20, 0], //
  [21, 22, 0.001], //
  [22, 23, 0.002], //
  [23, 24, 0.01], //
  [24, 25, 0], //
  [24, 26, 0], //
  [26, 27, 0.491], //
  [27, 28, 0.432], //
  [28, 29, 0.408], //
  [7, 29, 0], //
  [25, 30, 0.119], //
  [30, 31, 0.092], //
  [31, 32, 0.014], //
  [32, 33, 0.008], //
  [34, 32, 0], //
  [34, 35, 0.03], //
  [35, 36, 0.094], //
  [36, 37, 0.105], //
  [37, 38, 0.35], //
  [37, 39, 0.004], //
  [36, 40, 0.007], //
  [22, 38, 0.005], //
  [11, 41, 0], //
  [41, 42, 0.221], //
  [41, 43, 0], //
  [38, 44, 0.064], //
  [15, 45, 0], //
  [14, 46, 0], //
  [46, 47, 0.516], //
  [47, 48, 0.056], //
  [48, 49, 0.027], //
  [49, 50, 0.063], //
  [50, 51, 0.346], //
  [10, 51, 0], //
  [13, 49, 0], //
  [29, 52, 0.696], //
  [52, 53, 0.214], //
  [53, 54, 0.029], //
  [54, 55, 0.117], //
  [11, 43, 0], //
  [44, 45, 0.438], //
  [40, 56, 0], //
  [56, 41, 0.241], //
  [56, 42, 0.019], //
  [39, 57, 0], //
  [57, 56, 0.026], //
  [38, 49, 0.125], //
  [38, 48, 0.17], //
  [9, 58, 0], //
  [55, 58, 0.4], //
];

export const generators = [1, 2, 3, 6, 8, 9, 12, 16]; // Массив генераторов

// Генерируемая энергия у генераторов
export const generatorEnergy: { [key: number]: number } = {
  1: 140.06,
  2: 73.12,
  3: 44.5,
  6: 67.5,
  8: 456.68,
  9: 87.52,
  12: 352.77,
  16: 118000.71,
};

// Общая доступная энергия(все генераторы)
let totalAvailableEnergy = Object.values(generatorEnergy).reduce(
  (a, b) => a + b,
  0,
);

const data: InfoDataType = []; // Инициализация пустого массива данных

// Функция для выполнения подключения.
export const connectionFunc = async (
  requestingId: number, // ID, кто запросил
  requiredEnergy: number, // требуемое кол-во энергии
) => {
  if (requiredEnergy > totalAvailableEnergy) {
    alert('Недостаточно общей энергии для удовлетворения запроса.');
    return {};
  }

  const graph = createGraph(edges); // Создание графа из ребер
  const consumer = requestingId; // ID, запрашивающий энергию

  let remainingEnergy = requiredEnergy; // Оставшаяся требуемая энергия

  const copyData: InfoDataType = []; // Копия массива данных data. для дальнейшего обновления
  let availableGenerators = [...generators]; // Копия массива генераторов

  const accounts = await getAccounts();

  // Пока остаётся требуемая энергия и есть доступные генераторы
  while (remainingEnergy > 0 && availableGenerators.length > 0) {
    // Поиск оптимального пути
    const result = findOptimalPathForConsumer(
      graph,
      availableGenerators,
      consumer,
      generatorEnergy,
    );

    if (!result) return {}; // Выход из цикла, если не найден допустимый путь

    const { generator, path, loss, availableEnergy } = result; // Результат функции findOptimalPathForConsumer
    // кол-во энергии для передачи. принимает ту, которая меньше. Оставшаяся энергия или доступная энергия у генератора
    const energyToTransfer = Math.min(remainingEnergy, availableEnergy);

    // Обновление энергии у генератора и оставшейся энергии
    generatorEnergy[generator] -= energyToTransfer;
    totalAvailableEnergy -= energyToTransfer;
    remainingEnergy -= energyToTransfer;

    copyData.push({
      consumer: requestingId,
      generator,
      loss,
      road: path.join(' -> '),
      requested: String(energyToTransfer),
    });

    const generatorAddress = accounts[generator]; // Преобразование ID генератора в адрес
    const consumerAddress = accounts[requestingId]; // Преобразование ID потребителя в адрес

    // Если потребитель не является генератором, логируется передача энергии
    if (!generators.includes(requestingId)) {
      try {
        await logEnergyTransfer(
          generatorAddress,
          consumerAddress,
          energyToTransfer,
          loss,
        );
      } catch (error) {
        console.error(`Ошибка при логировании: ${error}`);
      }
    }

    // Удаление генераторов с нулевой энергией
    availableGenerators = availableGenerators.filter(
      (gen) => generatorEnergy[gen] > 0,
    );
  }
  // После отработки  цикла while, добавление копии данных в data. consumer; generator; loss; road; requested;
  data.push(...copyData);

  return {
    data, // массив данных
    generatorEnergy, // Обновленные данные о доступной энергии у генераторов
    totalAvailableEnergy, // Обновленное общее количество доступной энергии
  };
};

// Функция для получения транзакций для потребителя
export const getTransfersForConsumer = async (consumerId: number) => {
  const accounts = await getAccounts(); // Получение аккаунтов
  const consumerAddress = accounts[consumerId]; // Преобразование ID потребителя в адрес
  const transfers = await getTransfersByAddress(consumerAddress); // Получение транзакций по адресу

  return transfers;
};
