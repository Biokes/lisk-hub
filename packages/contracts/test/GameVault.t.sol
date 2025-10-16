// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/GameToken.sol";
import "../src/GameHub.sol";
import "../src/DAOTreasury.sol";
import "../src/GameVault.sol";

contract GameVaultTest is Test {
    GameToken token;
    GameHub hub;
    DAOTreasury treasury;
    GameVault vault;

    address owner = address(0x1);
    address player1 = address(0x2);
    address game1 = address(0x10);

    function setUp() public {
        vm.startPrank(owner);

        // Deploy contracts
        token = new GameToken("Gaming Token", "GT", 1000000 * 10 ** 18);
        hub = new GameHub();
        treasury = new DAOTreasury(address(token));
        vault = new GameVault(address(token), address(hub), address(treasury));

        // Setup game
        hub.addGame(game1, "Ping Pong");

        // Give player1 some tokens
        token.mint(player1, 10000 * 10 ** 18);

        vm.stopPrank();
    }

    function testDeposit() public {
        uint256 depositAmount = 1000 * 10 ** 18;
        uint256 expectedFee = (depositAmount * 2) / 100; // 2%
        uint256 expectedNet = depositAmount - expectedFee;

        vm.startPrank(player1);
        token.approve(address(vault), depositAmount);
        vault.deposit(game1, depositAmount);
        vm.stopPrank();

        assertEq(vault.getBalance(player1, game1), expectedNet);
        assertEq(vault.totalGameBalance(game1), expectedNet);
        assertEq(treasury.treasuryBalance(), expectedFee);
    }

    function testSettleGame() public {
        // First deposit
        uint256 depositAmount = 1000 * 10 ** 18;
        vm.startPrank(player1);
        token.approve(address(vault), depositAmount);
        vault.deposit(game1, depositAmount);
        vm.stopPrank();

        uint256 prizeAmount = 500 * 10 ** 18;
        uint256 initialBalance = token.balanceOf(player1);

        // Settle game
        vm.prank(owner);
        vault.settleGame(game1, player1, prizeAmount);

        assertEq(token.balanceOf(player1), initialBalance + prizeAmount);
        assertEq(vault.totalGameBalance(game1), (depositAmount * 98 / 100) - prizeAmount);
    }
}
