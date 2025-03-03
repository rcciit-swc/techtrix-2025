import { teams } from '@/utils/constraints/constants/team';
import React from 'react';
import TeamTab from './TeamTab';

type Props = {
  children: React.ReactNode;
};

const TeamWrapper = ({ children }: Props) => {
  return (
    <div className="mx-auto flex flex-col items-center gap-5 scroll-smooth">
      <h1
        id="glowPink"
        className="text-5xl sm:text-4xl md:text-6xl font-bold text-transparent font-kagitingan pb-4 sm:pb-6 text-left z-10"
      >
        TEAMS
      </h1>
      <div className="mx-auto md:px-2 flex w-full flex-row flex-wrap items-center justify-center gap-2 md:gap-4 lg:gap-6 ">
        {teams.map((teamItem, index) => (
          <TeamTab key={index} team={teamItem} />
        ))}
      </div>
      <div className="mb-4">{children}</div>
    </div>
  );
};

export default TeamWrapper;
