'use server';

import { supabaseServer } from './supabase-server';
import * as crypto from 'crypto';

export const generateReferralCode = async (): Promise<string | null> => {
  const maxReferrals = parseInt(process.env.REFERREAL_LIMIT ?? '5', 10);
  const supabase = await supabaseServer();
  const authUser = await supabase.auth.getUser();
  const userId = authUser.data.user?.id;
  console.log(userId);
  if (!userId) {
    throw new Error('User not authenticated');
  }
  const { count } = await supabase
    .from('transactions')
    .select('*')
    .eq('referrer', userId);
  const referralCount = count ?? 0;
  console.log("ReferralCount, Count",referralCount, count);
  if (referralCount >= maxReferrals) return null;
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
  console.log("Payload", payloadString);
  return encryption(payloadString);
};

export const verifyReferralCode = async (code: string): Promise<boolean> => {
    //TODO: verify te code
    const { userId, referralCode } = decryption(code);
    // Check the user is authenticated or not
    // If authenticated then simply login the account and proceed
    const supabase = await supabaseServer();
    const { data, error } = await supabase.auth.getUser();
    const currentUserId = data.user?.id;
    if (!currentUserId && error) {
        return false;
    }
    if (currentUserId === userId) {
        return false;
    }
    // Initiate an database transaction
    // Check if the code is valid
    // Do an insertion in the transaction table
    // Increate the coin of refferer's data by 10
    // If the db transaction is successful then simply return true or else false
    const { data: rpcData, error: rpcError } = await supabase.rpc("verify_referral_code_transaction", {
        _referred: currentUserId,
        _referrer: userId,
        _referral_code: referralCode
    });
    if (rpcError) {
        return false;
    }
    console.log('RPC Data:', rpcData);
    return true;
};

function encryption(payload: string): string {
    const secret = process.env.ENCRYPTION_SECRET;
    if (!secret) {
        throw new Error('Encryption secret not set');
    }
    const key = crypto.createHash('sha256').update(secret).digest();
    const iv = crypto.randomBytes(12);
    const algorithm = process.env.ALGORITHM || 'aes-256-gcm';
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
    const secret = process.env.ENCRYPTION_KEY;
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

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
}
