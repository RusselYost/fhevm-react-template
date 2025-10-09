/**
 * Universal FHEVM SDK
 * Framework-agnostic SDK for building confidential frontends
 *
 * @example
 * ```typescript
 * import { createFhevmClient } from '@fhevm/sdk';
 *
 * const client = createFhevmClient({
 *   network: {
 *     chainId: 11155111,
 *     name: 'Sepolia',
 *     rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY'
 *   }
 * });
 *
 * await client.init(provider);
 * const encrypted = await client.encrypt(42, 'uint16');
 * ```
 */

// Core
export { FhevmClient, createFhevmClient } from './core/FhevmClient';

// Types
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

// Utilities
export {
  formatEncryptedValue,
  parseEncryptedValue,
  toContractInput,
  formatDecryptedValue
} from './utils/format';
export {
  validateEncryptType,
  isValidAddress,
  validateValueForType,
  isValidGatewayUrl,
  isValidRpcUrl,
  isValidChainId,
  getTypeBounds
} from './utils/validation';

// Version
export const VERSION = '1.0.0';
