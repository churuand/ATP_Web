import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CARD_RADIUS } from "@/styles/designTokens";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqSection({ items, className }: FaqSectionProps) {
  if (!items.length) return null;

  const accordionValues = items.map((_, index) => `faq-${index}`);

  return (
    <section
      className={cn(
        CARD_RADIUS,
        "border border-border/70 bg-white/95 p-6 shadow-md",
        className
      )}
    >
      <div className="mb-6 space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-primary/70">
          FAQ
        </p>
        <h2 className="text-3xl font-semibold text-foreground">
          Câu hỏi thường gặp
        </h2>
      </div>
      <Accordion
        type="multiple"
        defaultValue={accordionValues}
        className="divide-y divide-border/60"
      >
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger className="py-4 text-left text-lg font-semibold leading-relaxed text-foreground">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-gray-700 leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
