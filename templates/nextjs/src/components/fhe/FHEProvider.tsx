'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useFhevm } from '@fhevm/sdk/react';
import type { FhevmContext } from '@fhevm/sdk';

const FHEContext = createContext<FhevmContext | null>(null);

export const useFHE = () => {
  const context = useContext(FHEContext);
  if (!context) {
    throw new Error('useFHE must be used within FHEProvider');
  }
  return context;
};

interface FHEProviderProps {
  children: ReactNode;
}

export const FHEProvider: React.FC<FHEProviderProps> = ({ children }) => {
  const fhevmContext = useFhevm(
    {
      network: {
        chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
        name: 'Sepolia',
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
      },
      gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL,
    },
    { autoInit: true }
  );

  if (fhevmContext.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Initializing FHEVM...</p>
        </div>
      </div>
    );
  }

  if (fhevmContext.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Initialization Error
          </h2>
          <p className="text-red-700 dark:text-red-300">{fhevmContext.error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <FHEContext.Provider value={fhevmContext}>
      {children}
    </FHEContext.Provider>
  );
};
