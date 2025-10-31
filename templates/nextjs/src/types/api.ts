/**
 * API type definitions
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface EncryptRequest {
  value: any;
  type: string;
}

export interface EncryptResponse {
  encryptedData: string;
  type: string;
}

export interface DecryptRequest {
  encryptedData: string;
  contractAddress: string;
}

export interface DecryptResponse {
  decryptedValue: any;
}

export interface ComputeRequest {
  operation: string;
  values: any[];
  contractAddress: string;
}

export interface ComputeResponse {
  result: string;
  operation: string;
}

export interface KeysResponse {
  publicKey: number[] | null;
  hasKey: boolean;
}
