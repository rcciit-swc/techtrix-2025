import { EventData, events } from '@/lib/types/events';
import { supabase } from './supabase-client';
import { toast } from 'sonner';
import { supabaseServer } from './supabase-server';

export const getEventCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('event_categories')
      .select('*')
      .eq('fest_id', '44bb2093-d229-4385-8f08-3fe7da3521c8');
    if (error) return error;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export async function createEvent(event: events) {
  console.log(event);
  const { data, error } = await supabase.from('events').insert(event);

  if (error) throw error;
  return data;
}

export const updateRegisterStatusDb = async (id: string, status: boolean) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({ reg_status: status })
      .eq('id', id);

    if (error) {
      console.error('Error updating event:', error);
      return null;
    }
    toast.success('Event updated successfully');
    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    toast.error('Error updating event');
    return null;
  }
};

export const getEventsData = async () => {
  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return null;
    }

    const p_user_id = sessionData?.session?.user?.id || null;
    const p_fest_id = '44bb2093-d229-4385-8f08-3fe7da3521c8';

    const { data, error } = await supabase.rpc('get_events_by_fest', {
      p_fest_id,
      p_user_id,
    });
    if (error) {
      console.error('Error fetching events:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
};

export const updateEventById = async (
  id: string,
  data: Partial<events>
): Promise<events | null> => {
  try {
    const { data: updatedData, error } = await supabase
      .from('events')
      .update(data)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating event:', error);
      return null;
    }
    toast.success('Event updated successfully');
    return updatedData && updatedData.length > 0 ? updatedData[0] : null;
  } catch (err) {
    console.error('Unexpected error:', err);
    toast.error('Error updating event');
    return null;
  }
};

export const getApprovalDashboardData = async (
  id?: string
): Promise<EventData[] | null> => {
  try {
    if (!id) {
      console.warn('No fest ID provided');
      return null;
    }

    const { data, error } = await supabase.rpc('get_registration_data', {
      p_fest_id: id, // Passing the fest_id parameter
    });

    console.log(data);
    if (error) {
      console.error('Error fetching event table data:', error);
      toast.error('Error fetching event table data');
      return null;
    }

    return data as EventData[];
  } catch (err) {
    console.error('Unexpected error:', err);
    toast.error('Unexpected error occurred');
    return null;
  }
};

export const getEventByID = async (id: string): Promise<events | null> => {
  const serverClient = await supabaseServer();
  const p_event_id = id;
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    console.error('Error getting session:', sessionError);
    return null;
  }

  const p_user_id = sessionData?.session?.user?.id || null;

  const { data, error } = await serverClient.rpc(
    'get_event_by_id_with_registration',
    {
      p_event_id,
      p_user_id,
    }
  );

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }

  // Return the first result, since the RPC returns a table (array)
  return data && data.length > 0 ? data[0] : {};
};
