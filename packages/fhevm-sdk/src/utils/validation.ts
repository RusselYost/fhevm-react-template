/**
 * Validation utilities for FHEVM operations
 */

import type { EncryptType, EncryptableValue } from '../types';

const VALID_ENCRYPT_TYPES: EncryptType[] = ['uint8', 'uint16', 'uint32', 'uint64', 'bool', 'address'];

/**
 * Validate encryption type
 */
export function validateEncryptType(type: string): type is EncryptType {
  return VALID_ENCRYPT_TYPES.includes(type as EncryptType);
}

/**
 * Validate Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate value matches encryption type
 */
export function validateValueForType(value: EncryptableValue, type: EncryptType): boolean {
  switch (type) {
    case 'uint8':
      return typeof value === 'number' && value >= 0 && value <= 255 && Number.isInteger(value);
    case 'uint16':
      return typeof value === 'number' && value >= 0 && value <= 65535 && Number.isInteger(value);
    case 'uint32':
      return typeof value === 'number' && value >= 0 && value <= 4294967295 && Number.isInteger(value);
    case 'uint64':
      if (typeof value === 'bigint') {
        return value >= 0n && value <= 18446744073709551615n;
      }
      if (typeof value === 'number') {
        return value >= 0 && Number.isInteger(value);
      }
      return false;
    case 'bool':
      return typeof value === 'boolean';
    case 'address':
      return typeof value === 'string' && isValidAddress(value);
    default:
      return false;
  }
}

/**
 * Validate gateway URL format
 */
export function isValidGatewayUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate RPC URL format
 */
export function isValidRpcUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' || parsed.protocol === 'ws:' || parsed.protocol === 'wss:';
  } catch {
    return false;
  }
}

/**
 * Validate chain ID
 */
export function isValidChainId(chainId: number): boolean {
  return Number.isInteger(chainId) && chainId > 0;
}

/**
 * Get type bounds for display
 */
export function getTypeBounds(type: EncryptType): { min: bigint | number | boolean; max: bigint | number | boolean } | null {
  switch (type) {
    case 'uint8':
      return { min: 0, max: 255 };
    case 'uint16':
      return { min: 0, max: 65535 };
    case 'uint32':
      return { min: 0, max: 4294967295 };
    case 'uint64':
      return { min: 0n, max: 18446744073709551615n };
    case 'bool':
      return { min: false, max: true };
    default:
      return null;
  }
}
