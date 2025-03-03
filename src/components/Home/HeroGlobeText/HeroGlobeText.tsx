'use client';
import React from 'react';
import ButtonLanding from '../ButtonLanding';
import Image from 'next/image';
import Countdown from '../Countdown';
import { useRouter } from 'next/navigation';

const HeroGlobeText = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row relative  justify-center w-full items-center h-full py-40 overflow-hidden">
      <div className=" mt-20 flex flex-col justify-center items-center gap-3">
        <Image
          src={'/assets/Home/rcc.svg'}
          alt=""
          width={100}
          height={100}
          className="w-[200px] lg:w-[150px] items-start flex flex-start justify-start"
        />
        <h1 className="text-white font-alexandria text-2xl lg:text-3xl">
          presents
        </h1>
        {/* <Image src={'/assets/Home/tfyears.svg'} alt=''  width={100} height={100} /> */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-6xl font-bold text-center md:text-6xl lg:text-7xl 2xl:text-8xl font-kagitingan">
            TECHTRIX <span className="text-yellow-200">2025</span>
          </h1>
          <h1 className="text-2xl font-bold text-center md:text-2xl lg:text-4xl font-kagitingan">
            6th to 8th March <span className="text-yellow-200">2025</span>
          </h1>
          <div className="text-xl md:text-2xl lg:text-3xl font-semibold pb-4 text-center font-alexandria">
            Annual Technical Fest of RCCIIT
          </div>
        </div>
        <ButtonLanding
          onClick={() => {
            router.push('/events');
          }}
          text="Explore"
        />
        <Countdown />
      </div>
    </div>
  );
};

export default HeroGlobeText;
