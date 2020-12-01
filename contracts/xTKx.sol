pragma solidity ^0.6.2;

import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Pausable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/access/AccessControl.sol";


contract xTKx is Initializable, AccessControlUpgradeSafe, ERC20PausableUpgradeSafe {

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
  bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

  event mintLog(address to, uint256 amount);
  event burnLog(address by, uint256 amount);
  event pauseLog(address by);


  function initialize(
    string memory name,
    string memory symbol,
    uint _totalSupply
  )
    public
    initializer
  {
    __ERC20_init(name, symbol);
    __AccessControl_init();
    __ERC20Pausable_init();
    _setupRole(MINTER_ROLE, msg.sender);
    _setupRole(BURNER_ROLE, msg.sender);
    _setupRole(PAUSER_ROLE, msg.sender);
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    uint256 totalSupply = _totalSupply * (10 ** 18);
    _mint(_msgSender(), totalSupply);
  }


  function mint (
    address _owner,
    uint256 _amount
  )
    public
  {
    require(_owner == msg.sender);
    require(hasRole(MINTER_ROLE, _owner), "Must have minter role to mint token +_+;");
    _mint(_owner, _amount);
    emit mintLog(_owner, _amount);
  }


  function burn (
    address _owner,
    uint256 _amount
  )
    public
  {
    require(_owner == msg.sender);
    require(hasRole(BURNER_ROLE, msg.sender), "Must have buner role to burn tokens +_+;");
    _burn(_owner, _amount);
    emit burnLog(_owner, _amount);
  }


  // pausing token transfer
  function pauseTransfer()
    public
  {
    require(hasRole(PAUSER_ROLE, msg.sender), "Must have pauser role to pause token transfer +_+;");
    _pause();
  }



}
