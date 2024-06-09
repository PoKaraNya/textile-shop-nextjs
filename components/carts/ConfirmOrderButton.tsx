'use client';

import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { createUserOrderAction } from '@/lib/actions/orders';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

export const ConfirmOrderButton = () => {
  const [, startMutation] = useTransition();
  const [notes, setNotes] = useState('');

  const clickHandler = () => {
    startMutation(async () => {
      await createUserOrderAction(notes);
      toast('Success');
      redirect('/orders');
    });
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-app-secondary">Confirm order</Button>
      </SheetTrigger>
      <SheetContent className="bg-bg-light">
        <SheetHeader>
          <SheetTitle>Confirm order</SheetTitle>
          <SheetDescription>
            Confirm your order and add a comment to the order if desired. Click confirm when you&#39;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-3">
            <Label htmlFor="name" className="text-right">
              Notes:
            </Label>
            <Input
              id="notes"
              placeholder="Add a comment to the order"
              className="col-span-3"
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={clickHandler}>Confirm order</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
