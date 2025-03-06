'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useUser } from '@/lib/stores';
import { registerSoloEvent } from '@/utils/functions';
import { supabase } from '@/utils/functions/supabase-client';

interface SoloEventRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventID: string;
  eventFees: number;
  isFree: boolean;
}

// Schema for solo lead details
const soloLeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().regex(/^\d{10,}$/, 'Phone must be at least 10 digits'),
  email: z.string().email('Invalid email'),
  college: z.string().min(1, 'College is required'),
  payment_mode: z.string().min(1, 'Payment mode is required'),
  reg_mode: z.string().min(1, 'Registration mode is required'),
});

type SoloLeadFormValues = z.infer<typeof soloLeadSchema>;

export function SoloRegistration({
  isOpen,
  onClose,
  eventName,
  eventID,
  eventFees,
  isFree,
}: SoloEventRegistrationDialogProps) {
  const { userData } = useUser();
  const [soloLeadData, setSoloLeadData] = useState<SoloLeadFormValues | null>(null);
   const [showFurther, setShowFurther] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SoloLeadFormValues>({
    resolver: zodResolver(soloLeadSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      college: userData?.college || '',
      payment_mode: '',
      reg_mode: '',
    },
  });



  // Automatically update payment_mode and reg_mode when isSWCCleared is true

  const onSoloLeadSubmit = async (data: SoloLeadFormValues) => {
    console.log(data);
    setSoloLeadData(data);
    await registerForSWCPaid(data);
    reset();
  };

  const registerForSWCPaid = async (data: SoloLeadFormValues) => {
    console.log(data);
    const { data: participatingData } = await supabase.from('users').select('*').eq('email', data.email).single();

    const registrationParams = {
      userId: participatingData?.id!,
      eventId: eventID,
      transactionId: '',
      college: data.college || '',
      transactionScreenshot: null,
      name: data.name,
      phone: data.phone,
      email: data.email,
      payment_mode: data.payment_mode,
      reg_mode: data.reg_mode,
      ref: 'TECHTRIX2025',
    };

    try {
      await registerSoloEvent(registrationParams);
      onClose();
      setSoloLeadData(null);
    } catch (error) {
      console.error('Failed to register for solo event:', error);
      toast.error('Failed to register for solo event. Please try again.');
    }
  };

  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/90/59/3b/90593b288869fe650f17b101322ee12d.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="modal sm:max-w-[500px] bg-black border border-yellow-200 rounded-xl p-6"
      >
        <DialogHeader>
          <DialogTitle className="text-white text-2xl font-kagitingan tracking-wider">
            Registration for <br />
            <span className="text-yellow-200 text-3xl">{eventName}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSoloLeadSubmit)} className="overflow-y-auto my-scrollbar max-h-[65vh]">
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="font-alexandria tracking-wider">
                Name
              </label>
              <Input id="name" {...register('name')} className="bg-black border-gray-500 text-white rounded-md" placeholder="Enter your name" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="grid gap-2">
              <label htmlFor="phone" className="font-alexandria tracking-wider">
                Phone
              </label>
              <Input id="phone" type="tel" {...register('phone')} className="bg-black border-gray-500 text-white rounded-md" placeholder="Enter your phone number" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="font-alexandria tracking-wider">
                Email
              </label>
              <Input id="email" type="email" {...register('email')} className="bg-black border-gray-500 text-white rounded-md" placeholder="Enter your email" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="font-alexandria tracking-wider">
                College
              </label>
              <Input id="college" type="college" {...register('college')} className="bg-black border-gray-500 text-white rounded-md" placeholder="Enter your college" />
              {errors.college && <p className="text-red-500 text-sm">{errors.college.message}</p>}
            </div>


            {/* Conditionally show dropdowns if isSWCCleared is false */}
            { (
              <>
                <div className="grid gap-2">
                  <label className="font-alexandria tracking-wider">Payment Mode</label>
                  <Select onValueChange={(val) => setValue('payment_mode', val)}>
                    <SelectTrigger className="bg-black border-gray-500 text-white rounded-md">
                      <SelectValue placeholder="Select payment mode" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Google Pay">Google Pay</SelectItem>
                      <SelectItem value="PhonePe">PhonePe</SelectItem>
                      <SelectItem value="PayTM">PayTM</SelectItem>
                      <SelectItem value="CASH">Cash</SelectItem>
                      <SelectItem value="BANK">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label className="font-alexandria tracking-wider">Registration Mode</label>
                  <Select onValueChange={(val) => setValue('reg_mode', val)}>
                    <SelectTrigger className="bg-black border-gray-500 text-white rounded-md">
                      <SelectValue placeholder="Select registration mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ONLINE">Online</SelectItem>
                      <SelectItem value="OFFLINE">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          <Button type="submit" className="bg-yellow-200 text-black text-xl">Register</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
