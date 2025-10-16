// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Ownable } from "./utils/Ownable.sol";

interface IGameVault {
    function settleGame(address game, address winner, uint256 amount) external;
}

contract GameSettlement is Ownable {
    event GameSettled(
        bytes32 indexed matchId,
        address indexed game,
        address indexed winner,
        uint256 amount,
        uint256 timestamp
    );

    struct Settlement {
        bytes32 matchId;
        address game;
        address winner;
        uint256 amount;
        uint256 timestamp;
    }

    IGameVault public immutable VAULT;

    mapping(bytes32 => bool) public settledMatches;
    Settlement[] public settlementHistory;

    constructor(address _vault) {
        require(_vault != address(0), "zero vault address");
        VAULT = IGameVault(_vault);
    }

    function settleWinner(bytes32 matchId, address game, address winner, uint256 prizeAmount)
        external
        onlyOwner
    {
        require(matchId != bytes32(0), "zero match id");
        require(!settledMatches[matchId], "match already settled");
        require(game != address(0), "zero game address");
        require(winner != address(0), "zero winner address");
        require(prizeAmount > 0, "zero prize amount");

        // Mark as settled to prevent replay
        settledMatches[matchId] = true;

        // Call vault to transfer winnings
        VAULT.settleGame(game, winner, prizeAmount);

        // Record settlement
        Settlement memory settlement = Settlement({
            matchId: matchId,
            game: game,
            winner: winner,
            amount: prizeAmount,
            timestamp: block.timestamp
        });

        settlementHistory.push(settlement);

        emit GameSettled(matchId, game, winner, prizeAmount, block.timestamp);
    }

    function getSettlementHistory(uint256 offset, uint256 limit)
        external
        view
        returns (Settlement[] memory)
    {
        require(offset < settlementHistory.length, "offset out of bounds");

        uint256 end = offset + limit;
        if (end > settlementHistory.length) {
            end = settlementHistory.length;
        }

        Settlement[] memory result = new Settlement[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            result[i - offset] = settlementHistory[i];
        }

        return result;
    }

    function getSettlementCount() external view returns (uint256) {
        return settlementHistory.length;
    }
}
