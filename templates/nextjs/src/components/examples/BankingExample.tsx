'use client';

import React, { useState } from 'react';
import { useFHE } from '../fhe/FHEProvider';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const BankingExample: React.FC = () => {
  const { encrypt, isInitialized } = useFHE();
  const [amount, setAmount] = useState('');
  const [encryptedBalance, setEncryptedBalance] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEncryptBalance = async () => {
    if (!amount) return;

    setIsLoading(true);
    try {
      const amountValue = parseInt(amount, 10);
      const result = await encrypt(amountValue, 'uint32');
      setEncryptedBalance(result.data);
    } catch (error) {
      console.error('Encryption failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      title="Private Banking"
      description="Confidential account balance management"
    >
      <div className="space-y-4">
        <Input
          label="Account Balance ($)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />

        <Button
          onClick={handleEncryptBalance}
          disabled={!isInitialized || isLoading}
          className="w-full"
        >
          {isLoading ? 'Encrypting...' : 'Encrypt Balance'}
        </Button>

        {encryptedBalance && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
              Encrypted Balance
            </p>
            <p className="text-xs text-green-700 dark:text-green-300 break-all font-mono">
              {encryptedBalance.substring(0, 60)}...
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">
              Your balance is now encrypted and can be stored on-chain without revealing the actual amount.
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          <p className="font-medium mb-1">Use Case:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Private account balances</li>
            <li>Confidential transaction amounts</li>
            <li>Hidden credit scores</li>
            <li>Encrypted salary payments</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
