'use server';

import { collegeDomainRegexp } from '../constraints/constants';
import { supabaseServer } from './supabase-server';
import * as crypto from 'crypto';

export const generateReferralCode = async (): Promise<string | null> => {
  const maxReferrals = parseInt(process.env.REFERREAL_LIMIT ?? '5', 10);
  const supabase = await supabaseServer();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError || !sessionData?.session) {
    return null;
  }

  const { user } = sessionData.session;
  if (!user) {
    throw new Error('User not authenticated');
  }
  const userId = user?.id;
  const emailDomain = user?.email?.split('@')[1];
  if (!userId) {
    throw new Error('User not authenticated');
  }
  if (!emailDomain || !collegeDomainRegexp.test(emailDomain)) {
    return null;
  }
  const { count } = await supabase
    .from('transactions')
    .select('*')
    .eq('referrer', userId);
  const referralCount = count ?? 0;
  if (referralCount >= maxReferrals) return null;
  // Supabase query is not working
  // const { data } = await supabase
  //   .from('referral_codes')
  //   .select('*')
  //   // .eq('community_name', 'RCCIIT')
  //   // .single(); // This should be dynamic
  // console.log("Data",data)
  // if (!data || !data.referral_code) {
  //   throw new Error('No referral code found for the specified community');
  // }
  // const referralCode: string = data.referral_code;
  const referralCode = process.env.REFERRAL_CODE;
  if (!referralCode) {
    throw new Error('No referral code found for the specified community');
  }
  const payload = { userId, referralCode };
  const payloadString = JSON.stringify(payload);
  return encryption(payloadString);
};

export const verifyReferralCode = async (code: string): Promise<boolean> => {
  // Verify te code
  const { userId, referralCode } = decryption(code);
  // Check the user is authenticated or not
  // If authenticated then simply login the account and proceed
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.getUser();
  const currentUserId = data.user?.id;
  const emailDomain = data.user?.email?.split('@')[1];
  if (!currentUserId && error) {
    return false;
  }
  if (currentUserId === userId) {
    return false;
  }
  if (!emailDomain || !collegeDomainRegexp.test(emailDomain)) {
    return false;
  }
  // Initiate an database transaction
  // Check if the code is valid
  // Do an insertion in the transaction table
  // Increate the coin of refferer's data by 10
  // If the db transaction is successful then simply return true or else false
  const { data: rpcData, error: rpcError } = await supabase.rpc(
    'verify_referral_code_transaction',
    {
      _referred: currentUserId,
      _referrer: userId,
      _referral_code: referralCode,
    }
  );
  if (rpcError) {
    return false;
  }
  return rpcData;
};

function encryption(payload: string): string {
  const secret = process.env.ENCRYPTION_SECRET;
  if (!secret) {
    throw new Error('Encryption secret not set');
  }
  const key = crypto.createHash('sha256').update(secret).digest();
  const iv = crypto.randomBytes(16);
  const algorithm = process.env.ALGORITHM || 'aes-256-cbc';
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(payload, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const encryptedCode = `${iv.toString('hex')}-${encrypted}`;
  return encryptedCode;
}

function decryption(encryptedPayload: string): {
  userId: string;
  referralCode: string;
} {
  const secret = process.env.ENCRYPTION_SECRET;
  if (!secret) {
    throw new Error('Encryption key not set');
  }
  const key = crypto.createHash('sha256').update(secret).digest();

  const parts = encryptedPayload.split('-');
  if (parts.length !== 2) {
    throw new Error('Invalid encrypted payload format');
  }
  const [ivHex, encryptedHex] = parts;
  const iv = Buffer.from(ivHex, 'hex');

  const algorithm = process.env.ALGORITHM || 'aes-256-cbc';
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted);
}
