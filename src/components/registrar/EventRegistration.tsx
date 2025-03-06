'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useUser } from '@/lib/stores';
import { toast } from 'sonner';
import { useEvents } from '@/lib/stores';
import {
  RegisterTeamParams,
  registerTeamWithParticipants,
  uploadPaymentScreenshot,
} from '@/utils/functions';
import { supabase } from '@/utils/functions/supabase-client';
import { ViewTeamMembers } from '../events/ViewTeamMembers';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface EventRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  minTeamSize: number; // includes team lead
  maxTeamSize: number;
  eventID: string;
  isFree: boolean;
  eventFees: number;
}

// Zod schema for the Team Lead (Step 1)
// Added a new field for teamName.
const teamLeadSchema = z.object({
  teamName: z.string().min(1, 'Team name is required'),
  name: z.string().min(1, 'Team lead name is required'),
  phone: z.string().min(1, 'Team lead phone is required'),
  email: z.string().email('Invalid email'),
  collegeName: z.string().min(1, 'College name is required'),
  payment_mode: z.string().min(1, 'Payment mode is required'),
  reg_mode: z.string().min(1, 'Registration mode is required'),
});
type TeamLeadFormValues = z.infer<typeof teamLeadSchema>;

// Zod schema for a Team Member (used in Step 2)
// Note: Removed the collegeName field.

export function TeamEventRegistration({
  isOpen,
  onClose,
  eventName,
  minTeamSize,
  maxTeamSize,
  eventID,
  isFree,
  eventFees,
}: EventRegistrationDialogProps) {
  const { userData } = useUser();
  const { markEventAsRegistered } = useEvents();

  const teamMemberSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().regex(/^\d{10,}$/, 'Phone must be at least 10 digits'),
    email: z.string().email('Invalid email'),
  });
  type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;

  // const usePaymentSchema = (isPaid: boolean) => {
  //   return useMemo(() => {
  //     return z.object({
  //       transactionId: isFree
  //         ? z.string().min(1, 'Transaction ID is required')
  //         : z.string().optional(),

  //       paymentScreenshot: isFree
  //         ? z
  //             .any()
  //             .refine(
  //               (files) => files && files.length > 0,
  //               'Payment screenshot is required'
  //             )
  //             .transform((files) => files[0])
  //         : z.any().optional(),
  //     });
  //   }, [isFree]);
  // };
  // Zod schema for Payment Details (Step 3)
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
  // step: 1 = Team Lead, 2 = Manage Team Members, 3 = Payment Details
  const [step, setStep] = useState(1);
  // Store validated team lead details
  const [teamLeadData, setTeamLeadData] = useState<TeamLeadFormValues | null>(
    null
  );
  // Store added team members (without a college field)
  const [teamMembers, setTeamMembers] = useState<TeamMemberFormValues[]>([]);
  // For displaying the added team members via the ViewTeamMembers component
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isConfirmedTeam, setIsConfirmedTeam] = useState(false);
  const [showConfirmTeam, setShowConfirmTeam] = useState(false);
  // Toggle for showing the add team member form
  const [isAddingMember, setIsAddingMember] = useState(false);
  // Added state to track which member is being edited
  const [editingMemberIndex, setEditingMemberIndex] = useState<number | null>(
    null
  );
  // State to track registration process
  const [isRegistering, setIsRegistering] = useState(false);

  // ----------- Step 1: Team Lead Form -----------
  const {
    register: registerTeamLead,
    handleSubmit: handleTeamLeadSubmit,
    formState: { errors: teamLeadErrors },
    reset: resetTeamLead,
    setValue,
  } = useForm<TeamLeadFormValues>({
    resolver: zodResolver(teamLeadSchema),
  });

  const onTeamLeadSubmit = (data: TeamLeadFormValues) => {
    setTeamLeadData(data);
    setStep(2);
    resetTeamLead();
  };

  // ----------- Step 2: Add Team Member Form -----------
  const {
    register: registerTeamMember,
    handleSubmit: handleTeamMemberSubmit,
    formState: { errors: teamMemberErrors },
    reset: resetTeamMember,
  } = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberSchema),
  });

  const onAddTeamMember = (data: TeamMemberFormValues) => {
    // Validate duplicate email: check against already added team members and the team lead.
    if (teamLeadData && teamLeadData.email === data.email) {
      toast.error(
        'Team member email cannot be the same as the team lead email.'
      );
      return;
    }
    if (teamMembers.some((member) => member.email === data.email)) {
      toast.error('This email has already been added as a team member.');
      return;
    }
    setTeamMembers((prev) => [...prev, data]);
    resetTeamMember();
    setIsAddingMember(false);
  };

  useEffect(() => {
    if (editingMemberIndex !== null) {
      const memberToEdit = teamMembers[editingMemberIndex];
      resetTeamMember(memberToEdit);
    }
  }, [editingMemberIndex, teamMembers, resetTeamMember]);

  // Total team count (team lead is counted if teamLeadData is set)
  const totalTeamCount = (teamLeadData ? 1 : 0) + teamMembers.length;

  const handleProceedToPayment = () => {
    if (totalTeamCount < minTeamSize) {
      alert(
        `Minimum team size is ${minTeamSize}. Please add more team members.`
      );
    } else if (totalTeamCount > maxTeamSize) {
      alert(
        `Maximum team size is ${maxTeamSize}. Please remove some team members.`
      );
    } else {
      setShowConfirmTeam(true);
      setIsSheetOpen(true);
    }
  };

  // ----------- Step 3: Payment Form -----------
  const {
    register: registerPayment,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors },
    reset: resetPayment,
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
  });

  const onPaymentSubmit = async (data: PaymentFormValues) => {
    setIsRegistering(true);
    let screenshotUrl = '';
    if (!isFree) {
      try {
        // Upload the payment screenshot using the integrated Supabase function.
        screenshotUrl = await uploadPaymentScreenshot(
          data.paymentScreenshot,
          eventName
        );
      } catch (error) {
        console.error('Failed to upload screenshot:', error);
        toast.error('Failed to upload payment screenshot. Please try again.');
        setIsRegistering(false);
        return;
      }
    }

    // Combine all registration data.
    const registrationParams: RegisterTeamParams = {
      userId: userData?.id!, // non-null assertion since we expect this to be set
      eventId: eventID,
      transactionId: data.transactionId || null,
      teamName: teamLeadData!.teamName,
      college: teamLeadData!.collegeName,
      transactionScreenshot: screenshotUrl,
      teamLeadName: teamLeadData!.name,
      teamLeadPhone: teamLeadData!.phone,
      teamLeadEmail: teamLeadData!.email,
      teamMembers: teamMembers,
      ref: userData?.referral_code || 'TECHTRIX2025',
    };

    try {
      // Call the registerTeamWithParticipants function.
      const result = await registerTeamWithParticipants(
        registrationParams,
        isFree
      );
      markEventAsRegistered(eventID);
      handleDialogClose();
    } catch (error) {
      console.error('Failed to register team:', error);
      setIsRegistering(false);
      return;
    }
  };

  const [registerLoading, setRegisterLoading] = useState(false);
  const registerForSWCPaid = async (formData: { 
    teamLead: any; 
    teamMembers: any[] 
  }) => {
    const { data: participatingData } = await supabase.from('users').select('*').eq('email', formData?.teamLead?.email).single();
    setIsRegistering(true);
    setRegisterLoading(true);
    const registrationParams: RegisterTeamParams = {
      userId: participatingData?.id!, // non-null assertion since we expect this to be set
      eventId: eventID,
      transactionId: null,
      teamName: formData?.teamLead?.teamName,
      college: formData?.teamLead!.collegeName,
      transactionScreenshot: '',
      teamLeadName: formData?.teamLead!.name,
      teamLeadPhone: formData?.teamLead!.phone,
      teamLeadEmail: formData?.teamLead!.email,
      teamMembers: teamMembers,
      paymentMode: formData?.teamLead?.payment_mode,
        regMode: formData?.teamLead?.reg_mode,
      ref: userData?.referral_code || 'TECHTRIX2025',
    };
    try {
      // Call the registerTeamWithParticipants function.
      const result = await registerTeamWithParticipants(
        registrationParams,
        isFree
      );
      markEventAsRegistered(eventID);
      handleDialogClose();
    } catch (error) {
      console.error('Failed to register team:', error);
      setIsRegistering(false);
      return;
    } finally {
      setRegisterLoading(false);
    }
  };

  // Reset all internal state and forms
  const resetForm = () => {
    setTeamLeadData(null);
    setTeamMembers([]);
    setStep(1);
    setIsAddingMember(false);
    setIsSheetOpen(false);
    resetTeamLead();
    resetTeamMember();
    resetPayment();
    setEditingMemberIndex(null);
    setIsRegistering(false);
  };

  // Wrap onClose to also reset the form state
  const handleDialogClose = () => {
    resetForm();
    onClose();
  };

  const onRemoveMember = (index: number) => {
    const updatedMembers = [...teamMembers];
    updatedMembers.splice(index, 1);
    setTeamMembers(updatedMembers);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleDialogClose();
        }
      }}
    >
      <DialogContent
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/90/59/3b/90593b288869fe650f17b101322ee12d.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="sm:max-w-[500px] bg-black border  border-yellow-200 rounded-xl p-6 modal"
      >
        <DialogHeader>
          <DialogTitle className="text-white text-sm lg:text-2xl font-kagitingan tracking-wider">
            Registration for <br />{' '}
            <span className="text-yellow-200 text-xl lg:text-3xl">
              {eventName}
            </span>
          </DialogTitle>
        </DialogHeader>

        <p className="text-white font-alexandria tracking-widest text-sm lg:text-lg ">
          Team Members: {totalTeamCount} <br />
          (Min: {minTeamSize}, Max: {maxTeamSize})
        </p>
        {teamMembers.length > 0 && (
          <span
            className="text-yellow-200 font-alexandria cursor-pointer text-sm lg:text-lg hover:underline"
            onClick={() => {
              setShowConfirmTeam(false);
              setIsSheetOpen(true);
            }}
          >
            View & Edit Added Members
          </span>
        )}

        {/* Step 1: Team Lead Details */}
        {step === 1 && (
          <form
            onSubmit={handleTeamLeadSubmit(onTeamLeadSubmit)}
            className="overflow-y-auto my-scrollbar max-h-[65vh]"
          >
            <div className="grid gap-2 lg:gap-6 py-4">
              {/* New Team Name Field */}
              <div className="grid gap-2 text-sm">
                <label
                  htmlFor="teamName"
                  id="glowPink"
                  className="font-alexandria tracking-wider"
                >
                  Team Name
                </label>
                <Input
                  id="teamName"
                  {...registerTeamLead('teamName')}
                  className="bg-black border  border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md font-alexandria tracking-wider"
                  placeholder="Enter your team name"
                />
                {teamLeadErrors.teamName && (
                  <p className="text-red-500 text-sm font-alexandria tracking-wider">
                    {teamLeadErrors.teamName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2 ">
                <label
                  htmlFor="name"
                  id="glowPink"
                  className="font-alexandria tracking-wider"
                >
                  Team Lead Name
                </label>
                <Input
                  id="name"
                  
                  {...registerTeamLead('name')}
                  className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md  cursor-not-allowed font-alexandria tracking-wider"
                  placeholder="Enter team lead name"
                />
                {teamLeadErrors.name && (
                  <p className="text-red-500 text-sm font-alexandria tracking-wider">
                    {teamLeadErrors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="phone"
                  id="glowPink"
                  className="font-alexandria tracking-wider"
                >
                  Team Lead Phone
                </label>
                <Input
                  id="phone"
                  type="tel"
                
                  {...registerTeamLead('phone')}
                  className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md  cursor-not-allowed font-alexandria tracking-wider"
                  placeholder="Enter team lead phone number"
                />
                {teamLeadErrors.phone && (
                  <p className="text-red-500 text-sm font-alexandria tracking-wider">
                    {teamLeadErrors.phone.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="email"
                  id="glowPink"
                  className="font-alexandria tracking-wider"
                >
                  Team Lead Email
                </label>
                <Input
                  id="email"
                  type="email"
                  {...registerTeamLead('email')}
                  className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md  cursor-not-allowed font-alexandria tracking-wider"
                  placeholder="Enter team lead email"
                  
                />
                {teamLeadErrors.email && (
                  <p className="text-red-500 text-sm font-alexandria tracking-wider">
                    {teamLeadErrors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="collegeName"
                  id="glowPink"
                  className="font-alexandria tracking-wider"
                >
                  College Name
                </label>
                <Input
                  id="collegeName"
                  {...registerTeamLead('collegeName')}
                               className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md font-alexandria tracking-wider"
                  placeholder="Enter college name"
                />
                {teamLeadErrors.collegeName && (
                  <p className="text-red-500 text-sm font-alexandria tracking-wider">
                    {teamLeadErrors.collegeName.message}
                  </p>
                )}
              </div>
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
                      <SelectItem value="UPI">UPI</SelectItem>
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
            </div>
            {/* Bottom buttons arranged side by side */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleDialogClose}
                className="bg-yellow-200 text-black hover:bg-yellow-100 font-kagitingan tracking-wider text-xl border-0"
              >
                Close
              </Button>
              <Button
                type="submit"
                className="bg-yellow-200 text-black hover:bg-yellow-100 font-kagitingan tracking-wider text-xl border-0"
              >
                Next
              </Button>
            </div>
          </form>
        )}
        {
          <ViewTeamMembers
            isFree={isFree}
            isOpen={isSheetOpen}
            onOpenChange={setIsSheetOpen}
            teamMembers={teamMembers}
            teamLeadData={teamLeadData}
            showConfirmTeam={showConfirmTeam}
            registerLoading={registerLoading}
            onRemoveMember={onRemoveMember}
            confirmTeam={async () => {
                await registerForSWCPaid({
                    teamLead: teamLeadData, // Data from teamLeadSchema
                    teamMembers: teamMembers, // Array of team members from teamMemberSchema
                  });
            }}
            onEditTeamLead={() => {
              setStep(1);
              setIsSheetOpen(false);
            }}
            onEditMember={(index: number) => {
              setEditingMemberIndex(index);
              setIsAddingMember(true);
              setIsSheetOpen(false);
            }}
          />
        }

        {/* Step 2: Manage Team Members */}
        {step === 2 && (
          <div className="overflow-y-auto my-scrollbar max-h-[60vh]">
            {isAddingMember ? (
              <form
                onSubmit={handleTeamMemberSubmit((data) => {
                  if (editingMemberIndex !== null) {
                    const updatedMembers = [...teamMembers];
                    updatedMembers[editingMemberIndex] = data;
                    setTeamMembers(updatedMembers);
                    setEditingMemberIndex(null);
                  } else {
                    onAddTeamMember(data);
                  }
                  setIsAddingMember(false);
                })}
                className="grid gap-2 lg:gap-6 py-4"
              >
                <div className="grid gap-2">
                  <label
                    htmlFor="memberName"
                    id="glowPink"
                    className="font-alexandria tracking-wider"
                  >
                    Team Member Name
                  </label>
                  <Input
                    id="memberName"
                    {...registerTeamMember('name')}
                    className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md"
                    placeholder="Enter team member name"
                  />
                  {teamMemberErrors.name && (
                    <p className="text-red-500 text-sm font-alexandria tracking-wider">
                      {teamMemberErrors.name.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="memberPhone"
                    id="glowPink"
                    className="font-alexandria tracking-wider"
                  >
                    Team Member Phone
                  </label>
                  <Input
                    id="memberPhone"
                    type="tel"
                    {...registerTeamMember('phone')}
                    className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md"
                    placeholder="Enter team member phone number"
                  />
                  {teamMemberErrors.phone && (
                    <p className="text-red-500 text-sm font-alexandria tracking-wider">
                      {teamMemberErrors.phone.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="memberEmail"
                    id="glowPink"
                    className="font-alexandria tracking-wider"
                  >
                    Team Member Email
                  </label>
                  <Input
                    id="memberEmail"
                    type="email"
                    {...registerTeamMember('email')}
                    className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md"
                    placeholder="Enter team member email"
                  />
                  {teamMemberErrors.email && (
                    <p className="text-red-500 text-sm font-alexandria tracking-wider">
                      {teamMemberErrors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-row flex-wrap gap-4 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddingMember(false);
                      setEditingMemberIndex(null);
                    }}
                    className="bg-yellow-200 text-black hover:bg-yellow-100 font-kagitingan tracking-wider text-sm lg:text-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-yellow-200 text-black hover:bg-yellow-100 font-kagitingan tracking-wider text-sm lg:text-xl border-0"
                  >
                    {editingMemberIndex !== null ? 'Update' : 'Save'}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-wrap gap-4 mt-4">
                {teamMembers?.length < maxTeamSize - 1 && (
                  <Button
                    type="button"
                    onClick={() => setIsAddingMember(true)}
                    className="bg-yellow-200 text-black hover:bg-yellow-100 font-kagitingan tracking-wider text-sm lg:text-xl border-0"
                  >
                    Add New Member
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="bg-yellow-200 text-black hover:bg-yellow-100 font-kagitingan tracking-wider text-sm lg:text-xl border-0"
                  disabled={
                    totalTeamCount < minTeamSize || totalTeamCount > maxTeamSize
                  }
                >
                  {isFree ? 'Register' : 'Make Payment'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="bg-yellow-200 text-black hover:bg-yellow-100 font-kagitingan tracking-wider text-sm lg:text-xl border-0"
                >
                  Back
                </Button>
              </div>
            )}
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
