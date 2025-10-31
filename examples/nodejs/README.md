# Node.js FHEVM SDK Example

Server-side Node.js examples demonstrating the Universal FHEVM SDK for building confidential applications with Fully Homomorphic Encryption.

## Features

- **Server-side Encryption**: Encrypt data on the server
- **Contract Integration**: Interact with FHEVM-compatible contracts
- **Multiple Examples**: Encryption, decryption, and contract interaction
- **Type Safety**: Full TypeScript support
- **Easy Setup**: Simple configuration with environment variables

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file based on `.env.example`:

```env
RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
CHAIN_ID=11155111
GATEWAY_URL=https://gateway.zama.ai
PRIVATE_KEY=your_private_key_here
CONTRACT_ADDRESS=0x...
```

### Running Examples

#### Main Example
```bash
npm run dev
```

#### Encryption Example
```bash
npm run example:encrypt
```

#### Decryption Example
```bash
npm run example:decrypt
```

#### Contract Interaction Example
```bash
npm run example:contract
```

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── index.ts                    # Main entry point
├── config.ts                   # Configuration loading
└── examples/
    ├── encrypt.ts              # Encryption examples
    ├── decrypt.ts              # Decryption examples
    └── contractInteraction.ts  # Contract interaction
```

## Usage

### Basic Client Setup

```typescript
import { createFhevmClient } from '@fhevm/sdk';

const config = {
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: process.env.RPC_URL
  }
};

const client = createFhevmClient(config);
await client.init();
```

### Encrypt Values

```typescript
// Encrypt different types
const encrypted1 = await client.encrypt(42, 'uint16');
const encrypted2 = await client.encrypt(true, 'bool');
const encrypted3 = await client.encrypt(1000n, 'uint64');

console.log('Encrypted:', encrypted1.data);
```

### Decrypt Values

```typescript
import { JsonRpcProvider } from 'ethers';

const provider = new JsonRpcProvider(config.network.rpcUrl);
await client.init(provider);

const decrypted = await client.decrypt(
  contractAddress,
  encryptedValue
);

console.log('Decrypted:', decrypted);
```

### Contract Interaction

```typescript
import { Contract, Wallet } from 'ethers';

const wallet = new Wallet(privateKey, provider);
const contract = new Contract(address, abi, wallet);

// Encrypt value
const encrypted = await client.encrypt(42, 'uint16');

// Send to contract
const tx = await contract.setValue(encrypted.data);
await tx.wait();

console.log('Transaction:', tx.hash);
```

## Supported Types

- `uint8` (0 to 255)
- `uint16` (0 to 65,535)
- `uint32` (0 to 4,294,967,295)
- `uint64` (0 to 2^64-1)
- `bool` (true/false)
- `address` (Ethereum address)

## Examples Overview

### 1. Encryption Example
Demonstrates encrypting various data types:
- Numbers (uint8, uint16, uint32, uint64)
- Booleans
- Ethereum addresses

### 2. Decryption Example
Shows how to decrypt encrypted values from contracts:
- Setting up provider and wallet
- Initializing the FHEVM client
- Decrypting contract values

### 3. Contract Interaction Example
Complete workflow for interacting with FHEVM contracts:
- Encrypting values client-side
- Sending encrypted values to contracts
- Reading encrypted values from contracts
- Decrypting values

## Learn More

- [Universal FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Node.js Documentation](https://nodejs.org/)
- [ethers.js Documentation](https://docs.ethers.org/)
- [Zama FHEVM](https://docs.zama.ai/)

## License

MIT
