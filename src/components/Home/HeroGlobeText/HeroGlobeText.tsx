import React from 'react';
import ButtonLanding from '../ButtonLanding';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const SplineGlobe = dynamic(() => import('@/components/Home/SplineGlobe'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-full w-fit mx-auto">
      <video
        src="/assets/arc.webm"
        className="object-cover w-full h-full"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  ),
});

const HeroGlobeText = () => {
  return (
    <div className="flex flex-row relative  justify-center w-full items-center h-full overflow-hidden">
      <div className="  flex flex-col justify-center items-start gap-3">
        <Image
          src={'/assets/Home/rcc.svg'}
          alt=""
          width={100}
          height={100}
          className="w-[250px]"
        />
        <h1 className="text-white font-alexandria text-3xl">presents</h1>
        {/* <Image src={'/assets/Home/tfyears.svg'} alt=''  width={100} height={100} /> */}
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-5xl font-bold text-center md:text-6xl lg:text-8xl font-kagitingan">
            TECHTRIX <span className="text-yellow-200">2025</span>
          </h1>
          <div className="text-xl md:text-2xl lg:text-3xl font-semibold pb-4 text-center font-alexandria">
            Annual Technical Fest of RCCIIT
          </div>
        </div>
        <ButtonLanding text="Coming Soon" />
      </div>
      {/* <div>
        <div className="text-5xl text-center md:text-6xl lg:text-8xl font-bold pb-6 lg:pb-8 font-kagitingan">
          TECHTRIX
        </div>
        <div className="text-xl md:text-2xl lg:text-3xl font-semibold pb-4 text-center font-alexandria">
          Annual Technical Fest
        </div>
        <div className='text-center'>
          <ButtonLanding text="Explore" />
        </div>
      </div> */}
      <div className="hidden lg:block lg:w-[40%]">
        <SplineGlobe />
      </div>
    </div>
  );
};

export default HeroGlobeText;
