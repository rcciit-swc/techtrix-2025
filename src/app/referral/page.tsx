'use client';

import { useEffect, useState } from 'react';
import { getUserData } from '@/utils/functions';
import { verifyReferralCode } from '@/utils/functions/referral-code';

const ReferralPage = ({ searchParams }: { searchParams: { code?: string } }) => {
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
    if (user && code) {
      verifyReferralCode(code);
    }
  }, [user, code]);

  return (
    <div>
      {/* Render your component's content here */}
    </div>
  );
};

export default ReferralPage;
