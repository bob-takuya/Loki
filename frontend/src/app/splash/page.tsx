'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function SplashPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // 3秒後にログインボタンを表示
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/map');
    }
  }, [status, router]);

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', { callbackUrl: '/map' });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Loki</h1>
        <p className="text-white text-lg mb-8">位置情報ベースのSNS</p>
        
        {showLogin && (
          <button
            onClick={handleGoogleLogin}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Googleでログイン
          </button>
        )}
      </div>
    </div>
  );
} 