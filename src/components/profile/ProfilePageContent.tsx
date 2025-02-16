'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/stores';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/utils/functions/supabase-client';
import { logout } from '@/utils/functions/auth/logout';
import { useEvents } from '@/lib/stores';
import EventCard from '@/components/events/EventCard';
import { EditProfileDialog } from '@/components/profile';
import { EventDetailsDialog } from '@/components/profile';
import type { events } from '@/lib/types';
import { toast } from 'sonner';
import ProfileSkeleton from './ProfileSkeleton';
import { handleSaveChanges } from '@/utils/functions';

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { userData, userLoading, updateUserData, clearUserData } = useUser();
  const { eventsData, eventsLoading } = useEvents();
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const [imageLoaded, setImageLoaded] = useState(false);
  const [name, setName] = useState<string | undefined>(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<events[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<events | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  useEffect(() => {
    const cb = searchParams.get('callback');
    setCallbackUrl(cb);
  }, [searchParams]);

  useEffect(() => {
    if (eventsData.length > 0) {
      const registeredEvents = eventsData.filter((event) => event.registered);
      setRegisteredEvents(registeredEvents);
    }
  }, [eventsData]);

  useEffect(() => {
    if (searchParams.get('onboarding') === 'true') {
      setIsEditModalOpen(true);
      toast.info('Finish your profile first');
    }
  }, [searchParams]);

  useEffect(() => {
    const readUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user.user_metadata?.avatar_url) {
        setName(data.session.user.user_metadata.full_name);
        setProfileImage(data.session.user.user_metadata.avatar_url);
      }
    };
    readUserSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('sb-session'); // Adjust based on storage mechanism
    clearUserData();
  };

  const handleEventClick = (event: events) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const handleProfileSave = async (formData: FormData) => {
    await handleSaveChanges(formData, userData, updateUserData, () => {
      setIsEditModalOpen(false);
      if (callbackUrl) {
        router.push(callbackUrl);
      }
    });
  };

  if (userLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen mt-32">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-card rounded-xl bg-purple-800/30 backdrop-blur-lg p-8 shadow-lg border border-white/20">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-32 h-32">
              {!imageLoaded && (
                <Skeleton className="w-full h-full rounded-full absolute inset-0" />
              )}
              <AvatarImage
                src={profileImage}
                alt={userData?.name || 'Profile'}
                onLoad={() => setImageLoaded(true)}
                className={imageLoaded ? 'block' : 'hidden'}
              />
              <AvatarFallback>{userData?.name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div className="space-y-4 flex-1">
              <div>
                <h1 className="text-2xl font-semibold font-sargento text-white">
                  {userData?.name ? userData?.name : name}
                </h1>
                <p className="text-muted-foreground text-white font-instrumentSans">
                  {userData?.email}
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Edit Profile
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Events Registered
          </h2>
          {registeredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredEvents.map((event, index) => (
                <div key={index} onClick={() => handleEventClick(event)}>
                  <EventCard
                    title={event.name}
                    subtitle={event.description}
                    schedule={event.schedule}
                    image_url={event.image_url}
                    button_text="View Team Members"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white">
              <p className="text-lg mb-4">
                You have not registered for any event. Register now!
              </p>
              <Button
                onClick={() => router.push('/events')}
                variant="outline"
                className="text-black"
              >
                Browse Events
              </Button>
            </div>
          )}
        </div>
      </main>

      <EditProfileDialog
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        userData={userData}
        profileImage={profileImage}
        onSave={handleProfileSave}
        name={name}
      />

      <EventDetailsDialog
        event={selectedEvent}
        open={isEventDialogOpen}
        onOpenChange={setIsEventDialogOpen}
        userId={userData?.id!}
      />
    </div>
  );
}
