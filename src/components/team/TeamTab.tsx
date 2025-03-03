'use client';
import React, { use } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import EncryptButton from '../common/Button';

type Props = {
  team: {
    category: string;
    path: string;
  };
};

const TeamTab = ({ team }: Props) => {
  const pathname = usePathname();
  return (
    <Link href={team.path} className="cursor-pointer">
      {/* <div className='p-0.5 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 '>
        <Button
          className={`text-white px-5 md:px-7 py-1 md:py-2 keania-one-regular font-semibold text-sm md:text-lg bg-black hover:bg-zinc-900 focus:bg-zinc-900`}
        >
          {team.category}
        </Button>
      </div> */}
      <EncryptButton title={team.category} />
    </Link>
  );
};

export default TeamTab;
