/**
 * Validation utilities
 */

import type { EncryptType } from '@fhevm/sdk';

/**
 * Validate encryption type
 */
export const isValidEncryptType = (type: string): type is EncryptType => {
  return ['uint8', 'uint16', 'uint32', 'uint64', 'bool', 'address'].includes(type);
};

/**
 * Validate value for encryption type
 */
export const validateValueForType = (value: any, type: EncryptType): boolean => {
  switch (type) {
    case 'uint8':
      return Number.isInteger(value) && value >= 0 && value <= 255;
    case 'uint16':
      return Number.isInteger(value) && value >= 0 && value <= 65535;
    case 'uint32':
      return Number.isInteger(value) && value >= 0 && value <= 4294967295;
    case 'uint64':
      return (
        (typeof value === 'bigint' || Number.isInteger(value)) &&
        value >= 0
      );
    case 'bool':
      return typeof value === 'boolean';
    case 'address':
      return typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value);
    default:
      return false;
  }
};

/**
 * Parse and validate numeric input
 */
export const parseNumericInput = (input: string, type: EncryptType): number | bigint => {
  const value = type === 'uint64' ? BigInt(input) : parseInt(input, 10);

  if (typeof value === 'bigint') {
    if (value < 0n) {
      throw new Error('Value must be non-negative');
    }
    return value;
  }

  if (isNaN(value)) {
    throw new Error('Invalid number');
  }

  if (!validateValueForType(value, type)) {
    throw new Error(`Value out of range for type ${type}`);
  }

  return value;
};

/**
 * Validate API request body
 */
export const validateApiRequest = (body: any, requiredFields: string[]): boolean => {
  if (!body || typeof body !== 'object') {
    return false;
  }

  return requiredFields.every((field) => field in body);
};
