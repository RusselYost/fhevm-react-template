/**
 * Re-export FHE types from SDK and add custom types
 */

export type {
  FhevmConfig,
  FhevmInstance,
  EncryptedValue,
  DecryptionRequest,
  FhevmContext,
  FhevmError,
  EncryptType,
  EncryptableValue,
} from '@fhevm/sdk';

/**
 * Custom types for the Next.js example
 */
export interface FHEConfig {
  chainId: number;
  rpcUrl: string;
  gatewayUrl?: string;
  aclAddress?: string;
}

export interface EncryptionResult {
  data: string;
  type: string;
  timestamp: number;
}

export interface ComputationConfig {
  contractAddress: string;
  method: string;
  encryptedInputs: string[];
}
