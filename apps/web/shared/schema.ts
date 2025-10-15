import { z } from "zod";

export const gameSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  minStake: z.number(),
  maxStake: z.number(),
  playerCount: z.number(),
  category: z.string(),
  imageUrl: z.string(),
});

export const walletSchema = z.object({
  address: z.string(),
  balance: z.number(),
  connected: z.boolean(),
});

export const stakeSchema = z.object({
  gameId: z.string(),
  amount: z.number(),
  walletAddress: z.string(),
});

export const gameResultSchema = z.object({
  gameId: z.string(),
  winner: z.string(),
  prize: z.number(),
  platformFee: z.number(),
  timestamp: z.string(),
});

export type Game = z.infer<typeof gameSchema>;
export type Wallet = z.infer<typeof walletSchema>;
export type Stake = z.infer<typeof stakeSchema>;
export type GameResult = z.infer<typeof gameResultSchema>;
