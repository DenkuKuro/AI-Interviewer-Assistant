import type { Metadata } from "next";
import { JoinWaitlistButton } from "@/components/join-waitlist-button";
import { QuackyMascot } from "@/components/quacky-mascot";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const description =
  "Practice live-coding interviews by talking through real problems. Quacky asks follow-ups, nudges you when you're stuck, and tells you how you did.";

export const metadata: Metadata = {
  title: "Quacky — AI coding interview practice (coming soon)",
  description,
  openGraph: {
    title: "Quacky — AI coding interview practice (coming soon)",
    description,
    type: "website",
  },
};

const features = [
  {
    number: "01",
    title: "Real problems",
    description: "Classic interview questions by topic and difficulty.",
  },
  {
    number: "02",
    title: "Talk it through",
    description: "Explain your thinking out loud, like a real onsite.",
  },
  {
    number: "03",
    title: "Honest feedback",
    description: "A transcript and notes on where to improve.",
  },
];

function Hero() {
  return (
    <>
      <QuackyMascot size={168} className="mx-auto mb-7" />

      <p className="inline-flex items-center gap-2 rounded-full border border-[#2E2E2E] px-3 py-1 font-mono text-xs tracking-[0.08em] uppercase">
        <span aria-hidden="true" className="size-2 rounded-full bg-[#FF4D52]" />
        Coming soon
      </p>

      <h1 className="mt-6 font-heading text-[clamp(2.25rem,9vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.035em]">
        Meet <span className="text-[#FF4D52]">Quacky</span>, your AI coding interviewer.
      </h1>

      <p className="mx-auto mt-5 max-w-[520px] text-lg text-[#B0B0B0]">{description}</p>

      <div className="mt-9 flex flex-col items-center gap-3">
        <JoinWaitlistButton />
        <p className="text-[13px] text-[#8A8A8A]">Get early access when Quacky launches.</p>
      </div>
    </>
  );
}

function Features() {
  return (
    <ul className="mt-[72px] grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-6 text-left">
      {features.map((feature) => (
        <li key={feature.number}>
          <span className="font-mono text-sm text-[#FF4D52]">{feature.number}</span>
          <h2 className="mt-2 font-sans text-base font-semibold">{feature.title}</h2>
          <p className="mt-1 text-sm text-[#B0B0B0]">{feature.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#121212] text-[#F5F5F5]">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[680px] px-6 pt-14 pb-24 text-center">
        <Hero />
        <Features />
      </main>

      <SiteFooter />
    </div>
  );
}
