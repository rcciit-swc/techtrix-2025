'use client';
import { LayoutGrid } from '@/components/ui/layout-grid';
import Image from 'next/image';

export default function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full flex flex-col items-center justify-center">
      <div className="inset-0">
        <Image
          src="/assets/home/star2.svg"
          alt="Starfield Background"
          fill
          className="object-cover"
          quality={100}
        />
        {/* <div className="absolute bottom-0 w-full h-10 bg-[#030204] bg-opacity-60 backdrop-blur-sm" /> */}
      </div>
      <h1 className="font-kagitingan text-5xl text-white z-[10]">EVENTS</h1>
      <LayoutGrid cards={cards} />
    </div>
  );
}

const Skeleton = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Category Name</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
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
    className: 'col-span-1',
    thumbnail:
      'https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    content: <Skeleton />,
    className: 'col-span-1',
    thumbnail:
      'https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    content: <Skeleton />,
    className: 'col-span-1',
    thumbnail:
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    content: <Skeleton />,
    className: 'col-span-1',
    thumbnail:
      'https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    content: <Skeleton />,
    className: 'col-span-1',
    thumbnail:
      'https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];
