import React from "react";
import EventLayout from "../layout";
import EventDetails from "@/components/Event/EventDetails";

const Events = ({
  params,
}: {
  params: { categoryId: string };
}) => {

  return (
    <EventLayout categoryId={params.categoryId}>
      <EventDetails categoryId={params.categoryId} />
    </EventLayout>
  );
};

export default Events;