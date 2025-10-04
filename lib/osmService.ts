export interface OSMCafe {
  id: string;
  name: string;
  lat: number;
  lon: number;
  outdoor_seating: string;
  amenity: string;
  cuisine?: string;
  website?: string;
  phone?: string;
  opening_hours?: string;
  addr_street?: string;
  addr_city?: string;
  addr_postcode?: string;
  tags: Record<string, string>;
}

export interface OSMResponse {
  elements: Array<{
    type: string;
    id: number;
    lat: number;
    lon: number;
    tags: Record<string, string>;
  }>;
}

export async function fetchOSMCafesWithOutdoorSeating(): Promise<OSMCafe[]> {
  try {
    // Overpass API query to get cafés and restaurants with outdoor seating in Berlin
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"~"^(cafe|restaurant)$"]["outdoor_seating"="yes"](52.3,13.0,52.7,13.8);
        way["amenity"~"^(cafe|restaurant)$"]["outdoor_seating"="yes"](52.3,13.0,52.7,13.8);
        relation["amenity"~"^(cafe|restaurant)$"]["outdoor_seating"="yes"](52.3,13.0,52.7,13.8);
      );
      out center;
    `;

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: OSMResponse = await response.json();
    
    // Transform OSM data to our format
    const cafes: OSMCafe[] = data.elements
      .filter(element => 
        element.tags && 
        element.tags.amenity && 
        (element.tags.amenity === 'cafe' || element.tags.amenity === 'restaurant') &&
        element.tags.outdoor_seating === 'yes' &&
        element.tags.name
      )
      .map(element => ({
        id: element.id.toString(),
        name: element.tags.name || 'Unnamed Café',
        lat: element.lat,
        lon: element.lon,
        outdoor_seating: element.tags.outdoor_seating || 'yes',
        amenity: element.tags.amenity || 'cafe',
        cuisine: element.tags.cuisine,
        website: element.tags.website,
        phone: element.tags.phone,
        opening_hours: element.tags.opening_hours,
        addr_street: element.tags['addr:street'],
        addr_city: element.tags['addr:city'] || 'Berlin',
        addr_postcode: element.tags['addr:postcode'],
        tags: element.tags
      }))
      .slice(0, 20); // Limit to 20 results for performance

    return cafes;
  } catch (error) {
    console.error('Error fetching OSM data:', error);
    // Return fallback data if API fails
    return getFallbackCafes();
  }
}

function getFallbackCafes(): OSMCafe[] {
  return [
    {
      id: '1',
      name: 'Café Einstein',
      lat: 52.5200,
      lon: 13.4050,
      outdoor_seating: 'yes',
      amenity: 'cafe',
      cuisine: 'international',
      addr_street: 'Unter den Linden 42',
      addr_city: 'Berlin',
      addr_postcode: '10117',
      tags: { name: 'Café Einstein', amenity: 'cafe', outdoor_seating: 'yes' }
    },
    {
      id: '2',
      name: 'Café am Neuen See',
      lat: 52.5150,
      lon: 13.3500,
      outdoor_seating: 'yes',
      amenity: 'cafe',
      cuisine: 'german',
      addr_street: 'Lichtensteinallee 2',
      addr_city: 'Berlin',
      addr_postcode: '10787',
      tags: { name: 'Café am Neuen See', amenity: 'cafe', outdoor_seating: 'yes' }
    },
    {
      id: '3',
      name: 'Café Kranzler',
      lat: 52.5040,
      lon: 13.3300,
      outdoor_seating: 'yes',
      amenity: 'cafe',
      cuisine: 'coffee',
      addr_street: 'Kurfürstendamm 18',
      addr_city: 'Berlin',
      addr_postcode: '10719',
      tags: { name: 'Café Kranzler', amenity: 'cafe', outdoor_seating: 'yes' }
    },
    {
      id: '4',
      name: 'Café am Engelbecken',
      lat: 52.4900,
      lon: 13.4200,
      outdoor_seating: 'yes',
      amenity: 'cafe',
      cuisine: 'vegetarian',
      addr_street: 'Engelbecken 1',
      addr_city: 'Berlin',
      addr_postcode: '10999',
      tags: { name: 'Café am Engelbecken', amenity: 'cafe', outdoor_seating: 'yes' }
    },
    {
      id: '5',
      name: 'Café am Weinberg',
      lat: 52.5400,
      lon: 13.4100,
      outdoor_seating: 'yes',
      amenity: 'cafe',
      cuisine: 'organic',
      addr_street: 'Weinbergsweg 1',
      addr_city: 'Berlin',
      addr_postcode: '10119',
      tags: { name: 'Café am Weinberg', amenity: 'cafe', outdoor_seating: 'yes' }
    }
  ];
}
