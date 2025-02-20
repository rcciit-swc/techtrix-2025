import About from '@/components/About';
import Events from '@/components/Event/Events';
import React from 'react';
import { HeroBg } from '@/components/Home/HeroBg';
import { HeroGlobeText } from '@/components/Home/HeroGlobeText';
import { EventLanding } from '@/components/Home/EventLanding';
import Image from 'next/image';

const Page = () => {
  return (
    <div>
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 z-0">
          <HeroBg />
        </div>

        <div className="relative z-10 flex justify-center items-center h-full">
          <HeroGlobeText />
        </div>
      </div>
      <About />
      <div className="relative min-h-screen flex items-center justify-center">
        <EventLanding />
      </div>
    </div>
  );
};

export default Page;
