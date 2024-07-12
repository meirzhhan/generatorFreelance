import Web3 from 'web3';
import { InfoDataType } from '../App';
import EnergyTransfer from '../../build/contracts/EnergyTransfer.json'; // Убедитесь, что путь к файлу правильный

const web3 = new Web3('http://127.0.0.1:7545');

const getContract = async () => {
  const networkId = await web3.eth.net.getId(); // @ts-ignore
  const deployedNetwork = EnergyTransfer.networks[networkId];
  const contract = new web3.eth.Contract( // @ts-ignore
    EnergyTransfer.abi,
    deployedNetwork && deployedNetwork.address,
  );
  return contract;
};

const getAccounts = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts;
};

const logEnergyTransfer = async (
  // @ts-ignore
  generator: string,
  consumer: string,
  energyGenerated: number,
  lossCoefficient: number
) => {
  const contract = await getContract();

  const PRICE_PER_MWH = 23000;
  const etherPrice = 1435457; // Example Ether price in Tenge
  const costInTenge = (energyGenerated * PRICE_PER_MWH) * (1 - lossCoefficient); // Calculate cost in Tenge
  const costInEther = (costInTenge / etherPrice).toString();
  console.log("etherPrice " + etherPrice)
  console.log("PRICE_PER_MWH " + PRICE_PER_MWH)
  console.log("energyGenerated " + energyGenerated)
  console.log("lossCoefficient " + lossCoefficient)
  console.log("1-lossCoefficient = " + (1 - lossCoefficient))
  console.log("costInTenge " + costInTenge)
  console.log("Cost in ether " + costInEther)
  console.log("substring= " + costInEther.substring(0, 5))


  await contract.methods
    .logEnergyTransfer(generator, consumer, energyGenerated, lossCoefficient)
    .send({
      from: consumer,
      value: web3.utils.toWei('1', 'ether'),
      gas: 5000000,
    });
};

// @ts-ignore
const getTransfersByAddress = async (address) => {
  const contract = await getContract();
  const transfers = await contract.methods
    .getTransfersByAddress(address)
    .call();
  return transfers;
};

// TODO: Limit multiple generator after fix

interface Edge {
  to: number;
  weight: number;
}

interface NodeE {
  id: number;
  edges: Edge[];
}

interface Graph {
  [key: number]: NodeE;
}

interface Distance {
  [key: number]: number;
}

interface Previous {
  [key: number]: number | null;
}

interface OptimalPath {
  generator: number;
  path: number[];
  loss: number;
  availableEnergy: number;
}

// Function to create a graph from a list of edges
function createGraph(edges: [number, number, number][]): Graph {
  const graph: Graph = {};
  edges.forEach(([from, to, weight]) => {
    if (!graph[from]) graph[from] = { id: from, edges: [] };
    if (!graph[to]) graph[to] = { id: to, edges: [] };
    graph[from].edges.push({ to, weight });
    graph[to].edges.push({ to: from, weight }); // reverse path
  });
  return graph;
}

// Dijkstra's algorithm
function dijkstra(
  graph: Graph,
  startNode: number,
): { distances: Distance; previous: Previous } {
  const distances: Distance = {};
  const previous: Previous = {};
  const nodes: Set<number> = new Set(Object.keys(graph).map(Number));

  // Initialization
  nodes.forEach((node) => {
    distances[node] = Infinity;
    previous[node] = null;
  });
  distances[startNode] = 0;

  while (nodes.size > 0) {
    // Find the path with the minimum loss
    let closestNode = Array.from(nodes).reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode,
    );

    nodes.delete(closestNode);

    // Update distances to neighboring nodes
    graph[closestNode].edges.forEach((edge) => {
      const alt = distances[closestNode] + edge.weight;
      if (alt < distances[edge.to]) {
        distances[edge.to] = alt;
        previous[edge.to] = closestNode;
      }
    });
  }

  return { distances, previous };
}

// Function to get the path from the start node to the target node
function getPath(
  previous: Previous,
  startNode: number,
  endNode: number,
): number[] {
  const path: number[] = [];
  let currentNode: number | null = endNode;

  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  if (path[0] !== startNode) {
    return []; // Path not found
  }

  return path;
}

// Function to find the best generator for a given consumer
function findOptimalPathForConsumer(
  graph: Graph,
  generators: number[],
  consumer: number,
  generatorEnergy: { [key: number]: number },
): OptimalPath | null {
  let optimalGenerator = -1;
  let minLoss = Infinity;
  let bestPath: number[] = [];
  let availableEnergy = 0;

  generators.forEach((generator) => {
    const { distances, previous } = dijkstra(graph, generator);
    if (distances[consumer] < minLoss && generatorEnergy[generator] > 0) {
      minLoss = distances[consumer];
      optimalGenerator = generator;
      bestPath = getPath(previous, generator, consumer);
      availableEnergy = generatorEnergy[generator];
    }
  });

  if (optimalGenerator === -1) return null;

  return {
    generator: optimalGenerator,
    path: bestPath,
    loss: minLoss,
    availableEnergy,
  };
}

// from, to, loss
export const arrows: [number, number, number][] = [
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

export const generators = [1, 2, 3, 6, 8, 9, 12, 16]; // array of generators

// Initial energy of the generators
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

let totalAvailableEnergy = Object.values(generatorEnergy).reduce(
  (a, b) => a + b,
  0,
);

const data: InfoDataType = [];

export const connectionFunc = async (start: number, requiredEnergy: number) => {
  const graph = createGraph(arrows);
  const consumer = start; // consumer requesting energy

  let remainingEnergy = requiredEnergy;

  console.log(`До: ${totalAvailableEnergy}`);

  // if (requiredEnergy > totalAvailableEnergy) {
  //   alert('Not enough total energy to satisfy the request.');
  //   return {};
  // }

  const paths: InfoDataType = [];
  let availableGenerators = [...generators]; // Copy of the generators array

  const accounts = await getAccounts();

  while (remainingEnergy > 0 && availableGenerators.length > 0) {
    const result = findOptimalPathForConsumer(
      graph,
      availableGenerators,
      consumer,
      generatorEnergy,
    );

    if (!result) {
      console.log('No valid path found for the remaining energy.');
      return {}; // Exit loop if no valid path is found
    }

    const { generator, path, loss, availableEnergy } = result;
    const energyToTransfer = Math.min(remainingEnergy, availableEnergy);

    console.log(
      `Transferring ${energyToTransfer} units from generator ${generator}`,
    );

    generatorEnergy[generator] -= energyToTransfer;
    totalAvailableEnergy -= energyToTransfer;
    remainingEnergy -= energyToTransfer;

    paths.push({
      consumer: start,
      generator,
      loss,
      road: path.join(' -> '),
      requested: String(energyToTransfer),
    });

    const generatorAddress = accounts[generator]; // Преобразование идентификатора генератора в адрес
    const consumerAddress = accounts[start]; // Преобразование идентификатора потребителя в адрес

    if (!generators.includes(start)) {
      try {
        await logEnergyTransfer(
          generatorAddress,
          consumerAddress,
          energyToTransfer,
          loss,
        );
      } catch (error) {
        console.error(`Ошибка при логировании энергопередачи: ${error}`);
      }
    }

    // Remove generator with zero or negative energy from the available list
    availableGenerators = availableGenerators.filter(
      (gen) => generatorEnergy[gen] > 0,
    );
  }

  data.push(...paths);

  console.log(`После: ${totalAvailableEnergy}`);

  return {
    data,
    generatorEnergy,
    totalAvailableEnergy,
  };
};

export const getTransfersForConsumer = async (consumerId: number) => {
  const accounts = await getAccounts();
  const consumerAddress = accounts[consumerId];

  const transfers = await getTransfersByAddress(consumerAddress);
  return transfers;
};
