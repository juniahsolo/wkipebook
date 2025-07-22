import React, { useEffect, useState } from 'react';
import { Globe, Volume2 } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 500);
    }, 30000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-white flex items-center justify-center z-[10000] transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center text-gray-900 px-8">
        {/* Animated Globe Icon */}
        <div className="mb-8 relative">
          <div className="bg-gray-100 p-6 rounded-full inline-block animate-pulse">
            <Globe className="h-16 w-16 text-blue-600 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute -top-2 -right-2 bg-orange-500 p-2 rounded-full animate-bounce">
            <Volume2 className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-4 animate-fade-in">
          <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            WikiLango
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 font-light animate-fade-in-delay">
          "Listen to voices from around the world"
        </p>

        {/* Loading Animation */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={() => {
            setFadeOut(true);
            setTimeout(() => {
              setIsVisible(false);
              onComplete();
            }, 500);
          }}
          className="mt-8 text-gray-500 hover:text-gray-700 text-sm underline transition-colors"
        >
          Skip
        </button>
      </div>
    </div>
  );
};