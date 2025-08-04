import { NextRequest, NextResponse } from 'next/server';
import getCollection from '@/db';

export async function POST(req: NextRequest) {
    const { alias, url } = await req.json();
    const collection = await getCollection('urls');

    // URL validation
    const urlPattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/; //Ensures valid domain of url
    if (!urlPattern.test(url)) {
        return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    //check for duplicate alias
    const existing = await collection.findOne({ alias });
    if (existing) {
        return NextResponse.json({ error: 'Alias already taken' }, { status: 400 });
    }

    await collection.insertOne({ alias, url }); //Stores alias and url pair in DB
    return NextResponse.json({ success: true });
}
