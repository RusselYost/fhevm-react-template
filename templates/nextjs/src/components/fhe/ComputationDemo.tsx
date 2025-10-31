'use client';

import React, { useState } from 'react';
import { useFHE } from './FHEProvider';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const ComputationDemo: React.FC = () => {
  const { encrypt, isInitialized } = useFHE();
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [encrypted1, setEncrypted1] = useState<string>('');
  const [encrypted2, setEncrypted2] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleEncryptBoth = async () => {
    if (!value1 || !value2) {
      setError('Please enter both values');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const num1 = parseInt(value1, 10);
      const num2 = parseInt(value2, 10);

      if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Invalid numbers');
      }

      const result1 = await encrypt(num1, 'uint32');
      const result2 = await encrypt(num2, 'uint32');

      setEncrypted1(result1.data);
      setEncrypted2(result2.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      title="Encrypted Computation"
      description="Encrypt multiple values for homomorphic operations"
    >
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Value 1"
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="Enter first value"
          />
          <Input
            label="Value 2"
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="Enter second value"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          onClick={handleEncryptBoth}
          disabled={!isInitialized || isLoading}
          className="w-full"
        >
          {isLoading ? 'Encrypting...' : 'Encrypt Both Values'}
        </Button>

        {encrypted1 && encrypted2 && (
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
                Encrypted Value 1:
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 break-all font-mono">
                {encrypted1.substring(0, 50)}...
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
                Encrypted Value 2:
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 break-all font-mono">
                {encrypted2.substring(0, 50)}...
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                These encrypted values can now be used in smart contracts for homomorphic operations (addition, multiplication, comparison) without revealing the actual values!
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
