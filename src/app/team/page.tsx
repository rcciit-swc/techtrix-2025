import ComingSoon from '@/components/common/ComingSoon';
import React from 'react';

const page = () => {
  return (
    <div className='flex justify-center items-center w-full h-full relative min-h-screen'>
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="/assets/Home/bg2.mp4" // Change this to your video file path
        autoPlay
        loop
        muted
      />
      <ComingSoon />
    </div>
  );
};

export default page;
