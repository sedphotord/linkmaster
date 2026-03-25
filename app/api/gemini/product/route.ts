import { NextRequest, NextResponse } from 'next/server';
import { optimizeProductDescription } from '@/lib/gemini';

export async function POST(request: NextRequest) {
    try {
        const { productName, currentDescription } = await request.json();

        if (!productName) {
            return NextResponse.json(
                { error: 'Missing required field: productName' },
                { status: 400 }
            );
        }

        const optimizedDescription = await optimizeProductDescription(
            productName,
            currentDescription || ''
        );

        return NextResponse.json({ description: optimizedDescription });
    } catch (error) {
        console.error('Error in product optimization:', error);
        return NextResponse.json(
            { error: 'Failed to optimize product description' },
            { status: 500 }
        );
    }
}
