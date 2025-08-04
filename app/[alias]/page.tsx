import getCollection from '@/db';
import { redirect, notFound } from 'next/navigation';


type AliasRedirectProps = {
    params: {
        alias: string;
    };
};

export default async function AliasRedirectPage({ params }: AliasRedirectProps) {
//params.alias is == /[alias]
    const collection = await getCollection('urls');
    console.log(typeof params);
    const result = await collection.findOne({ alias: params.alias });

    if (!result) {
        notFound();
    }

    redirect(result.url);
}