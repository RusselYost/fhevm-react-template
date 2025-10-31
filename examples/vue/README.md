# Vue FHEVM SDK Example

A simple Vue 3 application demonstrating the Universal FHEVM SDK for building confidential applications with Fully Homomorphic Encryption.

## Features

- **Vue 3 Composition API**: Modern Vue integration
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
├── App.vue                      # Main application
├── main.ts                      # Entry point
├── style.css                    # Global styles
├── vite-env.d.ts               # TypeScript definitions
└── components/
    ├── EncryptionDemo.vue      # Encryption component
    └── DecryptionDemo.vue      # Decryption component
```

## Usage

### Initialize FHEVM

```vue
<script setup lang="ts">
import { useFhevm } from '@fhevm/sdk/vue';

const config = {
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY'
  }
};

const { init, isInitialized } = useFhevm(config);

const handleInit = async () => {
  await init(window.ethereum);
};
</script>
```

### Encrypt Data

```vue
<script setup lang="ts">
const { encrypt } = useFhevm(config);

const encryptValue = async () => {
  const result = await encrypt(42, 'uint16');
  console.log('Encrypted:', result.data);
};
</script>
```

### Decrypt Data

```vue
<script setup lang="ts">
const { decrypt } = useFhevm(config);

const decryptValue = async () => {
  const result = await decrypt(contractAddress, encryptedValue);
  console.log('Decrypted:', result);
};
</script>
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
- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Zama FHEVM](https://docs.zama.ai/)

## License

MIT
