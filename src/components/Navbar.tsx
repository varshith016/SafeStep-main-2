import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <nav className="bg-white shadow-sm fixed w-full z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Safe Step</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <a href="#features" className="text-sm font-medium text-gray-900">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                How it Works
              </a>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Welcome, {user?.name || 'User'}</span>
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-sm font-medium text-gray-900">
                Features
              </a>
              <a href="#how-it-works" className="block text-sm font-medium text-gray-500 hover:text-gray-900">
                How it Works
              </a>
              {isAuthenticated ? (
                <div>
                  <span className="block text-sm text-gray-700 mb-2">
                    Welcome, {user?.name || 'User'}
                  </span>
                  <button
                    onClick={logout}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="block w-full text-left text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="block w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
}
