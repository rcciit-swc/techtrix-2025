'use client';
import { useEvents, useUser } from '@/lib/stores';
import React, { useState } from 'react';
import { SoloEventRegistration } from '../events/EventRegistrationDialog';
import { TeamEventRegistration } from '../events/TeamEventRegistration';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { login } from '@/utils/functions/login';

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
  categoryId: string;
  eventId: string;
  eventData: EventData;
};

const EventDetails: React.FC<EventDetailsProps> = ({ categoryId, eventId, eventData }) => {
  const { eventsLoading } = useEvents();
  const [isSoloOpen, setIsSoloOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const { userData, userLoading } = useUser();
  const router = useRouter();

  const handleRegister = async () => {
    if (userLoading) {
      toast.info('Please wait while we check your login status');
      return;
    }
    if (!userData) {
      await login();
      return;
    }

    if (!userData.phone || !userData.name || userData.phone.trim() === '' || userData.name.trim() === '') {
      router.push(`/profile?onboarding=true&callback=${encodeURIComponent(`/events/${categoryId}/${eventId}`)}`);
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
        loading...
      </div>
    );
  }
  return (
    <div className="relative max-w-5xl mx-auto p-4 sm:p-6 pt-24 sm:pt-44">
      <h1 id="glowPink" className="text-3xl sm:text-4xl md:text-6xl font-bold text-transparent font-kagitingan pb-4 sm:pb-6 text-left">
        {eventData?.event_category_id}
      </h1>

      <div className="relative border border-white rounded-lg p-4 sm:p-8 md:p-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-8">
          <img src={eventData.image_url} alt={eventData.name} className="w-full sm:w-[50%] md:w-[40%] aspect-[5/6] bg-gray-800 rounded-md object-cover" />

          <div className="w-full flex flex-col items-center justify-center space-y-6 sm:space-y-10">
            <h2 id="glowPurple" className="text-3xl sm:text-5xl font-bold text-transparent font-kagitingan text-center">
              <span className="block">{eventData?.name}</span>
            </h2>

            <div className="relative flex flex-col justify-start w-full sm:w-2/3 px-4 sm:px-6 py-6 sm:py-8 rounded-3xl bg-gradient-to-tl from-black via-black/70 to-gray-800 border border-white shadow-lg">
              <h2 className="text-white font-kagitingan text-lg">EVENT COORDINATORS</h2>
              {eventData?.coordinators.map((coordinator, index) => (
                <p key={index} className="font-alexandria text-gray-300 mt-2">
                  {coordinator.name}: {coordinator.phone}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 text-white text-base sm:text-lg">{eventData?.description && <div dangerouslySetInnerHTML={{ __html: eventData.description }} />}</div>
        <div className="mt-4 sm:mt-6 text-white text-base sm:text-lg">{eventData?.schedule && <div dangerouslySetInnerHTML={{ __html: eventData.schedule }} />}</div>
        <div className="mt-4 sm:mt-6 text-white text-base sm:text-lg">{eventData?.rules && <div dangerouslySetInnerHTML={{ __html: eventData.rules }} />}</div>
        
        <div className="place-self-center text-center">
          <button onClick={handleRegister} className="mt-6 sm:mt-10 px-6 sm:px-10 py-2 sm:py-3 font-alexandria rounded-full bg-gradient-to-b from-[#B700FF] via-[#D966FF] to-[#F4A1FF]">
            {eventData.registered ? 'Registered' : 'Register Now'}
          </button>
        </div>
      </div>
      {eventData?.id && (
        <SoloEventRegistration
          isOpen={isSoloOpen}
          eventID={eventData.id}
          onClose={() => setIsSoloOpen(false)}
          eventName={eventData.name}
          eventFees={eventData.registration_fees}
        />
      )}
      {eventData?.id && (
        <TeamEventRegistration
          isOpen={isTeamOpen}
          onClose={() => setIsTeamOpen(false)}
          eventID={eventData.id}
          eventName={eventData.name}
          minTeamSize={eventData.min_team_size}
          maxTeamSize={eventData.max_team_size}
        />
      )}
    </div>
  );
};

export default EventDetails;