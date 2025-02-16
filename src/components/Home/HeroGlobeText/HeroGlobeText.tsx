import React from 'react';
import ButtonLanding from '../ButtonLanding';
import dynamic from "next/dynamic";
import Image from 'next/image';

const SplineGlobe = dynamic(() => import("@/components/Home/SplineGlobe"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-full w-fit mx-auto">
      <Image src="/assets/Home/loader.gif" alt="Loading..." width={100} className='w-full h-full mx-auto flex justify-center items-center' quality={100} height={100} />
    </div>
  ),
});

const HeroGlobeText = () => {
  return (
    <div className="flex flex-row justify-center w-full items-center h-full overflow-hidden">
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
      <div className="hidden lg:block  lg:h-[60vh] lg:w-[50vw]">
        <SplineGlobe />
      </div>
    </div>
  );
};

export default HeroGlobeText;
