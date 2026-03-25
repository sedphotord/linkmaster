import { NextRequest, NextResponse } from 'next/server';
import { generateBio } from '@/lib/gemini';

export async function POST(request: NextRequest) {
    try {
        const { name, keywords } = await request.json();

        if (!name) {
            return NextResponse.json(
                { error: 'Missing required field: name' },
                { status: 400 }
            );
        }

        const bio = await generateBio(name, keywords || 'Profesional, Creativo');

        return NextResponse.json({ bio });
    } catch (error) {
        console.error('Error in bio generation:', error);
        return NextResponse.json(
            { error: 'Failed to generate bio' },
            { status: 500 }
        );
    }
}
