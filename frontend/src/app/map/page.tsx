'use client';

import { useState, useEffect, useRef } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for posts
const MOCK_POSTS = [
  {
    id: 1,
    content: '東京タワーからの眺めは最高！',
    user: {
      id: 101,
      name: '山田太郎',
      avatar: 'https://lh3.googleusercontent.com/a/default-user',
    },
    location: {
      latitude: 35.6586,
      longitude: 139.7454,
    },
    createdAt: new Date().toISOString(),
    likes: 15,
    comments: 3,
  },
  {
    id: 2,
    content: '渋谷でランチ中。このラーメン美味しい！',
    user: {
      id: 102,
      name: '佐藤花子',
      avatar: 'https://lh3.googleusercontent.com/a/default-user',
    },
    location: {
      latitude: 35.6580,
      longitude: 139.7016,
    },
    createdAt: new Date().toISOString(),
    likes: 8,
    comments: 1,
  },
];

export default function MapPage() {
  const [viewState, setViewState] = useState({
    latitude: 35.6762,
    longitude: 139.6503,
    zoom: 11,
  });
  const [selectedPost, setSelectedPost] = useState<typeof MOCK_POSTS[0] | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setViewState((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  return (
    <div className="h-screen w-full relative">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'your-mapbox-token'}
        style={{ width: '100%', height: '100%' }}
      >
        <GeolocateControl position="top-right" />
        <NavigationControl position="top-right" />

        {/* User location marker */}
        {userLocation && (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
            anchor="center"
          >
            <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </Marker>
        )}

        {/* Post markers */}
        {MOCK_POSTS.map((post) => (
          <Marker
            key={post.id}
            longitude={post.location.longitude}
            latitude={post.location.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedPost(post);
            }}
          >
            <div className="cursor-pointer transform hover:scale-110 transition-transform">
              <div className="w-10 h-10 bg-white rounded-full border-2 border-primary overflow-hidden">
                <Image
                  src={post.user.avatar}
                  alt={post.user.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            </div>
          </Marker>
        ))}

        {/* Popup for selected post */}
        {selectedPost && (
          <Popup
            longitude={selectedPost.location.longitude}
            latitude={selectedPost.location.latitude}
            anchor="bottom"
            onClose={() => setSelectedPost(null)}
            closeOnClick={false}
            className="z-10"
          >
            <div className="p-2 max-w-xs">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <Image
                    src={selectedPost.user.avatar}
                    alt={selectedPost.user.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">{selectedPost.user.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(selectedPost.createdAt).toLocaleString('ja-JP')}
                  </p>
                </div>
              </div>
              <p className="text-sm mb-2">{selectedPost.content}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>❤️ {selectedPost.likes}</span>
                <span>💬 {selectedPost.comments}</span>
                <Link href={`/post/${selectedPost.id}`} className="text-primary">
                  詳細を見る
                </Link>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* Floating action button for new post */}
      <button
        className="absolute bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
        onClick={() => {
          // Navigate to create post page
          window.location.href = '/create-post';
        }}
      >
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}
