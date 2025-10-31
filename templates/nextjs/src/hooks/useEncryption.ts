import { useState, useCallback } from 'react';
import { useFhevm } from '@fhevm/sdk/react';
import type { EncryptType, EncryptableValue } from '@fhevm/sdk';

/**
 * Custom hook for encryption operations with state management
 */
export const useEncryption = () => {
  const { encrypt: sdkEncrypt, isInitialized } = useFhevm(
    {
      network: {
        chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
        name: 'Sepolia',
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
      },
    },
    { autoInit: true }
  );

  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [encryptedData, setEncryptedData] = useState<string | null>(null);

  const encrypt = useCallback(
    async (value: EncryptableValue, type: EncryptType) => {
      setIsEncrypting(true);
      setError(null);
      setEncryptedData(null);

      try {
        const result = await sdkEncrypt(value, type);
        setEncryptedData(result.data);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Encryption failed');
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [sdkEncrypt]
  );

  const reset = useCallback(() => {
    setError(null);
    setEncryptedData(null);
    setIsEncrypting(false);
  }, []);

  return {
    encrypt,
    isEncrypting,
    error,
    encryptedData,
    isReady: isInitialized,
    reset,
  };
};
