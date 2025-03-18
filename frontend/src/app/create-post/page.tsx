'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function CreatePost() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          
          // Get location name using reverse geocoding
          try {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'your-mapbox-token'}`
            );
            const data = await response.json();
            if (data.features && data.features.length > 0) {
              setLocationName(data.features[0].place_name);
            }
          } catch (err) {
            console.error('Error getting location name:', err);
          }
        },
        (err) => {
          setError('位置情報の取得に失敗しました。設定から位置情報へのアクセスを許可してください。');
          console.error('Location error:', err);
        }
      );
    } else {
      setError('お使いのブラウザは位置情報をサポートしていません。');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('投稿内容を入力してください。');
      return;
    }
    
    if (!location) {
      setError('位置情報が取得できていません。');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call to create a post
      console.log('Creating post:', {
        content,
        location,
        locationName,
        createdAt: new Date().toISOString(),
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to map
      router.push('/map');
    } catch (err) {
      setError('投稿の作成に失敗しました。もう一度お試しください。');
      console.error('Error creating post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/map" className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-center">新規投稿</h1>
          <div className="w-6"></div> {/* Spacer for centering */}
        </div>

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              className="input-field h-32 resize-none"
              placeholder="いまどうしてる？"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={280}
            ></textarea>
            <div className="text-right text-xs text-gray-500">
              {content.length}/280
            </div>
          </div>

          <div className="mb-6 p-3 bg-gray-50 rounded-md flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium">現在地</p>
              <p className="text-xs text-gray-500">
                {locationName || '位置情報を取得中...'}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className={`btn-primary w-full ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading || !location}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mx-auto"></div>
            ) : (
              '投稿する'
            )}
          </button>
        </form>

        <div className="mt-4 text-xs text-center text-gray-500">
          <p>
            投稿には位置情報が含まれます。プライバシーについては
            <Link href="/privacy" className="text-primary hover:underline">
              こちら
            </Link>
            をご確認ください。
          </p>
        </div>
      </div>
    </div>
  );
}
