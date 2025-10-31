# Next.js FHEVM SDK Example

A complete Next.js application demonstrating the Universal FHEVM SDK for building confidential applications with Fully Homomorphic Encryption.

## Features

- **FHE Provider**: Global context for FHEVM operations
- **Encryption Demo**: Interactive encryption of different data types
- **Computation Demo**: Encrypt multiple values for homomorphic operations
- **Key Management**: View and manage FHE public keys
- **Real-world Examples**:
  - Private banking (confidential balances)
  - Medical records (encrypted health data)

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                      # App Router (Next.js 13+)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   └── api/                 # API routes
│       ├── fhe/
│       │   ├── route.ts     # FHE operations
│       │   ├── encrypt/     # Encryption API
│       │   ├── decrypt/     # Decryption API
│       │   └── compute/     # Computation API
│       └── keys/route.ts    # Key management
│
├── components/              # React components
│   ├── ui/                  # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── fhe/                 # FHE components
│   │   ├── FHEProvider.tsx  # FHE context
│   │   ├── EncryptionDemo.tsx
│   │   ├── ComputationDemo.tsx
│   │   └── KeyManager.tsx
│   └── examples/            # Use case examples
│       ├── BankingExample.tsx
│       └── MedicalExample.tsx
│
├── lib/                     # Utilities
│   ├── fhe/                 # FHE integration
│   │   ├── client.ts        # Client operations
│   │   ├── server.ts        # Server operations
│   │   ├── keys.ts          # Key management
│   │   └── types.ts         # Type definitions
│   └── utils/               # Utility functions
│       ├── security.ts      # Security utilities
│       └── validation.ts    # Validation
│
├── hooks/                   # Custom hooks
│   ├── useFHE.ts           # FHE operations
│   ├── useEncryption.ts    # Encryption hook
│   └── useComputation.ts   # Computation hook
│
└── types/                   # TypeScript types
    ├── fhe.ts              # FHE types
    └── api.ts              # API types
```

## Usage

### Basic Encryption

```typescript
import { useFhevm } from '@fhevm/sdk/react';

function MyComponent() {
  const { encrypt, isInitialized } = useFhevm(config, { autoInit: true });

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, 'uint16');
    console.log('Encrypted:', encrypted.data);
  };
}
```

### Multiple Value Encryption

```typescript
const { encrypt } = useFhevm(config);

const [value1, value2] = await Promise.all([
  encrypt(100, 'uint32'),
  encrypt(200, 'uint32'),
]);
```

### API Routes

```typescript
// app/api/fhe/encrypt/route.ts
import { createFhevmClient } from '@fhevm/sdk';

export async function POST(request: NextRequest) {
  const { value, type } = await request.json();
  const client = createFhevmClient(config);
  await client.init();
  const encrypted = await client.encrypt(value, type);
  return NextResponse.json({ data: encrypted });
}
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
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai/)

## License

MIT
