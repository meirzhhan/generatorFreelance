// interface Edge {
//   to: number;
//   weight: number;
// }

import { InfoDataType } from '../App';

// interface Node {
//   id: number;
//   edges: Edge[];
// }

// interface Graph {
//   [key: number]: Node;
// }

// interface Distance {
//   [key: number]: number;
// }

// interface Previous {
//   [key: number]: number | null;
// }

// // Функция для создания двунаправленного графа из списка рёбер
// function createGraph(edges: [number, number, number][]): Graph {
//   const graph: Graph = {};
//   edges.forEach(([from, to, weight]) => {
//     if (!graph[from]) graph[from] = { id: from, edges: [] };
//     if (!graph[to]) graph[to] = { id: to, edges: [] };
//     graph[from].edges.push({ to, weight });
//     graph[to].edges.push({ to: from, weight }); // Добавляем обратное ребро
//   });
//   return graph;
// }

// // Алгоритм Дейкстры
// function dijkstra(
//   graph: Graph,
//   startNode: number,
// ): { distances: Distance; previous: Previous } {
//   const distances: Distance = {};
//   const previous: Previous = {};
//   const nodes: Set<number> = new Set(Object.keys(graph).map(Number));

//   // Инициализация
//   nodes.forEach((node) => {
//     distances[node] = Infinity;
//     previous[node] = null;
//   });
//   distances[startNode] = 0;

//   while (nodes.size > 0) {
//     // Найти узел с минимальной дистанцией
//     let closestNode = Array.from(nodes).reduce((minNode, node) =>
//       distances[node] < distances[minNode] ? node : minNode,
//     );

//     nodes.delete(closestNode);

//     // Обновить дистанции до соседних узлов
//     graph[closestNode].edges.forEach((edge) => {
//       const alt = distances[closestNode] + edge.weight;
//       if (alt < distances[edge.to]) {
//         distances[edge.to] = alt;
//         previous[edge.to] = closestNode;
//       }
//     });
//   }

//   return { distances, previous };
// }

// // Функция для получения пути от стартовой точки до целевой
// function getPath(
//   previous: Previous,
//   startNode: number,
//   endNode: number,
// ): number[] {
//   const path: number[] = [];
//   let currentNode: number | null = endNode;

//   while (currentNode !== null) {
//     path.unshift(currentNode);
//     currentNode = previous[currentNode];
//   }

//   if (path[0] !== startNode) {
//     return []; // Путь не найден
//   }

//   return path;
// }

// // Пример использования
// const edges: [number, number, number][] = [
//   [1, 2, 0.109],
//   [1, 15, 0.54],
//   [1, 16, 0.126],
//   [1, 17, 0.492],
//   [2, 3, 0.548],
//   [3, 4, 0.071],
//   [4, 5, 0.297],
//   [4, 6, 0.566],
//   [6, 7, 0.045],
//   [6, 8, 0.507],
//   [8, 9, 3.174],
//   [9, 10, 0.586],
//   [9, 11, 0.905],
//   [9, 12, 0.31],
//   [9, 13, 1.064],
//   [13, 14, 0.653],
//   [13, 15, 0.112],
//   [3, 15, 0.345],
//   [4, 18, 0],
//   [5, 6, 0.351],
//   [7, 8, 0.893],
//   [10, 12, 0.03],
//   [11, 13, 0.244],
//   [12, 13, 0.346],
//   [12, 16, 0.017],
//   [12, 17, 0.016],
//   [14, 15, 1.265],
//   [18, 19, 0.198],
//   [19, 20, 0.032],
//   [21, 20, 0],
//   [21, 22, 0.001],
//   [22, 23, 0.002],
//   [23, 24, 0.086],
//   [24, 25, 0],
//   [24, 26, 0],
//   [26, 27, 0.809],
//   [27, 28, 0.606],
//   [28, 29, 0.541],
//   [7, 29, 0],
//   [25, 30, 0.128],
//   [30, 31, 0.103],
//   [31, 32, 0.007],
//   [32, 33, 0.008],
//   [34, 32, 0],
//   [34, 35, 0.03],
//   [35, 36, 0.089],
//   [36, 37, 0.097],
//   [37, 38, 0.323],
//   [37, 39, 0.004],
//   [36, 40, 0.007],
//   [22, 38, 0.003],
//   [11, 41, 0],
//   [41, 42, 0.237],
//   [41, 43, 0],
//   [38, 44, 0.073],
//   [15, 45, 0],
//   [14, 46, 0],
//   [46, 47, 0.325],
//   [47, 48, 0.025],
//   [48, 49, 0.055],
//   [49, 50, 0.049],
//   [50, 51, 0.498],
//   [10, 51, 0],
//   [13, 49, 0],
//   [29, 52, 0.494],
//   [52, 53, 0.14],
//   [53, 54, 0.09],
//   [54, 55, 0.214],
//   [11, 43, 0],
//   [44, 45, 0.477],
//   [40, 56, 0],
//   [56, 41, 0.273],
//   [56, 42, 0.024],
//   [39, 57, 0],
//   [57, 56, 0.031],
//   [38, 49, 0.128],
//   [38, 48, 0.104],
//   [9, 55, 0],
// ];

// export const xd = () => {
//   const graph = createGraph(edges);
//   const startNode = 1;
//   const endNode = 12;

//   const { distances, previous } = dijkstra(graph, startNode);
//   const path = getPath(previous, startNode, endNode);

//   console.log(
//     `Минимальная потеря от ${startNode} до ${endNode}: ${distances[endNode]}`,
//   );
//   console.log(`Путь: ${path.join(' -> ')}`);
// };

// TODO: Без обратной пути.

// interface Edge {
//   to: number;
//   weight: number;
// }

// interface NodeE {
//   id: number;
//   edges: Edge[];
// }

// interface Graph {
//   [key: number]: NodeE;
// }

// interface Distance {
//   [key: number]: number;
// }

// interface Previous {
//   [key: number]: number | null;
// }

// // Функция для создания графа из списка рёбер
// function createGraph(edges: [number, number, number][]): Graph {
//   const graph: Graph = {};
//   edges.forEach(([from, to, weight]) => {
//     if (!graph[from]) graph[from] = { id: from, edges: [] };
//     if (!graph[to]) graph[to] = { id: to, edges: [] };
//     graph[from].edges.push({ to, weight });
//   });
//   return graph;
// }

// // Алгоритм Дейкстры
// function dijkstra(
//   graph: Graph,
//   startNode: number,
// ): { distances: Distance; previous: Previous } {
//   const distances: Distance = {};
//   const previous: Previous = {};
//   const nodes: Set<number> = new Set(Object.keys(graph).map(Number));

//   // Инициализация
//   nodes.forEach((node) => {
//     distances[node] = Infinity;
//     previous[node] = null;
//   });
//   distances[startNode] = 0;

//   while (nodes.size > 0) {
//     // Найти узел с минимальной дистанцией
//     let closestNode = Array.from(nodes).reduce((minNode, node) =>
//       distances[node] < distances[minNode] ? node : minNode,
//     );

//     nodes.delete(closestNode);

//     // Обновить дистанции до соседних узлов
//     graph[closestNode].edges.forEach((edge) => {
//       const alt = distances[closestNode] + edge.weight;
//       if (alt < distances[edge.to]) {
//         distances[edge.to] = alt;
//         previous[edge.to] = closestNode;
//       }
//     });
//   }

//   return { distances, previous };
// }

// // Функция для получения пути от стартовой точки до целевой
// function getPath(
//   previous: Previous,
//   startNode: number,
//   endNode: number,
// ): number[] {
//   const path: number[] = [];
//   let currentNode: number | null = endNode;

//   while (currentNode !== null) {
//     path.unshift(currentNode);
//     currentNode = previous[currentNode];
//   }

//   if (path[0] !== startNode) {
//     return []; // Путь не найден
//   }

//   return path;
// }

// // Пример использования
// const edges: [number, number, number][] = [
//   [1, 2, 0.109],
//   [1, 15, 0.54],
//   [1, 16, 0.126],
//   [1, 17, 0.492],
//   [2, 3, 0.548],
//   [3, 4, 0.071],
//   [4, 5, 0.297],
//   [4, 6, 0.566],
//   [6, 7, 0.045],
//   [6, 8, 0.507],
//   [8, 9, 3.174],
//   [9, 10, 0.586],
//   [9, 11, 0.905],
//   [9, 12, 0.31],
//   [9, 13, 1.064],
//   [13, 14, 0.653],
//   [13, 15, 0.112],
//   [3, 15, 0.345],
//   [4, 18, 0],
//   [5, 6, 0.351],
//   [7, 8, 0.893],
//   [10, 12, 0.03],
//   [11, 13, 0.244],
//   [12, 13, 0.346],
//   [12, 16, 0.017],
//   [12, 17, 0.016],
//   [14, 15, 1.265],
//   [18, 19, 0.198],
//   [19, 20, 0.032],
//   [21, 20, 0],
//   [21, 22, 0.001],
//   [22, 23, 0.002],
//   [23, 24, 0.086],
//   [24, 25, 0],
//   [24, 26, 0],
//   [26, 27, 0.809],
//   [27, 28, 0.606],
//   [28, 29, 0.541],
//   [7, 29, 0],
//   [25, 30, 0.128],
//   [30, 31, 0.103],
//   [31, 32, 0.007],
//   [32, 33, 0.008],
//   [34, 32, 0],
//   [34, 35, 0.03],
//   [35, 36, 0.089],
//   [36, 37, 0.097],
//   [37, 38, 0.323],
//   [37, 39, 0.004],
//   [36, 40, 0.007],
//   [22, 38, 0.003],
//   [11, 41, 0],
//   [41, 42, 0.237],
//   [41, 43, 0],
//   [38, 44, 0.073],
//   [15, 45, 0],
//   [14, 46, 0],
//   [46, 47, 0.325],
//   [47, 48, 0.025],
//   [48, 49, 0.055],
//   [49, 50, 0.049],
//   [50, 51, 0.498],
//   [10, 51, 0],
//   [13, 49, 0],
//   [29, 52, 0.494],
//   [52, 53, 0.14],
//   [53, 54, 0.09],
//   [54, 55, 0.214],
//   [11, 43, 0],
//   [44, 45, 0.477],
//   [40, 56, 0],
//   [56, 41, 0.273],
//   [56, 42, 0.024],
//   [39, 57, 0],
//   [57, 56, 0.031],
//   [38, 49, 0.128],
//   [38, 48, 0.104],
//   [9, 55, 0],
// ];

// export const xd = () => {
//   const graph = createGraph(edges);
//   const startNode = 1;
//   const endNode = 51;

//   const { distances, previous } = dijkstra(graph, startNode);
//   const path = getPath(previous, startNode, endNode);

//   console.log(
//     `Минимальная потеря от ${startNode} до ${endNode}: ${distances[endNode]}`,
//   );
//   console.log(`Путь: ${path.join(' -> ')}`);
// };

// TODO: Учитывает наилучший маршрут, но движение идти наоборот

// interface Edge {
//   to: number;
//   weight: number;
// }

// interface NodeE {
//   id: number;
//   edges: Edge[];
// }

// interface Graph {
//   [key: number]: NodeE;
// }

// interface Distance {
//   [key: number]: number;
// }

// interface Previous {
//   [key: number]: number | null;
// }

// // Функция для создания графа из списка
// function createGraph(edges: [number, number, number][]): Graph {
//   const graph: Graph = {};
//   edges.forEach(([from, to, weight]) => {
//     if (!graph[from]) graph[from] = { id: from, edges: [] };
//     if (!graph[to]) graph[to] = { id: to, edges: [] };
//     graph[from].edges.push({ to, weight });
//     graph[to].edges.push({ to: from, weight }); // обратный путь
//   });
//   return graph;
// }

// // Алгоритм Дейкстры
// function dijkstra(
//   graph: Graph,
//   startNode: number,
// ): { distances: Distance; previous: Previous } {
//   const distances: Distance = {};
//   const previous: Previous = {};
//   const nodes: Set<number> = new Set(Object.keys(graph).map(Number));

//   // Инициализация
//   nodes.forEach((node) => {
//     distances[node] = Infinity;
//     previous[node] = null;
//   });
//   distances[startNode] = 0;

//   while (nodes.size > 0) {
//     // Найти путь с минимальной потерей
//     let closestNode = Array.from(nodes).reduce((minNode, node) =>
//       distances[node] < distances[minNode] ? node : minNode,
//     );

//     nodes.delete(closestNode);

//     // Обновить дистанции до соседних узлов
//     graph[closestNode].edges.forEach((edge) => {
//       const alt = distances[closestNode] + edge.weight;
//       if (alt < distances[edge.to]) {
//         distances[edge.to] = alt;
//         previous[edge.to] = closestNode;
//       }
//     });
//   }

//   return { distances, previous };
// }

// // Функция для получения пути от стартовой точки до целевой
// function getPath(
//   previous: Previous,
//   startNode: number,
//   endNode: number,
// ): number[] {
//   const path: number[] = [];
//   let currentNode: number | null = endNode;

//   while (currentNode !== null) {
//     path.unshift(currentNode);
//     currentNode = previous[currentNode];
//   }

//   if (path[0] !== startNode) {
//     return []; // Путь не найден
//   }

//   return path;
// }

// // Функция для поиска наилучшего генератора для указанного потребителя
// function findOptimalPathForConsumer(
//   graph: Graph,
//   generators: number[],
//   consumer: number,
// ): { generator: number; path: number[]; loss: number } {
//   let optimalGenerator = -1;
//   let minLoss = Infinity;
//   let bestPath: number[] = [];

//   generators.forEach((generator) => {
//     const { distances, previous } = dijkstra(graph, generator);
//     if (distances[consumer] < minLoss) {
//       minLoss = distances[consumer];
//       optimalGenerator = generator;
//       bestPath = getPath(previous, generator, consumer);
//     }
//   });

//   return { generator: optimalGenerator, path: bestPath, loss: minLoss };
// }

// // from, to, потери
// export const arrows: [number, number, number][] = [
//   [1, 2, 0.109], //
//   [1, 15, 0.54], //
//   [1, 16, 0.126], //
//   [1, 17, 0.492], //
//   [2, 3, 0.469], //
//   [3, 4, 0.006], //
//   [4, 5, 0.088], //
//   [4, 6, 0.221], //
//   [6, 7, 0.036], //
//   [6, 8, 0.578], //
//   [8, 9, 3.174], //
//   [9, 10, 0.383], //
//   [9, 11, 0.491], //
//   [9, 12, 0.145], //
//   [9, 13, 0.48], //
//   [13, 14, 0.068], //
//   [13, 15, 0.059], //
//   [3, 15, 0.345], //
//   [4, 18, 0], //
//   [5, 6, 0.186], //
//   [7, 8, 0.957], //
//   [10, 12, 0.025], //
//   [11, 13, 0.07], //
//   [12, 13, 0.126], //
//   [12, 16, 0.112], //
//   [12, 17, 0.004], //
//   [14, 15, 0.292], //
//   [18, 19, 0.129], //
//   [19, 20, 0.013], //
//   [21, 20, 0], //
//   [21, 22, 0.001], //
//   [22, 23, 0.002], //
//   [23, 24, 0.01], //
//   [24, 25, 0], //
//   [24, 26, 0], //
//   [26, 27, 0.491], //
//   [27, 28, 0.432], //
//   [28, 29, 0.408], //
//   [7, 29, 0], //
//   [25, 30, 0.119], //
//   [30, 31, 0.092], //
//   [31, 32, 0.014], //
//   [32, 33, 0.008], //
//   [34, 32, 0], //
//   [34, 35, 0.03], //
//   [35, 36, 0.094], //
//   [36, 37, 0.105], //
//   [37, 38, 0.35], //
//   [37, 39, 0.004], //
//   [36, 40, 0.007], //
//   [22, 38, 0.005], //
//   [11, 41, 0], //
//   [41, 42, 0.221], //
//   [41, 43, 0], //
//   [38, 44, 0.064], //
//   [15, 45, 0], //
//   [14, 46, 0], //
//   [46, 47, 0.516], //
//   [47, 48, 0.056], //
//   [48, 49, 0.027], //
//   [49, 50, 0.063], //
//   [50, 51, 0.346], //
//   [10, 51, 0], //
//   [13, 49, 0], //
//   [29, 52, 0.696], //
//   [52, 53, 0.214], //
//   [53, 54, 0.029], //
//   [54, 55, 0.117], //
//   [11, 43, 0], //
//   [44, 45, 0.438], //
//   [40, 56, 0], //
//   [56, 41, 0.241], //
//   [56, 42, 0.019], //
//   [39, 57, 0], //
//   [57, 56, 0.026], //
//   [38, 49, 0.125], //
//   [38, 48, 0.17], //
//   [9, 58, 0], //
//   [55, 58, 0.4], //
// ];

// export const generators = [1, 2, 3, 6, 8, 9, 16]; // массив генераторов

// export const connectionFunc = (start: number) => {
//   const consumer = start; // потребитель, который запрашивает

//   const graph = createGraph(arrows);
//   const result = findOptimalPathForConsumer(graph, generators, consumer);

//   return {
//     road: result.path, // путь до потребителя, Пример: [3, 5, 7]
//     loss: result.loss, // общие потери до потребителя
//     generator: result.generator, // Генератор, который отдал
//   };
// };

// TODO: Limit 1 generator

// interface Edge {
//   to: number;
//   weight: number;
// }

// interface NodeE {
//   id: number;
//   edges: Edge[];
// }

// interface Graph {
//   [key: number]: NodeE;
// }

// interface Distance {
//   [key: number]: number;
// }

// interface Previous {
//   [key: number]: number | null;
// }

// // Функция для создания графа из списка
// function createGraph(edges: [number, number, number][]): Graph {
//   const graph: Graph = {};
//   edges.forEach(([from, to, weight]) => {
//     if (!graph[from]) graph[from] = { id: from, edges: [] };
//     if (!graph[to]) graph[to] = { id: to, edges: [] };
//     graph[from].edges.push({ to, weight });
//     graph[to].edges.push({ to: from, weight }); // обратный путь
//   });
//   return graph;
// }

// // Алгоритм Дейкстры
// function dijkstra(
//   graph: Graph,
//   startNode: number,
// ): { distances: Distance; previous: Previous } {
//   const distances: Distance = {};
//   const previous: Previous = {};
//   const nodes: Set<number> = new Set(Object.keys(graph).map(Number));

//   // Инициализация
//   nodes.forEach((node) => {
//     distances[node] = Infinity;
//     previous[node] = null;
//   });
//   distances[startNode] = 0;

//   while (nodes.size > 0) {
//     // Найти путь с минимальной потерей
//     let closestNode = Array.from(nodes).reduce((minNode, node) =>
//       distances[node] < distances[minNode] ? node : minNode,
//     );

//     nodes.delete(closestNode);

//     // Обновить дистанции до соседних узлов
//     graph[closestNode].edges.forEach((edge) => {
//       const alt = distances[closestNode] + edge.weight;
//       if (alt < distances[edge.to]) {
//         distances[edge.to] = alt;
//         previous[edge.to] = closestNode;
//       }
//     });
//   }

//   return { distances, previous };
// }

// // Функция для получения пути от стартовой точки до целевой
// function getPath(
//   previous: Previous,
//   startNode: number,
//   endNode: number,
// ): number[] {
//   const path: number[] = [];
//   let currentNode: number | null = endNode;

//   while (currentNode !== null) {
//     path.unshift(currentNode);
//     currentNode = previous[currentNode];
//   }

//   if (path[0] !== startNode) {
//     return []; // Путь не найден
//   }

//   return path;
// }

// // Функция для поиска наилучшего генератора для указанного потребителя
// function findOptimalPathForConsumer(
//   graph: Graph,
//   generators: number[],
//   consumer: number,
//   generatorEnergy: { [key: number]: number },
//   requiredEnergy: number,
// ): { generator: number; path: number[]; loss: number } | null {
//   let optimalGenerator = -1;
//   let minLoss = Infinity;
//   let bestPath: number[] = [];

//   generators.forEach((generator) => {
//     const { distances, previous } = dijkstra(graph, generator);
//     if (
//       distances[consumer] < minLoss &&
//       generatorEnergy[generator] >= requiredEnergy
//     ) {
//       minLoss = distances[consumer];
//       optimalGenerator = generator;
//       bestPath = getPath(previous, generator, consumer);
//     }
//   });

//   if (optimalGenerator === -1) return null;

//   return { generator: optimalGenerator, path: bestPath, loss: minLoss };
// }

// // from, to, потери
// export const arrows: [number, number, number][] = [
//   [1, 2, 0.109], //
//   [1, 15, 0.54], //
//   [1, 16, 0.126], //
//   [1, 17, 0.492], //
//   [2, 3, 0.469], //
//   [3, 4, 0.006], //
//   [4, 5, 0.088], //
//   [4, 6, 0.221], //
//   [6, 7, 0.036], //
//   [6, 8, 0.578], //
//   [8, 9, 3.174], //
//   [9, 10, 0.383], //
//   [9, 11, 0.491], //
//   [9, 12, 0.145], //
//   [9, 13, 0.48], //
//   [13, 14, 0.068], //
//   [13, 15, 0.059], //
//   [3, 15, 0.345], //
//   [4, 18, 0], //
//   [5, 6, 0.186], //
//   [7, 8, 0.957], //
//   [10, 12, 0.025], //
//   [11, 13, 0.07], //
//   [12, 13, 0.126], //
//   [12, 16, 0.112], //
//   [12, 17, 0.004], //
//   [14, 15, 0.292], //
//   [18, 19, 0.129], //
//   [19, 20, 0.013], //
//   [21, 20, 0], //
//   [21, 22, 0.001], //
//   [22, 23, 0.002], //
//   [23, 24, 0.01], //
//   [24, 25, 0], //
//   [24, 26, 0], //
//   [26, 27, 0.491], //
//   [27, 28, 0.432], //
//   [28, 29, 0.408], //
//   [7, 29, 0], //
//   [25, 30, 0.119], //
//   [30, 31, 0.092], //
//   [31, 32, 0.014], //
//   [32, 33, 0.008], //
//   [34, 32, 0], //
//   [34, 35, 0.03], //
//   [35, 36, 0.094], //
//   [36, 37, 0.105], //
//   [37, 38, 0.35], //
//   [37, 39, 0.004], //
//   [36, 40, 0.007], //
//   [22, 38, 0.005], //
//   [11, 41, 0], //
//   [41, 42, 0.221], //
//   [41, 43, 0], //
//   [38, 44, 0.064], //
//   [15, 45, 0], //
//   [14, 46, 0], //
//   [46, 47, 0.516], //
//   [47, 48, 0.056], //
//   [48, 49, 0.027], //
//   [49, 50, 0.063], //
//   [50, 51, 0.346], //
//   [10, 51, 0], //
//   [13, 49, 0], //
//   [29, 52, 0.696], //
//   [52, 53, 0.214], //
//   [53, 54, 0.029], //
//   [54, 55, 0.117], //
//   [11, 43, 0], //
//   [44, 45, 0.438], //
//   [40, 56, 0], //
//   [56, 41, 0.241], //
//   [56, 42, 0.019], //
//   [39, 57, 0], //
//   [57, 56, 0.026], //
//   [38, 49, 0.125], //
//   [38, 48, 0.17], //
//   [9, 58, 0], //
//   [55, 58, 0.4], //
// ];

// export const generators = [1, 2, 3, 6, 8, 9, 16]; // массив генераторов

// // Изначальная энергия генераторов
// export const generatorEnergy: { [key: number]: number } = {
//   1: 1000,
//   2: 800,
//   3: 600,
//   6: 1200,
//   8: 500,
//   9: 1100,
//   16: 50,
// };

// export const connectionFunc = (start: number, requiredEnergy: number) => {
//   const consumer = start; // потребитель, который запрашивает

//   const graph = createGraph(arrows);
//   const result = findOptimalPathForConsumer(
//     graph,
//     generators,
//     consumer,
//     generatorEnergy,
//     requiredEnergy,
//   );

//   if (!result) {
//     return {
//       road: [],
//       loss: Infinity,
//       generator: -1,
//     };
//   }

//   // Обновляем энергию генератора
//   generatorEnergy[result.generator] -= requiredEnergy;

//   console.log(result);

//   return {
//     road: result.path, // путь до потребителя, Пример: [3, 5, 7]
//     loss: result.loss, // общие потери до потребителя
//     generator: result.generator, // Генератор, который отдал
//   };
// };

// TODO: Limit multiple generator

// connectionFunc.ts
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

// Функция для создания графа из списка
function createGraph(edges: [number, number, number][]): Graph {
  const graph: Graph = {};
  edges.forEach(([from, to, weight]) => {
    if (!graph[from]) graph[from] = { id: from, edges: [] };
    if (!graph[to]) graph[to] = { id: to, edges: [] };
    graph[from].edges.push({ to, weight });
    graph[to].edges.push({ to: from, weight }); // обратный путь
  });
  return graph;
}

// Алгоритм Дейкстры
function dijkstra(
  graph: Graph,
  startNode: number,
): { distances: Distance; previous: Previous } {
  const distances: Distance = {};
  const previous: Previous = {};
  const nodes: Set<number> = new Set(Object.keys(graph).map(Number));

  // Инициализация
  nodes.forEach((node) => {
    distances[node] = Infinity;
    previous[node] = null;
  });
  distances[startNode] = 0;

  while (nodes.size > 0) {
    // Найти путь с минимальной потерей
    let closestNode = Array.from(nodes).reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode,
    );

    nodes.delete(closestNode);

    // Обновить дистанции до соседних узлов
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

// Функция для получения пути от стартовой точки до целевой
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
    return []; // Путь не найден
  }

  return path;
}

// Функция для поиска наилучшего генератора для указанного потребителя
function findOptimalPathForConsumer(
  graph: Graph,
  generators: number[],
  consumer: number,
  generatorEnergy: { [key: number]: number },
  requiredEnergy: number,
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

// from, to, потери
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

export const generators = [1, 2, 3, 6, 8, 9, 16]; // массив генераторов

// Изначальная энергия генераторов
export const generatorEnergy: { [key: number]: number } = {
  1: 1000,
  2: 800,
  3: 600,
  6: 1200,
  8: 500,
  9: 1100,
  16: 700,
};

const data: InfoDataType = [];

export const connectionFunc = (start: number, requiredEnergy: number) => {
  const consumer = start; // потребитель, который запрашивает

  const graph = createGraph(arrows);
  let remainingEnergy = requiredEnergy;
  let totalLoss = 0;
  const paths = [];

  while (remainingEnergy > 0) {
    const result = findOptimalPathForConsumer(
      graph,
      generators,
      consumer,
      generatorEnergy,
      remainingEnergy,
    );

    if (!result) {
      break;
    }

    const { generator, path, loss, availableEnergy } = result;
    const energyToTransfer = Math.min(remainingEnergy, availableEnergy);

    generatorEnergy[generator] -= energyToTransfer;
    remainingEnergy -= energyToTransfer;
    totalLoss += loss;

    paths.push({
      consumer: start,
      generator,
      loss,
      road: path.join(' -> '),
      requested: String(energyToTransfer),
    });
  }

  if (remainingEnergy > 0) {
    alert('Не хватает энергии для удовлетворения запроса.');
  }

  data.push(...paths);

  console.log(data);

  return {
    data,
  };
};

// TODO: Учитывает наилучший маршрут по направлению (не идёт против движения)

// interface Edge {
//   to: number;
//   weight: number;
// }

// interface NodeE {
//   id: number;
//   edges: Edge[];
// }

// interface Graph {
//   [key: number]: NodeE;
// }

// interface Distance {
//   [key: number]: number;
// }

// interface Previous {
//   [key: number]: number | null;
// }

// // Функция для создания графа из списка рёбер
// function createGraph(edges: [number, number, number][]): Graph {
//   const graph: Graph = {};
//   edges.forEach(([from, to, weight]) => {
//     if (!graph[from]) graph[from] = { id: from, edges: [] };
//     if (!graph[to]) graph[to] = { id: to, edges: [] };
//     graph[from].edges.push({ to, weight });
//   });
//   return graph;
// }

// // Алгоритм Дейкстры
// function dijkstra(
//   graph: Graph,
//   startNode: number,
// ): { distances: Distance; previous: Previous } {
//   const distances: Distance = {};
//   const previous: Previous = {};
//   const nodes: Set<number> = new Set(Object.keys(graph).map(Number));

//   // Инициализация
//   nodes.forEach((node) => {
//     distances[node] = Infinity;
//     previous[node] = null;
//   });
//   distances[startNode] = 0;

//   while (nodes.size > 0) {
//     // Найти узел с минимальной дистанцией
//     let closestNode = Array.from(nodes).reduce((minNode, node) =>
//       distances[node] < distances[minNode] ? node : minNode,
//     );

//     nodes.delete(closestNode);

//     // Обновить дистанции до соседних узлов
//     graph[closestNode].edges.forEach((edge) => {
//       const alt = distances[closestNode] + edge.weight;
//       if (alt < distances[edge.to]) {
//         distances[edge.to] = alt;
//         previous[edge.to] = closestNode;
//       }
//     });
//   }

//   return { distances, previous };
// }

// // Функция для получения пути от стартовой точки до целевой
// function getPath(
//   previous: Previous,
//   startNode: number,
//   endNode: number,
// ): number[] {
//   const path: number[] = [];
//   let currentNode: number | null = endNode;

//   while (currentNode !== null) {
//     path.unshift(currentNode);
//     currentNode = previous[currentNode];
//   }

//   if (path[0] !== startNode) {
//     return []; // Путь не найден
//   }

//   return path;
// }

// // Функция для поиска наилучшего генератора для указанного потребителя
// function findOptimalPathForConsumer(
//   graph: Graph,
//   generators: number[],
//   consumer: number,
// ): { generator: number; path: number[]; loss: number } {
//   let optimalGenerator = -1;
//   let minLoss = Infinity;
//   let bestPath: number[] = [];

//   generators.forEach((generator) => {
//     const { distances, previous } = dijkstra(graph, generator);
//     if (distances[consumer] < minLoss) {
//       minLoss = distances[consumer];
//       optimalGenerator = generator;
//       bestPath = getPath(previous, generator, consumer);
//     }
//   });

//   return { generator: optimalGenerator, path: bestPath, loss: minLoss };
// }

// // Пример использования
// export const arrows: [number, number, number][] = [
//   [1, 2, 0.109], //
//   [1, 15, 0.54], //
//   [1, 16, 0.126], //
//   [1, 17, 0.492], //
//   [2, 3, 0.469], //
//   [3, 4, 0.006], //
//   [4, 5, 0.088], //
//   [4, 6, 0.221], //
//   [6, 7, 0.036], //
//   [6, 8, 0.578], //
//   [8, 9, 3.174], //
//   [9, 10, 0.383], //
//   [9, 11, 0.491], //
//   [9, 12, 0.145], //
//   [9, 13, 0.48], //
//   [13, 14, 0.068], //
//   [13, 15, 0.059], //
//   [3, 15, 0.345], //
//   [4, 18, 0], //
//   [5, 6, 0.186], //
//   [7, 8, 0.957], //
//   [10, 12, 0.025], //
//   [11, 13, 0.07], //
//   [12, 13, 0.126], //
//   [12, 16, 0.112], //
//   [12, 17, 0.004], //
//   [14, 15, 0.292], //
//   [18, 19, 0.129], //
//   [19, 20, 0.013], //
//   [21, 20, 0], //
//   [21, 22, 0.001], //
//   [22, 23, 0.002], //
//   [23, 24, 0.01], //
//   [24, 25, 0], //
//   [24, 26, 0], //
//   [26, 27, 0.491], //
//   [27, 28, 0.432], //
//   [28, 29, 0.408], //
//   [7, 29, 0], //
//   [25, 30, 0.119], //
//   [30, 31, 0.092], //
//   [31, 32, 0.014], //
//   [32, 33, 0.008], //
//   [34, 32, 0], //
//   [34, 35, 0.03], //
//   [35, 36, 0.094], //
//   [36, 37, 0.105], //
//   [37, 38, 0.35], //
//   [37, 39, 0.004], //
//   [36, 40, 0.007], //
//   [22, 38, 0.005], //
//   [11, 41, 0], //
//   [41, 42, 0.221], //
//   [41, 43, 0], //
//   [38, 44, 0.064], //
//   [15, 45, 0], //
//   [14, 46, 0], //
//   [46, 47, 0.516], //
//   [47, 48, 0.056], //
//   [48, 49, 0.027], //
//   [49, 50, 0.063], //
//   [50, 51, 0.346], //
//   [10, 51, 0], //
//   [13, 49, 0], //
//   [29, 52, 0.696], //
//   [52, 53, 0.214], //
//   [53, 54, 0.029], //
//   [54, 55, 0.117], //
//   [11, 43, 0], //
//   [44, 45, 0.438], //
//   [40, 56, 0], //
//   [56, 41, 0.241], //
//   [56, 42, 0.019], //
//   [39, 57, 0], //
//   [57, 56, 0.026], //
//   [38, 49, 0.125], //
//   [38, 48, 0.17], //
//   [9, 58, 0], //
//   [55, 58, 0.4], //
// ];

// export const xd = (start: number) => {
//   const generators = [1, 2, 3, 6, 8, 9, 12, 16];
//   const consumer = start;

//   const graph = createGraph(arrows);
//   const result = findOptimalPathForConsumer(graph, generators, consumer);

//   console.log(result.generator);

//   return {
//     road: result.path, // [1, 2, 3 , 4]
//     loss: result.loss, // [ 1+2 , 2+3 , 3+4 ]
//     generator: result.generator, // Генератор от которого потребитель получил energy,
//   };
// };
