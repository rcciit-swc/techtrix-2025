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
      <DialogContent
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/90/59/3b/90593b288869fe650f17b101322ee12d.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="sm:max-w-[425px] bg-black border border-yellow-200 rounded-xl modal"
      >
        <DialogHeader>
          <DialogTitle className="font-kagitingan tracking-widest text-2xl text-yellow-200">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await onSave(new FormData(e.currentTarget));
          }}
        >
          <div className="grid gap-6 py-4 font-alexandria max-h-[60vh] pr-2 overflow-y-auto">
            <div className="flex justify-center">
              <Avatar className="w-24 h-24 border-2 bg-yellow-200">
                <AvatarImage
                  src={profileImage}
                  alt={userData?.name || 'Profile'}
                />
                <AvatarFallback className="bg-yellow-200 text-white">
                  {userData?.name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="fullName"
                id="glowPink"
                className="font-alexandria tracking-wider"
              >
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                defaultValue={userData?.name || name}
                className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md"
                placeholder="Enter your full name"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="gender"
                id="glowPink"
                className="font-alexandria tracking-wider"
              >
                Gender
              </label>
              <Select name="gender" defaultValue={userData?.gender || ''}>
                <SelectTrigger className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md">
                  <SelectValue
                    placeholder="Select Gender"
                    id="glowPink"
                    className="font-alexandria tracking-wider"
                  />
                </SelectTrigger>
                <SelectContent className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md">
                  <SelectItem
                    value="female"
                    className="text-white hover:bg-yellow-200/20"
                  >
                    Female
                  </SelectItem>
                  <SelectItem
                    value="male"
                    className="text-white hover:bg-yellow-200/20"
                  >
                    Male
                  </SelectItem>
                  {/* <SelectItem
                    value="other"
                    className="text-white hover:bg-yellow-200/20"
                  >
                    Other
                  </SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="email"
                id="glowPink"
                className="font-alexandria tracking-wider"
              >
                Email ID
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={userData?.email || ''}
                className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md"
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="phone"
                id="glowPink"
                className="font-alexandria tracking-wider"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={userData?.phone || ''}
                className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="phone"
                id="glowPink"
                className="font-alexandria tracking-wider"
              >
                College
              </label>
              <Input
                id="college"
                name="college"
                type="text"
                defaultValue={userData?.college || ''}
                className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md"
                placeholder="Enter College"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="course"
                id="glowPink"
                className="font-alexandria tracking-wider"
              >
                Course
              </label>
              <Input
                id="course"
                name="course"
                type="text"
                defaultValue={userData?.course || ''}
                className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md"
                placeholder="Enter Course"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="stream"
                id="glowPink"
                className="font-alexandria tracking-wider"
              >
                Stream
              </label>
              <Input
                id="stream"
                name="stream"
                type="text"
                defaultValue={userData?.stream || ''}
                className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md"
                placeholder="Enter Stream"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="phone"
                id="glowPink"
                className="font-alexandria tracking-wider"
              >
                College Roll
              </label>
              <Input
                id="college_roll"
                name="college_roll"
                type="text"
                defaultValue={userData?.college_roll || ''}
                className="bg-black border border-gray-500 focus:border-yellow-200 focus:outline-none text-white rounded-md"
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
              className="bg-yellow-200 text-black hover:bg-yellow-100 border-0"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
