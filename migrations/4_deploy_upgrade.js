require('dotenv').config()
const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const xTKx = artifacts.require('xTKx');
const xTKxV2 = artifacts.require('xTKxV2');

module.exports = async function (deployer) {

  const _xTKx = await xTKx.deployed();
  console.log("Deployed xTKx => ", _xTKx.address);

  const v2Inst = await upgradeProxy(_xTKx.address, xTKxV2, { deployer, unsafeAllowCustomTypes:true });
  console.log("upgraded v2 address:", v2Inst.address);
};
