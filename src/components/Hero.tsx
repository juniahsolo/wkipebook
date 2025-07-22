import React from 'react';
import { Users, MapPin, Mic } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-500/10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Discover the World's
          <span className="block bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Languages & Cultures
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Join our global community in preserving and sharing the rich diversity of human languages, 
          dialects, and cultural stories from every corner of the world.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-blue-100 p-3 rounded-xl w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Community</h3>
            <p className="text-gray-600">Connect with language speakers from around the world</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-orange-100 p-3 rounded-xl w-fit mx-auto mb-4">
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Location-Based</h3>
            <p className="text-gray-600">Explore languages and cultures by geographic location</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-green-100 p-3 rounded-xl w-fit mx-auto mb-4">
              <Mic className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Voice Records</h3>
            <p className="text-gray-600">Share authentic voice recordings and cultural stories</p>
          </div>
        </div>
      </div>
    </section>
  );
};