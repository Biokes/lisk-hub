// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { IERC20, SafeERC20 } from "../interfaces/IERC20.sol";
import { Ownable } from "./utils/Ownable.sol";

interface IGameHub {
    function isGameActive(address gameAddress) external view returns (bool);
}

interface IDAOTreasury {
    function depositFee(uint256 amount) external;
}

contract GameVault is Ownable {
    using SafeERC20 for IERC20;

    // Events from PRD Appendix B
    event PlayerDeposited(address indexed player, address indexed game, uint256 amount);
    event FeeCollected(uint256 amount, address indexed game);
    event WinnerSettled(address indexed player, address indexed game, uint256 amount);

    // Constants
    uint256 public constant FEE_PERCENTAGE = 2; // 2%
    uint256 public constant PERCENTAGE_BASE = 100;

    // Immutable references
    IERC20 public immutable TOKEN;
    IGameHub public immutable GAME_HUB;
    IDAOTreasury public immutable TREASURY;

    // State
    mapping(address => mapping(address => uint256)) public playerBalances; // player => game => balance
    mapping(address => uint256) public totalGameBalance; // game => total locked

    // Reentrancy guard
    uint256 private _status;
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    modifier nonReentrant() {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }

    constructor(address _token, address _gameHub, address _treasury) {
        require(_token != address(0), "zero token address");
        require(_gameHub != address(0), "zero hub address");
        require(_treasury != address(0), "zero treasury address");

        TOKEN = IERC20(_token);
        GAME_HUB = IGameHub(_gameHub);
        TREASURY = IDAOTreasury(_treasury);
        _status = _NOT_ENTERED;
    }

    function deposit(address game, uint256 amount) external nonReentrant {
        require(GAME_HUB.isGameActive(game), "game not active");
        require(amount > 0, "zero amount");

        // Calculate 2% fee
        uint256 fee = (amount * FEE_PERCENTAGE) / PERCENTAGE_BASE;
        uint256 netAmount = amount - fee;

        // Transfer tokens from player
        TOKEN.safeTransferFrom(msg.sender, address(this), amount);

        // Send fee to treasury
        if (fee > 0) {
            TOKEN.safeTransfer(address(TREASURY), fee);
            TREASURY.depositFee(fee);
            emit FeeCollected(fee, game);
        }

        // Update balances
        playerBalances[msg.sender][game] += netAmount;
        totalGameBalance[game] += netAmount;

        emit PlayerDeposited(msg.sender, game, amount);
    }

    function getBalance(address player, address game) external view returns (uint256) {
        return playerBalances[player][game];
    }

    function settleGame(address game, address winner, uint256 amount)
        external
        onlyOwner
        nonReentrant
    {
        require(GAME_HUB.isGameActive(game), "game not active");
        require(winner != address(0), "zero winner address");
        require(amount <= totalGameBalance[game], "insufficient game balance");

        // Update game balance
        totalGameBalance[game] -= amount;

        // Transfer winnings to winner
        TOKEN.safeTransfer(winner, amount);

        emit WinnerSettled(winner, game, amount);
    }

    function emergencyWithdraw(address game) external nonReentrant {
        require(!GAME_HUB.isGameActive(game), "game still active");

        uint256 balance = playerBalances[msg.sender][game];
        require(balance > 0, "no balance");

        playerBalances[msg.sender][game] = 0;
        totalGameBalance[game] -= balance;

        TOKEN.safeTransfer(msg.sender, balance);
    }
}
