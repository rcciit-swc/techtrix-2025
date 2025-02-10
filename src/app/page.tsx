import { HeroBg } from '@/components/Home/HeroBg';
import { HeroGlobeText } from '@/components/Home/HeroGlobeText';
import React from 'react';

const Page = () => {
  return (
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
