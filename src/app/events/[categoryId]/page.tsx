'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useEvents } from '@/lib/stores';
import { TechtrixCategories } from '@/utils/constraints/constants/fests';
import EventCard from '@/components/profile/EventCard';
import { useRouter } from 'next/navigation';
import ComingSoon from '@/components/common/ComingSoon';
import Image from 'next/image';

const CarouselCards = dynamic(
  () => import('@/components/Event/CarouselCards'),
  { ssr: false }
);

const Events = ({ params }: { params: { categoryId: any } }) => {
  const categoryId = params?.categoryId;
  const { eventsData } = useEvents();
  const events = eventsData?.filter(
    (category) => category.event_category_id === categoryId
  );
  const categoryName = TechtrixCategories.find(
    (category) => category.id === categoryId
  )?.name;
  if (!events || events?.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center py-20">
        <Image
          src={'/assets/Home/loader.gif'}
          className="w-full h-full lg:w-[800px] lg:h-[400px]"
          alt=""
          unoptimized
          width={1000}
          height={500}
        />
      </div>
    );
  }
  const router = useRouter();
  return (
    <div className="flex justify-center items-center w-full h-full relative">
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="/assets/Home/bg2.mp4" // Change this to your video file path
        autoPlay
        loop
        muted
      />
      {/* <CarouselCards events={eventsDataDetails} categoryName={categoryName || ''} categoryId={
        categoryId
      } /> */}
      <div className="flex flex-col items-center justify-center w-full h-full pt-[150px]">
        <h1
          id="glowPink"
          className="text-5xl sm:text-4xl md:text-6xl font-bold text-transparent font-kagitingan pb-4 sm:pb-6 text-left"
        >
          {categoryName}
        </h1>
        {/* <ComingSoon /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 lg:grid-cols-3 gap-10 pb-10">
          {events?.map((event, index) => {
            return (
              <EventCard
                key={index}
                title={event.name}
                subtitle={event.description}
                schedule={event.schedule}
                image_url={event.image_url}
                showExploreButton={true}
                exploreAction={() => {
                  router.push(
                    `/events/${event?.event_category_id}/${event.id}`
                  );
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;
