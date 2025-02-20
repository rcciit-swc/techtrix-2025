import { getSWCData, getUserData } from '@/utils/functions';
import { updateUserData } from '@/utils/functions';

export const populateUserDetails = async (set: any) => {
  set({ userLoading: true });
  const data = await getUserData();
  const isSWCPaid = await getSWCData(data.college_roll);
  console.log(isSWCPaid);
  set({ userData: data, swcStatus: isSWCPaid, userLoading: false });
};

export const update_and_populate = async (set: any, data: any) => {
  set({ userLoading: true });
  await updateUserData(data);
  const updatedData = await getUserData();
  set({ userData: updatedData, userLoading: false });
};
