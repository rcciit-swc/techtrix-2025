'use client';
import { verifyCommunityReferralCode } from '@/lib/actions';
import { useEvents } from '@/lib/stores';
import { useUser } from '@/lib/stores/user';
import { updateReferralCode } from '@/utils/functions';
import { supabase } from '@/utils/functions/supabase-client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const SessionProvider = () => {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  if(ref){
    typeof window !== 'undefined' &&
    localStorage.setItem('ref', ref);
  }
  const { setUserData, userData } = useUser();
  const setEvents = useEvents((state) => state.setEventsData);
  useEffect(() => {
    const readUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user.user_metadata?.avatar_url) {
        setUserData();
      }
    };
    readUserSession();
    setEvents();
  }, [setUserData]);

  useEffect(() => {
    const checkReferralCode = async () => {
      if (userData) {
        const  ref = typeof window !== 'undefined' &&
        localStorage.getItem('ref');
        const { data } = await supabase.auth.getSession();
        const createdAt = Math.floor(new Date(userData.created_at).getTime());
        const now = new Date().getTime();
        if (now - createdAt < 60 * 1000) {
          if (ref) {
            const code = await verifyCommunityReferralCode(ref);
            if (code) {
              if (!data) {
                typeof window !== 'undefined' &&
                  localStorage.setItem('ref', ref);
              } else {
                await updateReferralCode(ref, userData.id);
              }
            }
          }
        }
      }
    };
    checkReferralCode();
  }, [userData,ref]);

  return null;
};

export default SessionProvider;
