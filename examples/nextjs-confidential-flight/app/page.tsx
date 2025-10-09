'use client';

/**
 * Confidential Flight Booking - Example Application
 * Demonstrates Universal FHEVM SDK Integration
 *
 * Key Features:
 * - Fast SDK setup (<10 lines)
 * - Multiple encryption types
 * - Wagmi integration
 * - Type-safe encryption
 */

import { BookingForm } from '@/components/BookingForm';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Contract configuration
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}` || '0x0000000000000000000000000000000000000000';
const CONTRACT_ABI = [
  {
    inputs: [
      { name: '_flightId', type: 'uint32' },
      { name: '_passportNumber', type: 'uint32' },
      { name: '_encryptedName', type: 'string' },
      { name: '_age', type: 'uint16' },
      { name: '_preferredSeat', type: 'uint32' },
      { name: '_hasSpecialNeeds', type: 'bool' },
      { name: '_frequentFlyerNumber', type: 'uint32' },
      { name: '_isVIP', type: 'bool' },
      { name: '_hasInsurance', type: 'bool' }
    ],
    name: 'bookFlight',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-lg bg-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                🔐 Confidential Flight Booking
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Powered by Universal FHEVM SDK
              </p>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* SDK Feature Banner */}
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-3">
              Universal FHEVM SDK Demo
            </h2>
            <p className="text-white/80 mb-4">
              This example demonstrates how to use the framework-agnostic FHEVM SDK
              to encrypt sensitive passenger data before submitting to the blockchain.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-purple-400 font-semibold mb-1">Fast Setup</p>
                <p className="text-white/60 text-sm">&lt;10 lines of code</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-pink-400 font-semibold mb-1">Type-Safe</p>
                <p className="text-white/60 text-sm">Full TypeScript support</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-blue-400 font-semibold mb-1">6 Types</p>
                <p className="text-white/60 text-sm">uint8-64, bool, address</p>
              </div>
            </div>
          </div>

          {/* SDK Code Example */}
          <div className="mb-8 p-6 bg-black/30 backdrop-blur-lg rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">
              SDK Integration Example
            </h3>
            <pre className="text-green-400 text-sm font-mono bg-black/50 p-4 rounded-lg overflow-x-auto">
{`// 1. Import the SDK
import { useFhevm } from '@fhevm/sdk/react';

// 2. Initialize with auto-init
const { encrypt, isInitialized } = useFhevm({
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: '...'
  }
}, { autoInit: true });

// 3. Encrypt data - type-safe and simple!
const encrypted = await encrypt(25, 'uint16');
const encVIP = await encrypt(true, 'bool');`}
            </pre>
          </div>

          {/* Privacy Features */}
          <div className="mb-8 p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              🔒 What's Encrypted (Private on-chain)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-400">✓</span>
                <span>Passenger Age (euint16)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-400">✓</span>
                <span>Passport Number (euint32)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-400">✓</span>
                <span>Seat Number (euint32)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-400">✓</span>
                <span>Payment Amount (euint16)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-400">✓</span>
                <span>VIP Status (ebool)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-400">✓</span>
                <span>Insurance Status (ebool)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-400">✓</span>
                <span>Loyalty Points (euint64)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-400">✓</span>
                <span>Frequent Flyer # (euint32)</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <BookingForm
            flightId={1}
            contractAddress={CONTRACT_ADDRESS}
            contractAbi={CONTRACT_ABI}
          />

          {/* Framework Support */}
          <div className="mt-8 p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Framework Agnostic SDK
            </h3>
            <p className="text-white/70 mb-4">
              This same SDK works across all popular frameworks:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
                <p className="text-blue-400 font-semibold">React</p>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                <p className="text-green-400 font-semibold">Vue</p>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center">
                <p className="text-purple-400 font-semibold">Next.js</p>
              </div>
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg text-center">
                <p className="text-orange-400 font-semibold">Node.js</p>
              </div>
            </div>
          </div>

          {/* Built for Zama */}
          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-xl border border-indigo-500/30">
            <h3 className="text-lg font-semibold text-white mb-2">
              🏆 Built for Zama FHEVM
            </h3>
            <p className="text-white/70">
              This Universal SDK follows Zama's official FHEVM guidelines and wraps
              fhevmjs for a seamless developer experience across all JavaScript frameworks.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 backdrop-blur-lg bg-white/5 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-white/50 text-center text-sm">
            Example Application • Universal FHEVM SDK • MIT License
          </p>
        </div>
      </footer>
    </main>
  );
}
