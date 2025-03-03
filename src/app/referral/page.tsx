'use client';

import { useEffect, useState } from 'react';
import { getUserData } from '@/utils/functions';
import { verifyReferralCode } from '@/utils/functions/referral-code';
import { login } from '@/utils/functions/login';
import { Loader2 } from 'lucide-react';

const ReferralPage = ({
  searchParams,
}: {
  searchParams: { code?: string };
}) => {
  const [user, setUser] = useState(null);
  const { code } = searchParams;

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserData();
      setUser(userData);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (code) {
      if (!user) {
        const loginAndVerify = async () => {
          await login();
          await verifyReferralCode(code);
        };
        loginAndVerify();
      } else {
        verifyReferralCode(code);
      }
    }
  }, [user, code]);

  return <Loader2 />;
};

export default ReferralPage;
