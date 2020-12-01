require('dotenv').config()
const xTKx = artifacts.require('xTKx');

module.exports = async function (deployer) {
  await deployer.deploy(xTKx);
};
