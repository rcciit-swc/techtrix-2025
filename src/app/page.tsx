import About from '@/components/About';
import Events from '@/components/Event/Events';
import React from 'react'
import { HeroBg } from '@/components/Home/HeroBg';
import { HeroGlobeText } from '@/components/Home/HeroGlobeText';
import React from 'react';

const Page = () => {
  return (
    <div>
      {/* <Events /> */}
      <About />
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 z-0">
        <HeroBg />
      </div>

      <div className="relative z-10 flex justify-center items-center h-full">
        <HeroGlobeText />
      </div>
    </div>
  );
};

export default Page;
