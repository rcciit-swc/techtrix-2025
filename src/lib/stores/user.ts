import { create } from 'zustand';
import { populateUserDetails, update_and_populate } from '../actions';
import { userActionsType, userStateType } from '../types';
type UserStore = userActionsType & userStateType;

const userState: userStateType = {
  userData: null,
  userLoading: true,
  swcStatus: false,
};
export const useUser = create<UserStore>((set) => ({
  ...userState,
  setUserData: () => populateUserDetails(set),
  clearUserData: () => set({ userData: null, userLoading: false }),
  updateUserData: (data: any) => update_and_populate(set, data),
  // Write other reducers with proper actions like above.
}));
