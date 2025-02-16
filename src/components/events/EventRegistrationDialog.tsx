'use client';

import { useState } from 'react';
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
import Image from 'next/image';
import { toast } from 'sonner';
import { useUser } from '@/lib/stores';
import { useEvents } from '@/lib/stores';
import { registerSoloEvent, uploadPaymentScreenshot } from '@/utils/functions';

interface SoloEventRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventID: string;
  eventFees: number;
}

// Schema for solo (team lead) details.
const soloLeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().regex(/^\d{10,}$/, 'Phone must be at least 10 digits'),
  email: z.string().email('Invalid email'),
  college: z.string().min(1, 'College is required'),
});
type SoloLeadFormValues = z.infer<typeof soloLeadSchema>;

// Schema for payment details.
const paymentSchema = z.object({
  transactionId: z.string().min(1, 'Transaction ID is required'),
  paymentScreenshot: z
    .any()
    .refine(
      (files) => files && files.length > 0,
      'Payment screenshot is required'
    )
    .transform((files) => files[0]),
});
type PaymentFormValues = z.infer<typeof paymentSchema>;

export function SoloEventRegistration({
  isOpen,
  onClose,
  eventName,
  eventID,
  eventFees,
}: SoloEventRegistrationDialogProps) {
  const { userData } = useUser();
  const { markEventAsRegistered } = useEvents();
  const [step, setStep] = useState(1);
  const [soloLeadData, setSoloLeadData] = useState<SoloLeadFormValues | null>(
    null
  );

  // Form for solo lead details.
  const {
    register: registerSoloLead,
    handleSubmit: handleSoloLeadSubmit,
    formState: { errors: soloLeadErrors },
    reset: resetSoloLead,
  } = useForm<SoloLeadFormValues>({
    resolver: zodResolver(soloLeadSchema),
    defaultValues: {
      name: userData?.name,
      phone: userData?.phone,
      email: userData?.email,
    },
  });

  const onSoloLeadSubmit = (data: SoloLeadFormValues) => {
    setSoloLeadData(data);
    setStep(2);
    resetSoloLead();
  };

  // Form for payment details.
  const {
    register: registerPayment,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors },
    reset: resetPayment,
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
  });

  const onPaymentSubmit = async (data: PaymentFormValues) => {
    let screenshotUrl = '';
    try {
      screenshotUrl = await uploadPaymentScreenshot(
        data.paymentScreenshot,
        eventName
      );
    } catch (error) {
      console.error('Failed to upload screenshot:', error);
      toast.error('Failed to upload payment screenshot. Please try again.');
      return;
    }

    // Combine the registration data.
    const registrationParams = {
      userId: userData?.id!, // non-null assertion; adjust if necessary
      eventId: eventID,
      transactionId: data.transactionId,
      college: soloLeadData!.college,
      transactionScreenshot: screenshotUrl,
      name: soloLeadData!.name,
      phone: soloLeadData!.phone,
      email: soloLeadData!.email,
    };

    try {
      const result = await registerSoloEvent(registrationParams);
      console.log('Solo registration result:', result);
      markEventAsRegistered(eventID);
      onClose();
      setSoloLeadData(null);
      setStep(1);
      resetPayment();
    } catch (error) {
      console.error('Failed to register for solo event:', error);
      toast.error('Failed to register for solo event. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-black border border-[#8B5CF6] rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">
            Registration for {eventName}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <form
            onSubmit={handleSoloLeadSubmit(onSoloLeadSubmit)}
            className="overflow-y-auto my-scrollbar max-h-[65vh]"
          >
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-white">
                  Name
                </label>
                <Input
                  id="name"
                  readOnly
                  {...registerSoloLead('name')}
                  className="bg-black border border-gray-500 focus:border-[#8B5CF6] focus:outline-none text-white rounded-md"
                  placeholder="Enter your name"
                  defaultValue={userData?.name}
                />
                {soloLeadErrors.name && (
                  <p className="text-red-500 text-sm">
                    {soloLeadErrors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-white">
                  Phone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  readOnly
                  {...registerSoloLead('phone')}
                  className="bg-black border border-gray-500 focus:border-[#8B5CF6] focus:outline-none text-white rounded-md"
                  placeholder="Enter your phone number"
                  defaultValue={userData?.phone}
                />
                {soloLeadErrors.phone && (
                  <p className="text-red-500 text-sm">
                    {soloLeadErrors.phone.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-white">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  {...registerSoloLead('email')}
                  className="bg-black border border-gray-500 focus:border-[#8B5CF6] focus:outline-none text-white rounded-md"
                  placeholder="Enter your email"
                  defaultValue={userData?.email}
                  readOnly
                />
                {soloLeadErrors.email && (
                  <p className="text-red-500 text-sm">
                    {soloLeadErrors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="college" className="text-white">
                  College
                </label>
                <Input
                  id="college"
                  autoFocus
                  {...registerSoloLead('college')}
                  className="bg-black border border-gray-500 focus:border-[#8B5CF6] focus:outline-none text-white rounded-md"
                  placeholder="Enter your college name"
                />
                {soloLeadErrors.college && (
                  <p className="text-red-500 text-sm">
                    {soloLeadErrors.college.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="bg-white text-black hover:bg-white/90 border-0"
              >
                Close
              </Button>
              <Button
                type="submit"
                className="bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]/90 border-0"
              >
                Next
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handlePaymentSubmit(onPaymentSubmit)}
            className="overflow-y-auto max-h-[65vh]"
          >
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <label htmlFor="transactionId" className="text-white">
                  Transaction ID
                </label>
                <Input
                  id="transactionId"
                  {...registerPayment('transactionId')}
                  className="bg-black border border-gray-500 focus:border-[#8B5CF6] focus:outline-none text-white rounded-md"
                  placeholder="Enter transaction ID"
                />
                {paymentErrors.transactionId && (
                  <p className="text-red-500 text-sm">
                    {paymentErrors.transactionId.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2 text-white">
                <label htmlFor="paymentScreenshot" className="text-white">
                  Payment Screenshot
                </label>
                <Input
                  id="paymentScreenshot"
                  type="file"
                  {...registerPayment('paymentScreenshot')}
                  className="bg-black border text-white border-gray-500 focus:border-[#8B5CF6] focus:outline-none rounded-md"
                  accept="image/*"
                />
                {paymentErrors.paymentScreenshot && (
                  <p className="text-red-500 text-sm">
                    {String(paymentErrors.paymentScreenshot.message)}
                  </p>
                )}
              </div>
            </div>
            <h1 className="text-white text-center text-lg font-semibold">
              Pay <span className="text-green-500">₹ {eventFees}</span>
            </h1>
            <div className="mt-6 flex items-center justify-center">
              <Image
                src="/images/qr.jpg"
                alt="Payment QR Code"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="bg-white text-black hover:bg-white/90 border-0"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]/90 border-0"
              >
                Register
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
