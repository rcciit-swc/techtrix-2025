export interface userDataType {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  college: string;
  role: string;
  college_roll: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  gender: string;
}

export interface userStateType {
  userData: userDataType | null;
  userLoading: boolean;
  swcStatus: boolean;
}

export interface userActionsType {
  setUserData: () => void;
  updateUserData: (data: any) => void;
  clearUserData: () => void;
}
