'use client';

import { FHEProvider } from '@/components/fhe/FHEProvider';
import { EncryptionDemo } from '@/components/fhe/EncryptionDemo';
import { ComputationDemo } from '@/components/fhe/ComputationDemo';
import { KeyManager } from '@/components/fhe/KeyManager';
import { BankingExample } from '@/components/examples/BankingExample';
import { MedicalExample } from '@/components/examples/MedicalExample';

export default function Home() {
  return (
    <FHEProvider>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Universal FHEVM SDK
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Next.js Example - Encrypted Computations on Blockchain
            </p>
          </header>

          <div className="space-y-8">
            {/* Key Manager */}
            <section>
              <KeyManager />
            </section>

            {/* Basic Encryption Demo */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Basic Encryption
              </h2>
              <EncryptionDemo />
            </section>

            {/* Computation Demo */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Encrypted Computations
              </h2>
              <ComputationDemo />
            </section>

            {/* Real-world Examples */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Real-world Applications
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <BankingExample />
                <MedicalExample />
              </div>
            </section>
          </div>

          <footer className="mt-12 text-center text-gray-600 dark:text-gray-400">
            <p>Built with Universal FHEVM SDK • Powered by Zama</p>
          </footer>
        </div>
      </main>
    </FHEProvider>
  );
}
