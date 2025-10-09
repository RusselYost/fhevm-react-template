# 🔐 Universal FHEVM SDK

> **Framework-agnostic SDK for building confidential applications with Fully Homomorphic Encryption**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![Built for Zama](https://img.shields.io/badge/Built%20for-Zama-purple.svg)](https://www.zama.ai/)

## 🎯 What is This?

A **universal SDK** that makes building encrypted applications as easy as using wagmi. Works with **React**, **Vue**, **Next.js**, **Node.js**, or any JavaScript environment.

**Setup in less than 10 lines:**

```typescript
import { useFhevm } from '@fhevm/sdk/react';

function App() {
  const { encrypt, decrypt } = useFhevm({
    network: { chainId: 11155111, name: 'Sepolia', rpcUrl: 'https://...' }
  }, { autoInit: true });

  const encryptData = async () => {
    const encrypted = await encrypt(42, 'uint16');
    console.log('Encrypted!', encrypted);
  };
}
```

## ✨ Why This SDK?

### Before (Complex Setup)
```typescript
// Multiple imports from different packages
import { createInstance, initGateway } from 'fhevmjs';
import { BrowserProvider } from 'ethers';
import { createPermit, generatePermit } from 'fhevmjs/permit';

// Manual initialization
const provider = new BrowserProvider(window.ethereum);
const instance = await createInstance({ chainId: 11155111, networkUrl: '...' });
const publicKey = instance.getPublicKey();
const signer = await provider.getSigner();
await initGateway({ gatewayUrl: '...', signer });

// Manual encryption with type handling
const encrypted = await instance.encrypt_uint16(42);
// ... more boilerplate
```

### After (Simple & Clean)
```typescript
import { useFhevm } from '@fhevm/sdk/react';

const { encrypt } = useFhevm(config, { autoInit: true });
const encrypted = await encrypt(42, 'uint16');
```

## 🚀 Key Features

- **🎨 Framework Agnostic**: Works with React, Vue, Next.js, Node.js, or vanilla JS
- **📦 All-in-One**: Single package wrapping all required dependencies
- **🎣 Wagmi-like Hooks**: Familiar API for web3 developers
- **⚡ Fast Setup**: <10 lines of code to start encrypting
- **🔒 Type-Safe**: Full TypeScript support with comprehensive types
- **🌐 Multiple Formats**: ESM, CJS, and TypeScript declarations
- **✅ Built-in Validation**: Type checking and address validation
- **🎯 Zero Config**: Sensible defaults, customize when needed

## 📦 Installation

```bash
npm install @fhevm/sdk fhevmjs ethers
```

Or with yarn:
```bash
yarn add @fhevm/sdk fhevmjs ethers
```

## 🎓 Usage Examples

### React (Next.js, Vite, CRA)

```typescript
import { useFhevm, useEncrypt } from '@fhevm/sdk/react';

function FlightBooking() {
  const { encrypt, isInitialized, error } = useFhevm({
    network: {
      chainId: 11155111,
      name: 'Sepolia',
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL
    }
  }, { autoInit: true });

  const handleEncryptAge = async (age: number) => {
    const encrypted = await encrypt(age, 'uint16');
    // Use encrypted.data in your contract call
  };

  if (!isInitialized) return <div>Loading FHEVM...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <button onClick={() => handleEncryptAge(25)}>Book Flight</button>;
}
```

### Vue (Vue 3, Nuxt)

```vue
<script setup>
import { useFhevm } from '@fhevm/sdk/vue';
import { onMounted } from 'vue';

const { encrypt, isInitialized, init } = useFhevm({
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: import.meta.env.VITE_RPC_URL
  }
});

onMounted(() => init());

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

### Node.js (Server-side)

```typescript
import { createFhevmClient } from '@fhevm/sdk';

const client = createFhevmClient({
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: process.env.RPC_URL
  }
});

await client.init();

// Encrypt server-side
const encrypted = await client.encrypt(1000, 'uint32');
console.log('Server encrypted:', encrypted);
```

### Vanilla JavaScript

```javascript
import { createFhevmClient } from '@fhevm/sdk';

const client = createFhevmClient({
  network: { chainId: 11155111, name: 'Sepolia', rpcUrl: 'https://...' }
});

await client.init(window.ethereum);
const encrypted = await client.encrypt(true, 'bool');
```

## 🏗️ Architecture

```
@fhevm/sdk
├── core/           # Framework-agnostic client
│   └── FhevmClient.ts
├── hooks/          # React hooks
│   └── useFhevm.ts
├── vue.ts          # Vue composables
├── types/          # TypeScript types
├── utils/          # Validation & formatting
└── index.ts        # Main exports
```

**Design Philosophy:**
- **Core First**: `FhevmClient` works everywhere (framework-agnostic)
- **Framework Adapters**: React hooks, Vue composables wrap the core
- **Tree-Shakable**: Import only what you need
- **Type-Safe**: Comprehensive TypeScript definitions

## 📚 API Reference

### Core API

#### `createFhevmClient(config)`

```typescript
const client = createFhevmClient({
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY'
  },
  gatewayUrl: 'https://gateway.zama.ai',  // optional
  aclAddress: '0x...'                      // optional
});
```

#### `client.encrypt(value, type)`

Encrypt any supported type:

```typescript
// Numbers
await client.encrypt(42, 'uint8');      // 0-255
await client.encrypt(1000, 'uint16');   // 0-65535
await client.encrypt(100000, 'uint32'); // 0-4294967295
await client.encrypt(1000n, 'uint64');  // 0-2^64-1

// Booleans
await client.encrypt(true, 'bool');

// Addresses
await client.encrypt('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', 'address');
```

### React Hooks

#### `useFhevm(config, options?)`

Main hook providing full encryption context:

```typescript
const {
  instance,       // FHEVM instance
  isInitialized,  // Init status
  isLoading,      // Loading state
  error,          // Error if any
  init,           // Manual init
  encrypt,        // Encrypt function
  decrypt,        // Decrypt function
  getSigner       // Get signer
} = useFhevm(config, { autoInit: true });
```

#### `useEncrypt(config?, options?)`

Encryption-only hook (lightweight):

```typescript
const {
  encrypt,    // Encrypt function
  isLoading,  // Loading state
  error,      // Error object
  isReady     // Ready to encrypt
} = useEncrypt(config);
```

#### `useDecrypt(config, request?)`

Decryption-only hook:

```typescript
const {
  decrypt,    // Decrypt function
  value,      // Decrypted value
  isLoading,  // Loading state
  error       // Error object
} = useDecrypt(config);
```

### Utilities

```typescript
import {
  formatEncryptedValue,     // Uint8Array → hex string
  parseEncryptedValue,      // hex string → Uint8Array
  validateEncryptType,      // Check valid type
  isValidAddress,           // Validate ETH address
  validateValueForType      // Check value matches type
} from '@fhevm/sdk';
```

## 🎯 Supported Encryption Types

| Type | Range | TypeScript Type | Example |
|------|-------|----------------|---------|
| `uint8` | 0 to 255 | `number` | `encrypt(42, 'uint8')` |
| `uint16` | 0 to 65,535 | `number` | `encrypt(1000, 'uint16')` |
| `uint32` | 0 to 4,294,967,295 | `number` | `encrypt(100000, 'uint32')` |
| `uint64` | 0 to 2^64-1 | `bigint` | `encrypt(1000n, 'uint64')` |
| `bool` | true/false | `boolean` | `encrypt(true, 'bool')` |
| `address` | Ethereum address | `string` | `encrypt('0x...', 'address')` |

## 📖 Examples

### Confidential Flight Booking

See `examples/nextjs-confidential-flight/` for a complete example demonstrating:

- **Encrypted passenger data** (age, passport, seat)
- **Private payments** (amounts hidden on-chain)
- **Confidential loyalty points** (calculated on encrypted data)
- **Insurance privacy** (ebool type usage)
- **VIP status** (encrypted boolean)

**Live Demo**: [See deployment section]

**Contract**: Privacy-preserving flight booking with multiple FHE types (euint16, euint32, euint64, ebool)

### Quick Setup Example

```typescript
// 1. Install
npm install @fhevm/sdk fhevmjs ethers

// 2. Import (React)
import { useFhevm } from '@fhevm/sdk/react';

// 3. Use
const { encrypt } = useFhevm(config, { autoInit: true });
const encrypted = await encrypt(42, 'uint16');

// 4. Done! ✅
```

## 🌟 Why Choose This SDK?

| Feature | This SDK | Manual Setup |
|---------|----------|--------------|
| **Setup Time** | <10 lines | 50+ lines |
| **Dependencies** | 1 package | 3+ packages |
| **TypeScript** | Full support | Manual types |
| **Framework Support** | React, Vue, Node.js, vanilla | React only (or manual) |
| **API Style** | Wagmi-like hooks | Custom |
| **Validation** | Built-in | Manual |
| **Error Handling** | Automatic | Manual |
| **Documentation** | Comprehensive | Scattered |

## 🔧 Configuration

### Network Configuration

```typescript
const config = {
  network: {
    chainId: 11155111,           // Sepolia
    name: 'Sepolia',
    rpcUrl: 'https://...'
  },
  gatewayUrl: 'https://...',     // For decryption
  aclAddress: '0x...',           // ACL contract
  contracts: {                    // Optional contracts
    gateway: '0x...',
    kmsVerifier: '0x...'
  }
};
```

### Auto-Initialization

```typescript
// React
useFhevm(config, { autoInit: true });

// Vue
useFhevm(config, { autoInit: true });

// Manual
const client = createFhevmClient(config);
await client.init(provider);
```

## 📦 Package Exports

```json
{
  ".": "@fhevm/sdk",           // Core + utilities
  "./react": "@fhevm/sdk/react", // React hooks
  "./vue": "@fhevm/sdk/vue"      // Vue composables
}
```

## 🚀 Deployment

### Sepolia Testnet

The example Confidential Flight Booking is deployed on Sepolia:

- **Network**: Sepolia (Chain ID: 11155111)
- **Contract**: [View on README in example]
- **Live Demo**: [Deployment link]

### Environment Variables

```env
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
```

## 🧪 Testing

```bash
cd packages/fhevm-sdk
npm install
npm test
```

## 🏆 Built for Zama

This SDK is built to work seamlessly with [Zama's FHEVM](https://github.com/zama-ai/fhevm), following official guidelines for encrypted computation on the blockchain.

**What is FHEVM?**
- Fully Homomorphic Encryption for the EVM
- Compute on encrypted data without decryption
- Privacy-preserving smart contracts
- Developed by [Zama](https://www.zama.ai/)

**Learn More:**
- [Zama Documentation](https://docs.zama.ai/)
- [FHEVM GitHub](https://github.com/zama-ai/fhevm)
- [fhevmjs Library](https://github.com/zama-ai/fhevmjs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🎥 Video Demo

See `demo.mp4` for a complete walkthrough of:
- SDK installation (<1 minute)
- Quick setup (<10 lines)
- Encryption in action
- Multiple framework examples
- Design philosophy

## 🔗 Links

- **GitHub**: [Repository URL]
- **NPM**: `@fhevm/sdk` (planned)
- **Documentation**: See README and example READMEs
- **Live Demo**: [Deployment URL]
- **Zama**: https://www.zama.ai/

---

**Built with ❤️ for the Zama FHEVM ecosystem**
