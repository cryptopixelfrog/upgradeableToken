require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8546,            // Standard Ganache port (default: none)
     network_id: "*",       // Any network (default: none)
     skipDryRun: true 
    }
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.2"
    },
  },
};
