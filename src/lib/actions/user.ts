import { getSWCData, getUserData } from '@/utils/functions';
import { updateUserData } from '@/utils/functions';
import { supabase } from '@/utils/functions/supabase-client';

export const populateUserDetails = async (set: any) => {
  set({ userLoading: true });
  const data = await getUserData();
  if (data && data?.college_roll) {
    const isSWCPaid = await getSWCData(data.college_roll, data?.email);
    set({ userData: data, swcStatus: isSWCPaid, userLoading: false });
  }
  set({ userData: data, userLoading: false });
};

export const update_and_populate = async (set: any, data: any) => {
  set({ userLoading: true });
  await updateUserData(data);
  const updatedData = await getUserData();
  const isSWCPaid = await getSWCData(
    updatedData.college_roll,
    updatedData?.email
  );
  set({ userData: updatedData, swcStatus: isSWCPaid, userLoading: false });
};

export const verifyCommunityReferralCode = async (refCode: string) => {
  try {
    const { data } = await supabase
      .from('referral_codes')
      .select('*')
      .eq('referral_code', refCode);
    if (data) {
      return data?.length > 0;
    }
  } catch (e) {
    console.error(e);
  }
};
