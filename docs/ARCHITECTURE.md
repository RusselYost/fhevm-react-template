# Architecture Guide

Technical architecture documentation for the Universal FHEVM SDK.

## Overview

The Universal FHEVM SDK is designed as a framework-agnostic library with specialized adapters for popular frameworks.

## Core Design Principles

1. **Framework Agnostic Core**: The `FhevmClient` class works in any JavaScript environment
2. **Thin Adapters**: React hooks and Vue composables are lightweight wrappers
3. **Type Safety**: Full TypeScript support with strict mode
4. **Developer Experience**: Wagmi-like API that feels familiar to Web3 developers

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│  (React App / Vue App / Node.js Script / Next.js / etc.)    │
└────────────────────┬───────────────────┬────────────────────┘
                     │                   │
         ┌───────────▼──────┐  ┌────────▼────────┐
         │  React Hooks     │  │  Vue Composables │
         │  (useFhevm)      │  │  (useFhevm)      │
         └───────────┬──────┘  └────────┬─────────┘
                     │                   │
                     └───────────┬───────┘
                                 │
                     ┌───────────▼──────────┐
                     │   Core FhevmClient   │
                     │  (Framework Agnostic) │
                     └───────────┬──────────┘
                                 │
                 ┌───────────────┼───────────────┐
                 │               │               │
         ┌───────▼──────┐ ┌─────▼─────┐ ┌──────▼─────┐
         │   fhevmjs     │ │  ethers   │ │    viem    │
         │ (Encryption)  │ │(Provider) │ │  (Types)   │
         └───────────────┘ └───────────┘ └────────────┘
```

## Module Breakdown

### Core Layer (`src/core/`)

**FhevmClient.ts** - The heart of the SDK

- **Responsibilities**:
  - Initialize FHEVM instance from fhevmjs
  - Manage provider and signer
  - Encrypt/decrypt operations
  - Error handling

- **Key Methods**:
  - `init(provider)` - Initialize with provider
  - `encrypt(value, type)` - Encrypt any supported type
  - `decrypt(request)` - Decrypt encrypted data
  - `getInstance()` - Get underlying FHEVM instance

### React Layer (`src/hooks/`, `src/react.ts`)

**useFhevm.ts** - React integration

- **Hooks Provided**:
  - `useFhevm()` - Main hook (like wagmi's useAccount)
  - `useEncrypt()` - Encryption-only (like useContractWrite)
  - `useDecrypt()` - Decryption-only (like useContractRead)

- **State Management**:
  - Uses React's useState, useEffect, useCallback
  - Manages: `isInitialized`, `isLoading`, `error`
  - Auto-initialization support

### Vue Layer (`src/vue.ts`)

**vue.ts** - Vue 3 Composition API integration

- **Composables**:
  - Same API as React hooks
  - Uses Vue's `ref`, `computed`, `onMounted`
  - Reactive state management

### Type Layer (`src/types/`)

**index.ts** - TypeScript definitions

- **Core Types**:
  - `FhevmConfig` - Configuration interface
  - `FhevmInstance` - FHEVM instance interface
  - `EncryptedValue` - Encrypted data structure
  - `DecryptionRequest` - Decryption parameters
  - `FhevmContext` - Hook return type

- **Type Guards**:
  - `EncryptType` - Valid encryption types
  - `EncryptableValue` - Valid input values

### Utilities Layer (`src/utils/`)

**format.ts** - Formatting utilities
- `formatEncryptedValue()` - Uint8Array to hex string
- `parseEncryptedValue()` - Hex string to Uint8Array
- `toContractInput()` - Prepare for contract call
- `formatDecryptedValue()` - Format decrypted output

**validation.ts** - Validation utilities
- `validateEncryptType()` - Check valid type
- `isValidAddress()` - Validate Ethereum address
- `validateValueForType()` - Check value bounds
- `isValidGatewayUrl()` - Validate gateway URL

## Data Flow

### Encryption Flow

```
User Input (25)
     ↓
useFhevm.encrypt(25, 'uint16')
     ↓
FhevmClient.encrypt(25, 'uint16')
     ↓
fhevmjs.encrypt_uint16(25)
     ↓
Returns: EncryptedValue {
  data: Uint8Array,
  type: 'uint16',
  publicKey: string
}
```

### Decryption Flow

```
Ciphertext from contract
     ↓
useFhevm.decrypt(request)
     ↓
FhevmClient.decrypt(request)
     ↓
Verify signer matches userAddress
     ↓
fhevmjs.decrypt(ciphertext)
     ↓
Returns: bigint (decrypted value)
```

## Example Application Architecture

The Confidential Flight Booking example demonstrates full integration:

```
Next.js 14 App
├── app/
│   ├── page.tsx           # Main UI
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # Wagmi + RainbowKit
├── components/
│   └── BookingForm.tsx    # SDK integration
└── Uses:
    ├── @fhevm/sdk         # Our Universal SDK
    ├── wagmi              # Ethereum interactions
    └── RainbowKit         # Wallet connection
```

## Performance Considerations

### Lazy Loading

```typescript
// Core client loaded on demand
const client = createFhevmClient(config);

// React hooks only load when component mounts
const { encrypt } = useFhevm(config, { autoInit: true });
```

### Tree Shaking

```typescript
// Import only what you need
import { useFhevm } from '@fhevm/sdk/react';  // React only
import { createFhevmClient } from '@fhevm/sdk';  // Core only
```

### Memoization

```typescript
// React hooks use useCallback for stable references
const encrypt = useCallback(async (value, type) => {
  return clientRef.current.encrypt(value, type);
}, []);
```

## Error Handling

### Error Codes

- `INIT_FAILED` - Initialization error
- `ENCRYPTION_FAILED` - Encryption error
- `DECRYPTION_FAILED` - Decryption error

### Error Flow

```typescript
try {
  const encrypted = await encrypt(value, type);
} catch (error) {
  if (error.code === 'ENCRYPTION_FAILED') {
    console.error('Details:', error.details);
  }
}
```

## Security Considerations

1. **Client-Side Encryption**: All encryption happens in browser
2. **Provider Verification**: Signer address validated before decryption
3. **Type Validation**: Value bounds checked before encryption
4. **Error Sanitization**: No sensitive data in error messages

## Extension Points

### Adding New Framework Support

```typescript
// src/angular.ts
import { FhevmClient } from './core/FhevmClient';

export class FhevmService {
  private client: FhevmClient;

  constructor(config: FhevmConfig) {
    this.client = new FhevmClient(config);
  }

  // Angular-specific methods
}
```

### Custom Utilities

```typescript
// src/utils/custom.ts
export function customFormatter(encrypted: EncryptedValue) {
  // Your custom logic
}
```

## Testing Strategy

### Unit Tests

- Test core `FhevmClient` methods
- Test utility functions
- Test type validation

### Integration Tests

- Test React hooks with React Testing Library
- Test Vue composables with Vue Test Utils
- Test full encryption/decryption flow

### E2E Tests

- Test example application
- Test wallet connection
- Test contract interaction

## Build Process

```
src/ (TypeScript)
  ↓
tsup (Bundler)
  ↓
dist/
├── index.js      (CJS)
├── index.mjs     (ESM)
├── index.d.ts    (Types)
├── react.js
├── react.mjs
├── react.d.ts
├── vue.js
├── vue.mjs
└── vue.d.ts
```

## Dependencies

### Required

- `fhevmjs` - FHE encryption library
- `ethers` - Ethereum library
- `viem` - Ethereum types

### Optional Peer Dependencies

- `react` >= 18.0.0 (for React support)
- `vue` >= 3.0.0 (for Vue support)

## Learn More

- [API Reference](./API.md)
- [Getting Started](./GETTING_STARTED.md)
- [Main README](../README.md)
