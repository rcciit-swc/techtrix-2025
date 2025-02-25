import { supabaseServer } from "@/utils/functions/supabase-server";
import { cookies } from 'next/headers';
export default async function Referral({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined };
  }) {
    const supabase = await supabaseServer();
      const { data } = await supabase.auth.getUser();
    // const ref = searchParams.ref;
    console.log(searchParams);
    // if (ref) {
    //   if (data) {
    //     // User is logged in, save referral to database
    //     // await supabase
    //     //   .from('user_profiles')
    //     //   .upsert({ user_id: user.id, referral_code: String(ref) });
    //   } else {
    //     // User not logged in, store referral in a cookie
    //     cookies().set('pending_referral', String(ref), {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === 'production',
    //       path: '/',
    //       maxAge: 86400, // 24 hours
    //     });
    //   }
    // }
  
    // Rest of your component
    return <div>Your page content</div>;
  }