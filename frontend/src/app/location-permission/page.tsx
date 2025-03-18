'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function LocationPermission() {
  const router = useRouter();
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocationPermission = () => {
    setIsLoading(true);
    setError(null);
    setShowPrivacyDialog(true);
  };

  const handleAllowPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success - would normally send this to the backend
          console.log('Location permission granted:', position.coords);
          setIsLoading(false);
          // Navigate to the map/feed page
          router.push('/map');
        },
        (err) => {
          // Error handling
          setIsLoading(false);
          setError('位置情報の取得に失敗しました。設定から位置情報へのアクセスを許可してください。');
          console.error('Location error:', err);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setIsLoading(false);
      setError('お使いのブラウザは位置情報をサポートしていません。');
    }
    setShowPrivacyDialog(false);
  };

  const handleDenyPermission = () => {
    setShowPrivacyDialog(false);
    setError('Lokiを使用するには位置情報の許可が必要です。');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gradient-to-br from-blue-500 to-green-500 rounded-full">
            <span className="text-white text-5xl font-bold">L</span>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800">位置情報の許可</h1>
          <p className="mt-4 text-center text-gray-600">
            Lokiは位置情報に基づいたSNSです。投稿するには位置情報の許可が必要です。
          </p>
        </div>

        {error && (
          <div className="p-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <button
          className={`btn-secondary w-full flex items-center justify-center space-x-2 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          onClick={handleLocationPermission}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>位置情報を許可</span>
            </>
          )}
        </button>

        {/* Privacy Policy Dialog */}
        {showPrivacyDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
              <h2 className="text-xl font-bold mb-4">プライバシーについて</h2>
              <p className="mb-4">
                Lokiは以下の目的で位置情報を使用します：
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>投稿を地図上に表示するため</li>
                <li>近くのユーザーの投稿を表示するため</li>
                <li>位置情報に基づいた機能を提供するため</li>
              </ul>
              <p className="mb-4">
                あなたの位置情報は、プライバシー保護のため±50m範囲で調整されます。
                設定からさらに精度を下げることも可能です。
              </p>
              <div className="flex justify-between mt-6">
                <button
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={handleDenyPermission}
                >
                  拒否
                </button>
                <Link
                  href="/privacy"
                  className="px-4 py-2 text-primary underline"
                  target="_blank"
                >
                  詳細を見る
                </Link>
                <button
                  className="px-4 py-2 text-white bg-secondary rounded hover:bg-green-600"
                  onClick={handleAllowPermission}
                >
                  許可
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
