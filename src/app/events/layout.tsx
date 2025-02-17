import React from "react";
import EventWrapper from "@/components/Event/EventWrapper";

type props = {
  children: React.ReactNode;
  categoryId: string;
};

const EventLayout = ({ children, categoryId }: props) => {
    return (
      <EventWrapper categoryId={categoryId}>
        {children}
      </EventWrapper>
  );
};

export default EventLayout;