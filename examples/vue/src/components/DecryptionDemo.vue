<script setup lang="ts">
import { ref } from 'vue';
import { useFhevm } from '@fhevm/sdk/vue';
import type { FhevmConfig } from '@fhevm/sdk';

interface Props {
  config: FhevmConfig;
}

const props = defineProps<Props>();

const { decrypt, isLoading } = useFhevm(props.config);
const encryptedValue = ref('');
const contractAddress = ref('');
const decryptedData = ref('');
const error = ref('');

const handleDecrypt = async () => {
  error.value = '';
  decryptedData.value = '';

  try {
    const result = await decrypt(contractAddress.value, encryptedValue.value);
    decryptedData.value = result.toString();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Decryption failed';
  }
};
</script>

<template>
  <div class="card">
    <h2>🔓 Decrypt Data</h2>
    <form @submit.prevent="handleDecrypt">
      <div class="form-group">
        <label for="decrypt-contract">Contract Address</label>
        <input
          id="decrypt-contract"
          v-model="contractAddress"
          type="text"
          class="input"
          placeholder="0x..."
          required
        />
      </div>

      <div class="form-group">
        <label for="decrypt-value">Encrypted Value (hex)</label>
        <textarea
          id="decrypt-value"
          v-model="encryptedValue"
          class="input"
          placeholder="0x..."
          rows="4"
          required
          style="resize: vertical"
        />
      </div>

      <button
        type="submit"
        class="button"
        :disabled="isLoading || !encryptedValue || !contractAddress"
      >
        {{ isLoading ? 'Decrypting...' : 'Decrypt' }}
      </button>
    </form>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="decryptedData" class="success">
      <strong>Decrypted Value:</strong>
      <div style="margin-top: 8px; font-size: 20px; font-weight: 600">
        {{ decryptedData }}
      </div>
    </div>
  </div>
</template>
