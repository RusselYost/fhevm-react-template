'use client';

import React, { useState } from 'react';
import { useFHE } from './FHEProvider';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { EncryptType } from '@fhevm/sdk';

export const EncryptionDemo: React.FC = () => {
  const { encrypt, isInitialized } = useFHE();
  const [value, setValue] = useState('');
  const [type, setType] = useState<EncryptType>('uint16');
  const [encrypted, setEncrypted] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleEncrypt = async () => {
    if (!value) {
      setError('Please enter a value');
      return;
    }

    setIsLoading(true);
    setError('');
    setEncrypted('');

    try {
      let parsedValue: number | boolean | string = value;

      if (type === 'bool') {
        parsedValue = value.toLowerCase() === 'true';
      } else if (type === 'address') {
        parsedValue = value;
      } else {
        parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
          throw new Error('Invalid number');
        }
      }

      const result = await encrypt(parsedValue, type);
      setEncrypted(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Encrypt Data" description="Encrypt values using FHE">
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Value"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value to encrypt"
            error={error}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as EncryptType)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="uint8">uint8 (0-255)</option>
              <option value="uint16">uint16 (0-65535)</option>
              <option value="uint32">uint32 (0-4294967295)</option>
              <option value="uint64">uint64 (large numbers)</option>
              <option value="bool">bool (true/false)</option>
              <option value="address">address (Ethereum)</option>
            </select>
          </div>
        </div>

        <Button
          onClick={handleEncrypt}
          disabled={!isInitialized || isLoading}
          className="w-full"
        >
          {isLoading ? 'Encrypting...' : 'Encrypt'}
        </Button>

        {encrypted && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
              Encrypted Successfully
            </p>
            <p className="text-xs text-green-700 dark:text-green-300 break-all font-mono">
              {encrypted}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
