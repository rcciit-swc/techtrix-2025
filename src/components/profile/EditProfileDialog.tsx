'use client';

import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: any;
  profileImage?: string;
  name?: string;
  onSave: (formData: FormData) => Promise<void>;
}

export const EditProfileDialog: FC<EditProfileDialogProps> = ({
  open,
  onOpenChange,
  userData,
  name,
  profileImage,
  onSave,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-black border border-[#8B5CF6] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Profile</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await onSave(new FormData(e.currentTarget));
          }}
        >
          <div className="grid gap-6 py-4 max-h-[60vh] pr-2 overflow-y-auto">
            <div className="flex justify-center">
              <Avatar className="w-24 h-24 border-2 border-violet-500">
                <AvatarImage
                  src={profileImage}
                  alt={userData?.name || 'Profile'}
                />
                <AvatarFallback className="bg-violet-500 text-white">
                  {userData?.name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="grid gap-2">
              <label htmlFor="fullName" className="text-white">
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                defaultValue={userData?.name || name}
                className="bg-black border border-gray-500 focus:border-[#8B5CF6] focus:outline-none text-white rounded-md"
                placeholder="Enter your full name"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="gender" className="text-white">
                Gender
              </label>
              <Select name="gender" defaultValue={userData?.gender || ''}>
                <SelectTrigger className="bg-black border border-gray-500 focus:border-[#8B5CF6] focus:outline-none text-white rounded-md">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="bg-black border border-gray-500">
                  <SelectItem
                    value="female"
                    className="text-white hover:bg-[#8B5CF6]/20"
                  >
                    Female
                  </SelectItem>
                  <SelectItem
                    value="male"
                    className="text-white hover:bg-[#8B5CF6]/20"
                  >
                    Male
                  </SelectItem>
                  {/* <SelectItem
                    value="other"
                    className="text-white hover:bg-[#8B5CF6]/20"
                  >
                    Other
                  </SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-white">
                Email ID
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={userData?.email || ''}
                className="bg-black border border-gray-500 focus:border-[#8B5CF6] focus:outline-none text-white rounded-md"
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-white">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={userData?.phone || ''}
                className="bg-black border border-gray-500 focus:border-[#8B5CF6] focus:outline-none text-white rounded-md"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-white">
                College
              </label>
              <Input
                id="college"
                name="college"
                type="text"
                defaultValue={userData?.college || ''}
                className="bg-black border border-gray-500 focus:border-[#8B5CF6] focus:outline-none text-white rounded-md"
                placeholder="Enter College"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-white">
                Course
              </label>
              <Input
                id="course"
                name="course"
                type="text"
                defaultValue={userData?.course || ''}
                className="bg-black border border-gray-500 focus:border-[#8B5CF6] focus:outline-none text-white rounded-md"
                placeholder="Enter Course"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-white">
                Stream
              </label>
              <Input
                id="stream"
                name="stream"
                type="text"
                defaultValue={userData?.stream || ''}
                className="bg-black border border-gray-500 focus:border-[#8B5CF6] focus:outline-none text-white rounded-md"
                placeholder="Enter Stream"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-white">
                College Roll
              </label>
              <Input
                id="college_roll"
                name="college_roll"
                type="text"
                defaultValue={userData?.college_roll || ''}
                className="bg-black border border-gray-500 focus:border-[#8B5CF6] focus:outline-none text-white rounded-md"
                placeholder="Enter College Roll"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-white text-black hover:bg-white/90 border-0"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]/90 border-0"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
