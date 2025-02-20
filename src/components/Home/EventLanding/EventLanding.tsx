'use client';
import { LayoutGrid } from '@/components/ui/layout-grid';

export default function EventLanding() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-black">
      <h1 className="font-kagitingan text-5xl text-white">EVENTS</h1>
      <div className="w-full max-w-7xl">
        <LayoutGrid cards={cards} />
      </div>
    </div>
  )
}

const Skeleton = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Category Name</p>
      <p className="font-normal text-base my-4 text-neutral-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eos
        temporibus nostrum soluta voluptatum quam placeat, cumque cum ipsum
        itaque molestias omnis aperiam dolor sequi similique in odit suscipit!
        Veritatis!
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <Skeleton />,
    thumbnail: '/assets/Events/Categories/automata.png',
  },
  {
    id: 2,
    content: <Skeleton />,
    thumbnail: '/assets/Events/Categories/flagship.png',
  },
  {
    id: 3,
    content: <Skeleton />,
    thumbnail: '/assets/Events/Categories/outofthebox.png',
  },
  {
    id: 4,
    content: <Skeleton />,
    thumbnail: '/assets/Events/Categories/robotics.png',
  },
  {
    id: 5,
    content: <Skeleton />,
    thumbnail: '/assets/Events/Categories/gaming.png',
  },
];
