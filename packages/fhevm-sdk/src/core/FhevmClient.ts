/**
 * Universal FHEVM Client
 * Framework-agnostic core for encrypted computations
 */

import { createInstance, initGateway } from 'fhevmjs';
import { BrowserProvider, type Eip1193Provider } from 'ethers';
import type {
  FhevmConfig,
  FhevmInstance,
  EncryptedValue,
  DecryptionRequest,
  FhevmError,
} from '../types';

export class FhevmClient {
  private instance: FhevmInstance | null = null;
  private config: FhevmConfig;
  private provider: BrowserProvider | null = null;
  private publicKey: string | null = null;

  constructor(config: FhevmConfig) {
    this.config = config;
  }

  /**
   * Initialize FHEVM instance
   */
  async init(provider?: Eip1193Provider | BrowserProvider): Promise<void> {
    try {
      // Set provider
      if (provider) {
        this.provider =
          provider instanceof BrowserProvider ? provider : new BrowserProvider(provider);
      }

      // Create FHEVM instance
      this.instance = await createInstance({
        chainId: this.config.network.chainId,
        networkUrl: this.config.network.rpcUrl,
        gatewayUrl: this.config.gatewayUrl,
        aclAddress: this.config.aclAddress,
      });

      // Get public key
      this.publicKey = this.instance.getPublicKey();

      // Initialize gateway if configured
      if (this.config.gatewayUrl && this.provider) {
        const signer = await this.provider.getSigner();
        await initGateway({
          gatewayUrl: this.config.gatewayUrl,
          signer,
        });
      }
    } catch (error) {
      const fhevmError: FhevmError = error instanceof Error ? error : new Error(String(error));
      fhevmError.code = 'INIT_FAILED';
      throw fhevmError;
    }
  }

  /**
   * Check if initialized
   */
  isInitialized(): boolean {
    return this.instance !== null && this.publicKey !== null;
  }

  /**
   * Get FHEVM instance
   */
  getInstance(): FhevmInstance {
    if (!this.instance) {
      throw new Error('FHEVM not initialized. Call init() first.');
    }
    return this.instance;
  }

  /**
   * Get public key
   */
  getPublicKey(): string {
    if (!this.publicKey) {
      throw new Error('FHEVM not initialized. Call init() first.');
    }
    return this.publicKey;
  }

  /**
   * Encrypt a value
   */
  async encrypt<T extends number | bigint | boolean | string>(
    value: T,
    type: EncryptedValue['type']
  ): Promise<EncryptedValue> {
    const instance = this.getInstance();
    const publicKey = this.getPublicKey();

    try {
      let data: Uint8Array;

      switch (type) {
        case 'uint8':
          data = await instance.encrypt_uint8(value as number);
          break;
        case 'uint16':
          data = await instance.encrypt_uint16(value as number);
          break;
        case 'uint32':
          data = await instance.encrypt_uint32(value as number);
          break;
        case 'uint64':
          data = await instance.encrypt_uint64(BigInt(value));
          break;
        case 'bool':
          data = await instance.encrypt_bool(value as boolean);
          break;
        case 'address':
          data = await instance.encrypt_address(value as string);
          break;
        default:
          throw new Error(`Unsupported encryption type: ${type}`);
      }

      return {
        data,
        type,
        publicKey,
      };
    } catch (error) {
      const fhevmError: FhevmError = error instanceof Error ? error : new Error(String(error));
      fhevmError.code = 'ENCRYPTION_FAILED';
      fhevmError.details = { value, type };
      throw fhevmError;
    }
  }

  /**
   * Decrypt a value
   */
  async decrypt(request: DecryptionRequest): Promise<bigint> {
    const instance = this.getInstance();

    try {
      if (!this.provider) {
        throw new Error('Provider not set. Initialize with a provider for decryption.');
      }

      const signer = await this.provider.getSigner();
      const address = await signer.getAddress();

      if (address.toLowerCase() !== request.userAddress.toLowerCase()) {
        throw new Error('Signer address does not match user address');
      }

      // Convert ciphertext from hex string to Uint8Array
      const ciphertext =
        typeof request.ciphertext === 'string'
          ? Uint8Array.from(Buffer.from(request.ciphertext.replace('0x', ''), 'hex'))
          : request.ciphertext;

      const decrypted = await instance.decrypt(ciphertext);
      return decrypted;
    } catch (error) {
      const fhevmError: FhevmError = error instanceof Error ? error : new Error(String(error));
      fhevmError.code = 'DECRYPTION_FAILED';
      fhevmError.details = request;
      throw fhevmError;
    }
  }

  /**
   * Get signer from provider
   */
  async getSigner() {
    if (!this.provider) {
      throw new Error('Provider not set');
    }
    return this.provider.getSigner();
  }

  /**
   * Set provider
   */
  setProvider(provider: Eip1193Provider | BrowserProvider): void {
    this.provider = provider instanceof BrowserProvider ? provider : new BrowserProvider(provider);
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<FhevmConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Reset instance (for re-initialization)
   */
  reset(): void {
    this.instance = null;
    this.publicKey = null;
  }
}

/**
 * Create a new FHEVM client instance
 */
export function createFhevmClient(config: FhevmConfig): FhevmClient {
  return new FhevmClient(config);
}
