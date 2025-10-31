import { createFhevmClient } from '@fhevm/sdk';
import { config } from './config';

async function main() {
  console.log('🔐 FHEVM Node.js Example\n');
  console.log('='.repeat(50));

  try {
    // Create FHEVM client
    console.log('\n1. Creating FHEVM client...');
    const client = createFhevmClient(config);

    // Initialize the client
    console.log('2. Initializing client...');
    await client.init();
    console.log('✅ Client initialized successfully');

    // Example encryption
    console.log('\n3. Encrypting values...');

    const value1 = 42;
    const encrypted1 = await client.encrypt(value1, 'uint16');
    console.log(`   - Encrypted ${value1} (uint16): ${encrypted1.data.substring(0, 20)}...`);

    const value2 = true;
    const encrypted2 = await client.encrypt(value2, 'bool');
    console.log(`   - Encrypted ${value2} (bool): ${encrypted2.data.substring(0, 20)}...`);

    const value3 = 1000n;
    const encrypted3 = await client.encrypt(value3, 'uint64');
    console.log(`   - Encrypted ${value3} (uint64): ${encrypted3.data.substring(0, 20)}...`);

    console.log('\n✅ All operations completed successfully!');
    console.log('\nNext steps:');
    console.log('  - Run encrypt example: npm run example:encrypt');
    console.log('  - Run decrypt example: npm run example:decrypt');
    console.log('  - Run contract example: npm run example:contract');

  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run the main function
main();
