pragma solidity ^0.6.2;

import "./xTKx.sol";

contract xTKxV2 is xTKx {

  // unpausing token transfer
  function unpauseTransfer()
    public
  {
    require(hasRole(PAUSER_ROLE, msg.sender), "Must have pauser role to pause token mint +_+;");
    _unpause();
  }

}
