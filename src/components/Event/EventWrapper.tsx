'use client';
import React, { useEffect, useState } from 'react';

type EventWrapperProps = {
  children: React.ReactNode;
  categoryId: string; // Ensure this is defined
  eventId: string; // Ensure this is defined
};

// const arrayBg = [
//   {
//     categoryId: 'flagship',
//     splineComp: 'https://prod.spline.design/PZ9QzTsbQMzmUmug/scene.splinecode',
//   },
//   {
//     categoryId: 'robotics',
//     splineComp: 'https://prod.spline.design/zGy5ixBCBBLND-NK/scene.splinecode',
//   },
//   {
//     categoryId: 'automata',
//     splineComp: 'https://prod.spline.design/mJyPyojy9mEcdvE3/scene.splinecode',
//   },
//   {
//     categoryId: 'gaming',
//     splineComp: 'https://prod.spline.design/iAQMjUcpZrpUdA79/scene.splinecode',
//   },
//   {
//     categoryId: 'outofthebox',
//     splineComp: 'https://prod.spline.design/pVmBvxdBXydi1VFE/scene.splinecode',
//   },
// ];

const EventWrapper = ({ children, categoryId, eventId }: EventWrapperProps) => {
  // const [splineUrl, setSplineUrl] = useState<string | null>(null);

  // useEffect(() => {
  //   const selectedBg = arrayBg.find((item) => item.categoryId === categoryId);
  //   setSplineUrl(selectedBg ? selectedBg.splineComp : null);
  // }, [categoryId]);

  return (
    <div className="relative min-h-screen w-screen text-white">
      {/* {splineUrl && (
        <div key={splineUrl} className="absolute inset-0 w-full h-full -z-10">
          <Spline scene={splineUrl} />
        </div>
      )} */}
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="/assets/Home/bg2.mp4" // Change this to your video file path
        autoPlay
        loop
        muted
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default EventWrapper;
