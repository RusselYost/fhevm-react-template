<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFhevm } from '@fhevm/sdk/vue';
import EncryptionDemo from './components/EncryptionDemo.vue';
import DecryptionDemo from './components/DecryptionDemo.vue';

const config = {
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/YOUR_KEY'
  }
};

const { isInitialized, isLoading, error, init } = useFhevm(config);
const hasInitialized = ref(false);

const handleInit = async () => {
  try {
    await init((window as any).ethereum);
    hasInitialized.value = true;
  } catch (err) {
    console.error('Failed to initialize FHEVM:', err);
  }
};
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>🔐 Vue FHEVM Example</h1>
      <p>Fully Homomorphic Encryption for Vue Applications</p>
    </header>

    <div class="container">
      <div v-if="!hasInitialized" class="card">
        <h2>Initialize FHEVM SDK</h2>
        <p style="margin-bottom: 16px; color: #666">
          Click the button below to initialize the FHEVM SDK and start encrypting data.
        </p>
        <button
          class="button"
          @click="handleInit"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Initializing...' : 'Initialize FHEVM' }}
        </button>
        <div v-if="error" class="error" style="margin-top: 16px">
          Error: {{ error.message }}
        </div>
      </div>

      <template v-if="hasInitialized && isInitialized">
        <div class="success-banner">
          ✅ FHEVM SDK initialized successfully! You can now encrypt and decrypt data.
        </div>

        <div class="demo-grid">
          <EncryptionDemo :config="config" />
          <DecryptionDemo :config="config" />
        </div>

        <div class="card info-card">
          <h2>About This Example</h2>
          <p>
            This Vue application demonstrates the Universal FHEVM SDK for building
            confidential applications with Fully Homomorphic Encryption.
          </p>
          <ul>
            <li>✅ Simple Vue 3 Composition API integration</li>
            <li>✅ Type-safe encryption/decryption</li>
            <li>✅ Support for multiple data types (uint8, uint16, uint32, uint64, bool, address)</li>
            <li>✅ Built on Zama's FHEVM technology</li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
