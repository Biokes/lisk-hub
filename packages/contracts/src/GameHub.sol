// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Ownable } from "./utils/Ownable.sol";

contract GameHub is Ownable {
    event GameAdded(address indexed gameAddress, string gameName);
    event GameRemoved(address indexed gameAddress);

    struct Game {
        string name;
        bool active;
        uint256 index;
    }

    mapping(address => Game) public games;
    address[] public gameList;

    function addGame(address gameAddress, string calldata gameName) external onlyOwner {
        require(gameAddress != address(0), "zero address");
        require(!games[gameAddress].active, "game already exists");
        require(bytes(gameName).length > 0, "empty name");

        games[gameAddress] = Game({ name: gameName, active: true, index: gameList.length });

        gameList.push(gameAddress);
        emit GameAdded(gameAddress, gameName);
    }

    function removeGame(address gameAddress) external onlyOwner {
        require(games[gameAddress].active, "game not active");

        games[gameAddress].active = false;
        emit GameRemoved(gameAddress);
    }

    function getGames() external view returns (address[] memory activeGames) {
        uint256 count = 0;
        for (uint256 i = 0; i < gameList.length; i++) {
            if (games[gameList[i]].active) count++;
        }

        activeGames = new address[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < gameList.length; i++) {
            if (games[gameList[i]].active) {
                activeGames[index] = gameList[i];
                index++;
            }
        }
    }

    function getGameDetails(address gameAddress)
        external
        view
        returns (string memory name, bool active)
    {
        Game memory game = games[gameAddress];
        return (game.name, game.active);
    }

    function isGameActive(address gameAddress) external view returns (bool) {
        return games[gameAddress].active;
    }
}
