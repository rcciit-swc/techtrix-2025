import { toast } from 'sonner';
import { supabase } from './supabase-client';

export const getUserData = async () => {
  try {
    const { data } = await supabase.auth.getSession();
    const userdetails = await supabase
      .from('users')
      .select('*')
      .eq('id', data?.session?.user?.id);
      console.log(data)
    if (userdetails && userdetails.data && userdetails.data.length > 0) {
      return userdetails.data[0];
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateUserData = async (data: any) => {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        name: data.full_name,
        phone: data.phone,
        gender: data.gender,
      })
      .eq('id', data.id);
    if (error) {
      throw error;
    }
    return;
  } catch (error) {
    console.log('error is ', error);
    throw error;
  }
};

export const handleSaveChanges = async (
  formData: FormData,
  userData: any,
  updateUserData: (updatedData: any) => Promise<void> | void,
  closeModal: () => void
) => {
  const formDataObj = Object.fromEntries(formData.entries());

  if (!formDataObj.gender) {
    toast.error('Gender is required');
    return;
  } else if (!formDataObj.fullName) {
    toast.error('Full name is required');
    return;
  } else if (!formDataObj.phone) {
    toast.error('Phone number is required');
    return;
  }

  if (!userData?.id) {
    toast.error('User data not found');
    return;
  }

  const updatedData = {
    id: userData.id,
    full_name: formDataObj.fullName,
    phone: formDataObj.phone,
    gender: formDataObj.gender,
  };

  try {
    await updateUserData(updatedData);
    toast.success('Profile updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
    toast.error('Failed to update profile');
  } finally {
    closeModal();
  }
};

