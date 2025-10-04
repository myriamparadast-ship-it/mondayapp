'use client';

import { Cafe, calculateSunStatus, getSunStatusBadge, getSunStatusColor } from '@/lib/sunCalculator';
import Image from 'next/image';

interface CafeListProps {
  cafes: Cafe[];
}

export default function CafeList({ cafes }: CafeListProps) {
  // Sort cafes by sun status: Now Sunny first, then Soon, then Later
  const sortedCafes = [...cafes].sort((a, b) => {
    const aStatus = calculateSunStatus(a);
    const bStatus = calculateSunStatus(b);
    
    if (aStatus.isSunny && !bStatus.isSunny) return -1;
    if (!aStatus.isSunny && bStatus.isSunny) return 1;
    if (aStatus.nextSunnyTime && !bStatus.nextSunnyTime) return -1;
    if (!aStatus.nextSunnyTime && bStatus.nextSunnyTime) return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      {sortedCafes.map((cafe) => {
        const sunStatus = calculateSunStatus(cafe);
        const badge = getSunStatusBadge(sunStatus);
        const colorClass = getSunStatusColor(sunStatus);
        
        return (
          <div key={cafe.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex">
              {/* Café Image */}
              <div className="w-40 h-40 flex-shrink-0 relative">
                {cafe.photo_url ? (
                  <Image
                    src={cafe.photo_url}
                    alt={cafe.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-200 to-pink-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">☕</div>
                      <div className="text-xs font-semibold text-gray-700">{cafe.amenity === 'restaurant' ? '🍽️' : '☕'}</div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Café Info */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{cafe.name}</h3>
                    <p className="text-gray-500 font-medium">{cafe.neighborhood}</p>
                  </div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${colorClass}`}>
                    {sunStatus.isSunny ? '☀️' : '⏰'} {badge}
                  </div>
                </div>
                
                <div className="text-gray-600 mb-4 space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                      <div className="text-xs">📍</div>
                    </div>
                    <span className="text-sm">{cafe.addr_street || cafe.address || 'Address not available'}</span>
                  </div>
                  {cafe.opening_hours && (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                        <div className="text-xs">🕒</div>
                      </div>
                      <span className="text-sm">{cafe.opening_hours}</span>
                    </div>
                  )}
                  {cafe.cuisine && (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                        <div className="text-xs">🍽️</div>
                      </div>
                      <span className="text-sm capitalize">{cafe.cuisine} cuisine</span>
                    </div>
                  )}
                </div>
                
                {/* Sun Details */}
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Sun elevation:</span>
                      <span className="font-semibold">{sunStatus.sunElevation}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Azimuth:</span>
                      <span className="font-semibold">{sunStatus.sunAzimuth}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Terrace orientation:</span>
                      <span className="font-semibold">{cafe.terrace_orientation_deg}°</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {cafe.website ? (
                    <a
                      href={cafe.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-3 px-4 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Visit Website
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex-1 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-500 text-center py-3 px-4 rounded-xl text-sm font-semibold cursor-not-allowed"
                    >
                      No Website
                    </button>
                  )}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${cafe.lat},${cafe.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-3 px-4 rounded-xl text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
