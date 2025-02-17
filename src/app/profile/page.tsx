import ProfileContent from '@/components/profile/ProfilePageContent';
import ProfileSkeleton from '@/components/profile/ProfileSkeleton';
import { Suspense } from 'react';

export default function ProfilePage() {
  return (
    // do not remove this Suspense component ( yes i am talking to you and i am not ai )
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}
