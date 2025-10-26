# Lisk Gaming Hub

> A decentralized gaming platform built on Lisk L2, combining off-chain gameplay with on-chain asset custody and settlement.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built on Lisk](https://img.shields.io/badge/Built%20on-Lisk%20L2-purple.svg)](https://lisk.com)

## Overview

Lisk Gaming Hub is a hybrid gaming platform that leverages the best of both worlds: fast, responsive off-chain gameplay combined with secure, transparent on-chain asset management and settlement. The platform enables users to deposit tokens, play various games, and settle results on-chain with complete transparency.

### Key Features

- **Secure Asset Management**: ERC20 token deposits with automated 2% DAO fee allocation
- **Multi-Game Support**: Extensible architecture supporting multiple game types
- **Hybrid Architecture**: Off-chain gameplay for speed, on-chain settlement for security
- **Per-Game Balances**: Isolated balance tracking for each game
- **Admin Dashboard**: Comprehensive tools for game management and treasury oversight
- **Test-Driven Development**: Built with TDD principles for reliability and maintainability

## Architecture

The project follows a monorepo structure with clearly separated concerns:

```
lisk_hub/
├── apps/
│   ├── web/          # React frontend application
│   └── api/          # Node.js backend services
├── packages/
│   ├── contracts/    # Solidity smart contracts
│   ├── sdk/          # TypeScript SDK
│   └── ui/           # Shared UI components
└── configs/          # Shared configuration files
```

### Packages

#### `apps/web`
React-based frontend application featuring:
- Game lobby and discovery
- Wallet integration (Wagmi v2 + Viem)
- Deposit/withdrawal interface
- Live gameplay UI
- Admin dashboard

**Tech Stack**: React 18, TypeScript, Vite, TailwindCSS, Radix UI, React Query

#### `apps/api`
Node.js backend providing:
- Game server orchestration
- Matchmaking system
- Settlement worker
- Database integration (PostgreSQL/MongoDB)

#### `packages/contracts`
Solidity smart contracts for on-chain logic:
- **GameHub**: Central registry for game discovery and management
- **GameVault**: Secure token custody with deposit/withdrawal logic
- **GameSettlement**: Handles game result verification and payout distribution
- **DAOTreasury**: Collects and manages platform fees
- **GameToken**: ERC20 token implementation

**Tech Stack**: Solidity 0.8.x, Foundry

#### `packages/sdk`
TypeScript SDK providing:
- Typed contract clients using Viem
- Network configuration
- Contract ABIs
- Helper utilities

#### `packages/ui`
Shared UI component library for consistent design across the platform.

## Getting Started

### Prerequisites

- **Node.js**: v20.x or higher
- **Package Manager**: pnpm (recommended) or npm
- **Solidity Toolchain**: Foundry or Hardhat
- **Database**: PostgreSQL or MongoDB (configure in `apps/api`)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lisk_hub
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Configure environment variables:
```bash
# Copy example environment files
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
cp packages/contracts/.env.example packages/contracts/.env
```

4. Update the `.env` files with your configuration:
   - RPC endpoints
   - Private keys (for deployment)
   - Database connection strings
   - API URLs

### Development

#### Run All Services

```bash
# Start development servers
npm run dev

# Run in specific workspace
npm run dev -w apps/web
npm run dev -w apps/api
```

#### Build

```bash
# Build all packages
npm run build

# Build specific workspace
npm run build -w packages/contracts
```

#### Testing

```bash
# Run all tests
npm test

# Run tests in specific workspace
npm test -w packages/contracts
npm test -w apps/web
```

#### Linting

```bash
# Lint all packages
npm run lint

# Lint specific workspace
npm run lint -w apps/web
```

### Smart Contract Deployment

```bash
# Navigate to contracts package
cd packages/contracts

# Compile contracts
forge build

# Run tests
forge test

# Deploy to Lisk L2 Testnet
forge script script/Deploy.s.sol --rpc-url <LISK_RPC_URL> --broadcast

# Verify contracts
forge verify-contract <CONTRACT_ADDRESS> <CONTRACT_NAME> --chain-id <CHAIN_ID>
```

## Test-Driven Development (TDD)

This project follows TDD principles:

1. **Write Specification**: Define features, scenarios, and test cases
2. **Implement Tests**: Write failing tests first
3. **Minimal Implementation**: Write just enough code to pass tests
4. **Refactor**: Improve code while keeping tests green
5. **Track Coverage**: Monitor test coverage and add property/invariant tests

## Core Features Checklist

- [x] Wallet connection with Lisk L2 network support
- [x] Game discovery via GameHub contract
- [x] ERC20 token approval and deposits
- [x] Automated 2% fee collection to DAO Treasury
- [x] Per-game balance tracking
- [x] Withdrawal functionality (with game-specific rules)
- [x] Off-chain Ping-Pong game implementation
- [x] On-chain settlement via GameSettlement contract
- [x] Admin dashboard for game management
- [x] Settlement monitoring and triggering
- [x] Treasury viewing and management

## Smart Contract Addresses

| Contract | Network |
|---------|---------|
| GameHub | Lisk  |
| GameVault | Lisk |
| GameSettlement |Lisk   |
| DAOTreasury | Lisk  |
| GameToken | Lisk |

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Implement your feature
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Commit Conventions

This project follows conventional commits. See `configs/` for detailed guidelines.

## CI/CD

Continuous Integration is configured via GitHub Actions:
- Automated linting on all PRs
- Test execution across all packages
- Build verification
- Contract compilation checks

See [.github/workflows/main.yaml](.github/workflows/main.yaml) for details.

## Project Structure

```
lisk_hub/
├── apps/
│   ├── api/                    # Backend services
│   │   ├── src/
│   │   │   ├── game-servers/   # Game logic
│   │   │   ├── matchmaking/    # Player matching
│   │   │   └── settlement/     # Settlement worker
│   │   └── package.json
│   └── web/                    # Frontend application
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── pages/          # Page components
│       │   ├── hooks/          # Custom hooks
│       │   └── lib/            # Utilities
│       └── package.json
├── packages/
│   ├── contracts/              # Smart contracts
│   │   ├── src/                # Contract sources
│   │   ├── test/               # Contract tests
│   │   ├── script/             # Deployment scripts
│   │   └── interfaces/         # Contract interfaces
│   ├── sdk/                    # TypeScript SDK
│   │   └── src/
│   │       ├── abis/           # Contract ABIs
│   │       ├── clients/        # Typed contract clients
│   │       └── config/         # Network configs
│   └── ui/                     # Shared UI components
└── configs/                    # Shared configs
```

## Troubleshooting

### Common Issues

**Issue**: Build fails with TypeScript errors
```bash
# Solution: Clear cache and rebuild
rm -rf node_modules
npm install
npm run build
```

**Issue**: Smart contract deployment fails
```bash
# Solution: Verify your environment variables
# Check RPC URL, private key, and network configuration
```

**Issue**: Frontend can't connect to contracts
```bash
# Solution: Ensure contracts are deployed and addresses are updated in SDK config
# Check network ID matches between wallet and application
```

## Security

- Smart contracts are tested with Foundry test suite
- Critical functions are access-controlled
- 2% platform fee is automatically enforced
- All settlements require cryptographic verification

**Note**: This project is in active development. Do not use in production without a comprehensive security audit.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built on [Lisk L2](https://lisk.com)
- Uses [Foundry](https://getfoundry.sh/) for smart contract development
- UI components from [Radix UI](https://www.radix-ui.com/)
- Blockchain integration via [Wagmi](https://wagmi.sh/) and [Viem](https://viem.sh/)

## Support

For questions and support:
- Open an issue on GitHub
- Join our community (Discord/Telegram links TBD)
- Check the documentation (link TBD)

---