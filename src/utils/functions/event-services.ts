import { EventData, events } from '@/lib/types/events';
import { supabase } from './supabase-client';
import { toast } from 'sonner';
import { supabaseServer } from './supabase-server';
import { getRoles } from './user-services';

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

export const getEventsData = async (all: boolean = true) => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return null;
    }

    const p_user_id = sessionData?.session?.user?.id || null;
    const p_fest_id = '44bb2093-d229-4385-8f08-3fe7da3521c8';
    const rolesData = await getRoles();

    let data, error;

   if(all){
    ({ data, error } = await supabase.rpc('get_events_by_fest', {
      p_fest_id,
      p_user_id
    }));
   }else if (!rolesData) {
    ({ data, error } = await supabase.rpc('get_events_by_fest', {
      p_fest_id,
      p_user_id,
    }));
  } else {
    switch (rolesData.role) {
      case 'convenor':
        ({ data, error } = await supabase
          .from('events')
          .select('*')
          .eq('event_category_id', rolesData.event_category_id));
        break;

      case 'coordinator':
        ({ data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', rolesData.event_id));
        break;

      case 'super_admin':
        if (!p_fest_id || !p_user_id) {
          throw new Error('Missing parameters for super_admin');
        }
        ({ data, error } = await supabase.rpc('get_events_by_fest', {
          p_fest_id,
          p_user_id,
        }));
        break;

      default:
        throw new Error('Invalid role');
    }
  }

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
};


export const getEventsForAdmin = async (id: string, p_fest_id?: string, p_user_id?: string) => {
  try {
    const rolesData = await getRoles();

    if (!rolesData?.role) {
      throw new Error('Role not found');
    }

    let data, error;

    switch (rolesData.role) {
      case 'convenor':
        ({ data, error } = await supabase.from('events').select('*').eq('event_category_id', id));
        break;

      case 'coordinator':
        ({ data, error } = await supabase.from('events').select('*').eq('event_id', id));
        break;

      case 'super_admin':
        if (!p_fest_id || !p_user_id) {
          throw new Error('Missing parameters for super_admin');
        }
        ({ data, error } = await supabase.rpc('get_events_by_fest', {
          p_fest_id,
          p_user_id,
        }));
        break;

      default:
        throw new Error('Invalid role');
    }

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    return data;
  } catch (error: any) {
    console.error('Error fetching events:', error.message);
    return null;
  }
};


export const updateEventById = async (
  id: string,
  data: Partial<events>
): Promise<events | null> => {
  try {
    console.log(id,data)
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
): Promise<EventData[] | null> => {
  try {
    const rolesData = await getRoles();
    const { data, error } = await supabase.rpc('get_registration_data', {
      p_fest_id: '44bb2093-d229-4385-8f08-3fe7da3521c8',
      p_event_category_id: rolesData?.event_category_id || null,
      p_event_id: rolesData?.event_id || null,
    });

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
