'use client';
import { LayoutGrid } from '@/components/ui/layout-grid';
import Image from 'next/image';
import EventCard from '@/components/profile/EventCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EventLanding() {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen max-lg:pt-40 pt-40 pb-20 items-center justify-center bg-black">
      <div className="inset-0">
        <Image
          src="https://i.postimg.cc/pVDLP06f/stars2.png"
          alt="Starfield Background"
          fill
          className="object-cover"
          quality={100}
        />
      </div>
      <h1
        id="glowPink"
        className="text-5xl sm:text-4xl md:text-6xl font-bold text-transparent font-kagitingan pb-4 sm:pb-6 text-left z-10"
      >
        EVENTS
      </h1>
      <div className="w-full max-w-7xl">
        {isMobile ? (
          // Render events as a vertical list on mobile
          <div className="flex flex-col items-center gap-6 p-4">
            {cards.map((card) => (
              <EventCard
                key={card.id}
                title={card.name}
                image_url={card.thumbnail}
                showExploreButton
                exploreAction={() => router.push(`/events/${card.id}`)}
              />
            ))}
          </div>
        ) : (
          // Render LayoutGrid on desktop
          <LayoutGrid cards={cards} />
        )}
      </div>
    </div>
  );
}

const cards = [
  {
    id: 'a1bb62c8-fd3d-485a-959e-be8cc528cc43',
    content: <Skeleton />,
    name: 'Automata',
    thumbnail: '/assets/Events/Categories/automata.png',
  },
  {
    id: '4ff0cd32-079f-43fd-84b0-b9147f74eaca',
    content: <Skeleton />,
    name: 'Flagship',
    thumbnail: '/assets/Events/Categories/flagship.png',
  },
  {
    id: '0f52d7d3-a9e7-454a-bff0-979de725e51a',
    content: <Skeleton />,
    name: 'Out of the Box',
    thumbnail: 'https://i.postimg.cc/CxmmXyyc/ICON-BOX-WEBSITE.png',
  },
  {
    id: '0f947f04-f7bc-45f7-a66c-789b2bbe2b53',
    name: 'Robotics',
    thumbnail: '/assets/Events/Categories/robotics.png',
  },
  {
    id: '43c36d73-7e86-4c5b-a580-cecda4b14281',
    name: 'Gaming',
    thumbnail: '/assets/Events/Categories/gaming.png',
  },
];
