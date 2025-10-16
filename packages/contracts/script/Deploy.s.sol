// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Script, console2 } from "forge-std/Script.sol";
import { GameToken } from "../src/GameToken.sol";
import { DAOTreasury } from "../src/DAOTreasury.sol";
import { GameHub } from "../src/GameHub.sol";
import { GameVault } from "../src/GameVault.sol";
import { GameSettlement } from "../src/GameSettlement.sol";

contract DeployScript is Script {
    struct DeploymentAddresses {
        address gameToken;
        address daoTreasury;
        address gameHub;
        address gameVault;
        address gameSettlement;
    }

    function run() external returns (DeploymentAddresses memory) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console2.log("Deploying contracts with account:", deployer);
        console2.log("Account balance:", deployer.balance);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy GameToken (ERC20)
        GameToken gameToken = new GameToken(
            "Lisk Gaming Hub Token",
            "LGHT",
            100_000_000 * 10 ** 18 // 100M initial supply
        );
        console2.log("GameToken deployed at:", address(gameToken));

        // 2. Deploy DAOTreasury
        DAOTreasury daoTreasury = new DAOTreasury(address(gameToken));
        console2.log("DAOTreasury deployed at:", address(daoTreasury));

        // 3. Deploy GameHub
        GameHub gameHub = new GameHub();
        console2.log("GameHub deployed at:", address(gameHub));

        // 4. Deploy GameVault
        GameVault gameVault =
            new GameVault(address(gameToken), address(gameHub), address(daoTreasury));
        console2.log("GameVault deployed at:", address(gameVault));

        // 5. Deploy GameSettlement
        GameSettlement gameSettlement = new GameSettlement(address(gameVault));
        console2.log("GameSettlement deployed at:", address(gameSettlement));

        // 6. Setup initial configuration
        setupInitialConfiguration(gameHub, gameToken, deployer);

        vm.stopBroadcast();

        // Return deployment addresses
        DeploymentAddresses memory addresses = DeploymentAddresses({
            gameToken: address(gameToken),
            daoTreasury: address(daoTreasury),
            gameHub: address(gameHub),
            gameVault: address(gameVault),
            gameSettlement: address(gameSettlement)
        });

        // Log deployment summary
        logDeploymentSummary(addresses);

        return addresses;
    }

    function setupInitialConfiguration(GameHub gameHub, GameToken gameToken, address deployer)
        internal
    {
        console2.log("Setting up initial configuration...");

        // Add placeholder games (these would be actual game contract addresses in production)
        address pingPongGame = address(0x1001); // Placeholder
        address pokerGame = address(0x1002); // Placeholder

        // Add games to GameHub (this makes them available in GameVault automatically)
        gameHub.addGame(pingPongGame, "Ping Pong");
        gameHub.addGame(pokerGame, "Poker");
        console2.log("Added Ping Pong game at:", pingPongGame);
        console2.log("Added Poker game at:", pokerGame);
        console2.log("Games are now available in vault via GameHub");

        // Mint some tokens to deployer for testing
        gameToken.mint(deployer, 1_000_000 * 10 ** 18); // 1M tokens for testing
        console2.log("Minted 1M test tokens to deployer");
    }

    function logDeploymentSummary(DeploymentAddresses memory addresses) internal pure {
        console2.log("\n=== DEPLOYMENT SUMMARY ===");
        console2.log("GameToken:      ", addresses.gameToken);
        console2.log("DAOTreasury:    ", addresses.daoTreasury);
        console2.log("GameHub:        ", addresses.gameHub);
        console2.log("GameVault:      ", addresses.gameVault);
        console2.log("GameSettlement: ", addresses.gameSettlement);
        console2.log("==========================\n");
        console2.log("Note: Games are managed through GameHub.");
        console2.log("GameVault automatically allows games that are active in GameHub.");
    }
}
