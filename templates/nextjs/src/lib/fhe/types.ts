/**
 * FHE-specific type definitions for the Next.js example
 */

export type EncryptType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address';

export interface EncryptedValue {
  data: string;
  type: EncryptType;
}

export interface DecryptRequest {
  contractAddress: string;
  ciphertext: Uint8Array;
}

export interface FHEOperation {
  id: string;
  type: 'encrypt' | 'decrypt' | 'compute';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  timestamp: number;
  data?: any;
  error?: string;
}

export interface ComputationRequest {
  operation: 'add' | 'sub' | 'mul' | 'div' | 'eq' | 'gt' | 'lt';
  operand1: EncryptedValue;
  operand2: EncryptedValue;
  contractAddress: string;
}
