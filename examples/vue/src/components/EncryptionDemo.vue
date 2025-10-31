<script setup lang="ts">
import { ref } from 'vue';
import { useFhevm } from '@fhevm/sdk/vue';
import type { FhevmConfig, EncryptType } from '@fhevm/sdk';

interface Props {
  config: FhevmConfig;
}

const props = defineProps<Props>();

const { encrypt, isLoading } = useFhevm(props.config);
const value = ref('');
const type = ref<EncryptType>('uint16');
const encryptedData = ref('');
const error = ref('');

const handleEncrypt = async () => {
  error.value = '';
  encryptedData.value = '';

  try {
    let valueToEncrypt: number | bigint | boolean | string;

    if (type.value === 'bool') {
      valueToEncrypt = value.value.toLowerCase() === 'true';
    } else if (type.value === 'address') {
      valueToEncrypt = value.value;
    } else if (type.value === 'uint64') {
      valueToEncrypt = BigInt(value.value);
    } else {
      valueToEncrypt = parseInt(value.value, 10);
    }

    const result = await encrypt(valueToEncrypt, type.value);
    encryptedData.value = result.data;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Encryption failed';
  }
};

const getPlaceholder = () => {
  if (type.value === 'bool') return 'true or false';
  if (type.value === 'address') return '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
  return '42';
};
</script>

<template>
  <div class="card">
    <h2>🔒 Encrypt Data</h2>
    <form @submit.prevent="handleEncrypt">
      <div class="form-group">
        <label for="encrypt-type">Data Type</label>
        <select
          id="encrypt-type"
          v-model="type"
          class="input"
        >
          <option value="uint8">uint8 (0-255)</option>
          <option value="uint16">uint16 (0-65535)</option>
          <option value="uint32">uint32 (0-4294967295)</option>
          <option value="uint64">uint64 (0-2^64-1)</option>
          <option value="bool">bool (true/false)</option>
          <option value="address">address (0x...)</option>
        </select>
      </div>

      <div class="form-group">
        <label for="encrypt-value">Value to Encrypt</label>
        <input
          id="encrypt-value"
          v-model="value"
          type="text"
          class="input"
          :placeholder="getPlaceholder()"
          required
        />
      </div>

      <button
        type="submit"
        class="button"
        :disabled="isLoading || !value"
      >
        {{ isLoading ? 'Encrypting...' : 'Encrypt' }}
      </button>
    </form>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="encryptedData" class="success">
      <strong>Encrypted Data:</strong>
      <div style="word-break: break-all; margin-top: 8px; font-family: monospace; font-size: 12px">
        {{ encryptedData }}
      </div>
    </div>
  </div>
</template>
