import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft, Search, RefreshCw } from 'lucide-react';
import {useNavigate} from 'react-router'

export default function NotFoundPage() {
  const [glitchText, setGlitchText] = useState('404');
  const [isGlitching, setIsGlitching] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate=useNavigate()

  // Glitch effect for 404 text


  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGoHome = () => {
    // In a real app, you would use router navigation
    navigate('/')
  };

  const handleGoBack = () => {
    navigate(-1)
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white opacity-5 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div
        className="absolute top-20 left-20 w-16 h-16 border-2 border-cyan-400 opacity-30 rotate-45 animate-spin"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) rotate(45deg)`
        }}
      />
      <div
        className="absolute bottom-20 right-20 w-12 h-12 bg-purple-500 opacity-20 rounded-full animate-bounce"
        style={{
          transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
        }}
      />
      <div
        className="absolute top-1/2 left-10 w-8 h-8 bg-gradient-to-r from-pink-500 to-yellow-500 opacity-40 animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
        }}
      />

      {/* Main content */}
      <div className="text-center z-10 max-w-2xl mx-auto">
        {/* Glitch 404 text */}
        <div className="relative mb-8">
          <h1
            className={`text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 select-none duration-150 
            `}

          >
            {glitchText}
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-black text-cyan-400 opacity-20 ">
            404
          </div>
        </div>

        {/* Error message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            The page you're looking for seems to have vanished into the digital void.
            It might have been moved, deleted, or never existed at all.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoHome}
            className="group flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            <Home className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Go Home
          </button>

          <button
            onClick={handleGoBack}
            className="group flex items-center px-8 py-4 bg-white bg-opacity-20 backdrop-blur-sm text-black font-semibold rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transform hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft color={"black"} className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Go Back
          </button>

          <button
            onClick={handleRefresh}
            className="group flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/25"
          >
            <RefreshCw className="w-5 h-5 mr-2 group-hover:animate-spin" />
            Refresh
          </button>
        </div>

        {/* Footer text */}
        <p className="text-gray-400 text-sm mt-8 animate-pulse">
          Don't worry, even the best explorers get lost sometimes...
        </p>
      </div>
    </div>
  );
}
