import Link from "next/link";
import { JoinWaitlistButton } from "@/components/join-waitlist-button";
import { QuackyMascot } from "@/components/quacky-mascot";

export function SiteHeader() {
  return (
    <header>
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 p-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4D52]"
        >
          <QuackyMascot size={30} variant="icon" />
          <span className="font-heading text-xl font-bold">Quacky</span>
        </Link>
        <JoinWaitlistButton variant="secondary" />
      </nav>
    </header>
  );
}
