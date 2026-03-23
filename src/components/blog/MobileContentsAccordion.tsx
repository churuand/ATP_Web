import { useState } from "react";
import { TocHeading } from "./TableOfContents";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileContentsAccordionProps {
  headings: TocHeading[];
  onNavigate?: (id: string) => void;
  activeId?: string;
}

export function MobileContentsAccordion({
  headings,
  onNavigate,
  activeId,
}: MobileContentsAccordionProps) {
  if (!headings.length) return null;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className="rounded-3xl border border-border/60 bg-white/90 shadow-sm"
      aria-label="Table of contents"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-toc-panel"
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>Contents</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isOpen && (
        <div id="mobile-toc-panel" className="px-4 pb-4">
          <ul className="space-y-2 text-sm">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  className={cn(
                    "w-full text-left rounded-2xl px-3 py-2 transition-colors",
                    activeId === heading.id
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted/70"
                  )}
                  onClick={() => {
                    onNavigate?.(heading.id);
                    setIsOpen(false);
                  }}
                >
                  {heading.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
