"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      disabled={props.disabled || pending}
      variant="create"
      className="w-[120px]"
    >
      {props.disabled ||
        (pending && (
          <span className="flex items-center">
            <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </span>
        ))}
      {!props.disabled && "Save"}
    </Button>
  );
};

export default SubmitButton;
