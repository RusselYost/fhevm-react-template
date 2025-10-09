/**
 * Universal FHEVM SDK Types
 * Framework-agnostic type definitions for encrypted computations
 */

import type { BrowserProvider, Eip1193Provider } from 'ethers';

export interface FhevmConfig {
  /** Network configuration */
  network: {
    chainId: number;
    name: string;
    rpcUrl: string;
  };
  /** Gateway URL for decryption */
  gatewayUrl?: string;
  /** Contract addresses */
  contracts?: {
    gateway?: string;
    kmsVerifier?: string;
    [key: string]: string | undefined;
  };
  /** ACL contract address */
  aclAddress?: string;
}

export interface FhevmInstance {
  /** Encrypt a uint8 value */
  encrypt_uint8: (value: number) => Promise<Uint8Array>;
  /** Encrypt a uint16 value */
  encrypt_uint16: (value: number) => Promise<Uint8Array>;
  /** Encrypt a uint32 value */
  encrypt_uint32: (value: number) => Promise<Uint8Array>;
  /** Encrypt a uint64 value */
  encrypt_uint64: (value: bigint) => Promise<Uint8Array>;
  /** Encrypt a boolean value */
  encrypt_bool: (value: boolean) => Promise<Uint8Array>;
  /** Encrypt an address */
  encrypt_address: (value: string) => Promise<Uint8Array>;
  /** Get public key */
  getPublicKey: () => string;
  /** Decrypt a value */
  decrypt: (ciphertext: Uint8Array) => Promise<bigint>;
}

export interface EncryptedValue {
  /** Encrypted data */
  data: Uint8Array;
  /** Type of encrypted value */
  type: 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address';
  /** Public key used for encryption */
  publicKey: string;
}

export interface DecryptionRequest {
  /** Contract address */
  contractAddress: string;
  /** User address */
  userAddress: string;
  /** Ciphertext to decrypt */
  ciphertext: string;
  /** Signature for authentication */
  signature?: string;
}

export interface FhevmContext {
  /** FHEVM instance */
  instance: FhevmInstance | null;
  /** Is initialized */
  isInitialized: boolean;
  /** Is loading */
  isLoading: boolean;
  /** Error if any */
  error: Error | null;
  /** Initialize FHEVM */
  init: () => Promise<void>;
  /** Encrypt a value */
  encrypt: <T extends number | bigint | boolean | string>(
    value: T,
    type: EncryptedValue['type']
  ) => Promise<EncryptedValue>;
  /** Decrypt a value */
  decrypt: (request: DecryptionRequest) => Promise<bigint>;
  /** Get signer */
  getSigner: () => Promise<any>;
}

export interface UseEncryptOptions {
  /** Auto-initialize on mount */
  autoInit?: boolean;
  /** Network configuration */
  network?: FhevmConfig['network'];
  /** Provider */
  provider?: Eip1193Provider | BrowserProvider;
}

export interface EncryptHookResult {
  /** Encrypt function */
  encrypt: FhevmContext['encrypt'];
  /** Is loading */
  isLoading: boolean;
  /** Error */
  error: Error | null;
  /** Is ready */
  isReady: boolean;
}

export interface DecryptHookResult {
  /** Decrypt function */
  decrypt: FhevmContext['decrypt'];
  /** Decrypted value */
  value: bigint | null;
  /** Is loading */
  isLoading: boolean;
  /** Error */
  error: Error | null;
}

export interface ContractCallOptions {
  /** Contract address */
  address: string;
  /** Contract ABI */
  abi: any[];
  /** Function name */
  functionName: string;
  /** Arguments */
  args?: any[];
  /** Encrypted arguments (will be auto-encrypted) */
  encryptedArgs?: Array<{
    value: number | bigint | boolean | string;
    type: EncryptedValue['type'];
  }>;
  /** Value to send */
  value?: bigint;
}

export interface FhevmError extends Error {
  code?: string;
  details?: any;
}

export type EncryptType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address';

export type EncryptableValue = number | bigint | boolean | string;
