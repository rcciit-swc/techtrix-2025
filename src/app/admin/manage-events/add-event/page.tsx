'use client';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { eventSchema } from '@/lib/schemas';
import Header from '@/components/admin/manage-events/Header';
import { useState } from 'react';
import { Coordinator, Link } from '@/lib/types/events';
import { toast } from 'sonner';
import {
  BasicInformation,
  LinksAndCoordinators,
  RulesAndGuidelines,
  ScheduleAndDescription,
} from '@/components/admin/manage-events';
import 'react-quill/dist/quill.snow.css';
import { useEvents } from '@/lib/stores';

const Page = () => {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: '',
      registration_fees: 0,
      event_category_id: '',
      prize_pool: 0,
      image_url: '',
      min_team_size: 1,
      max_team_size: 1,
      schedule: '',
      description: '',
      rules: '',
      coordinators: [],
      links: [],
      reg_status: false,
    },
  });

  const [links, setLinks] = useState<Link[]>([]);
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const { postEvent, setEventsData } = useEvents();
  async function onSubmit(values: z.infer<typeof eventSchema>) {
    try {
      const eventData = {
        ...values,
        min_team_size: Number(values.min_team_size),
        max_team_size: Number(values.max_team_size),
        links: links,
        coordinators: coordinators,
      };
      postEvent(eventData);
      setEventsData();
      toast.success('Event created!');
      form.reset();
      setLinks([]);
      setCoordinators([]);
    } catch (error: any) {
      console.log(error);
      toast.error('Failed to create event. ' + error.message);
    }
  }
  return (
    <div className="container max-w-7xl py-8 min-h-screen">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Header form={form} />
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
      </FormProvider>
    </div>
  );
};

export default Page;
