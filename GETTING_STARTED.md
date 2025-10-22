# Getting Started with Universal FHEVM SDK

Complete guide to getting started with the Universal FHEVM SDK for building privacy-preserving applications.

## Quick Links

- **Bounty GitHub**: https://github.com/RusselYost/fhevm-react-template
- **Example Application**: https://fhe-flight-booking.vercel.app/
- **Demo Video**: Download `demo.mp4` from the repository

## What You'll Build

This SDK enables you to build confidential applications like the **FHE Flight Booking** example - a privacy-preserving aviation ticketing platform where passenger data remains encrypted on-chain.

## Prerequisites

- Node.js >= 18.x
- npm or yarn
- Basic knowledge of React or Vue
- MetaMask or Web3 wallet (for testing)

## Installation

### Option 1: Using the SDK in Your Project

```bash
npm install @fhevm/sdk fhevmjs ethers
```

### Option 2: Clone the Bounty Repository

```bash
git clone https://github.com/RusselYost/fhevm-react-template.git
cd fhevm-react-template
npm install
```

## Quick Start

### React Example

```typescript
import { useFhevm } from '@fhevm/sdk/react';

function MyApp() {
  const { encrypt, isInitialized } = useFhevm({
    network: {
      chainId: 11155111,
      name: 'Sepolia',
      rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY'
    }
  }, { autoInit: true });

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, 'uint16');
    console.log('Encrypted:', encrypted);
  };

  return (
    <button onClick={handleEncrypt} disabled={!isInitialized}>
      Encrypt Data
    </button>
  );
}
```

### Vue Example

```vue
<script setup>
import { useFhevm } from '@fhevm/sdk/vue';

const { encrypt, isInitialized } = useFhevm({
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY'
  }
});

const handleEncrypt = async () => {
  const encrypted = await encrypt(42, 'uint16');
  console.log('Encrypted:', encrypted);
};
</script>

<template>
  <button @click="handleEncrypt" :disabled="!isInitialized">
    Encrypt Data
  </button>
</template>
```

### Node.js Example

```typescript
import { createFhevmClient } from '@fhevm/sdk';

const client = createFhevmClient({
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY'
  }
});

await client.init();
const encrypted = await client.encrypt(100, 'uint32');
console.log('Encrypted:', encrypted);
```

## Running the Example Application

The bounty includes a complete working example: **Confidential Flight Booking**

### Live Demo

Visit: https://fhe-flight-booking.vercel.app/

### Run Locally

```bash
# Clone repository
git clone https://github.com/RusselYost/fhevm-react-template.git
cd fhevm-react-template/examples/nextjs-confidential-flight

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your settings

# Run development server
npm run dev
```

## Example Features

The Flight Booking example demonstrates:

- **Multiple Encryption Types**: uint16, uint32, uint64, bool
- **Wagmi Integration**: Seamless Web3 wallet connection
- **Type Safety**: Full TypeScript support
- **Error Handling**: Built-in error states
- **Loading States**: User feedback during encryption

## Next Steps

1. **Explore the Example**: Check out the live demo at https://fhe-flight-booking.vercel.app/
2. **Watch the Video**: Download `demo.mp4` for a complete walkthrough
3. **Read the API Docs**: See `API.md` for complete reference
4. **Build Your App**: Use the SDK in your own project

## Support

- **GitHub Issues**: https://github.com/RusselYost/fhevm-react-template/issues
- **Documentation**: See `README.md` and other docs in this folder
- **Example Code**: Check `examples/nextjs-confidential-flight/`

## Learn More

- [API Reference](./API.md)
- [Architecture Guide](./ARCHITECTURE.md)
- [Main README](../README.md)
