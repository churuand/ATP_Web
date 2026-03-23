import { cn } from "@/lib/utils";
import { CARD_RADIUS } from "@/styles/designTokens";
import type { ReactNode } from "react";

interface CalloutBoxProps {
  title: string;
  body: ReactNode;
}

const INFO_STYLE = "bg-secondary border-secondary-foreground/10 text-foreground";

export function CalloutBox({ title, body }: CalloutBoxProps) {
  return (
    <div
      className={cn(
        CARD_RADIUS,
        "border px-6 py-5 shadow-sm",
        INFO_STYLE
      )}
    >
      <p className="text-sm font-semibold uppercase tracking-wide mb-1">
        {title}
      </p>
      <div className="text-base leading-relaxed text-foreground/90">{body}</div>
    </div>
  );
}
