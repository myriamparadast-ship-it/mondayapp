'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import CafeList from '@/components/CafeList';
import { fetchOSMCafesWithOutdoorSeating, OSMCafe } from '@/lib/osmService';

// Dynamically import CafeMap to avoid SSR issues
const CafeMap = dynamic(() => import('@/components/CafeMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-4 mx-auto">
          <div className="text-2xl">🗺️</div>
        </div>
        <p className="text-gray-600 font-medium">Loading your sunny spots...</p>
      </div>
    </div>
  )
});

export default function Home() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cafes, setCafes] = useState<OSMCafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCafes = async () => {
      try {
        setLoading(true);
        const osmCafes = await fetchOSMCafesWithOutdoorSeating();
        setCafes(osmCafes);
        setError(null);
      } catch (err) {
        setError('Failed to load cafés from OpenStreetMap');
        console.error('Error loading cafés:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCafes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Modern Header */}
      <div className="bg-white/70 backdrop-blur-xl shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-2xl">☀️</div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  SunSpot Berlin
                </h1>
                <p className="text-gray-500 font-medium">Find your perfect sunny moment</p>
              </div>
            </div>
            
            {/* Desktop Status */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/80 rounded-full px-4 py-2 shadow-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 font-medium">Live sun tracking</span>
              </div>
              
              {/* Navigation Icons */}
              <div className="flex items-center space-x-2">
                {/* Search Icon */}
                <button className="p-3 rounded-xl bg-white/80 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105" aria-label="Search">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                
                {/* Notifications Icon */}
                <button className="p-3 rounded-xl bg-white/80 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 relative" aria-label="Notifications">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12 7H4.828z" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </button>
                
                {/* Burger Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-3 rounded-xl bg-white/80 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                  aria-label="Toggle menu"
                >
                  <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                    <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                    <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Mobile Navigation Icons */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Search */}
              <button className="p-2 rounded-lg bg-white/80 shadow-sm" aria-label="Search">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Mobile Notifications */}
              <button className="p-2 rounded-lg bg-white/80 shadow-sm relative" aria-label="Notifications">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12 7H4.828z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </button>
              
              {/* Mobile Burger Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-white/80 shadow-sm"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
                  <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                  <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-xl border-b border-white/20">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-3 rounded-xl bg-white/80 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Navigation Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Navigation</h3>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm">🗺️</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Map View</div>
                    <div className="text-sm text-gray-600">Explore sunny spots</div>
                  </div>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm">📋</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">List View</div>
                    <div className="text-sm text-gray-600">Browse all cafés</div>
                  </div>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm">⭐</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Favorites</div>
                    <div className="text-sm text-gray-600">Your saved spots</div>
                  </div>
                </a>
              </div>

              {/* Sun Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Sun Status</h3>
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                      <div className="text-white text-sm">☀️</div>
                    </div>
                    <div>
                      <div className="font-semibold text-orange-800">9:00 AM</div>
                      <div className="text-sm text-orange-600">Morning Sun Active</div>
                    </div>
                  </div>
                  <div className="text-sm text-orange-700">
                    <p>• Sun elevation: 25°</p>
                    <p>• Azimuth: 95° (East)</p>
                    <p>• Perfect for morning coffee</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                      <div className="text-white text-sm">📍</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-800">Your Location</div>
                      <div className="text-sm text-blue-600">Kreuzberg, Berlin</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  🔄 Refresh Sun Data
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  📍 Use My Location
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bold Modern Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          {/* Bold Welcome Badge */}
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full px-10 py-5 mb-12 shadow-2xl border-2 border-orange-300 transform hover:scale-105 transition-all duration-300">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            <span className="text-white font-black text-xl tracking-wide">🌅 WELCOME TO SUNSPOT BERLIN</span>
            <div className="w-4 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          {/* Bold Main Headline */}
          <h1 className="text-8xl font-black bg-gradient-to-r from-gray-900 via-orange-500 to-pink-600 bg-clip-text text-transparent mb-10 leading-none tracking-tight">
            FIND YOUR
            <br />
            <span className="text-7xl bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
              SUNNY MOMENT
            </span>
          </h1>
          
          <p className="text-3xl font-bold text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed">
            Discover Berlin's <span className="text-orange-600 font-black">best outdoor cafés</span> 
            <br />
            perfectly timed for when the <span className="text-pink-600 font-black">sun is shining</span>
          </p>

          {/* Bold Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl border-2 border-orange-300 hover:shadow-3xl hover:scale-105 transition-all duration-500 transform">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <div className="text-4xl">☀️</div>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 text-center">REAL-TIME SUN TRACKING</h3>
              <p className="text-white font-bold text-center leading-relaxed">Know exactly which terraces are sunny right now, powered by accurate sun position calculations.</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 shadow-2xl border-2 border-green-300 hover:shadow-3xl hover:scale-105 transition-all duration-500 transform">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <div className="text-4xl">🌿</div>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 text-center">OUTDOOR SEATING ONLY</h3>
              <p className="text-white font-bold text-center leading-relaxed">Every venue is verified to have outdoor seating, so you can enjoy the fresh air and sunshine.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-2xl border-2 border-blue-300 hover:shadow-3xl hover:scale-105 transition-all duration-500 transform">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <div className="text-4xl">📍</div>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 text-center">LIVE BERLIN DATA</h3>
              <p className="text-white font-bold text-center leading-relaxed">Real cafés and restaurants from OpenStreetMap, updated with the latest information.</p>
            </div>
          </div>

          {/* Bold Current Status */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-3xl p-10 shadow-2xl border-4 border-orange-300 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="text-4xl">🌅</div>
              </div>
              <div className="text-left">
                <div className="text-4xl font-black text-white">9:00 AM</div>
                <div className="text-2xl font-bold text-orange-100">MORNING SUN ACTIVE</div>
              </div>
            </div>
            <p className="text-white text-2xl font-bold text-center leading-relaxed">
              PERFECT TIME FOR YOUR MORNING COFFEE! 
              <br />
              <span className="text-orange-100">The sun is rising in the east, creating beautiful sunny spots across Berlin's outdoor cafés.</span>
            </p>
          </div>
        </div>

        {/* Modern View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
            <button
              onClick={() => setViewMode('map')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                viewMode === 'map'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              🗺️ Map View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              📋 List View
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                  <div className="text-white text-2xl">🗺️</div>
                </div>
                <p className="text-gray-600 font-medium">Loading cafés from OpenStreetMap...</p>
                <p className="text-sm text-gray-500 mt-2">Fetching outdoor seating data</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <div className="text-white text-2xl">⚠️</div>
                </div>
                <p className="text-red-600 font-medium">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : viewMode === 'map' ? (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                  <div className="text-white text-sm">🗺️</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Berlin Café Map</h3>
                <div className="ml-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {cafes.length} outdoor cafés
                </div>
              </div>
              <CafeMap cafes={cafes} />
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                  <div className="text-white text-sm">📋</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Berlin Cafés</h3>
                <div className="ml-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {cafes.length} outdoor cafés
                </div>
              </div>
              <CafeList cafes={cafes} />
            </div>
          )}
        </div>

        {/* Modern Legend */}
        <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-center mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-3">
              <div className="text-white text-xs">ℹ️</div>
            </div>
            <h4 className="text-lg font-bold text-gray-800">Sun Status Guide</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 bg-green-50 rounded-xl p-4">
              <div className="w-6 h-6 bg-green-500 rounded-full shadow-sm"></div>
              <div>
                <span className="font-semibold text-green-800">Now Sunny</span>
                <p className="text-sm text-green-600">Perfect for your coffee</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-yellow-50 rounded-xl p-4">
              <div className="w-6 h-6 bg-yellow-500 rounded-full shadow-sm"></div>
              <div>
                <span className="font-semibold text-yellow-800">Sunny Later</span>
                <p className="text-sm text-yellow-600">Check back soon</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4">
              <div className="w-6 h-6 bg-gray-500 rounded-full shadow-sm"></div>
              <div>
                <span className="font-semibold text-gray-800">Not Sunny</span>
                <p className="text-sm text-gray-600">Try another time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

