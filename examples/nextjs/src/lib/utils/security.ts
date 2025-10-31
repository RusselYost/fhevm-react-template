/**
 * Security utilities for FHE operations
 */

/**
 * Sanitize user input before encryption
 */
export const sanitizeInput = (value: string): string => {
  return value.trim().replace(/[^\w\s.-]/gi, '');
};

/**
 * Validate contract address
 */
export const isValidContractAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Check if value is within bounds for type
 */
export const isValueInBounds = (value: number, type: string): boolean => {
  switch (type) {
    case 'uint8':
      return value >= 0 && value <= 255;
    case 'uint16':
      return value >= 0 && value <= 65535;
    case 'uint32':
      return value >= 0 && value <= 4294967295;
    case 'uint64':
      return value >= 0 && value <= Number.MAX_SAFE_INTEGER;
    default:
      return false;
  }
};

/**
 * Rate limit check (simple implementation)
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  check(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    const validRequests = requests.filter((time) => now - time < this.windowMs);

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
}
