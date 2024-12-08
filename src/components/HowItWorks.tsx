import React from 'react';
import { MapPin, Bell, AlertTriangle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      title: 'Informed Live',
      description: 'Start your live loation to put mark',
      icon: MapPin,
    },
    {
      title: 'Report Hazard',
      description: 'Fill in the details about the hazard you observed',
      icon: AlertTriangle,
    },
    {
      title: 'Stay Informed',
      description: 'Receive real-time Update about hazards on your route',
      icon: Bell,
    },
  ];

  return (
    <div className="py-16 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Start Your Safe Journey
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-base text-gray-500 text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}