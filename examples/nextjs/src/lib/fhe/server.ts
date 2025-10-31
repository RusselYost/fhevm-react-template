import { createFhevmClient } from '@fhevm/sdk';
import type { FhevmConfig } from '@fhevm/sdk';

/**
 * Server-side FHE operations
 * Use this for server-side encryption in API routes
 */
export class FHEServerClient {
  private static instance: FHEServerClient | null = null;
  private client: ReturnType<typeof createFhevmClient>;
  private initialized = false;

  private constructor(config: FhevmConfig) {
    this.client = createFhevmClient(config);
  }

  static getInstance(config: FhevmConfig): FHEServerClient {
    if (!FHEServerClient.instance) {
      FHEServerClient.instance = new FHEServerClient(config);
    }
    return FHEServerClient.instance;
  }

  async initialize() {
    if (!this.initialized) {
      await this.client.init();
      this.initialized = true;
    }
  }

  async encrypt(value: any, type: any) {
    if (!this.initialized) {
      await this.initialize();
    }
    return await this.client.encrypt(value, type);
  }

  getPublicKey() {
    return this.client.getPublicKey();
  }
}

/**
 * Get or create server FHE client
 */
export const getServerFHEClient = (config: FhevmConfig) => {
  return FHEServerClient.getInstance(config);
};
