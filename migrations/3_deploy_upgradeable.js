require('dotenv').config()
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const xTKx = artifacts.require('xTKx');

module.exports = async function (deployer) {
  const _xTKx = await deployProxy(xTKx, ["xTKx Token", "XTKX", 100], { deployer, unsafeAllowCustomTypes:true });
  console.log("Deployed xTKx => ", _xTKx.address);
};
