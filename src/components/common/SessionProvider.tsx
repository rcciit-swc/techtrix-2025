'use client';
import { useEvents } from '@/lib/stores';
import { useUser } from '@/lib/stores/user';
import { supabase } from '@/utils/functions/supabase-client';
import { useEffect } from 'react';

const SessionProvider = () => {
  const setUser = useUser((state) => state.setUserData);
  const setEvents = useEvents((state) => state.setEventsData);
  useEffect(() => {
    const readUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user.user_metadata?.avatar_url) {
        setUser();
      }
    };
    readUserSession();
    setEvents();
  }, [setUser]);

  return null;
};

export default SessionProvider;
