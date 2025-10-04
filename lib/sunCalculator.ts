import * as SunCalc from 'suncalc';

export interface SunStatus {
  isSunny: boolean;
  sunElevation: number;
  sunAzimuth: number;
  timeSlot?: string;
  nextSunnyTime?: string;
}

export interface Cafe {
  id: string;
  name: string;
  lat: number;
  lon: number;
  terrace_orientation_deg?: number;
  reserve_url?: string;
  opens_at?: string;
  closes_at?: string;
  photo_url?: string;
  neighborhood?: string;
  address?: string;
  outdoor_seating?: string;
  amenity?: string;
  cuisine?: string;
  website?: string;
  phone?: string;
  opening_hours?: string;
  addr_street?: string;
  addr_city?: string;
  addr_postcode?: string;
  tags?: Record<string, string>;
}

export function calculateSunStatus(
  cafe: Cafe,
  date: Date = new Date()
): SunStatus {
  // Set to 9 AM Berlin time for real-time morning sun
  const berlinTime = new Date();
  berlinTime.setHours(9, 0, 0, 0); // 9 AM Berlin time
  const currentDate = berlinTime;
  const { lat, lon } = cafe;
  
  // Use default terrace orientation if not provided (facing east for morning sun)
  const terrace_orientation_deg = cafe.terrace_orientation_deg || 90;
  
  // Get sun position
  const sunPosition = SunCalc.getPosition(currentDate, lat, lon);
  const sunElevation = (sunPosition.altitude * 180) / Math.PI; // Convert to degrees
  const sunAzimuth = ((sunPosition.azimuth * 180) / Math.PI + 180) % 360; // Convert to degrees and normalize
  
  // Calculate difference between sun azimuth and terrace orientation
  let azimuthDiff = Math.abs(sunAzimuth - terrace_orientation_deg);
  if (azimuthDiff > 180) {
    azimuthDiff = 360 - azimuthDiff;
  }
  
  // Check if sunny conditions are met
  const isElevationGood = sunElevation >= 10;
  const isAzimuthGood = azimuthDiff <= 35;
  const isSunny = isElevationGood && isAzimuthGood;
  
  // Calculate next sunny time slot
  let nextSunnyTime: string | undefined;
  if (!isSunny) {
    // Check next 12 hours in 30-minute intervals
    for (let i = 1; i <= 24; i++) {
      const futureDate = new Date(currentDate.getTime() + i * 30 * 60 * 1000);
      const futurePosition = SunCalc.getPosition(futureDate, lat, lon);
      const futureElevation = (futurePosition.altitude * 180) / Math.PI;
      const futureAzimuth = ((futurePosition.azimuth * 180) / Math.PI + 180) % 360;
      
      let futureAzimuthDiff = Math.abs(futureAzimuth - terrace_orientation_deg);
      if (futureAzimuthDiff > 180) {
        futureAzimuthDiff = 360 - futureAzimuthDiff;
      }
      
      if (futureElevation >= 10 && futureAzimuthDiff <= 35) {
        nextSunnyTime = futureDate.toLocaleTimeString('de-DE', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        break;
      }
    }
  }
  
  return {
    isSunny,
    sunElevation: Math.round(sunElevation),
    sunAzimuth: Math.round(sunAzimuth),
    timeSlot: isSunny ? 'Now Sunny' : undefined,
    nextSunnyTime
  };
}

export function getSunStatusBadge(sunStatus: SunStatus): string {
  if (sunStatus.isSunny) {
    return 'Now Sunny';
  } else if (sunStatus.nextSunnyTime) {
    return `Sunny from ${sunStatus.nextSunnyTime}`;
  } else {
    return 'Not sunny today';
  }
}

export function getSunStatusColor(sunStatus: SunStatus): string {
  if (sunStatus.isSunny) {
    return 'bg-green-100 text-green-800 border-green-200';
  } else if (sunStatus.nextSunnyTime) {
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  } else {
    return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}
