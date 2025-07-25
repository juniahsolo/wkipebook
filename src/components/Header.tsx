import React from 'react';
import { Globe, Menu, Mic } from 'lucide-react';

interface HeaderProps {
  onSubmitClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSubmitClick }) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-2 rounded-xl">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Lango AI
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Global Language Platform</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#explore" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Explore
            </a>
            <a href="#languages" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Languages
            </a>
            <a href="#cultures" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Cultures
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onSubmitClick}
              className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <Mic className="h-4 w-4" />
              <span className="hidden sm:inline">Share Your Language</span>
              <span className="sm:hidden">Share</span>
            </button>
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
              <Menu className="h-5 w-5" />
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};