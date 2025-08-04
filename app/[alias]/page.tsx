import getCollection from '@/db';
import { redirect, notFound } from 'next/navigation';

type Params = {
    alias: string;
};

export default async function AliasRedirectPage({ params }: { params: Promise<Params> }) {
    const resolvedParams = await params;

    const collection = await getCollection('urls');
    const result = await collection.findOne({ alias: resolvedParams.alias });

    if (!result) {
        notFound();
    }

    redirect(result.url);
}
