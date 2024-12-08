import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Map from './components/Map';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <header className="fixed top-0 left-0 w-full z-20">
          <Navbar />
        </header>

        {/* Main Content with padding to prevent overlap */}
        <main className="pt-16"> {/* Adjust padding-top based on Navbar height */}
          <Hero />
          <Map />
          <Features />
          <HowItWorks />
          <Footer />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
  