/**
 * React Hooks for FHEVM
 * Wagmi-like structure for encrypted computations
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  FhevmConfig,
  FhevmContext,
  EncryptedValue,
  DecryptionRequest,
  UseEncryptOptions,
  EncryptHookResult,
  DecryptHookResult,
} from '../types';
import { FhevmClient } from '../core/FhevmClient';

/**
 * Main FHEVM hook - provides encryption/decryption context
 * Similar to wagmi's useAccount or useConnect
 */
export function useFhevm(config: FhevmConfig, options?: UseEncryptOptions): FhevmContext {
  const [instance, setInstance] = useState<FhevmContext['instance']>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clientRef = useRef<FhevmClient | null>(null);

  const init = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!clientRef.current) {
        clientRef.current = new FhevmClient(config);
      }

      await clientRef.current.init(options?.provider);
      setInstance(clientRef.current.getInstance());
      setIsInitialized(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [config, options?.provider]);

  const encrypt = useCallback(
    async <T extends number | bigint | boolean | string>(
      value: T,
      type: EncryptedValue['type']
    ): Promise<EncryptedValue> => {
      if (!clientRef.current) {
        throw new Error('FHEVM not initialized');
      }
      return clientRef.current.encrypt(value, type);
    },
    []
  );

  const decrypt = useCallback(async (request: DecryptionRequest): Promise<bigint> => {
    if (!clientRef.current) {
      throw new Error('FHEVM not initialized');
    }
    return clientRef.current.decrypt(request);
  }, []);

  const getSigner = useCallback(async () => {
    if (!clientRef.current) {
      throw new Error('FHEVM not initialized');
    }
    return clientRef.current.getSigner();
  }, []);

  // Auto-initialize
  useEffect(() => {
    if (options?.autoInit && !isInitialized && !isLoading) {
      init();
    }
  }, [options?.autoInit, isInitialized, isLoading, init]);

  return {
    instance,
    isInitialized,
    isLoading,
    error,
    init,
    encrypt,
    decrypt,
    getSigner,
  };
}

/**
 * Hook for encryption only
 * Similar to wagmi's useContractWrite
 */
export function useEncrypt(config?: FhevmConfig, options?: UseEncryptOptions): EncryptHookResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isReady, setIsReady] = useState(false);

  const clientRef = useRef<FhevmClient | null>(null);

  useEffect(() => {
    if (config && !clientRef.current) {
      clientRef.current = new FhevmClient(config);
      clientRef.current.init(options?.provider).then(() => {
        setIsReady(true);
      }).catch(setError);
    }
  }, [config, options?.provider]);

  const encrypt = useCallback(
    async <T extends number | bigint | boolean | string>(
      value: T,
      type: EncryptedValue['type']
    ): Promise<EncryptedValue> => {
      if (!clientRef.current || !isReady) {
        throw new Error('FHEVM not ready');
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await clientRef.current.encrypt(value, type);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [isReady]
  );

  return {
    encrypt,
    isLoading,
    error,
    isReady,
  };
}

/**
 * Hook for decryption
 * Similar to wagmi's useContractRead
 */
export function useDecrypt(
  config: FhevmConfig,
  request?: DecryptionRequest
): DecryptHookResult {
  const [value, setValue] = useState<bigint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clientRef = useRef<FhevmClient | null>(null);

  useEffect(() => {
    if (!clientRef.current) {
      clientRef.current = new FhevmClient(config);
    }
  }, [config]);

  const decrypt = useCallback(
    async (req: DecryptionRequest): Promise<bigint> => {
      if (!clientRef.current) {
        throw new Error('FHEVM not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await clientRef.current.decrypt(req);
        setValue(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Auto-decrypt if request provided
  useEffect(() => {
    if (request) {
      decrypt(request).catch(setError);
    }
  }, [request, decrypt]);

  return {
    decrypt,
    value,
    isLoading,
    error,
  };
}
