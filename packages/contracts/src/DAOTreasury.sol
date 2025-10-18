// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { IERC20, SafeERC20 } from "../interfaces/IERC20.sol";
import { Ownable } from "./utils/Ownable.sol";

contract DAOTreasury is Ownable {
    using SafeERC20 for IERC20;

    event FeeDeposited(uint256 amount, address indexed game);
    event FundsWithdrawn(address indexed recipient, uint256 amount);

    IERC20 public immutable TOKEN;
    uint256 public treasuryBalance;
    address[] public feeHistory;

    constructor(address _token) {
        require(_token != address(0), "zero address");
        TOKEN = IERC20(_token);
    }

    function depositFee(uint256 amount) external {
        require(amount > 0, "zero amount");
        treasuryBalance += amount;
        emit FeeDeposited(amount, msg.sender);
    }

    function getTreasuryBalance() external view returns (uint256) {
        return treasuryBalance;
    }

    function withdrawFunds(address recipient, uint256 amount) external onlyOwner {
        require(recipient != address(0), "zero address");
        require(amount <= treasuryBalance, "insufficient funds");

        treasuryBalance -= amount;
        TOKEN.safeTransfer(recipient, amount);

        emit FundsWithdrawn(recipient, amount);
    }
}
