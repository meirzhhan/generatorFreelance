module.exports = {
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: '*',
      gas: 6721975, // Увеличьте лимит газа, если необходимо
      gasPrice: 20000000000, // Установите цену газа, если необходимо // Any network (default: none)
    },
  },

  mocha: {},

  compilers: {
    solc: {
      version: '0.8.0',
    },
  },
};
