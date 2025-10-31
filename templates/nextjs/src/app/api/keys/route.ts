import { NextRequest, NextResponse } from 'next/server';
import { createFhevmClient } from '@fhevm/sdk';

export async function GET(request: NextRequest) {
  try {
    const client = createFhevmClient({
      network: {
        chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
        name: 'Sepolia',
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
      },
    });

    await client.init();
    const publicKey = client.getPublicKey();

    return NextResponse.json({
      success: true,
      data: {
        publicKey: publicKey ? Array.from(publicKey) : null,
        hasKey: !!publicKey,
      },
    });
  } catch (error) {
    console.error('Key retrieval error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to retrieve keys' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Key generation is handled automatically during initialization
    return NextResponse.json({
      success: true,
      message: 'Keys are generated automatically during FHEVM initialization',
    });
  } catch (error) {
    console.error('Key generation error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Key generation failed' },
      { status: 500 }
    );
  }
}
