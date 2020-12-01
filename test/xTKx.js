const BigNumber = require('bignumber.js');
const Web3EthAbi = require('web3-eth-abi');
const truffleAssert = require('truffle-assertions');
const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const xTKx = artifacts.require("xTKx");
const xTKxV2 = artifacts.require("xTKxV2");

contract('xTKx', function(accounts) {

  let xTKxInst;
  let xTKxV2Inst;

  before("Setup each smart contracts & upgrade old to v2", async () => {
    xTKxInst = await deployProxy(xTKx, ["xTKx Token", "XTKX", 100], { unsafeAllowCustomTypes:true });
    xTKxV2Inst = await upgradeProxy(xTKxInst.address, xTKxV2, { unsafeAllowCustomTypes:true });

    let bal = await xTKxV2Inst.balanceOf(accounts[0]);
    console.log("accounts[0]'s balance is", bal.toString());
    assert.equal(100000000000000000000, bal.toString());
  });


  it("Mint xTKx token", async () => {
    await xTKxV2Inst.mint(
      accounts[0],
      web3.utils.toHex(new BigNumber(100*10**18)),
      { from: accounts[0] }
    );
    let bal = await xTKxV2Inst.balanceOf(accounts[0]);
    console.log("accounts[0]'s balance is", bal.toString());
    assert.equal(200*10**18, bal);
  });


  it("Burn xTKx token", async () => {
    await xTKxV2Inst.burn(
      accounts[0],
      web3.utils.toHex(new BigNumber(50*10**18)),
      { from: accounts[0] }
    );
    let bal = await xTKxV2Inst.balanceOf(accounts[0]);
    console.log("accounts[0]'s balance is", bal.toString());
    assert.equal(150*10**18, bal.toString());
  });


  it("Transfer token & pause transfer", async () => {
    await xTKxV2Inst.transfer(
      accounts[1],
      web3.utils.toHex(new BigNumber(10*10**18)),
      { from: accounts[0] }
    );
    let bal = await xTKxV2Inst.balanceOf(accounts[1]);
    console.log("accounts[1]'s balance is", bal.toString());
    assert.equal(10*10**18, bal.toString());

    await xTKxV2Inst.pauseTransfer(
      { from: accounts[0] }
    );

    // oh, yeah, no longer able to transfer the token.
    // await truffleAssert.reverts(
    //   await xTKxInst.transfer(
    //     accounts[1],
    //     web3.utils.toHex(new BigNumber(10*10**18)),
    //     { from: accounts[0] }
    //   ),
    //   "Transfer got revert."
    // );
  });


  it("Unpause token transfer", async () => {
    await xTKxV2Inst.unpauseTransfer(
      { from: accounts[0] }
    );

    await xTKxV2Inst.transfer(
      accounts[1],
      web3.utils.toHex(new BigNumber(10*10**18)),
      { from: accounts[0] }
    );
    let bal = await xTKxV2Inst.balanceOf(accounts[1]);
    console.log("accounts[1]'s balance is", bal.toString());
    assert.equal(20*10**18, bal.toString());
  });

});
