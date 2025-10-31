# React FHEVM SDK Example

A simple React application demonstrating the Universal FHEVM SDK for building confidential applications with Fully Homomorphic Encryption.

## Features

- **Simple Integration**: Easy React hooks integration
- **Encryption Demo**: Interactive encryption of different data types
- **Decryption Demo**: Decrypt encrypted values from contracts
- **Type Safety**: Full TypeScript support
- **Responsive UI**: Clean and modern interface

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env.local` file based on `.env.example`:

```env
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
VITE_CHAIN_ID=11155111
VITE_GATEWAY_URL=https://gateway.zama.ai
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.tsx                      # Main application
├── App.css                      # Application styles
├── main.tsx                     # Entry point
├── index.css                    # Global styles
├── vite-env.d.ts               # TypeScript definitions
└── components/
    ├── EncryptionDemo.tsx      # Encryption component
    └── DecryptionDemo.tsx      # Decryption component
```

## Usage

### Initialize FHEVM

```typescript
import { useFhevm } from '@fhevm/sdk/react';

const config = {
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY'
  }
};

function App() {
  const { init, isInitialized } = useFhevm(config);

  const handleInit = async () => {
    await init(window.ethereum);
  };
}
```

### Encrypt Data

```typescript
const { encrypt } = useFhevm(config);

const encryptValue = async () => {
  const result = await encrypt(42, 'uint16');
  console.log('Encrypted:', result.data);
};
```

### Decrypt Data

```typescript
const { decrypt } = useFhevm(config);

const decryptValue = async () => {
  const result = await decrypt(contractAddress, encryptedValue);
  console.log('Decrypted:', result);
};
```

## Supported Types

- `uint8` (0 to 255)
- `uint16` (0 to 65,535)
- `uint32` (0 to 4,294,967,295)
- `uint64` (0 to 2^64-1)
- `bool` (true/false)
- `address` (Ethereum address)

## Learn More

- [Universal FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Zama FHEVM](https://docs.zama.ai/)

## License

MIT
