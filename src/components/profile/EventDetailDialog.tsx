'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/useIsMobile';
import { fetchRegistrationDetails } from '@/utils/functions';

interface EventDetailsDialogProps {
  event: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

interface TeamMember {
  phone: string;
  name: string;
  email: string;
}

export function EventDetailsDialog({
  event,
  open,
  onOpenChange,
  userId,
}: EventDetailsDialogProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamName, setTeamName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();

  // Use a ref to store cached data for each event
  const teamDataCache = useRef<
    Record<string, { teamName: string | null; members: TeamMember[] }>
  >({});

  useEffect(() => {
    if (event && open) {
      // If data is already cached for this event, use it and skip fetching.
      if (teamDataCache.current[event.id]) {
        setTeamName(teamDataCache.current[event.id].teamName);
        setTeamMembers(teamDataCache.current[event.id].members);
        return;
      }

      const loadTeamData = async () => {
        setLoading(true);
        try {
          const data = await fetchRegistrationDetails(event.id, userId);
          const members =
            data.length > 0 && data[0].team_members ? data[0].team_members : [];
          const fetchedTeamName =
            data.length > 0 && data[0].team_name ? data[0].team_name : null;
          setTeamMembers(members);
          setTeamName(fetchedTeamName);
          teamDataCache.current[event.id] = {
            teamName: fetchedTeamName,
            members,
          };
        } catch (error) {
          console.error('Error fetching team data:', error);
          toast.error('Failed to fetch team details');
        } finally {
          setLoading(false);
        }
      };

      loadTeamData();
    }
  }, [event, open, userId]);

  if (!event) return null;

  // ContentWrapper can optionally render children.
  const ContentWrapper = ({ children }: { children?: React.ReactNode }) => (
    <div className="mt-4 space-y-4">
      {loading ? (
        <Skeleton className="h-6 w-2/3 mb-4" />
      ) : teamName ? (
        <h3 className="text-xl font-semibold text-yellow-200 font-kagitingan tracking-widest text-center">
          Team: {teamName}
        </h3>
      ) : (
        <p className="text-gray-300 text-center font-alexandria">
          No team name available
        </p>
      )}

      <div>
        {loading ? (
          <div
            className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}
          >
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-zinc-800 p-4 rounded-lg space-y-2">
                {!isMobile && <Skeleton className="h-4 w-3/4" />}
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : teamMembers.length > 0 ? (
          <div
            className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-zinc-800 font-alexandria tracking-wider p-4 rounded-lg"
              >
                <h4 className="text-lg font-bold text-white">{member.name}</h4>
                <p className="text-sm text-gray-300">{member.email}</p>
                <p className="text-sm text-gray-300">{member.phone}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300 text-center">No team members found.</p>
        )}
      </div>
      {children}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-zinc-900 text-white border-t border-zinc-800">
          <DrawerHeader className="border-b border-zinc-800">
            <DrawerTitle className="text-2xl font-kagitingan !tracking-widest">
              {event.name}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-300">
              Team Details
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <ContentWrapper />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/90/59/3b/90593b288869fe650f17b101322ee12d.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className=" text-white border-yellow-200 min-w-xl max-w-3xl"
      >
        <DialogHeader className="font-kagitingan tracking-widest">
          <DialogTitle className="text-2xl text-yellow-200 font-got !tracking-widest">
            {event.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-300">
            Team Details
          </DialogDescription>
        </DialogHeader>
        <ContentWrapper />
      </DialogContent>
    </Dialog>
  );
}
