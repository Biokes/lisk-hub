#!/bin/bash

echo "Extracting ABIs for SDK (without jq)..."

# Create SDK abi directory
mkdir -p ../sdk/src/abis

# Extract ABIs using Python (available on macOS by default)
python3 -c "
import json
import sys
import os

contracts = ['GameToken', 'GameVault', 'GameHub', 'DAOTreasury', 'GameSettlement']

for contract in contracts:
    try:
        with open(f'out/{contract}.sol/{contract}.json', 'r') as f:
            data = json.load(f)
            abi = data.get('abi', [])
        
        with open(f'../sdk/src/abis/{contract}.json', 'w') as f:
            json.dump(abi, f, indent=2)
        
        print(f'Extracted {contract} ABI')
    except Exception as e:
        print(f'Failed to extract {contract} ABI: {e}')
"

echo "ABIs extracted to ../sdk/src/abis/"