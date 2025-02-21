'use client';

import { verifyReferralCode } from '@/utils/functions/referral-code';
import { useEffect } from 'react';

const ReferralPage = ({
  searchParams,
}: {
  searchParams: { code?: string };
}) => {
  useEffect(() => {
    const code = searchParams.code;
    if (!code) return;
    verifyReferralCode(code);
  }, []);

  return;
};

export default ReferralPage;
