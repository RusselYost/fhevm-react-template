# Setup Guide - Universal FHEVM SDK

Complete guide to setting up and using the Universal FHEVM SDK.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Example](#running-the-example)
- [Building the SDK](#building-the-sdk)
- [Deployment](#deployment)
- [Testing](#testing)

---

## Prerequisites

- Node.js >= 18.x
- npm or yarn
- MetaMask or another Web3 wallet
- Sepolia testnet ETH (for testing)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fhevm-universal-sdk.git
cd fhevm-universal-sdk
```

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Install SDK Dependencies

```bash
cd packages/fhevm-sdk
npm install
cd ../..
```

### 4. Install Example Dependencies

```bash
cd examples/nextjs-confidential-flight
npm install
```

---

## Running the Example

### 1. Configure Environment

```bash
cd examples/nextjs-confidential-flight
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Connect Wallet

- Click "Connect Wallet" button
- Select MetaMask
- Switch to Sepolia testnet
- Approve connection

### 4. Test Encryption

- Fill out the booking form
- Click "Book Flight"
- The SDK will encrypt your data automatically
- Confirm the transaction in MetaMask

---

## Building the SDK

### Development Build

```bash
cd packages/fhevm-sdk
npm run dev
```

This watches for changes and rebuilds automatically.

### Production Build

```bash
cd packages/fhevm-sdk
npm run build
```

Output:
- `dist/index.js` - CJS format
- `dist/index.mjs` - ESM format
- `dist/index.d.ts` - TypeScript declarations
- `dist/react.js`, `dist/react.mjs` - React exports
- `dist/vue.js`, `dist/vue.mjs` - Vue exports

---

## Project Structure

```
fhevm-universal-sdk/
├── packages/
│   └── fhevm-sdk/              # Core SDK package
│       ├── src/
│       │   ├── core/           # Framework-agnostic client
│       │   ├── hooks/          # React hooks
│       │   ├── types/          # TypeScript types
│       │   ├── utils/          # Utilities
│       │   ├── index.ts        # Main exports
│       │   ├── react.ts        # React exports
│       │   └── vue.ts          # Vue exports
│       └── package.json
├── examples/
│   └── nextjs-confidential-flight/  # Complete working example
│       ├── app/                # Next.js 14 app
│       ├── components/         # React components
│       ├── contracts/          # Smart contracts
│       └── package.json
├── README.md                   # Main documentation
├── API.md                      # API reference
├── CONTRIBUTING.md             # Contribution guide
└── package.json                # Root package.json
```

---

## Deployment

### Deploy Example to Vercel

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Deploy from Example Directory**

```bash
cd examples/nextjs-confidential-flight
vercel
```

3. **Set Environment Variables**

In Vercel dashboard, add:
- `NEXT_PUBLIC_RPC_URL`
- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

4. **Deploy**

```bash
vercel --prod
```

### Deploy Smart Contracts

See `examples/nextjs-confidential-flight/contracts/` for contract source.

Deploy using Hardhat:

```bash
# Install dependencies
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Deploy to Sepolia
npx hardhat run scripts/deploy.ts --network sepolia
```

---

## Testing

### SDK Tests

```bash
cd packages/fhevm-sdk
npm test
```

### Type Checking

```bash
cd packages/fhevm-sdk
npm run typecheck
```

### Example Type Checking

```bash
cd examples/nextjs-confidential-flight
npm run typecheck
```

---

## Common Issues

### Issue: SDK Not Initializing

**Solution:** Check that:
- RPC URL is correct
- Network is Sepolia (chain ID 11155111)
- Wallet is connected

### Issue: Encryption Fails

**Solution:**
- Ensure SDK is initialized (`isInitialized === true`)
- Check value is within type bounds (e.g., uint16: 0-65535)
- Verify provider is available

### Issue: Transaction Fails

**Solution:**
- Check contract address is correct
- Ensure you have enough Sepolia ETH
- Verify contract is deployed on Sepolia

---

## Development Workflow

### 1. Make Changes to SDK

```bash
cd packages/fhevm-sdk
# Edit files in src/
npm run dev  # Auto-rebuild on changes
```

### 2. Test in Example

```bash
cd examples/nextjs-confidential-flight
npm run dev
# Changes to SDK will be reflected immediately
```

### 3. Build for Production

```bash
cd packages/fhevm-sdk
npm run build
```

---

## SDK Usage in Your Project

### Install in Your Project

```bash
npm install @fhevm/sdk fhevmjs ethers
```

### React Usage

```typescript
import { useFhevm } from '@fhevm/sdk/react';

function MyComponent() {
  const { encrypt, isInitialized } = useFhevm({
    network: {
      chainId: 11155111,
      name: 'Sepolia',
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL
    }
  }, { autoInit: true });

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, 'uint16');
    console.log(encrypted);
  };
}
```

### Vue Usage

```vue
<script setup>
import { useFhevm } from '@fhevm/sdk/vue';

const { encrypt, isInitialized } = useFhevm({
  network: { chainId: 11155111, name: 'Sepolia', rpcUrl: '...' }
});
</script>
```

### Node.js Usage

```typescript
import { createFhevmClient } from '@fhevm/sdk';

const client = createFhevmClient({
  network: { chainId: 11155111, name: 'Sepolia', rpcUrl: '...' }
});

await client.init();
const encrypted = await client.encrypt(100, 'uint32');
```

---

## Next Steps

1. **Read the Documentation**
   - [README.md](./README.md) - Overview and features
   - [API.md](./API.md) - Complete API reference
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute

2. **Try the Example**
   - Run the flight booking example
   - Experiment with different encryption types
   - Study the source code in `components/BookingForm.tsx`

3. **Build Your Own App**
   - Use the SDK in your project
   - Follow the patterns from the example
   - Reference the API documentation

4. **Contribute**
   - Report bugs
   - Suggest features
   - Submit pull requests

---

## Support

- **Documentation**: See README.md and API.md
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions

---

## License

MIT License - See LICENSE file for details
