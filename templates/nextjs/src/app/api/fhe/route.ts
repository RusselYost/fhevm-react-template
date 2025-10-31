import { NextRequest, NextResponse } from 'next/server';
import { createFhevmClient } from '@fhevm/sdk';

export async function POST(request: NextRequest) {
  try {
    const { operation, value, type } = await request.json();

    const client = createFhevmClient({
      network: {
        chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
        name: 'Sepolia',
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
      },
    });

    if (operation === 'encrypt') {
      await client.init();
      const encrypted = await client.encrypt(value, type);

      return NextResponse.json({
        success: true,
        data: {
          encryptedData: encrypted.data,
          type: encrypted.type,
        },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid operation' },
      { status: 400 }
    );
  } catch (error) {
    console.error('FHE API error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
