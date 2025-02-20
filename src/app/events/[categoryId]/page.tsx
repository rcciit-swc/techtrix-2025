"use client";
import React from "react";
import dynamic from "next/dynamic";

const CarouselCards = dynamic(() => import("@/components/Event/CarouselCards"), { ssr: false });

const Events = ({ params }: { params: { categoryId: string } }) => {

  return (
    <CarouselCards />
  );
};

export default Events;
