"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

// Single entry point for the waitlist CTA. Wire the real feature in here.
const handleJoinWaitlist = () => {
  /* TODO: waitlist feature not implemented yet */
};

const variants = {
  primary:
    "h-12 px-6 text-base bg-[#FF4D52] text-[#121212] hover:bg-[#FF6A6E] active:bg-[#E8434A]",
  secondary:
    "h-10 px-4 text-sm border border-[#2E2E2E] bg-transparent text-[#F5F5F5] hover:bg-[#1E1E1E] hover:border-[#3A3A3A]",
};

type JoinWaitlistButtonProps = {
  variant?: keyof typeof variants;
  className?: string;
};

export function JoinWaitlistButton({ variant = "primary", className }: JoinWaitlistButtonProps) {
  return (
    <Link href={'auth/login'}>
      <button
        type="button"
        onClick={handleJoinWaitlist}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4D52]",
          variants[variant],
          className,
        )}
      >
        Join the waitlist
      </button>
    </Link>
  );
}
