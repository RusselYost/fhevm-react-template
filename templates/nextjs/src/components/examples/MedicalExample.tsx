'use client';

import React, { useState } from 'react';
import { useFHE } from '../fhe/FHEProvider';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const MedicalExample: React.FC = () => {
  const { encrypt, isInitialized } = useFHE();
  const [age, setAge] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [hasCondition, setHasCondition] = useState(false);
  const [encryptedData, setEncryptedData] = useState<{
    age: string;
    heartRate: string;
    condition: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEncryptMedicalData = async () => {
    if (!age || !heartRate) return;

    setIsLoading(true);
    try {
      const ageValue = parseInt(age, 10);
      const heartRateValue = parseInt(heartRate, 10);

      const [ageResult, hrResult, conditionResult] = await Promise.all([
        encrypt(ageValue, 'uint8'),
        encrypt(heartRateValue, 'uint16'),
        encrypt(hasCondition, 'bool'),
      ]);

      setEncryptedData({
        age: ageResult.data,
        heartRate: hrResult.data,
        condition: conditionResult.data,
      });
    } catch (error) {
      console.error('Encryption failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      title="Private Healthcare"
      description="Confidential medical records on blockchain"
    >
      <div className="space-y-4">
        <Input
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter age"
        />

        <Input
          label="Heart Rate (bpm)"
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          placeholder="Enter heart rate"
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="condition"
            checked={hasCondition}
            onChange={(e) => setHasCondition(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="condition" className="text-sm text-gray-700 dark:text-gray-300">
            Has pre-existing condition
          </label>
        </div>

        <Button
          onClick={handleEncryptMedicalData}
          disabled={!isInitialized || isLoading}
          className="w-full"
        >
          {isLoading ? 'Encrypting...' : 'Encrypt Medical Data'}
        </Button>

        {encryptedData && (
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                Age: Encrypted
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                Heart Rate: Encrypted
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                Condition: Encrypted
              </p>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">
              All medical data encrypted and ready for secure on-chain storage!
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          <p className="font-medium mb-1">Use Case:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Private health records</li>
            <li>Confidential diagnoses</li>
            <li>Encrypted prescriptions</li>
            <li>Anonymous health analytics</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
