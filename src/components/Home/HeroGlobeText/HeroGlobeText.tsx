import React from 'react';
import ButtonLanding from '../ButtonLanding';
import dynamic from "next/dynamic";

const SplineGlobe = dynamic(() => import("@/components/Home/SplineGlobe"), {
  ssr: false,
});

const HeroGlobeText = () => {
  return (
    <div className="flex flex-row gap-44 justify-center items-center h-full">
      <div>
        <div className="text-5xl text-center md:text-6xl lg:text-8xl font-bold pb-6 lg:pb-8 font-kagitingan">
          TECHTRIX
        </div>
        <div className="text-xl md:text-2xl lg:text-3xl font-semibold pb-4 text-center font-alexandria">
          Annual Technical Fest
        </div>
        <div className='text-center'>
          <ButtonLanding text="Explore" />
        </div>
      </div>
      {/* <div className="hidden lg:block md:h-[400px] lg:h-[75%] lg:w-[80%]">
        <SplineGlobe />
      </div> */}
    </div>
  );
};

export default HeroGlobeText;
