import Image from 'next/image';
import React from 'react';
import ButtonLanding from '../Home/ButtonLanding';

const ComingSoon = () => {
  return (
    <div className='flex justify-center items-center w-full h-full relative min-h-screen'>
      {/* Background */}

      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="/assets/Home/bg2.mp4" // Change this to your video file path
        autoPlay
        loop
        muted
      />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center text-white z-10">
        <h1 className="text-5xl font-bold md:text-6xl lg:text-8xl font-kagitingan">
          TECHTRIX <span className="text-yellow-200">2025</span>
        </h1>
        <div className="text-xl md:text-2xl lg:text-3xl font-semibold pb-4 font-alexandria">
          Annual Technical Fest of RCCIIT
        </div>
        <ButtonLanding text="Coming Soon" disabled />
      </div>
    </div>
  );
};

export default ComingSoon;
