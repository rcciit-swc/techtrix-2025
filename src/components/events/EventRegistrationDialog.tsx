'use client';

import { useMemo, useState } from 'react';
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

export function SoloEventRegistration({
  isOpen,
  onClose,
  eventName,
  eventID,
  eventFees,
}: SoloEventRegistrationDialogProps) {
  const { userData, swcStatus } = useUser();
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

  const onSoloLeadSubmit = async (data: SoloLeadFormValues) => {
    setSoloLeadData(data);
    swcStatus ? await registerForSWCPaid() : setStep(2);
    resetSoloLead();
  };

  // const usePaymentSchema = () => {
  //   return useMemo(() => {
  //     return z.object({
  //       transactionId: swcStatus
  //         ? z.string().min(1, 'Transaction ID is required')
  //         : z.string().optional(),

  //       paymentScreenshot: swcStatus
  //         ? z
  //             .any()
  //             .refine(
  //               (files) => files && files.length > 0,
  //               'Payment screenshot is required'
  //             )
  //             .transform((files) => files[0])
  //         : z.any().optional(),
  //     });
  //   }, [swcStatus]);
  // };
  // Zod schema for Payment Details (Step 3)
  const paymentSchema = z.object({
    transactionId:  z.string().min(1, 'Transaction ID is required'),

    paymentScreenshot:  z
          .any()
          .refine(
            (files) => files && files.length > 0,
            'Payment screenshot is required'
          )
          .transform((files) => files[0])
  });
  type PaymentFormValues = z.infer<typeof paymentSchema>;

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
    console.log(data?.paymentScreenshot)
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
      transactionId: data.transactionId || '',
      college: soloLeadData!.college,
      transactionScreenshot: screenshotUrl,
      name: soloLeadData!.name,
      phone: soloLeadData!.phone,
      email: soloLeadData!.email,
    };

    try {
      const result = await registerSoloEvent(registrationParams);
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

  const registerForSWCPaid = async () => {
    // Combine the registration data.
    const registrationParams = {
      userId: userData?.id!, // non-null assertion; adjust if necessary
      eventId: eventID,
      transactionId: '',
      college: userData?.college || '',
      transactionScreenshot: null,
      name: userData!.name,
      phone: userData!.phone,
      email: userData!.email,
    };

    try {
      const result = await registerSoloEvent(registrationParams);
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
            Registration for <br />{' '}
            <span className="text-yellow-200 text-3xl">{eventName}</span>
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <form
            onSubmit={handleSoloLeadSubmit(onSoloLeadSubmit)}
            className="overflow-y-auto my-scrollbar max-h-[65vh]"
          >
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <label
                  htmlFor="name"
                  id="glowPink"
                  className="font-alexandria tracking-wider"
                >
                  Name
                </label>
                <Input
                  id="name"
                  readOnly
                  {...registerSoloLead('name')}
                  className="bg-black border border-gray-500 cursor-not-allowed focus:border-yellow-200 focus:outline-none text-white rounded-md font-alexandria tracking-wider"
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
                <label
                  htmlFor="phone"
                  id="glowPink"
                  className="font-alexandria tracking-wider"
                >
                  Phone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  readOnly
                  {...registerSoloLead('phone')}
                  className="bg-black border border-gray-500 cursor-not-allowed focus:border-yellow-200 focus:outline-none text-white rounded-md font-alexandria tracking-wider"
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
                <label
                  htmlFor="email"
                  id="glowPink"
                  className="font-alexandria tracking-wider"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  {...registerSoloLead('email')}
                  className="bg-black border border-gray-500 cursor-not-allowed focus:border-yellow-200 focus:outline-none text-white rounded-md font-alexandria tracking-wider"
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
                <label
                  htmlFor="college"
                  id="glowPink"
                  className="font-alexandria tracking-wider"
                >
                  College
                </label>
                <Input
                  id="college"
                  autoFocus
                  {...registerSoloLead('college')}
                  defaultValue={userData?.college}
                  className="bg-black border border-gray-500 cursor-not-allowed focus:border-yellow-200 focus:outline-none text-white rounded-md font-alexandria tracking-wider"
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
                className="bg-yellow-200 text-black hover:bg-yellow-100 font-kagitingan tracking-wider text-xl border-0"
              >
                Close
              </Button>
              <Button
                type="submit"
                className="bg-yellow-200 text-black hover:bg-yellow-100 font-kagitingan tracking-wider text-xl border-0"
              >
                {swcStatus ? 'Register' : 'Next'}
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
                <label
                  htmlFor="transactionId"
                  id="glowPink"
                  className="font-alexandria tracking-wider"
                >
                  Transaction ID
                </label>
                <Input
                  id="transactionId"
                  {...registerPayment('transactionId')}
                  className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md font-alexandria tracking-wider"
                  placeholder="Enter transaction ID"
                />
                {paymentErrors.transactionId && (
                  <p className="text-red-500 text-sm">
                    {paymentErrors.transactionId.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2 text-white">
                <label
                  htmlFor="paymentScreenshot"
                  id="glowPink"
                  className="font-alexandria tracking-wider"
                >
                  Payment Screenshot
                </label>
                <Input
                  id="paymentScreenshot"
                  type="file"
                  {...registerPayment('paymentScreenshot')}
                  className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md  font-alexandria tracking-wider"
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
                className="bg-yellow-200 text-black hover:bg-yellow-100 font-kagitingan tracking-wider text-xl border-0"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-yellow-200 text-black hover:bg-yellow-100 font-kagitingan tracking-wider text-xl border-0"
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
