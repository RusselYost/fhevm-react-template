'use client';

import React, { useState, useEffect } from 'react';
import { useFHE } from './FHEProvider';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const KeyManager: React.FC = () => {
  const { instance, isInitialized } = useFHE();
  const [publicKey, setPublicKey] = useState<string>('');

  useEffect(() => {
    if (isInitialized && instance) {
      const key = instance.getPublicKey();
      if (key) {
        setPublicKey(Array.from(key.slice(0, 32)).join(','));
      }
    }
  }, [isInitialized, instance]);

  const handleRefresh = () => {
    if (instance) {
      const key = instance.getPublicKey();
      if (key) {
        setPublicKey(Array.from(key.slice(0, 32)).join(','));
      }
    }
  };

  return (
    <Card title="Key Management" description="FHE public key information">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isInitialized ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {isInitialized ? 'FHEVM Initialized' : 'Not Initialized'}
            </span>
          </div>
          <Button onClick={handleRefresh} size="sm" variant="outline">
            Refresh
          </Button>
        </div>

        {publicKey && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Public Key (first 32 bytes):
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 break-all font-mono">
              {publicKey}
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>The public key is used to encrypt data before sending it to the blockchain. Decryption requires user signature through the gateway service.</p>
        </div>
      </div>
    </Card>
  );
};
