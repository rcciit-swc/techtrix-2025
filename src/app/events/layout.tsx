import React from 'react';
import EventWrapper from '@/components/Event/EventWrapper';

type props = {
  children: React.ReactNode;
  categoryId: string;
  eventId: string;
};

const EventLayout = ({ children, categoryId, eventId }: props) => {
  return (
    <EventWrapper categoryId={categoryId} eventId={eventId}>
      {children}
    </EventWrapper>
  );
};

export default EventLayout;
