'use client';
import { useEvents, useUser } from '@/lib/stores';
import React, { useEffect, useState } from 'react';
import { SoloEventRegistration } from '../events/EventRegistrationDialog';
import { TeamEventRegistration } from '../events/TeamEventRegistration';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { login } from '@/utils/functions/login';

const EventDetails = ({
  categoryId,
  eventId,
  eventData,
}: {
  categoryId: string;
  eventId: string;
  eventData: any;
}) => {

  const { eventsLoading, eventsData } = useEvents();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSoloOpen, setIsSoloOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const { userData, userLoading } = useUser();
  const router = useRouter();


  useEffect(()=>{
    if(eventsData){
      const event = eventsData.find((event:any)=>event.id===eventId)
      if(event){
        setIsRegistered(event.registered || false)
      }
    }
  },[eventsData])
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
        loading...
      </div>
    );
  }
  return (
    <div className="relative max-w-5xl mx-auto p-6 pt-44">
      <h1
        id="glowPink"
        className="text-4xl md:text-6xl font-bold text-transparent font-kagitingan pb-6"
      >
        {categoryId}
      </h1>

      <div className="relative border border-white rounded-lg p-8 md:p-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Left Column - Responsive Image Box */}
          <div className="w-full sm:w-[70%] md:w-[60%] aspect-[5/6] bg-gray-800 rounded-md" />

          {/* Right Column - Event Details */}
          <div className="w-full flex flex-col items-center justify-center space-y-10">
            <h2
              id="glowPurple"
              className="text-5xl sm:text-6xl font-bold text-transparent font-kagitingan text-center"
            >
              <span className="block">{eventData?.name}</span>
            </h2>

            <div className="relative flex flex-col justify-start w-2/3 px-6 py-8 rounded-3xl bg-gradient-to-tl from-black via-black/70 to-gray-800 border border-white shadow-lg">
              <h2 className="text-white font-kagitingan text-lg">
                EVENT COORDINATORS
              </h2>
              {eventData?.coordinators.map((coordinator: any) => (
                <p
                  key={coordinator.id}
                  className="font-alexandria text-gray-300 mt-2"
                >
                  {coordinator.name}: {coordinator.phone}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="place-self-center">
          <button
            onClick={handleRegister}
            disabled={isRegistered}
            className="mt-10 px-10 py-3 font-alexandria rounded-full bg-gradient-to-b from-[#B700FF] via-[#D966FF] to-[#F4A1FF]"
          >
            {isRegistered ?  "Registered" : "Register Now"}
          </button>
        </div>

        {/* Event List */}
        <div className="mt-12 space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="group flex items-center space-x-4 p-4 rounded-lg"
            >
              <h3
                id="glowPink"
                className="text-xl md:text-2xl font-kagitingan text-purple-300"
              >
                EVENT NAME :
              </h3>
              <p className="text-lg md:text-xl font-alexandria gray-400">
                blah blah blah
              </p>
            </div>
          ))}
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
          minTeamSize={Number(eventData.min_team_size)}
          maxTeamSize={Number(eventData.max_team_size)}
        />
      )}
    </div>
  );
};

export default EventDetails;
