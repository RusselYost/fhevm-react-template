/**
 * Key management utilities
 */

/**
 * Convert public key to hex string
 */
export const publicKeyToHex = (publicKey: Uint8Array): string => {
  return Array.from(publicKey)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Convert hex string to public key
 */
export const hexToPublicKey = (hex: string): Uint8Array => {
  const bytes = hex.match(/.{1,2}/g);
  if (!bytes) throw new Error('Invalid hex string');
  return new Uint8Array(bytes.map((byte) => parseInt(byte, 16)));
};

/**
 * Validate public key format
 */
export const isValidPublicKey = (key: any): key is Uint8Array => {
  return key instanceof Uint8Array && key.length > 0;
};

/**
 * Get key info for display
 */
export const getKeyInfo = (publicKey: Uint8Array) => {
  return {
    length: publicKey.length,
    firstBytes: Array.from(publicKey.slice(0, 8)),
    hex: publicKeyToHex(publicKey).slice(0, 32) + '...',
  };
};
