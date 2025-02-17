"use client"
import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

type EventWrapperProps = {
  children: React.ReactNode;
  categoryId: string; // Ensure this is defined
};

const arrayBg = [
  {
    categoryId: 'flagship',
    splineComp: 'https://prod.spline.design/PZ9QzTsbQMzmUmug/scene.splinecode',
  },
  {
    categoryId: 'robotics',
    splineComp: 'https://prod.spline.design/zGy5ixBCBBLND-NK/scene.splinecode',
  },
  {
    categoryId: 'automata',
    splineComp: 'https://prod.spline.design/mJyPyojy9mEcdvE3/scene.splinecode',
  },
  {
    categoryId: 'gaming',
    splineComp: 'https://prod.spline.design/iAQMjUcpZrpUdA79/scene.splinecode',
  },
  {
    categoryId: 'outofthebox',
    splineComp: 'https://prod.spline.design/pVmBvxdBXydi1VFE/scene.splinecode',
  },
];

const EventWrapper = ({ children, categoryId }: EventWrapperProps) => {
  const [splineUrl, setSplineUrl] = useState<string | null>(null);

  useEffect(() => {
    const selectedBg = arrayBg.find((item) => item.categoryId === categoryId);
    setSplineUrl(selectedBg ? selectedBg.splineComp : null);
  }, [categoryId]);

  return (
    <div className="relative min-h-screen text-white">
      {splineUrl && (
        <div key={splineUrl} className="absolute inset-0 w-full h-full -z-10">
          <Spline scene={splineUrl} />
        </div>
      )}

      {children}
    </div>
  );
};

export default EventWrapper;
