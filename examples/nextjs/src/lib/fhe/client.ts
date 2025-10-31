import { createFhevmClient } from '@fhevm/sdk';
import type { FhevmConfig, EncryptType, EncryptableValue } from '@fhevm/sdk';

/**
 * Client-side FHE operations
 */
export class FHEClient {
  private client: ReturnType<typeof createFhevmClient>;

  constructor(config: FhevmConfig) {
    this.client = createFhevmClient(config);
  }

  async initialize(provider?: any) {
    await this.client.init(provider);
  }

  async encrypt(value: EncryptableValue, type: EncryptType) {
    return await this.client.encrypt(value, type);
  }

  async decrypt(contractAddress: string, ciphertext: Uint8Array) {
    return await this.client.decrypt(contractAddress, ciphertext);
  }

  getPublicKey() {
    return this.client.getPublicKey();
  }

  isInitialized() {
    return this.client.instance !== null;
  }
}

/**
 * Create a new FHE client instance
 */
export const createFHEClient = (config: FhevmConfig) => {
  return new FHEClient(config);
};
