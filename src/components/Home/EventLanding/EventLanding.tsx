import React from 'react';
import Spline from '@splinetool/react-spline';
import SVGIcon from '@/components/SVGIcon';

const EventLanding = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 z-5">
        <Spline
          className="w-full h-full"
          scene="https://prod.spline.design/rtqfU16qw4yRAl5t/scene.splinecode"
        />
      </div>
      <div className="absolute pb-48">
        <div className="flex flex-row space-x-[55rem] pb-12">
          <div className="text-2xl font-kagitingan text-white">
            OUT OF THE BOX
          </div>
          <div className="text-2xl font-kagitingan text-white">AUTOMATA</div>
        </div>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/4 flex flex-col items-center">
          <div className="flex flex-row gap-28 -mb-10">
            <div className="text-2xl font-kagitingan text-white">GAMING</div>
            <div className="text-2xl font-kagitingan text-white">ROBOTICS</div>
            <div className="text-2xl font-kagitingan text-white">FLAGSHIP</div>
          </div>
          <div className="mt-6">
            <SVGIcon iconName="techtrixLogo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLanding;
