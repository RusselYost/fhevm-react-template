/**
 * Formatting utilities for encrypted values
 */

import type { EncryptedValue } from '../types';

/**
 * Format encrypted value for display
 * Converts Uint8Array to hex string
 */
export function formatEncryptedValue(encrypted: EncryptedValue): string {
  const hex = Array.from(encrypted.data)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return `0x${hex}`;
}

/**
 * Parse encrypted value from hex string
 * Converts hex string back to Uint8Array
 */
export function parseEncryptedValue(
  hexString: string,
  type: EncryptedValue['type'],
  publicKey: string
): EncryptedValue {
  const cleanHex = hexString.startsWith('0x') ? hexString.slice(2) : hexString;
  const bytes = new Uint8Array(cleanHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []);

  return {
    data: bytes,
    type,
    publicKey,
  };
}

/**
 * Format encrypted value for contract input
 * Returns the data field ready for contract calls
 */
export function toContractInput(encrypted: EncryptedValue): Uint8Array {
  return encrypted.data;
}

/**
 * Format decrypted value for display
 * Converts bigint to readable format based on type
 */
export function formatDecryptedValue(
  value: bigint,
  type: EncryptedValue['type']
): string | number | boolean {
  switch (type) {
    case 'bool':
      return value !== 0n;
    case 'address':
      return `0x${value.toString(16).padStart(40, '0')}`;
    case 'uint8':
    case 'uint16':
    case 'uint32':
      return Number(value);
    case 'uint64':
      return value.toString();
    default:
      return value.toString();
  }
}
