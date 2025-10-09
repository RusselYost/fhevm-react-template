/**
 * Vue-specific exports for FHEVM SDK
 *
 * @example
 * ```typescript
 * import { useFhevm } from '@fhevm/sdk/vue';
 *
 * export default {
 *   setup() {
 *     const { encrypt, isInitialized, init } = useFhevm(config);
 *
 *     onMounted(async () => {
 *       await init();
 *     });
 *
 *     return { encrypt, isInitialized };
 *   }
 * }
 * ```
 */

import { ref, computed, onMounted, type Ref } from 'vue';
import { FhevmClient } from './core/FhevmClient';
import type {
  FhevmConfig,
  FhevmInstance,
  EncryptedValue,
  DecryptionRequest,
  UseEncryptOptions,
  FhevmContext,
} from './types';

/**
 * Vue composable for FHEVM
 */
export function useFhevm(config: FhevmConfig, options?: UseEncryptOptions) {
  const instance: Ref<FhevmInstance | null> = ref(null);
  const isInitialized = ref(false);
  const isLoading = ref(false);
  const error: Ref<Error | null> = ref(null);

  let client: FhevmClient | null = null;

  const init = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      if (!client) {
        client = new FhevmClient(config);
      }

      await client.init(options?.provider);
      instance.value = client.getInstance();
      isInitialized.value = true;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      isLoading.value = false;
    }
  };

  const encrypt = async <T extends number | bigint | boolean | string>(
    value: T,
    type: EncryptedValue['type']
  ): Promise<EncryptedValue> => {
    if (!client) {
      throw new Error('FHEVM not initialized');
    }
    return client.encrypt(value, type);
  };

  const decrypt = async (request: DecryptionRequest): Promise<bigint> => {
    if (!client) {
      throw new Error('FHEVM not initialized');
    }
    return client.decrypt(request);
  };

  const getSigner = async () => {
    if (!client) {
      throw new Error('FHEVM not initialized');
    }
    return client.getSigner();
  };

  // Auto-initialize
  if (options?.autoInit) {
    onMounted(() => {
      if (!isInitialized.value && !isLoading.value) {
        init();
      }
    });
  }

  return {
    instance: computed(() => instance.value),
    isInitialized: computed(() => isInitialized.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    init,
    encrypt,
    decrypt,
    getSigner,
  };
}

/**
 * Vue composable for encryption only
 */
export function useEncrypt(config?: FhevmConfig, options?: UseEncryptOptions) {
  const isLoading = ref(false);
  const error: Ref<Error | null> = ref(null);
  const isReady = ref(false);

  let client: FhevmClient | null = null;

  onMounted(async () => {
    if (config && !client) {
      client = new FhevmClient(config);
      try {
        await client.init(options?.provider);
        isReady.value = true;
      } catch (err) {
        error.value = err instanceof Error ? err : new Error(String(err));
      }
    }
  });

  const encrypt = async <T extends number | bigint | boolean | string>(
    value: T,
    type: EncryptedValue['type']
  ): Promise<EncryptedValue> => {
    if (!client || !isReady.value) {
      throw new Error('FHEVM not ready');
    }

    isLoading.value = true;
    error.value = null;

    try {
      const result = await client.encrypt(value, type);
      return result;
    } catch (err) {
      const thrownError = err instanceof Error ? err : new Error(String(err));
      error.value = thrownError;
      throw thrownError;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    encrypt,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    isReady: computed(() => isReady.value),
  };
}

/**
 * Vue composable for decryption
 */
export function useDecrypt(config: FhevmConfig, request?: Ref<DecryptionRequest | undefined>) {
  const value: Ref<bigint | null> = ref(null);
  const isLoading = ref(false);
  const error: Ref<Error | null> = ref(null);

  let client: FhevmClient | null = null;

  onMounted(() => {
    if (!client) {
      client = new FhevmClient(config);
    }
  });

  const decrypt = async (req: DecryptionRequest): Promise<bigint> => {
    if (!client) {
      throw new Error('FHEVM not initialized');
    }

    isLoading.value = true;
    error.value = null;

    try {
      const result = await client.decrypt(req);
      value.value = result;
      return result;
    } catch (err) {
      const thrownError = err instanceof Error ? err : new Error(String(err));
      error.value = thrownError;
      throw thrownError;
    } finally {
      isLoading.value = false;
    }
  };

  // Auto-decrypt if request provided
  if (request?.value) {
    onMounted(() => {
      if (request.value) {
        decrypt(request.value).catch((err) => {
          error.value = err instanceof Error ? err : new Error(String(err));
        });
      }
    });
  }

  return {
    decrypt,
    value: computed(() => value.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
  };
}

// Re-export core functionality
export { FhevmClient, createFhevmClient } from './core/FhevmClient';

// Re-export types
export type {
  FhevmConfig,
  FhevmInstance,
  EncryptedValue,
  DecryptionRequest,
  FhevmContext,
  FhevmError,
  EncryptType,
  EncryptableValue,
  UseEncryptOptions,
  ContractCallOptions,
} from './types';

// Re-export utilities
export { formatEncryptedValue, parseEncryptedValue, toContractInput, formatDecryptedValue } from './utils/format';
export { validateEncryptType, isValidAddress, validateValueForType } from './utils/validation';

// Version
export { VERSION } from './index';
