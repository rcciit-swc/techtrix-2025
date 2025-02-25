'use client';
import { useEvents } from '@/lib/stores';
import { useUser } from '@/lib/stores/user';
import { supabase } from '@/utils/functions/supabase-client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const SessionProvider = () => {
  const params = useParams();
  console.log(params);
  const setUser = useUser((state) => state.setUserData);
  const setEvents = useEvents((state) => state.setEventsData);
  useEffect(() => {
    const readUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      typeof window !== 'undefined' && localStorage.setItem('ref', params?.ref);
      if (data?.session?.user) {
        setUser();
      } else {
        typeof window !== 'undefined' && localStorage.setItem('ref', params?.ref);
      }
    };
    readUserSession();
    setEvents();
  }, [setUser]);

  return null;
};

export default SessionProvider;
