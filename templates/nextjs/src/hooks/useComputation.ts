import { useState, useCallback } from 'react';
import { useFhevm } from '@fhevm/sdk/react';
import type { EncryptType } from '@fhevm/sdk';

/**
 * Custom hook for managing encrypted computations
 */
export const useComputation = () => {
  const { encrypt, isInitialized } = useFhevm(
    {
      network: {
        chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
        name: 'Sepolia',
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
      },
    },
    { autoInit: true }
  );

  const [isComputing, setIsComputing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const encryptMultiple = useCallback(
    async (values: Array<{ value: any; type: EncryptType }>) => {
      setIsComputing(true);
      setError(null);

      try {
        const encrypted = await Promise.all(
          values.map(({ value, type }) => encrypt(value, type))
        );
        setResults(encrypted);
        return encrypted;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Computation failed');
        setError(error);
        throw error;
      } finally {
        setIsComputing(false);
      }
    },
    [encrypt]
  );

  const reset = useCallback(() => {
    setError(null);
    setResults([]);
    setIsComputing(false);
  }, []);

  return {
    encryptMultiple,
    isComputing,
    error,
    results,
    isReady: isInitialized,
    reset,
  };
};
