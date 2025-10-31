import dotenv from 'dotenv';
import type { FhevmConfig } from '@fhevm/sdk';

// Load environment variables
dotenv.config();

export const config: FhevmConfig = {
  network: {
    chainId: parseInt(process.env.CHAIN_ID || '11155111', 10),
    name: 'Sepolia',
    rpcUrl: process.env.RPC_URL || 'https://sepolia.infura.io/v3/YOUR_KEY'
  },
  gatewayUrl: process.env.GATEWAY_URL || 'https://gateway.zama.ai'
};

export const privateKey = process.env.PRIVATE_KEY || '';
export const contractAddress = process.env.CONTRACT_ADDRESS || '';
