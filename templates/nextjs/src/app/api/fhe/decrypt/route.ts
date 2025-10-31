import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { encryptedData, contractAddress } = await request.json();

    if (!encryptedData || !contractAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters: encryptedData and contractAddress' },
        { status: 400 }
      );
    }

    // Note: Actual decryption requires the gateway service
    // This is a placeholder showing the structure
    return NextResponse.json({
      success: true,
      message: 'Decryption requires client-side signature with gateway',
      note: 'Use useFhevm hook with decrypt() function on client side',
    });
  } catch (error) {
    console.error('Decryption error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Decryption failed' },
      { status: 500 }
    );
  }
}
