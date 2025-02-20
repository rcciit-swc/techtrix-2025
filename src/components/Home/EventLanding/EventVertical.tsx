import React from 'react';
import SVGIcon from '@/components/SVGIcon';

const EventVertical = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute flex flex-col gap-28 w-full px-10">
        <div className="text-2xl font-kagitingan text-white self-start">OUT OF THE BOX</div>
        <div className="text-2xl font-kagitingan text-white self-end">AUTOMATA</div>
        {/* <div className='absolute top-1/2 left-1/2 self-center z-10'>
          <SVGIcon iconName='techtrixLogo' />
        </div> */}
        <div className="text-2xl font-kagitingan text-white self-start">GAMING</div>
        <div className="text-2xl font-kagitingan text-white self-end">ROBOTICS</div>
        <div className="text-2xl font-kagitingan text-white self-start">FLAGSHIP</div>
      </div>
    </div>
  );
};

export default EventVertical;
