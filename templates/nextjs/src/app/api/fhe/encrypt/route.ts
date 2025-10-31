import { NextRequest, NextResponse } from 'next/server';
import { createFhevmClient } from '@fhevm/sdk';

export async function POST(request: NextRequest) {
  try {
    const { value, type } = await request.json();

    if (!value || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters: value and type' },
        { status: 400 }
      );
    }

    const client = createFhevmClient({
      network: {
        chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
        name: 'Sepolia',
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
      },
    });

    await client.init();
    const encrypted = await client.encrypt(value, type);

    return NextResponse.json({
      success: true,
      data: {
        encryptedData: encrypted.data,
        type: encrypted.type,
      },
    });
  } catch (error) {
    console.error('Encryption error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Encryption failed' },
      { status: 500 }
    );
  }
}
