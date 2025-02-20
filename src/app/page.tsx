"use client";
import { useState, useEffect } from "react";
import About from '@/components/About';
import Events from '@/components/Event/Events';
import { HeroBg } from '@/components/Home/HeroBg';
import { HeroGlobeText } from '@/components/Home/HeroGlobeText';
import { EventLanding } from '@/components/Home/EventLanding';
import SplashScreen from "@/components/GifRender/SplashScreen";

const Page = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Check if this is a fresh page load or reload
    const isPageReload = !window.performance.navigation.type || 
                        window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD;
    
    if (isPageReload) {
      setShowSplash(true);
    }
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <div className="fade-in">
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
      )}
    </>
  );
};

export default Page;

