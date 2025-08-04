'use client';

import React, { useState, useEffect } from 'react';

export default function MainContent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay for smooth animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`text-center px-4 transition-all duration-500 ease-in-out ${
        isVisible
          ? 'opacity-100 transform translate-y-0'
          : 'opacity-0 transform translate-y-8'
      }`}
    >
      <h1 className="text-4xl font-bold mb-4 animate-fade-in">
        Welcome to my page
      </h1>
      <p className="text-lg text-gray-600 mb-8 animate-fade-in-delay">
        This is a responsive page that works well on all devices
      </p>
      <div className="space-y-4">
        <div className="bg-blue-100 p-4 rounded-lg animate-slide-up-delay-1 hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Mobile Optimized</h2>
          <p className="text-sm text-gray-700">
            The header automatically adjusts for mobile devices to prevent
            scrolling issues.
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg animate-slide-up-delay-2 hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Responsive Design</h2>
          <p className="text-sm text-gray-700">
            Content adapts to different screen sizes for optimal viewing
            experience.
          </p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg animate-slide-up-delay-3 hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Touch Friendly</h2>
          <p className="text-sm text-gray-700">
            All interactive elements are properly sized for touch devices.
          </p>
        </div>
      </div>
    </div>
  );
}
