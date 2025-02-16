'use client';
import { useEvents } from '@/lib/stores';
import { useUser } from '@/lib/stores/user';
import { useEffect } from 'react';

const SessionProvider = () => {
  const setUser = useUser((state) => state.setUserData);
  const setEvents = useEvents((state) => state.setEventsData);

  // useEffect(() => {
  //   setUser();
  //   setEvents();
  // }, [setUser]);

  return null;
};

export default SessionProvider;
