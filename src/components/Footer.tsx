import React from 'react';
import { Shield, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">Safe Step</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">Contact</a>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            © 2024 Safe Step. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}