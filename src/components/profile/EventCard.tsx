'use client';

import { useState } from 'react';
import parse from 'html-react-parser';
import { Card } from '@/components/ui/card';
import styles from './EventCard.module.css';
import Image from 'next/image';

interface EventCardProps {
  title: string;
  subtitle?: string;
  schedule?: string;
  image_url: string;
  button_text?: string;
  showExploreButton?: boolean;
  showMoreDetails?: boolean;
  exploreAction?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  subtitle,
  schedule,
  image_url,
  button_text = 'View Details',
  showMoreDetails = false,
  showExploreButton = false,
  exploreAction = () => {},
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card
      onClick={exploreAction}
      className={`${styles.card} bg-black/40 w-[320px] h-[400px] flex-shrink-0 backdrop-blur-sm border-none overflow-hidden group transition-transform duration-300 cursor-pointer`}
      onTouchStart={() => setIsActive(!isActive)}
    >
      <div className={`${styles.cardContent} relative h-full w-full`}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}

        {/* Next.js Optimized Image */}
        <Image
          src={image_url}
          alt={title}
          fill
          className="object-cover"
          onLoad={() => setIsLoading(false)}
          priority
        />
        <div
          className={`${styles.content} ${isActive ? styles.active : ''} absolute inset-0 p-6 pb-14 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent`}
        >
          <h2 className="text-white font-kagitingan tracking-widest text-xl mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-300 text-base line-clamp-2 font-alexandria">
              {parse(subtitle)}
            </p>
          )}
          {schedule && (
            <p className="text-gray-400 text-xs">{parse(schedule)}</p>
          )}
          {showMoreDetails && (
            <div className="mt-4 px-6 py-2 bg-yellow-200 text-black font-bold rounded-md transition-all duration-300 ease-in-out hover:bg-yellow-100">
              {button_text}
            </div>
          )}
          {showExploreButton && (
            <div
              onClick={exploreAction}
              className="mt-4 px-6 py-2 bg-yellow-200 text-black font-bold rounded-md transition-all duration-300 ease-in-out hover:bg-yellow-100"
            >
              {'Explore'}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
