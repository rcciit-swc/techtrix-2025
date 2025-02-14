import React from 'react';
import ButtonLanding from '../ButtonLanding';
import dynamic from "next/dynamic";

const SplineGlobe = dynamic(() => import("@/components/Home/SplineGlobe"), {
  ssr: false,
});

const HeroGlobeText = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-80 justify-center items-center h-full">
      <div className="text-center lg:text-left">
        <div className="text-5xl md:text-6xl lg:text-8xl font-bold pb-6 lg:pb-8 font-kagitingan">
          TECHTRIX
        </div>
        <div className="text-xl md:text-2xl lg:text-3xl font-semibold pb-4 text-center font-alexandria">
          Annual Technical Fest
        </div>
        <div className='text-center'>
          <ButtonLanding text="Explore" />
        </div>
      </div>
      <div className="w-full lg:w-[80%] h-[300px] md:h-[400px] lg:h-[60%]">
        <SplineGlobe />
      </div>
    </div>
  );
};

export default HeroGlobeText;
