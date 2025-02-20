import { toast } from 'sonner';
import { supabase } from './supabase-client';

export const getUserData = async () => {
  try {
    const { data } = await supabase.auth.getSession();
    const userdetails = await supabase
      .from('users')
      .select('*')
      .eq('id', data?.session?.user?.id);
    console.log(userdetails);
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
        stream: data.stream,
        college: data.college,
        college_roll: data.college_roll,
        course: data.course,
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
  } else if (!/^\d{10}$/.test(formDataObj.phone as string)) {
    toast.error('Invalid phone number');
    return;
  } else if (!formDataObj.stream) {
    toast.error('Stream is required');
    return;
  } else if (!formDataObj.college) {
    toast.error('College is required');
    return;
  } else if (!formDataObj.college_roll) {
    toast.error('College Roll is required');
    return;
  } else if (!formDataObj.course) {
    toast.error('Course is required');
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
    stream: formDataObj.stream,
    college: formDataObj.college,
    college_roll: formDataObj.college_roll,
    course: formDataObj.course,
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

export const getSWCData = async (collegeRoll: string) => {
  try {
    const { data } = await supabase
      .from('SWC-2025')
      .select('*')
      .eq('roll', collegeRoll);
    if (data && data.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
