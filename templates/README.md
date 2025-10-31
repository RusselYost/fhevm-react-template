# FHEVM SDK Templates

This directory contains starter templates for different frameworks, demonstrating integration with the Universal FHEVM SDK.

## Available Templates

### Next.js (`nextjs/`)
Complete Next.js 14 application with App Router, demonstrating:
- Client-side and server-side encryption
- API routes for FHE operations
- Real-world examples (banking, medical)
- Full TypeScript support
- Tailwind CSS styling

**Quick Start:**
```bash
cd nextjs
npm install
npm run dev
```

### React (`react/`)
React application with Vite, showing:
- FHE context provider
- Encryption hooks
- Component-based architecture

**Quick Start:**
```bash
cd react
npm install
npm run dev
```

### Vue (`vue/`)
Vue 3 application demonstrating:
- Composable-based FHE integration
- Reactive encryption state
- Vue-specific patterns

**Quick Start:**
```bash
cd vue
npm install
npm run dev
```

### Node.js (`nodejs/`)
Server-side Node.js example showing:
- Server-side encryption
- CLI tools
- Backend integration

**Quick Start:**
```bash
cd nodejs
npm install
node index.js
```

## Template Structure

Each template follows this structure:
```
template/
├── package.json          # Dependencies
├── README.md            # Template-specific docs
├── .env.example         # Environment variables
├── src/                 # Source code
└── [framework-specific files]
```

## Using a Template

1. **Copy the template:**
   ```bash
   cp -r templates/nextjs my-project
   cd my-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Start development:**
   ```bash
   npm run dev
   ```

## Common Configuration

All templates require these environment variables:

```env
# Blockchain Network
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
NEXT_PUBLIC_CHAIN_ID=11155111

# FHEVM Configuration
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
NEXT_PUBLIC_ACL_ADDRESS=
```

## SDK Integration

All templates use the Universal FHEVM SDK:

```typescript
import { useFhevm } from '@fhevm/sdk/react';  // React
import { useFhevm } from '@fhevm/sdk/vue';     // Vue
import { createFhevmClient } from '@fhevm/sdk'; // Node.js
```

## Learn More

- [SDK Documentation](../packages/fhevm-sdk/README.md)
- [Full Examples](../examples/)
- [API Reference](../API.md)
- [Setup Guide](../SETUP_GUIDE.md)

## License

MIT
