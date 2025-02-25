import { getSWCData, getUserData } from '@/utils/functions';
import { updateUserData } from '@/utils/functions';

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
  set({ userData: updatedData, userLoading: false });
};
