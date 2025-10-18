import { useWatchContractEvent } from "wagmi";
import { GAME_SETTLEMENT_ADDRESS, GAME_SETTLEMENT_ABI } from "@/constants/contracts";

interface WinnerEvent {
  matchId: string;
  gameId: string;
  winner: string;
  prize: bigint;
  timestamp: bigint;
}

interface UseWinnerEventsProps {
  onWinner: (event: WinnerEvent) => void;
}

export function useWinnerEvents({ onWinner }: UseWinnerEventsProps) {
  useWatchContractEvent({
    address: GAME_SETTLEMENT_ADDRESS as `0x${string}`,
    abi: GAME_SETTLEMENT_ABI,
    eventName: "GameSettled",
    onLogs: (logs: any[]) => {
      logs.forEach((log: any) => {
        const event = {
          matchId: log.args.matchId,
          gameId: log.args.game,
          winner: log.args.winner,
          prize: log.args.amount,
          timestamp: log.args.timestamp,
        } as WinnerEvent;
        
        onWinner(event);
      });
    },
  });
}