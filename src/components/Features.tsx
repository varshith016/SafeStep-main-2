import React from 'react';
import { AlertTriangle, Navigation, CloudSnow, Users } from 'lucide-react';

export default function Features() {
  const features = [
    {
      name: 'Real-time Weather Alerts',
      description: 'Get instant notifications about black ice, heavy snowfall, and severe weather conditions affecting your route.',
      icon: CloudSnow,
    },
    {
      name: 'Crowd-sourced Hazards',
      description: 'Community-driven reporting of road conditions, construction work, and other urban mobility challenges.',
      icon: AlertTriangle,
    },
    {
      name: 'Smart Navigation',
      description: 'Intelligent routing algorithms that prioritize your safety based on real-time conditions and historical data.',
      icon: Navigation,
    },
    {
      name: 'Community Rewards',
      description: 'Earn points and recognition for contributing to the safety of your community through hazard reporting.',
      icon: Users,
    },
  ];

  return (
    <div className="py-12 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Smart Urban Safety
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Empowering pedestrians and cyclists with real-time safety information and community-driven insights.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}