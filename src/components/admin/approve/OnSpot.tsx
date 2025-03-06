'use client';
import React, { useState } from 'react';
import { Filter } from './EventFilters';
import { useEvents } from '@/lib/stores';
import { Button } from '@/components/ui/button';
import { SoloRegistration } from '@/components/registrar/SoloRegistration';
import { TeamEventRegistration } from '@/components/registrar/EventRegistration';

const OnSpot = () => {
  const [event, setEvent] = useState('');
  const { eventsData } = useEvents();
  const [soloOpen, setSoloOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [eventData, setEventData] = useState<any>();

  const handleRegister = async () => {
    const selectedEvent = eventsData?.find((e) => e.name === event);
    setEventData(selectedEvent);
    if (selectedEvent?.max_team_size === 1) {
        setSoloOpen(true);
      } else {
        setTeamOpen(true);
      }
  };
  return (
    <div className='w-full'>
      <div className='flex justify-center items-center w-full space-x-4 py-5'>
        <Filter
          options={eventsData?.map((event) => event.name)}
          value={event}
          onChange={setEvent}
          placeholder="Select Event"
        />
                <Button
          onClick={()=>{
            handleRegister()
          }}
          variant="outline"
          className="bg-[#1F2937] border-gray-700 hover:bg-[#2D3748] hover:text-white text-gray-300 disabled:cursor-not-allowed"
          disabled={event === ''}
        >
          Register
        </Button>
      </div>
              {eventData?.id && (
                <SoloRegistration
                  isOpen={soloOpen}
                  eventID={eventData.id}
                  onClose={() => setSoloOpen(false)}
                  eventName={eventData.name}
                  eventFees={eventData.registration_fees}
                  isFree={true}
                />
              )}
              {eventData?.id && (
                <TeamEventRegistration
                  isOpen={teamOpen}
                  eventFees={eventData.registration_fees}
                  onClose={() => setTeamOpen(false)}
                  eventID={eventData.id}
                  eventName={eventData.name}
                  minTeamSize={eventData.min_team_size}
                  maxTeamSize={eventData.max_team_size}
                  isFree={true}
                />
              )}
    </div>
  );
};

export default OnSpot;
