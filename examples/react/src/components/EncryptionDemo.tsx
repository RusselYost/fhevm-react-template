import { useState } from 'react';
import { useFhevm } from '@fhevm/sdk/react';
import type { FhevmConfig, EncryptType } from '@fhevm/sdk';

interface EncryptionDemoProps {
  config: FhevmConfig;
}

export default function EncryptionDemo({ config }: EncryptionDemoProps) {
  const { encrypt, isLoading } = useFhevm(config);
  const [value, setValue] = useState('');
  const [type, setType] = useState<EncryptType>('uint16');
  const [encryptedData, setEncryptedData] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleEncrypt = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEncryptedData('');

    try {
      let valueToEncrypt: number | bigint | boolean | string;

      if (type === 'bool') {
        valueToEncrypt = value.toLowerCase() === 'true';
      } else if (type === 'address') {
        valueToEncrypt = value;
      } else if (type === 'uint64') {
        valueToEncrypt = BigInt(value);
      } else {
        valueToEncrypt = parseInt(value, 10);
      }

      const result = await encrypt(valueToEncrypt, type);
      setEncryptedData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed');
    }
  };

  return (
    <div className="card">
      <h2>🔒 Encrypt Data</h2>
      <form onSubmit={handleEncrypt}>
        <div className="form-group">
          <label htmlFor="encrypt-type">Data Type</label>
          <select
            id="encrypt-type"
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value as EncryptType)}
          >
            <option value="uint8">uint8 (0-255)</option>
            <option value="uint16">uint16 (0-65535)</option>
            <option value="uint32">uint32 (0-4294967295)</option>
            <option value="uint64">uint64 (0-2^64-1)</option>
            <option value="bool">bool (true/false)</option>
            <option value="address">address (0x...)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="encrypt-value">Value to Encrypt</label>
          <input
            id="encrypt-value"
            type="text"
            className="input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              type === 'bool' ? 'true or false' :
              type === 'address' ? '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb' :
              '42'
            }
            required
          />
        </div>

        <button
          type="submit"
          className="button"
          disabled={isLoading || !value}
        >
          {isLoading ? 'Encrypting...' : 'Encrypt'}
        </button>
      </form>

      {error && (
        <div className="error" style={{ marginTop: '16px' }}>
          {error}
        </div>
      )}

      {encryptedData && (
        <div className="success" style={{ marginTop: '16px' }}>
          <strong>Encrypted Data:</strong>
          <div style={{
            wordBreak: 'break-all',
            marginTop: '8px',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {encryptedData}
          </div>
        </div>
      )}
    </div>
  );
}
