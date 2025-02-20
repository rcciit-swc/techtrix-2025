// import EventDetails from '@/components/events/EventDetails';
// import { getEventByName } from '@/utils/functions';
// import { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import { cache } from 'react';

// // Create cached version of getEventByName
// const getCachedEvent = cache(async (eventName: string) => {
//   return getEventByName(eventName);
// });

// export async function generateMetadata({
//   params,
// }: {
//   params: { eventId: string };
// }): Promise<Metadata> {
//   const eventData = await getCachedEvent(decodeURIComponent(params.eventId));
//   return {
//     title: eventData ? `${eventData.name} - Events` : 'Event Not Found',
//     description: eventData ? `Details for ${eventData.name}` : '',
//   };
// }

// export default async function EventDetailsPage({
//   params,
// }: {
//   params: { eventId: string };
// }) {
//   const eventData = await getCachedEvent(decodeURIComponent(params.eventId));

//   if (!eventData) {
//     notFound();
//   }

//   return <EventDetails eventData={eventData} />;
// }

import React from "react";
import EventLayout from "../../layout";
import EventDetails from "@/components/Event/EventDetails";
import { getEventByID } from "@/utils/functions";

const Events = async({
  params,
}: {
  params: { categoryId: string, eventId: string };
}) => {
  const getData = async () => {
    const data = await getEventByID(params.eventId);
    return data;
  };
  const eventData = await getData();
  return (
    // <EventLayout categoryId={params.categoryId} eventId={params.eventId}>
      <EventDetails categoryId={params.categoryId} eventId={params.eventId} eventData={eventData} />
    // </EventLayout>
  );
};

export default Events;