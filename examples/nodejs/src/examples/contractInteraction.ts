import { createFhevmClient } from '@fhevm/sdk';
import { JsonRpcProvider, Wallet, Contract } from 'ethers';
import { config, privateKey, contractAddress } from '../config';

// Example contract ABI - replace with your actual contract ABI
const EXAMPLE_ABI = [
  'function setValue(bytes calldata encryptedValue) external',
  'function getValue() external view returns (bytes memory)'
];

async function contractInteractionExample() {
  console.log('🔗 Contract Interaction Example\n');
  console.log('='.repeat(50));

  if (!privateKey) {
    console.error('❌ Error: PRIVATE_KEY not set in .env file');
    process.exit(1);
  }

  if (!contractAddress || contractAddress === '0x...') {
    console.error('❌ Error: CONTRACT_ADDRESS not set in .env file');
    console.log('\nTo use this example:');
    console.log('1. Deploy your FHEVM-compatible contract');
    console.log('2. Set CONTRACT_ADDRESS in .env file');
    console.log('3. Update EXAMPLE_ABI with your contract ABI');
    process.exit(1);
  }

  try {
    // Setup provider and wallet
    const provider = new JsonRpcProvider(config.network.rpcUrl);
    const wallet = new Wallet(privateKey, provider);

    console.log('📝 Using wallet:', wallet.address);
    console.log('📝 Contract address:', contractAddress);
    console.log();

    // Create FHEVM client
    const client = createFhevmClient(config);
    await client.init(provider);
    console.log('✅ FHEVM client initialized\n');

    // Create contract instance
    const contract = new Contract(contractAddress, EXAMPLE_ABI, wallet);

    // Example: Encrypt a value
    const valueToEncrypt = 42;
    console.log(`🔒 Encrypting value: ${valueToEncrypt}`);
    const encrypted = await client.encrypt(valueToEncrypt, 'uint16');
    console.log(`✅ Encrypted: ${encrypted.data.substring(0, 40)}...\n`);

    // Example: Send encrypted value to contract
    console.log('📤 Sending encrypted value to contract...');
    console.log('Note: This will fail if contract is not deployed');
    console.log('Update this example with your actual contract methods\n');

    // Uncomment when you have a deployed contract:
    // const tx = await contract.setValue(encrypted.data);
    // await tx.wait();
    // console.log('✅ Transaction confirmed:', tx.hash);

    console.log('Example complete!');
    console.log('\nNext steps:');
    console.log('1. Deploy your FHEVM contract');
    console.log('2. Update CONTRACT_ADDRESS in .env');
    console.log('3. Update EXAMPLE_ABI with your contract ABI');
    console.log('4. Uncomment the contract interaction code');

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

contractInteractionExample();
