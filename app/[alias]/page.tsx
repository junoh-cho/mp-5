import getCollection from '@/db';
import { redirect } from 'next/navigation';

//params.alias is == /[alias]
export default async function AliasRedirectPage({ params }: { params: { alias: string } }) {
    const collection = await getCollection('urls');
    const result = await collection.findOne({ alias: params.alias });

    if (!result) {
        return <h1>404 – Alias not found</h1>;
    }

    redirect(result.url);
}