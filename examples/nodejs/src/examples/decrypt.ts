import { createFhevmClient } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';
import { config, privateKey, contractAddress } from '../config';

async function decryptExample() {
  console.log('🔓 Decryption Example\n');
  console.log('='.repeat(50));

  if (!privateKey) {
    console.error('❌ Error: PRIVATE_KEY not set in .env file');
    process.exit(1);
  }

  if (!contractAddress) {
    console.error('❌ Error: CONTRACT_ADDRESS not set in .env file');
    process.exit(1);
  }

  try {
    // Create provider and wallet
    const provider = new JsonRpcProvider(config.network.rpcUrl);
    const wallet = new Wallet(privateKey, provider);

    console.log('📝 Using wallet:', wallet.address);
    console.log('📝 Contract address:', contractAddress);
    console.log();

    // Create and initialize client
    const client = createFhevmClient(config);
    await client.init(provider);
    console.log('✅ Client initialized\n');

    console.log('Note: This example requires an encrypted value from a contract.');
    console.log('To decrypt a value:');
    console.log('1. First encrypt a value and store it in a contract');
    console.log('2. Get the encrypted handle from the contract');
    console.log('3. Use client.decrypt(contractAddress, encryptedHandle)');
    console.log('\nExample usage:');
    console.log('  const encrypted = await contract.getEncryptedValue();');
    console.log('  const decrypted = await client.decrypt(contractAddress, encrypted);');
    console.log('  console.log("Decrypted value:", decrypted);');

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

decryptExample();
