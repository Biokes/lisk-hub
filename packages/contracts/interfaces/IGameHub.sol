// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IGameHub {
    function addGame(address gameAddress, string calldata gameName) external;
    function removeGame(address gameAddress) external;
    function getGames() external view returns (address[] memory);
    function getGameDetails(address gameAddress) external view returns (string memory name, bool active);
    function isGameActive(address gameAddress) external view returns (bool);
}