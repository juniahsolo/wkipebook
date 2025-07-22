import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface WorldMapProps {
  onLocationClick: (location: { lat: number; lng: number; name: string }) => void;
}

interface Submission {
  id: string;
  lat: number;
  lng: number;
  name: string;
  language: string;
  type: 'language' | 'culture' | 'voice';
}

export const WorldMap: React.FC<WorldMapProps> = ({ onLocationClick }) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  
  // Sample submissions for demonstration
  const submissions: Submission[] = [
    { id: '1', lat: 40.7128, lng: -74.0060, name: 'New York, USA', language: 'English', type: 'language' },
    { id: '2', lat: 48.8566, lng: 2.3522, name: 'Paris, France', language: 'French', type: 'culture' },
    { id: '3', lat: 35.6762, lng: 139.6503, name: 'Tokyo, Japan', language: 'Japanese', type: 'voice' },
    { id: '4', lat: -33.8688, lng: 151.2093, name: 'Sydney, Australia', language: 'English', type: 'language' },
    { id: '5', lat: 19.4326, lng: -99.1332, name: 'Mexico City, Mexico', language: 'Spanish', type: 'culture' },
  ];

  const regions = [
    { id: 'north-america', name: 'North America', path: 'M 150 180 L 350 180 L 350 280 L 150 280 Z' },
    { id: 'south-america', name: 'South America', path: 'M 200 300 L 300 300 L 280 450 L 220 450 Z' },
    { id: 'europe', name: 'Europe', path: 'M 420 150 L 520 150 L 520 220 L 420 220 Z' },
    { id: 'africa', name: 'Africa', path: 'M 450 240 L 550 240 L 550 400 L 450 400 Z' },
    { id: 'asia', name: 'Asia', path: 'M 570 120 L 750 120 L 750 300 L 570 300 Z' },
    { id: 'oceania', name: 'Oceania', path: 'M 700 350 L 800 350 L 800 420 L 700 420 Z' },
  ];

  const handleRegionClick = (region: { id: string; name: string }) => {
    // Generate random coordinates within the region for demo
    const coords = {
      'north-america': { lat: 45, lng: -100 },
      'south-america': { lat: -15, lng: -60 },
      'europe': { lat: 50, lng: 10 },
      'africa': { lat: 0, lng: 20 },
      'asia': { lat: 30, lng: 100 },
      'oceania': { lat: -25, lng: 140 },
    };
    
    const coord = coords[region.id as keyof typeof coords] || { lat: 0, lng: 0 };
    onLocationClick({ ...coord, name: region.name });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'language': return 'bg-blue-500';
      case 'culture': return 'bg-orange-500';
      case 'voice': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
      <div className="relative w-full max-w-6xl mx-auto">
        <svg
          viewBox="0 0 900 500"
          className="w-full h-auto cursor-crosshair"
          style={{ minHeight: '400px' }}
        >
          {/* Ocean background */}
          <rect width="900" height="500" fill="#e0f2fe" />
          
          {/* Continents */}
          {regions.map((region) => (
            <path
              key={region.id}
              d={region.path}
              fill={hoveredRegion === region.id ? "#10b981" : "#065f46"}
              stroke="#047857"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:fill-emerald-600"
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick(region)}
            />
          ))}
          
          {/* Submission markers */}
          {submissions.map((submission) => (
            <g key={submission.id}>
              <circle
                cx={submission.lng * 2 + 450}
                cy={250 - submission.lat * 2}
                r="8"
                className={`${getTypeColor(submission.type)} cursor-pointer`}
                stroke="white"
                strokeWidth="2"
                onClick={() => onLocationClick(submission)}
              />
              <circle
                cx={submission.lng * 2 + 450}
                cy={250 - submission.lat * 2}
                r="12"
                fill="transparent"
                stroke={getTypeColor(submission.type).replace('bg-', '')}
                strokeWidth="2"
                opacity="0.5"
                className="animate-pulse"
              />
            </g>
          ))}
        </svg>
        
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Legend</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Language</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Culture</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Voice Recording</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Click on any region or existing marker to share your language or cultural story
        </p>
        <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          <span>Interactive World Map - Click to explore and contribute</span>
        </div>
      </div>
    </div>
  );
};