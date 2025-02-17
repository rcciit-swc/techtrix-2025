import { HeroBg } from '@/components/Home/HeroBg';
import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 z-0">
        <HeroBg showAssets={false} />
      </div>
    </div>
  );
};

export default Page;
