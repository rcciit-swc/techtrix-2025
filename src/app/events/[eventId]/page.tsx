import EventDetails from '@/components/events/EventDetails';
import { getEventByName } from '@/utils/functions';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

// Create cached version of getEventByName
const getCachedEvent = cache(async (eventName: string) => {
  return getEventByName(eventName);
});

export async function generateMetadata({
  params,
}: {
  params: { eventId: string };
}): Promise<Metadata> {
  const eventData = await getCachedEvent(decodeURIComponent(params.eventId));
  return {
    title: eventData ? `${eventData.name} - Events` : 'Event Not Found',
    description: eventData ? `Details for ${eventData.name}` : '',
  };
}

export default async function EventDetailsPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventData = await getCachedEvent(decodeURIComponent(params.eventId));

  if (!eventData) {
    notFound();
  }

  return <EventDetails eventData={eventData} />;
}