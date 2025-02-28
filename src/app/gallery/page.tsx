import ComingSoon from '@/components/common/ComingSoon';
import GalleryCard from '@/components/gallery/GalleryCard';
import { sampleData } from '@/utils/constraints/constants/gallery';
import React from 'react';

const page = () => {
  return (
    <div className='w-full h-full relative flex flex-col min-h-screen max-lg:pt-40 pt-40 pb-20 items-center justify-center'>
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="/assets/Home/bg2.mp4" // Change this to your video file path
        autoPlay
        loop
        muted
      />
       <h1
        id="glowPink"
        className="text-5xl sm:text-4xl md:text-6xl font-bold text-transparent font-kagitingan pb-4 sm:pb-6 text-left z-10"
      >
        Gallery
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-4">
        {sampleData.map((data, index) => (
          <GalleryCard key={index} image={data.image} />
        ))}
      </div>
    </div>
  );
};

export default page;
