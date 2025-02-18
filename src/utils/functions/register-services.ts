import { toast } from 'sonner';
import { supabase } from './supabase-client';

export async function uploadPaymentScreenshot(file: File, eventName: string) {
  const bucket = 'fests';

  const fileName = `${new Date()}-${file.name}`;
  const filePath = `got-2025/${eventName}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  console.log(data);

  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }

  // Get the public URL of the uploaded file.
  const publicUrl = supabase.storage.from(bucket).getPublicUrl(filePath)
    .data?.publicUrl;

  if (!publicUrl) {
    throw new Error('Failed to get public URL for the uploaded file.');
  }

  // Return the public URL.
  return publicUrl;
}

export interface RegisterSoloParams {
  userId: string;
  eventId: string;
  transactionId: string;
  transactionScreenshot: string;
  college: string;
}

export async function registerSoloEvent(
  params: RegisterSoloParams
): Promise<any> {
  const { userId, eventId, transactionId, transactionScreenshot, college } =
    params;

  // Call the RPC named 'register_solo_event' with the required parameters.
  const { data, error } = await supabase.rpc('register_solo_event', {
    p_user_id: userId,
    p_event_id: eventId,
    p_transaction_id: transactionId,
    p_transaction_screenshot: transactionScreenshot,
    p_college: college,
  });

  if (error) {
    throw error;
  } else {
    toast.success('Registered successfully');
  }

  return data;
}

export interface TeamMember {
  name: string;
  phone: string;
  email: string;
}

export interface RegisterTeamParams {
  userId: string;
  eventId: string;
  transactionId: string;
  teamName: string;
  college: string;
  transactionScreenshot: string;
  teamLeadName: string;
  teamLeadPhone: string;
  teamLeadEmail: string;
  teamMembers: TeamMember[];
}

export async function registerTeamWithParticipants(params: RegisterTeamParams) {
  console.log('Registering team with participants:', params);

  // Validate required fields. If any validation fails, throw immediately.
  const validations = [
    { value: params.userId, message: 'User ID is required.' },
    { value: params.eventId, message: 'Event ID is required.' },
    { value: params.transactionId, message: 'Transaction ID is required.' },
    { value: params.teamName, message: 'Team name is required.' },
    { value: params.college, message: 'College is required.' },
    {
      value: params.transactionScreenshot,
      message: 'Transaction screenshot is required.',
    },
    { value: params.teamLeadName, message: 'Team lead name is required.' },
    { value: params.teamLeadPhone, message: 'Team lead phone is required.' },
    { value: params.teamLeadEmail, message: 'Team lead email is required.' },
  ];

  for (const { value, message } of validations) {
    if (!value) {
      toast.error(message);
      console.error('Validation failed:', message);
      throw new Error(message);
    }
  }

  const {
    userId,
    eventId,
    transactionId,
    teamName,
    college,
    transactionScreenshot,
    teamLeadName,
    teamLeadPhone,
    teamLeadEmail,
    teamMembers,
  } = params;

  // Call the RPC function 'register_team_with_participants'
  const { data, error } = await supabase.rpc(
    'register_team_with_participants',
    {
      p_user_id: userId,
      p_event_id: eventId,
      p_transaction_id: transactionId,
      p_team_name: teamName,
      p_college: college,
      p_transaction_screenshot: transactionScreenshot,
      p_team_lead_name: teamLeadName,
      p_team_lead_phone: teamLeadPhone,
      p_team_lead_email: teamLeadEmail,
      p_team_members: teamMembers || [],
    }
  );

  if (error) {
    // Check for the specific error message
    if (error.message.includes('User already registered for this event')) {
      toast.error('You are already registered for this event.');
    } else {
      toast.error(`Registration failed: ${error.message}`);
    }
    console.error('Error registering team:', error);
    throw new Error(error.message);
  } else {
    toast.success('Registration successful!');
    console.log('Team registered successfully:', data);
    return data;
  }
}
