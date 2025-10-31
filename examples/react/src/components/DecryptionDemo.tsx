import { useState } from 'react';
import { useFhevm } from '@fhevm/sdk/react';
import type { FhevmConfig } from '@fhevm/sdk';

interface DecryptionDemoProps {
  config: FhevmConfig;
}

export default function DecryptionDemo({ config }: DecryptionDemoProps) {
  const { decrypt, isLoading } = useFhevm(config);
  const [encryptedValue, setEncryptedValue] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [decryptedData, setDecryptedData] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleDecrypt = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDecryptedData('');

    try {
      const result = await decrypt(contractAddress, encryptedValue);
      setDecryptedData(result.toString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decryption failed');
    }
  };

  return (
    <div className="card">
      <h2>🔓 Decrypt Data</h2>
      <form onSubmit={handleDecrypt}>
        <div className="form-group">
          <label htmlFor="decrypt-contract">Contract Address</label>
          <input
            id="decrypt-contract"
            type="text"
            className="input"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="decrypt-value">Encrypted Value (hex)</label>
          <textarea
            id="decrypt-value"
            className="input"
            value={encryptedValue}
            onChange={(e) => setEncryptedValue(e.target.value)}
            placeholder="0x..."
            rows={4}
            required
            style={{ resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          className="button"
          disabled={isLoading || !encryptedValue || !contractAddress}
        >
          {isLoading ? 'Decrypting...' : 'Decrypt'}
        </button>
      </form>

      {error && (
        <div className="error" style={{ marginTop: '16px' }}>
          {error}
        </div>
      )}

      {decryptedData && (
        <div className="success" style={{ marginTop: '16px' }}>
          <strong>Decrypted Value:</strong>
          <div style={{
            marginTop: '8px',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            {decryptedData}
          </div>
        </div>
      )}
    </div>
  );
}
