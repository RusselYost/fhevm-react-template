import { createFhevmClient } from '@fhevm/sdk';
import { config } from '../config';

async function encryptExample() {
  console.log('🔒 Encryption Example\n');
  console.log('='.repeat(50));

  try {
    // Create and initialize client
    const client = createFhevmClient(config);
    await client.init();
    console.log('✅ Client initialized\n');

    // Encrypt different types
    const examples = [
      { value: 255, type: 'uint8' as const, description: 'Maximum uint8 value' },
      { value: 42, type: 'uint16' as const, description: 'Answer to everything' },
      { value: 1000000, type: 'uint32' as const, description: 'Large number' },
      { value: 9007199254740991n, type: 'uint64' as const, description: 'BigInt value' },
      { value: true, type: 'bool' as const, description: 'Boolean true' },
      { value: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', type: 'address' as const, description: 'Ethereum address' }
    ];

    console.log('Encrypting values:\n');

    for (const example of examples) {
      const encrypted = await client.encrypt(example.value, example.type);
      console.log(`✅ ${example.description}`);
      console.log(`   Type: ${example.type}`);
      console.log(`   Value: ${example.value}`);
      console.log(`   Encrypted: ${encrypted.data.substring(0, 40)}...`);
      console.log();
    }

    console.log('✅ All encryptions completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

encryptExample();
