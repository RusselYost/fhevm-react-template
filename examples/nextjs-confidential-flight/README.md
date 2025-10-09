# Confidential Flight Booking - Complete FHEVM SDK Example

> Privacy-preserving flight booking system demonstrating Universal FHEVM SDK integration

This **complete, working example** shows how to use the universal FHEVM SDK in a real Next.js application with encrypted passenger data, booking management, and loyalty points.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your configuration to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Features

- **Encrypted Passenger Data**: Passport numbers, ages, and personal info encrypted with FHE
- **Confidential Payments**: Payment amounts remain private on-chain
- **Private Seat Selection**: Seat numbers encrypted for passenger privacy
- **Encrypted Loyalty Points**: VIP status and bonus points calculated on encrypted data
- **Insurance Privacy**: Insurance status encrypted (ebool type)

## Smart Contracts

### ConfidentialFlightBooking.sol

Privacy-preserving flight booking system with:
- Multiple FHE types (euint16, euint32, euint64, ebool)
- Encrypted comparisons and logic
- PauserSet emergency controls
- Fail-closed design

**Encrypted Fields:**
- `basePrice` (euint16) - Flight base price
- `paidAmount` (euint16) - Payment amount
- `seatNumber` (euint32) - Assigned seat
- `passportNumber` (euint32) - Passport ID
- `age` (euint16) - Passenger age
- `frequentFlyerNumber` (euint32) - FFN
- `loyaltyPoints` (euint64) - Loyalty rewards
- `isVIP` (ebool) - VIP status
- `hasInsurance` (ebool) - Insurance flag

## 📦 SDK Integration Demo

This example showcases the Universal FHEVM SDK with a complete, working implementation.

### Installation

The SDK is already included in `package.json`:

```json
{
  "dependencies": {
    "@fhevm/sdk": "file:../../packages/fhevm-sdk"
  }
}
```

### SDK Setup (< 10 Lines!)

See `components/BookingForm.tsx` for the complete implementation:

```typescript
import { useFhevm } from '@fhevm/sdk/react';

function BookingForm() {
  // Initialize SDK with auto-init - just 2 lines!
  const { encrypt, isInitialized, isLoading, error } = useFhevm({
    network: {
      chainId: 11155111,
      name: 'Sepolia',
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL
    }
  }, { autoInit: true });

  // Encrypt data - type-safe and simple
  const handleEncrypt = async () => {
    const encryptedAge = await encrypt(25, 'uint16');
    const encryptedVIP = await encrypt(true, 'bool');
    // Use in contract call
  };
}
```

### Encrypting Flight Data

```typescript
// Encrypt passenger age
const encryptedAge = await encrypt(25, 'uint16');

// Encrypt passport number
const encryptedPassport = await encrypt(123456789, 'uint32');

// Encrypt VIP status
const encryptedVIP = await encrypt(true, 'bool');

// Encrypt loyalty points
const encryptedPoints = await encrypt(1000n, 'uint64');
```

### Booking a Flight

```typescript
import { useFhevm } from '@fhevm/sdk/react';
import { useContractWrite } from 'wagmi';

function BookFlightButton() {
  const { encrypt, isInitialized } = useFhevm(config, { autoInit: true });
  const { writeContract } = useContractWrite();

  const handleBook = async () => {
    // All sensitive data encrypted client-side
    const encryptedAge = await encrypt(25, 'uint16');

    await writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'bookFlight',
      args: [
        flightId,
        passportNumber,
        encryptedName,
        encryptedAge.data, // Use encrypted data
        preferredSeat,
        hasSpecialNeeds,
        frequentFlyerNumber,
        isVIP,
        hasInsurance
      ],
      value: parseEther('0.1')
    });
  };

  return <button onClick={handleBook}>Book Flight</button>;
}
```

### Framework-Agnostic Usage

The SDK works with any framework:

```typescript
// Core usage (no framework)
import { createFhevmClient } from '@fhevm/sdk';

const client = createFhevmClient({ network: { ... } });
await client.init(provider);
const encrypted = await client.encrypt(42, 'uint16');
```

```typescript
// Vue usage
import { useFhevm } from '@fhevm/sdk/vue';

export default {
  setup() {
    const { encrypt } = useFhevm(config);
    return { encrypt };
  }
}
```

## Contract Deployment

Deployed on Sepolia testnet:

- **ConfidentialFlightBooking**: `[See main README]`
- **PauserSet**: `[See main README]`

## Privacy Model

### What's Private (Encrypted):
- Passenger age
- Passport number
- Seat number
- Payment amount
- Frequent flyer number
- VIP status
- Insurance status
- Loyalty points

### What's Public:
- Flight origin/destination
- Departure/arrival times
- Total seats available
- Booking confirmation status
- Flight active status

## Key SDK Features Demonstrated

1. **Multiple Encryption Types**: uint8, uint16, uint32, uint64, bool
2. **Framework Agnostic**: Core client works everywhere
3. **React Hooks**: wagmi-like API with useFhevm
4. **Type Safety**: Full TypeScript support
5. **Fast Setup**: <10 lines to start encrypting
6. **Error Handling**: Built-in error states
7. **Loading States**: isLoading, isInitialized flags
8. **Validation**: Built-in type validation

## License

MIT
