import ComingSoon from '@/components/common/ComingSoon';
import TeamCard from '@/components/team/TeamCard';
import TeamWrapper from '@/components/team/TeamWrapper';
import { teams } from '@/utils/constraints/constants/team';
import React from 'react';

type Params = {
  params: {
    category: string;
  };
};

const page = ({ params: { category } }: Params) => {
  const team = teams.filter((team) => team.id === category)[0];

  return (
    <div className="w-full h-full relative flex flex-col min-h-screen max-lg:pt-40 pt-40 pb-20 items-center justify-center">
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="/assets/Home/bg2.mp4" // Change this to your video file path
        autoPlay
        loop
        muted
      />
      {/* <ComingSoon /> */}
      <TeamWrapper>
        <div className="oveflow-x-hidden flex min-h-[60vh] flex-col items-center gap-10">
          <div className="mt-5 flex flex-col items-center  justify-center gap-5">
            <h1
              id="glowPink"
              className="text-center text-3xl font-bold font-kagitingan text-white"
            >
              {team?.category}
            </h1>
            <div className="mt-5 flex flex-row flex-wrap justify-center gap-10 md:gap-40">
              {team?.members.map((member, index) => (
                <div key={index}>
                  <TeamCard
                    name={member.name}
                    imageUrl={member.image}
                    role={member.role}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </TeamWrapper>
    </div>
  );
};

export default page;
