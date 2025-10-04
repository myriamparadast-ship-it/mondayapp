'use client';

import { useEffect, useState } from 'react';
import { Cafe, calculateSunStatus, getSunStatusBadge, getSunStatusColor } from '@/lib/sunCalculator';

interface CafeMapProps {
  cafes: Cafe[];
}

export default function CafeMap({ cafes }: CafeMapProps) {
  const [isClient, setIsClient] = useState(false);
  
  // Focus on Kreuzberg where customer is located
  const berlinCenter: [number, number] = [52.4990, 13.4200];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-96 w-full rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-4 mx-auto">
            <div className="text-2xl">🗺️</div>
          </div>
          <p className="text-gray-600 font-medium">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-yellow-200 to-red-200 relative">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 opacity-60"></div>
      
      {/* Sun Zone Visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Sun Zone Circles */}
        <div className="relative">
          {/* Outer Sun Zone */}
          <div className="absolute w-48 h-48 rounded-full bg-yellow-300 opacity-30 animate-pulse"></div>
          {/* Middle Sun Zone */}
          <div className="absolute w-32 h-32 rounded-full bg-orange-400 opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          {/* Inner Sun Zone */}
          <div className="absolute w-16 h-16 rounded-full bg-yellow-500 opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
          {/* Sun Center */}
          <div className="absolute w-8 h-8 rounded-full bg-red-500 opacity-90 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
      
      {/* Customer Location */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-6 h-6 bg-gray-800 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <div className="text-white text-xs">👤</div>
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 px-2 py-1 rounded text-xs font-semibold text-gray-800">
          You are here
        </div>
      </div>
      
      {/* Café Markers */}
      {cafes.map((cafe, index) => {
        const sunStatus = calculateSunStatus(cafe);
        const isSunny = sunStatus.isSunny;
        const markerColor = isSunny ? 'bg-green-500' : 'bg-gray-400';
        
        // Position markers around the center
        const angle = (index * 60) % 360; // Spread markers around
        const radius = 80 + (index * 20) % 60; // Vary distance
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;
        
        return (
          <div
            key={cafe.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            <div className={`w-4 h-4 ${markerColor} rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform`}>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 px-1 py-0.5 rounded text-xs font-medium whitespace-nowrap">
              {cafe.name}
            </div>
          </div>
        );
      })}
      
      {/* Sun Zone Label */}
      <div className="absolute top-4 right-4 bg-white/90 px-3 py-2 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-orange-600">☀️ SUN ZONE</span>
        </div>
        <div className="text-xs text-gray-600 mt-1">9:00 AM</div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-lg">
        <div className="text-xs space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Now Sunny</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span>Not Sunny</span>
          </div>
        </div>
      </div>
    </div>
  );
}