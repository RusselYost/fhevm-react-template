import { useState } from 'react';
import { useFhevm } from '@fhevm/sdk/react';
import EncryptionDemo from './components/EncryptionDemo';
import DecryptionDemo from './components/DecryptionDemo';
import './App.css';

const config = {
  network: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/YOUR_KEY'
  }
};

function App() {
  const { isInitialized, isLoading, error, init } = useFhevm(config);
  const [hasInitialized, setHasInitialized] = useState(false);

  const handleInit = async () => {
    try {
      await init(window.ethereum);
      setHasInitialized(true);
    } catch (err) {
      console.error('Failed to initialize FHEVM:', err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔐 React FHEVM Example</h1>
        <p>Fully Homomorphic Encryption for React Applications</p>
      </header>

      <div className="container">
        {!hasInitialized && (
          <div className="card">
            <h2>Initialize FHEVM SDK</h2>
            <p style={{ marginBottom: '16px', color: '#666' }}>
              Click the button below to initialize the FHEVM SDK and start encrypting data.
            </p>
            <button
              className="button"
              onClick={handleInit}
              disabled={isLoading}
            >
              {isLoading ? 'Initializing...' : 'Initialize FHEVM'}
            </button>
            {error && (
              <div className="error" style={{ marginTop: '16px' }}>
                Error: {error.message}
              </div>
            )}
          </div>
        )}

        {hasInitialized && isInitialized && (
          <>
            <div className="success-banner">
              ✅ FHEVM SDK initialized successfully! You can now encrypt and decrypt data.
            </div>

            <div className="demo-grid">
              <EncryptionDemo config={config} />
              <DecryptionDemo config={config} />
            </div>

            <div className="card info-card">
              <h2>About This Example</h2>
              <p>
                This React application demonstrates the Universal FHEVM SDK for building
                confidential applications with Fully Homomorphic Encryption.
              </p>
              <ul>
                <li>✅ Simple React integration with hooks</li>
                <li>✅ Type-safe encryption/decryption</li>
                <li>✅ Support for multiple data types (uint8, uint16, uint32, uint64, bool, address)</li>
                <li>✅ Built on Zama's FHEVM technology</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
