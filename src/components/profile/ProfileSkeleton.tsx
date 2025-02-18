import React from 'react';
import { Skeleton } from '../ui/skeleton';

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen mt-32">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-card rounded-xl bg-violet-500 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="space-y-4 flex-1">
              <div>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32 mt-2" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSkeleton;
