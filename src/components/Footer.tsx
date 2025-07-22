import React from 'react';
import { Globe, Twitter, Facebook, Instagram, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-3 rounded-xl">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Lango AI</h3>
                <p className="text-gray-400 text-sm">Global Language Platform</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Connecting cultures through language. Join our mission to preserve and 
              celebrate the rich diversity of human communication worldwide.
            </p>
            <div className="flex space-x-4">
              <button className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Platform</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Explore Map</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Browse Languages</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cultural Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Voice Recordings</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Community</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Lango AI. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};