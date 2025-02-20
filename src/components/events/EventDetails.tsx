'use client';
import { SoloEventRegistration } from '@/components/events/EventRegistrationDialog'
import { TeamEventRegistration } from '@/components/events/TeamEventRegistration'
import { useEvents, useUser } from '@/lib/stores';
import { login } from '@/utils/functions/login';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const EventDetails = ({ eventData }: { eventData: any }) => {
    const eventname = eventData.name
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
    
        if (
          !userData.phone ||
          !userData.name ||
          userData.phone.trim() === '' ||
          userData.name.trim() === ''
        ) {
          router.push(
            `/profile?onboarding=true&callback=${encodeURIComponent(`/events/${eventname}`)}`
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
    <div>
      <button onClick={handleRegister}>
        Register
      </button>

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
  )
}

export default EventDetails
