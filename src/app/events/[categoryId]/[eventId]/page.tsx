import React from 'react';
import EventLayout from '../../layout';
import EventDetails from '@/components/Event/EventDetails';
import { getEventByID } from '@/utils/functions';

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

interface EventsProps {
  params: { categoryId: string; eventId: string };
}

const Events = async ({ params }: EventsProps) => {
  const eventData = (await getEventByID(params.eventId)) as EventData | null;

  if (!eventData || !eventData.id) {
    return <div className="text-white text-center mt-10">Event not found</div>;
  }

  return (
    <EventLayout categoryId={params.categoryId} eventId={params.eventId}>
      <EventDetails
        categoryId={params.categoryId}
        eventId={params.eventId}
        eventData={eventData}
      />
    </EventLayout>
  );
};

export default Events;
