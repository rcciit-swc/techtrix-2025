'use client';

import Image from 'next/image';
import React from 'react';

interface GalleryCardProps {
  image: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ image }) => {
  return (
    <>
      <div className="holographic-container relative">
        <div className="holographic-card relative">
          <Image
            alt="Gallery Image"
            width={400}
            height={400}
            src={image}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default GalleryCard;
