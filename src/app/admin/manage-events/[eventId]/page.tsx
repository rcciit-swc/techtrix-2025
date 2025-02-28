'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import 'react-quill/dist/quill.snow.css';
import { eventSchema } from '@/lib/schemas';
import { useEvents } from '@/lib/stores';
import { Coordinator, LinkType } from '@/lib/types/events';
import { EditEventSkeleton } from '@/components/admin/manage-events/EditEventSkeleton';
import { BasicInformation, LinksAndCoordinators, RulesAndGuidelines, ScheduleAndDescription } from '@/components/admin/manage-events';

export default function EditEventPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const { eventsData, eventsLoading, updateEventsData } = useEvents();
  const [links, setLinks] = useState<LinkType[]>([]);
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);

  // Find the event to edit from the global events store.
  const eventToEdit = eventsData?.find((event) => event.id === eventId);

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: '',
      registration_fees: 0,
      prize_pool: 0,
      image_url: '',
      min_team_size: 1,
      max_team_size: 1,
      schedule: '',
      description: '',
      rules: '',
      coordinators: [],
      links: [],
    },
  });

  // When the event is found, reset the form and update local state.
  useEffect(() => {
    if (eventToEdit) {
      form.reset({
        name: eventToEdit.name,
        registration_fees: eventToEdit.registration_fees,
        prize_pool: eventToEdit.prize_pool,
        image_url: eventToEdit.image_url,
        min_team_size: Number(eventToEdit.min_team_size),
        max_team_size: Number(eventToEdit.max_team_size),
        schedule: eventToEdit.schedule,
        description: eventToEdit.description,
        rules: eventToEdit.rules,
        coordinators: eventToEdit.coordinators || [],
        links: eventToEdit.links || [],
      });
      setLinks(eventToEdit.links || []);
      setCoordinators(eventToEdit.coordinators || []);
    }
  }, [eventToEdit, form]);

  // Optionally, show a loading or error state if needed.
  if (eventsLoading) {
    return <EditEventSkeleton />;
  }
  if (!eventToEdit) {
    return <div>Event not found.</div>;
  }

  async function onSubmit(values: z.infer<typeof eventSchema>) {
    try {
      updateEventsData(eventId, values);
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <div className="container max-w-7xl py-8 min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight font-sargento text-white">
                Edit Event
              </h1>
              <p className="text-sm text-muted-foreground mt-1 text-gray-300">
                Edit event by filling out the details below.
              </p>
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-[#a383e6] via-[#9158FF] to-[#9158FF] hover:opacity-90 transition-opacity"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </div>

          <BasicInformation form={form} />
          <ScheduleAndDescription form={form} />
          <RulesAndGuidelines form={form} />
          <LinksAndCoordinators
            links={links}
            setLinks={setLinks}
            coordinators={coordinators}
            setCoordinators={setCoordinators}
          />
        </form>
      </Form>
    </div>
  );
}