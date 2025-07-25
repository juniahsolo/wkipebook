import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SubmissionForm } from './SubmissionForm';

// Fix for default markers in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CountryData {
  name: string;
  code: string;
  lat: number;
  lng: number;
}

interface Submission {
  id: string;
  country: string;
  countryCode: string;
  phrase: string;
  audioBlob?: Blob;
  audioFile?: File;
  timestamp: Date;
  lat: number;
  lng: number;
}

import Auth from './Auth';

export const GlobalMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useLayoutEffect(() => {
    if (!mapRef.current) return;
    
    // Clean up existing map instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize the map
    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 10,
      worldCopyJump: true,
      zoomControl: true,
      attributionControl: false,
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 19,
    }).addTo(map);

    // Set max bounds
    const southWest = L.latLng(-85, -180);
    const northEast = L.latLng(85, 180);
    const bounds = L.latLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);

    // Load country boundaries after map is ready
    map.whenReady(() => {
      loadCountryBoundaries(map);
    });

    // Store map instance
    mapInstanceRef.current = map;

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Add markers for existing submissions
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    submissions.forEach(submission => {
      const marker = L.marker([submission.lat, submission.lng])
        .addTo(mapInstanceRef.current!)
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold;">${submission.country}</h3>
            <p style="margin: 0 0 8px 0; font-style: italic;">"${submission.phrase}"</p>
            ${submission.audioBlob ? '<button onclick="playAudio(\'' + submission.id + '\')">🔊 Play Recording</button>' : ''}
          </div>
        `);
    });
  }, [submissions]);

  const loadCountryBoundaries = async (map: L.Map) => {
    try {
      // Verify map is still valid
      if (!map || !map.getContainer()) {
        console.error('Map container not available');
        return;
      }
      
      // Using a simplified world countries GeoJSON
      const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const geoData = await response.json();

      // Validate GeoJSON data
      if (!geoData || !geoData.features) {
        throw new Error('Invalid GeoJSON data received');
      }

      L.geoJSON(geoData, {
        style: {
          fillColor: '#3b82f6',
          weight: 1,
          opacity: 0.8,
          color: '#1e40af',
          fillOpacity: 0.1
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: (e) => {
              const layer = e.target;
              layer.setStyle({
                fillOpacity: 0.3,
                weight: 2
              });
            },
            mouseout: (e) => {
              const layer = e.target;
              layer.setStyle({
                fillOpacity: 0.1,
                weight: 1
              });
            },
            click: (e) => {
              const countryName = feature.properties.name || 'Unknown Country';
              const bounds = layer.getBounds();
              const center = bounds.getCenter();
              
              console.log('Country clicked:', countryName); // Debug log
              
              setSelectedCountry({
                name: countryName,
                code: feature.properties.iso_a2 || 'XX',
                lat: center.lat,
                lng: center.lng
              });
              setIsFormOpen(true);
            }
          });

          // Add country name tooltip
          layer.bindTooltip(feature.properties.name || 'Unknown', {
            permanent: false,
            direction: 'center',
            className: 'country-tooltip'
          });
        }
      }).addTo(map);
    } catch (error) {
      console.error('Error loading country boundaries:', error);
    }
  };

  return (
    <>
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ cursor: 'pointer' }}
      />
      
      <SubmissionForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCountry(null);
        }}
        country={selectedCountry}
      />
      <div className="absolute top-4 right-4 z-[1000]">
        <button
            onClick={() => setShowAuth(true)}
            className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md"
        >
            Sign In
        </button>
      </div>
      {showAuth && <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1001] flex items-center justify-center" onClick={() => setShowAuth(false)}><Auth /></div>}
    </>
  );
};