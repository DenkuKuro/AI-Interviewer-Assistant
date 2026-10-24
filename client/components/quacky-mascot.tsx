import { cn } from "@/lib/utils";
import styles from "./quacky-mascot.module.css";

type QuackyMascotProps = {
  /** Rendered width in px; height keeps the 200:235 aspect ratio. */
  size?: number;
  /** "full" is the animated mascot; "icon" is the static, simplified mark. */
  variant?: "full" | "icon";
  className?: string;
};

export function QuackyMascot({ size = 168, variant = "full", className }: QuackyMascotProps) {
  const isFull = variant === "full";
  const footStrokeWidth = isFull ? 5 : 8;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={Math.round((size * 235) / 200)}
      viewBox="0 0 200 235"
      className={className}
      {...(isFull
        ? { role: "img", "aria-label": "Quacky, the interviewer mascot" }
        : { "aria-hidden": true, focusable: false })}
    >
      {isFull && <ellipse cx="100" cy="222" rx="52" ry="7" fill="#000" opacity="0.35" />}

      <path
        d="M80 194v22M80 216l-10 6M80 216l10 6"
        stroke="#F2A33A"
        strokeWidth={footStrokeWidth}
        strokeLinecap="round"
        fill="none"
        className={cn(isFull && styles.foot, isFull && styles.footLeft)}
      />
      <path
        d="M122 194v22M122 216l-10 6M122 216l10 6"
        stroke="#F2A33A"
        strokeWidth={footStrokeWidth}
        strokeLinecap="round"
        fill="none"
        className={cn(isFull && styles.foot, isFull && styles.footRight)}
      />

      <g className={cn(isFull && styles.upperBody)}>
        <g transform="scale(1,1.15)">
          <path
            d="M100 18C52 18 26 58 26 108v54q0 12 12 12h128q12 0 12-12v-52C178 58 148 18 100 18z"
            fill={isFull ? "#1B2350" : "#2B3780"}
          />
          <path d="M112 44c34 0 58 26 58 66v58H50c2-58 24-124 62-124z" fill="#F6F6F4" />
          {isFull && (
            <path
              d="M44 92c-2 14 0 30 6 42"
              stroke="#2E3A78"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              className={styles.wing}
            />
          )}
        </g>
        <g transform="translate(0,14)">
          <g className={cn(isFull && styles.eyes)}>
            <circle cx="94" cy="94" r="7" fill="#121212" />
            <circle cx="142" cy="94" r="7" fill="#121212" />
            {isFull && (
              <>
                <circle cx="96.5" cy="91.5" r="2.2" fill="#fff" />
                <circle cx="144.5" cy="91.5" r="2.2" fill="#fff" />
              </>
            )}
          </g>
          <path d="M100 112c10-6 40-8 64-2-18 10-48 14-64 8-4-2-4-4 0-6z" fill="#F28C28" />
          <path
            d="M104 116c18 2 38 0 56-6"
            stroke="#C96A12"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}
