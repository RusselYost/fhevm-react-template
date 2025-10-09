/**
 * React-specific exports for FHEVM SDK
 *
 * @example
 * ```typescript
 * import { useFhevm, useEncrypt } from '@fhevm/sdk/react';
 *
 * function MyComponent() {
 *   const { encrypt, isInitialized } = useFhevm(config, { autoInit: true });
 *
 *   const handleEncrypt = async () => {
 *     const encrypted = await encrypt(42, 'uint16');
 *   };
 * }
 * ```
 */

// Export all React hooks
export { useFhevm, useEncrypt, useDecrypt } from './hooks/useFhevm';

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
  EncryptHookResult,
  DecryptHookResult,
  ContractCallOptions,
} from './types';

// Re-export utilities
export { formatEncryptedValue, parseEncryptedValue, toContractInput, formatDecryptedValue } from './utils/format';
export { validateEncryptType, isValidAddress, validateValueForType } from './utils/validation';

// Version
export { VERSION } from './index';
