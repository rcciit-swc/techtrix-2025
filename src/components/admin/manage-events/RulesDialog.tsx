'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { parseWithQuillStyles } from '@/utils/functions';

type RulesDialogProps = {
  rules: string;
};

export const RulesDialog = ({ rules }: RulesDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-6 bg-purple-600 hover:bg-purple-700">
          View Rules
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 text-white border-zinc-800 max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-got !tracking-widest">
            Rules
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 overflow-y-auto p-4 max-h-[60vh] pr-6 my-scrollbar">
          {parseWithQuillStyles(rules)}
        </div>
      </DialogContent>
    </Dialog>
  );
};
