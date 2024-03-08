import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/Components/ui/alert-dialog";

import { ButtonProps } from "../ui/button";
import React from "react";

type Props = {
  open?: boolean;
  message?: string;
  children: React.ReactNode;
  description?: string;
  onConfirm?: () => void;
  buttonProps?: ButtonProps & React.RefAttributes<HTMLButtonElement>;
};

export default function PopConfirm({
  message = "Are you sure you want to delete this template?",
  children,
  description,
  open,
  onConfirm,
  buttonProps,
}: Props) {
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger {...buttonProps}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{message}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
