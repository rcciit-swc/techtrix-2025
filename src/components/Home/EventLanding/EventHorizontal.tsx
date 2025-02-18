import React from 'react';
import Spline from '@splinetool/react-spline';
import SVGIcon from '@/components/SVGIcon';
import Image from 'next/image';

const EventHorizontal = () => {
  return (

      <div className="relative min-w-screen  flex flex-col items-center justify-center">
        <Image src="/assets/home/eventbg.png" alt="Starfield Background" fill className="object-cover -z-10" quality={100} />
        <h1 className='text-7xl py-9 font-kagitingan'>Events</h1>
          <Image src="/assets/home/eventbg.png" alt="Starfield Background" fill className="object-cover -z-10" quality={100} />
      
      <div>
      {/* <Spline
        scene="https://prod.spline.design/KEELmKSXO3Evqb00/scene.splinecode" 
        className='object-cover'
      /> */}
        {/* <SVGIcon iconName="events" className='w-[100%] object-cover' /> */}
      </div>
      <div className="absolute pb-40">
        <div className="flex flex-row space-x-[55rem] pb-37">
          <div className="text-2xl font-kagitingan text-white">
            OUT OF THE BOX
          </div>
          <div className="text-2xl font-kagitingan text-white">AUTOMATA</div>
        </div>

        <div className="absolute left-1/2 top-1/2 ml-4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="flex flex-row gap-28 -mb-28 tracking-wider">
            <div className="text-2xl font-kagitingan text-white">GAMING</div>
            <div className="text-2xl font-kagitingan text-white">ROBOTICS</div>
            <div className="text-2xl font-kagitingan text-white">FLAGSHIP</div>
          </div>
 
        </div>

      </div>
      <div className="absolute mr-2 bottom-60 w-full flex justify-center items-center">
            <SVGIcon iconName="techtrixLogo" />
          </div>
  </div>
  );
};

export default EventHorizontal;
