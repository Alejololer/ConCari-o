"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./Button";
import type { ComponentProps } from "react";

export function SubmitButton({ children, ...props }: Omit<ComponentProps<typeof Button>, "loading" | "disabled">) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending} {...props}>
      {children}
    </Button>
  );
}
