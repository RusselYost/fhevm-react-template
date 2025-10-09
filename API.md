# API Documentation

Complete API reference for the Universal FHEVM SDK.

## Table of Contents

- [Core API](#core-api)
- [React API](#react-api)
- [Vue API](#vue-api)
- [Types](#types)
- [Utilities](#utilities)
- [Error Handling](#error-handling)

---

## Core API

Framework-agnostic core that works in any JavaScript environment.

### `createFhevmClient(config: FhevmConfig): FhevmClient`

Creates a new FHEVM client instance.

**Parameters:**

```typescript
interface FhevmConfig {
  network: {
    chainId: number;      // Network chain ID (e.g., 11155111 for Sepolia)
    name: string;         // Network name
    rpcUrl: string;       // RPC endpoint URL
  };
  gatewayUrl?: string;    // Gateway URL for decryption (optional)
  aclAddress?: string;    // ACL contract address (optional)
  contracts?: {           // Additional contract addresses (optional)
    gateway?: string;
    kmsVerifier?: string;
    [key: string]: string | undefined;
  };
}
```

**Returns:** `FhevmClient` instance

**Example:**

```typescript
import { createFhevmClient } from '@fhevm/sdk';

const client = createFhevmClient({
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY'
  },
  gatewayUrl: 'https://gateway.zama.ai',
  aclAddress: '0x...'
});
```

---

### `FhevmClient` Class

#### `init(provider?: Eip1193Provider | BrowserProvider): Promise<void>`

Initializes the FHEVM instance.

**Parameters:**
- `provider` (optional) - Ethereum provider (window.ethereum, BrowserProvider, etc.)

**Throws:**
- `FhevmError` with code `'INIT_FAILED'` if initialization fails

**Example:**

```typescript
// Browser with MetaMask
await client.init(window.ethereum);

// With ethers BrowserProvider
import { BrowserProvider } from 'ethers';
const provider = new BrowserProvider(window.ethereum);
await client.init(provider);

// Without provider (encryption only)
await client.init();
```

#### `encrypt<T>(value: T, type: EncryptType): Promise<EncryptedValue>`

Encrypts a value using FHE.

**Parameters:**
- `value` - Value to encrypt (number, bigint, boolean, or string)
- `type` - Encryption type: `'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address'`

**Returns:** `Promise<EncryptedValue>`

**Throws:**
- `FhevmError` with code `'ENCRYPTION_FAILED'` if encryption fails
- `Error` if client not initialized

**Example:**

```typescript
// Encrypt a uint16
const encrypted = await client.encrypt(1000, 'uint16');
console.log(encrypted.data); // Uint8Array
console.log(encrypted.type); // 'uint16'

// Encrypt a boolean
const encBool = await client.encrypt(true, 'bool');

// Encrypt a uint64 (use bigint)
const encLarge = await client.encrypt(1000000n, 'uint64');

// Encrypt an address
const encAddr = await client.encrypt('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', 'address');
```

#### `decrypt(request: DecryptionRequest): Promise<bigint>`

Decrypts an encrypted value (requires provider with signer).

**Parameters:**

```typescript
interface DecryptionRequest {
  contractAddress: string;  // Contract address
  userAddress: string;      // User address (must match signer)
  ciphertext: string;       // Ciphertext to decrypt (hex string)
  signature?: string;       // Signature for authentication (optional)
}
```

**Returns:** `Promise<bigint>` - Decrypted value as bigint

**Throws:**
- `FhevmError` with code `'DECRYPTION_FAILED'` if decryption fails
- `Error` if provider not set or addresses don't match

**Example:**

```typescript
const decrypted = await client.decrypt({
  contractAddress: '0x...',
  userAddress: '0x...',
  ciphertext: '0x1234...'
});
console.log(Number(decrypted)); // Convert bigint to number
```

#### `isInitialized(): boolean`

Checks if the client is initialized.

**Returns:** `boolean`

**Example:**

```typescript
if (!client.isInitialized()) {
  await client.init(provider);
}
```

#### `getInstance(): FhevmInstance`

Gets the underlying FHEVM instance.

**Returns:** `FhevmInstance`

**Throws:** `Error` if not initialized

#### `getPublicKey(): string`

Gets the public encryption key.

**Returns:** `string` - Public key as hex string

**Throws:** `Error` if not initialized

#### `getSigner(): Promise<Signer>`

Gets the signer from the provider.

**Returns:** `Promise<Signer>` (ethers Signer)

**Throws:** `Error` if provider not set

#### `setProvider(provider: Eip1193Provider | BrowserProvider): void`

Sets or updates the provider.

**Parameters:**
- `provider` - Ethereum provider

#### `updateConfig(config: Partial<FhevmConfig>): void`

Updates the configuration.

**Parameters:**
- `config` - Partial configuration to merge

**Example:**

```typescript
client.updateConfig({
  gatewayUrl: 'https://new-gateway.example.com'
});
```

#### `reset(): void`

Resets the instance (for re-initialization).

---

## React API

React hooks following wagmi-like patterns.

### `useFhevm(config: FhevmConfig, options?: UseEncryptOptions): FhevmContext`

Main FHEVM hook providing complete encryption/decryption context.

**Parameters:**

```typescript
interface UseEncryptOptions {
  autoInit?: boolean;                          // Auto-initialize on mount
  provider?: Eip1193Provider | BrowserProvider; // Provider to use
}
```

**Returns:**

```typescript
interface FhevmContext {
  instance: FhevmInstance | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
  init: () => Promise<void>;
  encrypt: <T>(value: T, type: EncryptType) => Promise<EncryptedValue>;
  decrypt: (request: DecryptionRequest) => Promise<bigint>;
  getSigner: () => Promise<any>;
}
```

**Example:**

```typescript
import { useFhevm } from '@fhevm/sdk/react';

function MyComponent() {
  const {
    instance,
    isInitialized,
    isLoading,
    error,
    init,
    encrypt,
    decrypt
  } = useFhevm({
    network: {
      chainId: 11155111,
      name: 'Sepolia',
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL
    }
  }, { autoInit: true });

  const handleEncrypt = async () => {
    if (!isInitialized) return;
    const encrypted = await encrypt(42, 'uint16');
    console.log(encrypted);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

---

### `useEncrypt(config?: FhevmConfig, options?: UseEncryptOptions): EncryptHookResult`

Encryption-only hook (lightweight, similar to wagmi's `useContractWrite`).

**Returns:**

```typescript
interface EncryptHookResult {
  encrypt: <T>(value: T, type: EncryptType) => Promise<EncryptedValue>;
  isLoading: boolean;
  error: Error | null;
  isReady: boolean;
}
```

**Example:**

```typescript
import { useEncrypt } from '@fhevm/sdk/react';

function EncryptButton() {
  const { encrypt, isLoading, error, isReady } = useEncrypt({
    network: { chainId: 11155111, name: 'Sepolia', rpcUrl: '...' }
  });

  const handleClick = async () => {
    if (!isReady) return;
    const encrypted = await encrypt(100, 'uint16');
  };

  return (
    <button onClick={handleClick} disabled={!isReady || isLoading}>
      {isLoading ? 'Encrypting...' : 'Encrypt'}
    </button>
  );
}
```

---

### `useDecrypt(config: FhevmConfig, request?: DecryptionRequest): DecryptHookResult`

Decryption-only hook (similar to wagmi's `useContractRead`).

**Returns:**

```typescript
interface DecryptHookResult {
  decrypt: (request: DecryptionRequest) => Promise<bigint>;
  value: bigint | null;
  isLoading: boolean;
  error: Error | null;
}
```

**Example:**

```typescript
import { useDecrypt } from '@fhevm/sdk/react';

function DecryptDisplay() {
  const { decrypt, value, isLoading } = useDecrypt(config);

  useEffect(() => {
    decrypt({
      contractAddress: '0x...',
      userAddress: '0x...',
      ciphertext: '0x...'
    });
  }, []);

  if (isLoading) return <div>Decrypting...</div>;
  if (value) return <div>Value: {Number(value)}</div>;
  return null;
}
```

---

## Vue API

Vue 3 composables using Composition API.

### `useFhevm(config: FhevmConfig, options?: UseEncryptOptions)`

Main FHEVM composable.

**Returns:** Same structure as React `useFhevm`, but values are Vue `ref`/`computed`

**Example:**

```vue
<script setup>
import { useFhevm } from '@fhevm/sdk/vue';
import { onMounted } from 'vue';

const { encrypt, isInitialized, init, error } = useFhevm({
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: import.meta.env.VITE_RPC_URL
  }
});

onMounted(() => init());

const handleEncrypt = async () => {
  const encrypted = await encrypt(42, 'uint16');
  console.log(encrypted);
};
</script>

<template>
  <button @click="handleEncrypt" :disabled="!isInitialized">
    Encrypt
  </button>
  <div v-if="error">Error: {{ error.message }}</div>
</template>
```

### `useEncrypt(config?, options?)`

Encryption-only composable.

### `useDecrypt(config, request?)`

Decryption-only composable.

---

## Types

### `EncryptType`

```typescript
type EncryptType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address';
```

### `EncryptableValue`

```typescript
type EncryptableValue = number | bigint | boolean | string;
```

### `EncryptedValue`

```typescript
interface EncryptedValue {
  data: Uint8Array;       // Encrypted data
  type: EncryptType;      // Type of encrypted value
  publicKey: string;      // Public key used
}
```

### `FhevmError`

```typescript
interface FhevmError extends Error {
  code?: string;          // Error code ('INIT_FAILED', 'ENCRYPTION_FAILED', etc.)
  details?: any;          // Additional error details
}
```

---

## Utilities

### Format Utilities

#### `formatEncryptedValue(encrypted: EncryptedValue): string`

Converts encrypted value to hex string.

```typescript
import { formatEncryptedValue } from '@fhevm/sdk';

const hex = formatEncryptedValue(encrypted);
console.log(hex); // '0x1234...'
```

#### `parseEncryptedValue(hexString: string, type: EncryptType, publicKey: string): EncryptedValue`

Parses hex string back to encrypted value.

```typescript
import { parseEncryptedValue } from '@fhevm/sdk';

const encrypted = parseEncryptedValue('0x1234...', 'uint16', publicKey);
```

#### `toContractInput(encrypted: EncryptedValue): Uint8Array`

Gets data field for contract calls.

```typescript
import { toContractInput } from '@fhevm/sdk';

const inputData = toContractInput(encrypted);
// Use in contract call
```

#### `formatDecryptedValue(value: bigint, type: EncryptType): string | number | boolean`

Formats decrypted value based on type.

```typescript
import { formatDecryptedValue } from '@fhevm/sdk';

const formatted = formatDecryptedValue(42n, 'uint16');
console.log(formatted); // 42 (number)

const boolFormatted = formatDecryptedValue(1n, 'bool');
console.log(boolFormatted); // true (boolean)
```

### Validation Utilities

#### `validateEncryptType(type: string): type is EncryptType`

Validates encryption type.

```typescript
import { validateEncryptType } from '@fhevm/sdk';

if (validateEncryptType('uint16')) {
  // Type is valid
}
```

#### `isValidAddress(address: string): boolean`

Validates Ethereum address format.

```typescript
import { isValidAddress } from '@fhevm/sdk';

if (isValidAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb')) {
  // Valid address
}
```

#### `validateValueForType(value: EncryptableValue, type: EncryptType): boolean`

Validates value matches type constraints.

```typescript
import { validateValueForType } from '@fhevm/sdk';

validateValueForType(42, 'uint8');     // true
validateValueForType(300, 'uint8');    // false (out of range)
validateValueForType(true, 'bool');    // true
```

---

## Error Handling

### Error Codes

- `INIT_FAILED` - Initialization failed
- `ENCRYPTION_FAILED` - Encryption operation failed
- `DECRYPTION_FAILED` - Decryption operation failed

### Error Handling Example

```typescript
try {
  const encrypted = await client.encrypt(42, 'uint16');
} catch (error) {
  if (error.code === 'ENCRYPTION_FAILED') {
    console.error('Encryption failed:', error.details);
  } else {
    console.error('Unknown error:', error.message);
  }
}
```

### React Error Handling

```typescript
const { encrypt, error } = useFhevm(config, { autoInit: true });

useEffect(() => {
  if (error) {
    console.error('FHEVM error:', error.message);
  }
}, [error]);
```

---

## Complete Example

```typescript
import { createFhevmClient } from '@fhevm/sdk';
import { formatEncryptedValue, validateValueForType } from '@fhevm/sdk';

async function example() {
  // 1. Create client
  const client = createFhevmClient({
    network: {
      chainId: 11155111,
      name: 'Sepolia',
      rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY'
    }
  });

  // 2. Initialize
  await client.init(window.ethereum);

  // 3. Validate value
  if (!validateValueForType(42, 'uint16')) {
    throw new Error('Invalid value');
  }

  // 4. Encrypt
  const encrypted = await client.encrypt(42, 'uint16');

  // 5. Format for display
  const hex = formatEncryptedValue(encrypted);
  console.log('Encrypted:', hex);

  // 6. Use in contract call
  const inputData = toContractInput(encrypted);
  // Send to smart contract...
}
```
