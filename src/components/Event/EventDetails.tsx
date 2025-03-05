'use client';
import { useEvents, useUser } from '@/lib/stores';
import React, { useEffect, useState } from 'react';
import { SoloEventRegistration } from '../events/EventRegistrationDialog';
import { TeamEventRegistration } from '../events/TeamEventRegistration';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { login } from '@/utils/functions/login';
import Link from 'next/link';
import { RulesDialog } from '../admin/manage-events';
import Image from 'next/image';

type Coordinator = {
  name: string;
  phone: string;
};

type EventData = {
  id: string;
  event_category_id: string;
  name: string;
  description: string;
  min_team_size: number;
  max_team_size: number;
  registration_fees: number;
  prize_pool: number;
  image_url: string;
  schedule: string;
  rules: string;
  reg_status: boolean;
  coordinators: Coordinator[];
  links: { url: string; title: string }[];
  registered: boolean;
};

type EventDetailsProps = {
  eventCategory: string;
  categoryId: string;
  eventId: string;
  eventData: EventData;
};

const freeCategories: string[] = [
  '0f52d7d3-a9e7-454a-bff0-979de725e51a',
  'a1bb62c8-fd3d-485a-959e-be8cc528cc43',
  '4ff0cd32-079f-43fd-84b0-b9147f74eaca',
];

const EventDetails: React.FC<EventDetailsProps> = ({
  categoryId,
  eventId,
  eventData,
  eventCategory,
}) => {
  const { eventsLoading, eventsData } = useEvents();
  const [isSoloOpen, setIsSoloOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const { userData, userLoading, swcStatus } = useUser();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (
      swcStatus &&
      freeCategories?.length > 0 &&
      freeCategories.includes(categoryId)
    ) {
      setIsFree(true);
    }
  }, [swcStatus]);

  useEffect(() => {
    if (eventsData) {
      const event = eventsData?.find((event: any) => event.id === eventId);
      if (event) {
        setIsRegistered(event.registered || false);
      }
    }
  }, [eventsData]);
  const handleRegister = async () => {
    if (userLoading) {
      toast.info('Please wait while we check your login status');
      return;
    }
    if (!userData) {
      await login();
      return;
    }

    if (
      !userData.phone ||
      !userData.name ||
      userData.phone.trim() === '' ||
      userData.name.trim() === ''
    ) {
      router.push(
        `/profile?onboarding=true&callback=${encodeURIComponent(`/events/${categoryId}/${eventId}`)}`
      );
      return;
    }

    if (eventData?.max_team_size === 1) {
      setIsSoloOpen(true);
    } else {
      setIsTeamOpen(true);
    }
  };

  if (eventsLoading || !eventData) {
    return (
      <div className="min-h-screen w-full mt-14 text-white flex flex-col items-center py-16 px-4 relative">
        <Image
          src={'/assets/Home/loader.gif'}
          className="w-full h-full lg:w-[800px] lg:h-[400px]"
          alt=""
          unoptimized
          width={1000}
          height={500}
        />
      </div>
    );
  }
  return (
    <div className="relative w-full ">
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="/assets/Home/bg2.mp4" // Change this to your video file path
        autoPlay
        loop
        muted
      />
      <div className="relative max-w-5xl mx-auto p-4 sm:p-6 pt-24 sm:pt-36 mt-10 mix-blend-normal">
        <h1
          id="glowPink"
          className="text-5xl sm:text-4xl md:text-6xl font-bold text-transparent font-kagitingan pb-4 sm:pb-6 text-left"
        >
          {eventCategory}
        </h1>

        <div
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/8f/25/28/8f252885748bc324b7dcbbb56c67bdaf.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="relative rounded-lg border-[2px] border-yellow-200 p-4 sm:p-8 md:p-16 backdrop-blur-[20.5px]"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-8">
            <Image
              src={eventData.image_url}
              alt={eventData.name}
              width={500}
              height={600}
              className="w-full sm:w-[50%] md:w-[40%] aspect-[5/6] bg-gray-800 rounded-md object-cover"
            />

            <div className="w-full flex flex-col items-center justify-center space-y-6 sm:space-y-10">
              <h2
                id="glowPurple"
                className="text-3xl sm:text-5xl font-bold text-transparent font-kagitingan text-center"
              >
                <span className="block">{eventData?.name}</span>
              </h2>

              <div className="relative flex flex-col justify-start w-full sm:w-2/3 px-4 sm:px-6 py-6 sm:py-8 rounded-3xl bg-gradient-to-tl from-black via-black/70 to-gray-800 border border-white shadow-lg">
                <h2 className="text-white font-kagitingan text-lg">
                  EVENT COORDINATORS
                </h2>
                {eventData?.coordinators.map((coordinator, index) => (
                  <p key={index} className="font-alexandria text-gray-300 mt-2">
                    {coordinator.name}:{' '}
                    <Link
                      className="text-yellow-200 font-alexandria hover:text-green-200"
                      href={`tel:${coordinator.phone}`}
                    >
                      {coordinator.phone}
                    </Link>
                  </p>
                ))}
              </div>
              <div className="flex flex-row items-center justify-center gap-4">
                <RulesDialog rules={eventData.rules} />
             {eventData?.reg_status  ?   <div className=" text-center">
                  {eventId === 'd363c243-1db6-4ba4-b8bd-a53c5384234b' ? (
                    <Link
                      href={'https://forms.gle/HajdFmCWVEsKgjRMA'}
                      target="_blank"
                      className=" px-6 sm:px-10 py-2 sm:py-3 font-kagitingan text-sm lg:text-xl tracking-widest text-black rounded-full bg-gradient-to-b from-[#B700FF] via-[#D966FF] to-[#F4A1FF]"
                    >
                      {'Fill the Form'}
                    </Link>
                  ) : (
                    <button
                      onClick={isRegistered ? () => {} : handleRegister}
                      className=" px-6 sm:px-10 py-2 sm:py-3 font-kagitingan text-sm lg:text-xl tracking-widest text-black rounded-full bg-gradient-to-b from-[#B700FF] via-[#D966FF] to-[#F4A1FF]"
                    >
                      {isRegistered ? 'Registered' : 'Register Now'}
                    </button>
                  )}
                  {/* <button
                  onClick={()=>{
                    toast.success('Registration will be open soon !');
                  }}
                  className=" px-6 sm:px-10 py-2 sm:py-3 font-kagitingan text-sm lg:text-xl tracking-widest text-black rounded-full bg-gradient-to-b from-[#B700FF] via-[#D966FF] to-[#F4A1FF]"
                >
                  Register Soon
                </button> */}
                </div>  : 
                 <div
                 onClick={()=>{
                  toast.info('Registration Closed !');
                 }}
                 className=" px-6 sm:px-10 py-2 sm:py-3 cursor-pointer font-kagitingan text-sm lg:text-xl tracking-widest text-black rounded-full bg-gradient-to-b from-[#B700FF] via-[#D966FF] to-[#F4A1FF]"
               >
                 {'Registration Closed !'}
               </div>
                }
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 text-white text-base sm:text-lg">
            <h1
              id="glowPink"
              className="text-xl tracking-widest flex flex-row sm:text-2xl md:text-3xl font-semibold text-transparent font-kagitingan text-left"
            >
              Registration Fees :{' '}
              <span className="text-white">
                {' '}
                &nbsp;
                {isFree ? 'Free' : eventData.registration_fees}
              </span>
            </h1>
          </div>
          <div className="mt-4 sm:mt-6 text-white text-base sm:text-lg">
            <h1
              id="glowPink"
              className="text-xl tracking-widest flex flex-row sm:text-2xl md:text-3xl font-semibold text-transparent font-kagitingan text-left"
            >
              Team Size :{' '}
              <span className="text-white">
                {' '}
                &nbsp;
                {eventData.min_team_size === eventData.max_team_size
                  ? eventData.max_team_size
                  : `${eventData.min_team_size} - ${eventData.max_team_size}`}
              </span>
            </h1>
          </div>
          <div className="mt-4 sm:mt-6 text-white text-base sm:text-lg">
            <h1
              id="glowPink"
              className="text-xl tracking-widest sm:text-2xl md:text-3xl font-semibold text-transparent font-kagitingan text-left"
            >
              Schedule :
            </h1>
            {eventData?.schedule && (
              <div
                className="font-alexandria"
                dangerouslySetInnerHTML={{ __html: eventData.schedule }}
              />
            )}
          </div>
          <div className="mt-4 sm:mt-6 text-white text-base sm:text-lg">
            <h1
              id="glowPink"
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent font-kagitingan  text-left"
            >
              Description :
            </h1>
            {eventData?.description && (
              <div
                className="font-alexandria"
                dangerouslySetInnerHTML={{ __html: eventData.description }}
              />
            )}
          </div>
        </div>

        {eventData?.id && (
          <SoloEventRegistration
            isOpen={isSoloOpen}
            eventID={eventData.id}
            onClose={() => setIsSoloOpen(false)}
            eventName={eventData.name}
            eventFees={eventData.registration_fees}
            isFree={isFree}
          />
        )}
        {eventData?.id && (
          <TeamEventRegistration
            isOpen={isTeamOpen}
            eventFees={eventData.registration_fees}
            onClose={() => setIsTeamOpen(false)}
            eventID={eventData.id}
            eventName={eventData.name}
            minTeamSize={eventData.min_team_size}
            maxTeamSize={eventData.max_team_size}
            isFree={isFree}
          />
        )}
      </div>
    </div>
  );
};

export default EventDetails;
