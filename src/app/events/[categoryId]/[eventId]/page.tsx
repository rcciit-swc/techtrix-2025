import React from 'react';
import EventDetails from '@/components/Event/EventDetails';
import { getEventByID } from '@/utils/functions';
import { TechtrixCategories } from '@/utils/constraints/constants/fests';
import Image from 'next/image';

interface Coordinator {
  name: string;
  phone: string;
}

interface Link {
  url: string;
  title: string;
}

interface EventData {
  id: string;
  event_category_id: string;
  name: string;
  description: string;
  min_team_size: number;
  max_team_size: number;
  registration_fees: number;
  prize_pool: number;
  schedule: string;
  rules: string;
  reg_status: boolean;
  image_url: string;
  coordinators: Coordinator[];
  links: Link[];
  registered: boolean;
}

const Events = async ({ params }: { params: { categoryId: string; eventId: string } }) => {
  const { categoryId, eventId } = params;
  const eventData = (await getEventByID(eventId)) as EventData | null;
  const eventCategory =
    TechtrixCategories.find((category) => category.id === categoryId)
      ?.name || '';
  if (!eventData || !eventData.id) {
    return  <Image
                src={'/assets/Home/loader.gif'}
                className="w-full h-full lg:w-[800px] lg:h-[400px]"
                alt=""
                width={1000}
                height={500}
              />;
  }

  return (
      <EventDetails
        eventCategory={eventCategory}
        categoryId={categoryId}
        eventId={eventId}
        eventData={eventData}
      />
  );
};

export default Events;
