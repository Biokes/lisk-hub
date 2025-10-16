// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/GameToken.sol";

contract GameTokenTest is Test {
    GameToken token;
    address owner = address(0x1);
    address user1 = address(0x2);
    address user2 = address(0x3);

    function setUp() public {
        vm.prank(owner);
        token = new GameToken("Gaming Hub Token", "GHT", 1000000 * 10 ** 18);
    }

    function testInitialState() public {
        assertEq(token.name(), "Gaming Hub Token");
        assertEq(token.symbol(), "GHT");
        assertEq(token.decimals(), 18);
        assertEq(token.totalSupply(), 1000000 * 10 ** 18);
        assertEq(token.balanceOf(owner), 1000000 * 10 ** 18);
    }

    function testTransfer() public {
        vm.prank(owner);
        token.transfer(user1, 1000 * 10 ** 18);

        assertEq(token.balanceOf(user1), 1000 * 10 ** 18);
        assertEq(token.balanceOf(owner), 999000 * 10 ** 18);
    }

    function testMintOnlyOwner() public {
        vm.prank(owner);
        token.mint(user1, 500 * 10 ** 18);
        assertEq(token.balanceOf(user1), 500 * 10 ** 18);

        vm.prank(user1);
        vm.expectRevert();
        token.mint(user2, 100 * 10 ** 18);
    }
}
