# @fhevm/sdk - Universal FHEVM SDK

> Framework-agnostic SDK for building confidential frontend applications with Fully Homomorphic Encryption

## Features

- **Framework Agnostic**: Works with React, Vue, Node.js, Next.js, or any frontend setup
- **Wagmi-like API**: Intuitive hook-based structure familiar to web3 developers
- **Fast Setup**: Get started with less than 10 lines of code
- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Unified Dependencies**: Single wrapper for all required FHEVM packages
- **Multiple Export Formats**: CJS, ESM, and TypeScript declarations

## Installation

```bash
npm install @fhevm/sdk fhevmjs ethers
```

## Quick Start

### Core Usage (Framework Agnostic)

```typescript
import { createFhevmClient } from '@fhevm/sdk';

const client = createFhevmClient({
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY'
  }
});

await client.init(provider);
const encrypted = await client.encrypt(42, 'uint16');
```

### React Usage

```typescript
import { useFhevm } from '@fhevm/sdk/react';
import { useEffect } from 'react';

function MyComponent() {
  const { encrypt, decrypt, isInitialized, init } = useFhevm({
    network: {
      chainId: 11155111,
      name: 'Sepolia',
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL
    }
  }, { autoInit: true });

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, 'uint16');
    console.log('Encrypted:', encrypted);
  };

  if (!isInitialized) return <div>Initializing...</div>;
  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

### Vue Usage

```typescript
import { useFhevm } from '@fhevm/sdk/vue';
import { onMounted } from 'vue';

export default {
  setup() {
    const { encrypt, isInitialized, init } = useFhevm({
      network: {
        chainId: 11155111,
        name: 'Sepolia',
        rpcUrl: import.meta.env.VITE_RPC_URL
      }
    });

    onMounted(async () => {
      await init();
    });

    const handleEncrypt = async () => {
      const encrypted = await encrypt(42, 'uint16');
    };

    return { encrypt, isInitialized, handleEncrypt };
  }
}
```

## API Reference

### Core API

#### `createFhevmClient(config)`

Creates a new FHEVM client instance.

**Parameters:**
- `config.network.chainId` - Network chain ID
- `config.network.name` - Network name
- `config.network.rpcUrl` - RPC endpoint URL
- `config.gatewayUrl` (optional) - Gateway URL for decryption
- `config.aclAddress` (optional) - ACL contract address

**Returns:** `FhevmClient` instance

#### `FhevmClient.init(provider?)`

Initializes the FHEVM instance.

**Parameters:**
- `provider` (optional) - Eip1193Provider or BrowserProvider

#### `FhevmClient.encrypt(value, type)`

Encrypts a value.

**Parameters:**
- `value` - Value to encrypt (number, bigint, boolean, or string)
- `type` - Encryption type ('uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address')

**Returns:** `Promise<EncryptedValue>`

#### `FhevmClient.decrypt(request)`

Decrypts a value.

**Parameters:**
- `request.contractAddress` - Contract address
- `request.userAddress` - User address
- `request.ciphertext` - Ciphertext to decrypt

**Returns:** `Promise<bigint>`

### React Hooks

#### `useFhevm(config, options?)`

Main FHEVM hook providing complete encryption/decryption context.

**Returns:**
- `instance` - FHEVM instance
- `isInitialized` - Initialization status
- `isLoading` - Loading state
- `error` - Error object if any
- `init()` - Initialize function
- `encrypt(value, type)` - Encrypt function
- `decrypt(request)` - Decrypt function
- `getSigner()` - Get signer function

#### `useEncrypt(config?, options?)`

Encryption-only hook (similar to wagmi's `useContractWrite`).

**Returns:**
- `encrypt(value, type)` - Encrypt function
- `isLoading` - Loading state
- `error` - Error object
- `isReady` - Ready state

#### `useDecrypt(config, request?)`

Decryption-only hook (similar to wagmi's `useContractRead`).

**Returns:**
- `decrypt(request)` - Decrypt function
- `value` - Decrypted value
- `isLoading` - Loading state
- `error` - Error object

### Vue Composables

Same API as React hooks, but using Vue's Composition API with `ref` and `computed`.

## Supported Encryption Types

| Type | Range | Example |
|------|-------|---------|
| `uint8` | 0 to 255 | `encrypt(42, 'uint8')` |
| `uint16` | 0 to 65535 | `encrypt(1000, 'uint16')` |
| `uint32` | 0 to 4294967295 | `encrypt(100000, 'uint32')` |
| `uint64` | 0 to 2^64-1 | `encrypt(100000n, 'uint64')` |
| `bool` | true/false | `encrypt(true, 'bool')` |
| `address` | Ethereum address | `encrypt('0x...', 'address')` |

## Utilities

### Format Utilities

```typescript
import { formatEncryptedValue, parseEncryptedValue } from '@fhevm/sdk';

// Convert encrypted value to hex string
const hex = formatEncryptedValue(encrypted);

// Parse hex string back to encrypted value
const encrypted = parseEncryptedValue(hex, 'uint16', publicKey);
```

### Validation Utilities

```typescript
import { validateEncryptType, isValidAddress } from '@fhevm/sdk';

// Validate encryption type
if (validateEncryptType('uint16')) {
  // Valid type
}

// Validate Ethereum address
if (isValidAddress('0x1234...')) {
  // Valid address
}
```

## Examples

See the `examples/` directory for complete examples:
- `examples/nextjs/` - Next.js 14 with App Router
- `examples/react/` - React with Vite
- `examples/vue/` - Vue 3 with Composition API
- `examples/nodejs/` - Node.js server-side encryption

## License

MIT

## Built for Zama

This SDK is built to work with [Zama's FHEVM](https://github.com/zama-ai/fhevm) and follows official guidelines for encrypted computation on the blockchain.
