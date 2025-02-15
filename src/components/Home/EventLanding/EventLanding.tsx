import React from 'react';
import Spline from '@splinetool/react-spline';
import SVGIcon from '@/components/SVGIcon';
import EventHorizontal from './EventHorizontal';
import EventVertical from './EventVertical';

const EventLanding = () => {
  return (
    <div>
      <div className="hidden lg:block">
        <EventHorizontal />
      </div>

      <div className="block lg:hidden">
        <EventVertical />
      </div>
    </div>
  );
};

export default EventLanding;
