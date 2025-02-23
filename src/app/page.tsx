'use client';
import { useState, useEffect } from 'react';
import About from '@/components/About';
import Events from '@/components/Event/Events';
import { HeroBg } from '@/components/Home/HeroBg';
import { HeroGlobeText } from '@/components/Home/HeroGlobeText';
import { EventLanding } from '@/components/Home/EventLanding';
import SplashScreen from '@/components/GifRender/SplashScreen';
import Image from 'next/image';

const Page = () => {
  // const [showSplash, setShowSplash] = useState(false);

  // useEffect(() => {
  //   // Check if this is a fresh page load or reload
  //   const isPageReload = !window.performance.navigation.type ||
  //                       window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD;

  //   if (isPageReload) {
  //     setShowSplash(true);
  //   }
  // }, []);

  return (
    <>
      {/* {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : ( */}
      <div className="fade-in">
        <div className="inset-0">
          <Image
            src="https://i.postimg.cc/pVDLP06f/stars2.png"
            alt="Starfield Background"
            fill
            className="object-cover bg-repeat-y h-full"
            quality={100}
          />
          <div className="absolute bottom-0 w-full h-10 bg-[#030204] bg-opacity-60 backdrop-blur-lg" />
        </div>
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
      {/* )} */}
    </>
  );
};

export default Page;
