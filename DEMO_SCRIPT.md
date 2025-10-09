# Video Demo Script for demo.mp4

## Duration: 3-5 minutes

### Scene 1: Introduction (30 seconds)
**Narration**: "Building encrypted applications with FHEVM used to be complex, requiring multiple packages and lots of boilerplate. We created a universal SDK to change that."

**Show**:
- Title slide: "Universal FHEVM SDK"
- Subtitle: "Framework-agnostic, Wagmi-like, <10 lines to start"

### Scene 2: The Problem (30 seconds)
**Narration**: "Before, you needed to manually import multiple packages, set up instances, handle providers, and manage encryption lifecycle."

**Show**:
- Code comparison showing "Before" - 50+ lines of setup code
- Highlight dependencies: fhevmjs, ethers, manual initialization

### Scene 3: The Solution (45 seconds)
**Narration**: "Now, with our SDK, you can start encrypting data in less than 10 lines of code."

**Show**:
```typescript
import { useFhevm } from '@fhevm/sdk/react';

function App() {
  const { encrypt } = useFhevm({
    network: { chainId: 11155111, name: 'Sepolia', rpcUrl: '...' }
  }, { autoInit: true });

  const encryptData = async () => {
    const encrypted = await encrypt(42, 'uint16');
  };
}
```

### Scene 4: Framework Agnostic (1 minute)
**Narration**: "The same SDK works across all popular frameworks."

**Show split screen**:

**React**:
```typescript
import { useFhevm } from '@fhevm/sdk/react';
const { encrypt } = useFhevm(config, { autoInit: true });
```

**Vue**:
```typescript
import { useFhevm } from '@fhevm/sdk/vue';
const { encrypt } = useFhevm(config);
```

**Node.js**:
```typescript
import { createFhevmClient } from '@fhevm/sdk';
const client = createFhevmClient(config);
await client.init();
```

### Scene 5: Real Example - Flight Booking (1.5 minutes)
**Narration**: "Let's see it in action with a real privacy-preserving flight booking system."

**Show**:
1. Open the example Next.js app
2. Show contract with multiple FHE types (euint16, euint32, euint64, ebool)
3. Demonstrate encryption:
   - Age encryption (euint16)
   - Passport number (euint32)
   - VIP status (ebool)
   - Loyalty points (euint64)

**Code walkthrough**:
```typescript
const { encrypt } = useFhevm(config, { autoInit: true });

// Encrypt passenger age
const encryptedAge = await encrypt(25, 'uint16');

// Encrypt VIP status
const encryptedVIP = await encrypt(true, 'bool');

// Encrypt loyalty points
const encryptedPoints = await encrypt(1000n, 'uint64');
```

4. Show transaction on Sepolia Etherscan
5. Highlight encrypted data on-chain

### Scene 6: Key Features (45 seconds)
**Narration**: "Our SDK provides everything you need out of the box."

**Show feature list with icons**:
- ✅ Framework agnostic (React, Vue, Node.js, vanilla)
- ✅ Wagmi-like hooks API
- ✅ Full TypeScript support
- ✅ Built-in validation
- ✅ Multiple encryption types (uint8, uint16, uint32, uint64, bool, address)
- ✅ Error handling & loading states
- ✅ Zero configuration required

### Scene 7: Architecture (30 seconds)
**Narration**: "The architecture is simple: a framework-agnostic core with framework-specific adapters."

**Show diagram**:
```
FhevmClient (Core)
    ↓
├─→ React Hooks (useFhevm)
├─→ Vue Composables (useFhevm)
└─→ Direct Usage (Node.js, vanilla)
```

### Scene 8: Installation & Quick Start (30 seconds)
**Narration**: "Getting started is incredibly simple."

**Show terminal**:
```bash
npm install @fhevm/sdk fhevmjs ethers
```

**Show code editor**:
```typescript
import { useFhevm } from '@fhevm/sdk/react';

const { encrypt } = useFhevm(config, { autoInit: true });
const encrypted = await encrypt(42, 'uint16');
```

### Scene 9: Built for Zama (20 seconds)
**Narration**: "This SDK is built to work seamlessly with Zama's FHEVM, following official guidelines for encrypted computation."

**Show**:
- Zama logo
- Links to Zama documentation
- FHEVM GitHub repository

### Scene 10: Call to Action (20 seconds)
**Narration**: "Start building privacy-preserving applications today with our universal FHEVM SDK."

**Show**:
- GitHub repository link
- Live demo link
- Documentation link
- "Thank you for watching!"

## Visual Style

- **Background**: Dark theme with glassmorphism effects (matching the UI)
- **Code**: Syntax-highlighted TypeScript
- **Transitions**: Smooth fades
- **Music**: Upbeat, tech-focused background music (low volume)
- **Text**: Clear, readable fonts (SF Mono for code, SF Pro for text)

## Recording Tips

1. Use screen recording software (OBS, Loom, or QuickTime)
2. Record at 1080p minimum
3. Keep cursor movements smooth
4. Use a quality microphone
5. Edit out any mistakes or pauses
6. Add background music at 20% volume
7. Export as MP4 (H.264 codec)
8. Keep file size under 50MB if possible

## Key Messages to Emphasize

1. **Simple**: <10 lines to start
2. **Universal**: Works with any framework
3. **Wagmi-like**: Familiar API for web3 developers
4. **Complete**: All dependencies wrapped
5. **Type-safe**: Full TypeScript support
6. **Real-world**: Proven with flight booking example
7. **Zama-powered**: Built on Zama's FHEVM

## Demo Assets Needed

- ✅ GitHub repository
- ✅ README with comprehensive docs
- ✅ Working example (Confidential Flight Booking)
- ✅ Deployed contract on Sepolia
- ⏳ Live frontend deployment (Vercel/Netlify)
- ⏳ Recorded demo.mp4
