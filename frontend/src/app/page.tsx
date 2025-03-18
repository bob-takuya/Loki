'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate splash screen loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {loading ? (
        // Splash screen
        <div className="flex flex-col items-center justify-center animate-fade-in">
            <div className="w-32 h-32 mb-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-green-500 rounded-full">
              <span className="text-white text-6xl font-bold">L</span>
            </div>
          <div className="w-12 h-12 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        // Login screen
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md animate-fade-in">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gradient-to-br from-blue-500 to-green-500 rounded-full">
              <span className="text-white text-5xl font-bold">L</span>
            </div>
            <h1 className="text-3xl font-bold text-center text-gray-800">Loki</h1>
            <p className="mt-2 text-center text-gray-600">
              位置情報に基づいたSNSで新しい体験を
            </p>
          </div>

          <div className="space-y-4">
            <button
              className="btn-primary w-full flex items-center justify-center space-x-2"
              onClick={() => {
                // Google login logic will be implemented later
                console.log('Google login clicked');
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-current"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              <span>Googleでログイン</span>
            </button>

            <p className="text-xs text-center text-gray-500">
              ログインすることで、
              <Link href="/terms" className="text-primary hover:underline">
                利用規約
              </Link>
              と
              <Link href="/privacy" className="text-primary hover:underline">
                プライバシーポリシー
              </Link>
              に同意したことになります。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
