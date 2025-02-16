'use client';
import { EventCards } from '@/components/admin/manage-events';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Link href="/admin/manage-events/add-event">
        <Button className="mt-3 mb-4 adminButton p-6">Add Event</Button>
      </Link>
      <EventCards />
    </div>
  );
};

export default Page;
