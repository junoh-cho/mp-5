'use client';
import { useState } from 'react';

export default function Home() {
  const [alias, setAlias] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setShortUrl('');

    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alias, url }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error);
    } else {
      const short = `${window.location.origin}/${alias}`;
      setShortUrl(short);
      setMessage('Shortened URL created!');
    }
  };

  return (
      <div className="w-full max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Enter alias"
              className="border border-black px-3 py-3 text-black placeholder-gray-400 w-full"
              required
          />
          <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              className="border border-black px-3 py-3 text-black placeholder-gray-400 w-full"
              required
          />
          <button
              type="submit"
              className="bg-black py-2 text-white"
          >
            Shorten
          </button>
        </form>

        {message && (
            <p className="mt-4 text-sm text-black text-center">{message}</p>
        )}

        {shortUrl && (
            <p className="mt-2 text-center">
              Short URL:{' '}
              <a
                  href={shortUrl}
                  className="text-blue-600 hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                {shortUrl}
              </a>
            </p>
        )}
      </div>
  );
}
