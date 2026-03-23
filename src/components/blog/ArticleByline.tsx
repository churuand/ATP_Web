import { format } from "date-fns";

interface ArticleBylineProps {
  authorName: string;
  authorAnchorId: string;
  updatedDate: string;
  updatedText?: string;
}

export function ArticleByline({
  authorName,
  authorAnchorId,
  updatedDate,
  updatedText,
}: ArticleBylineProps) {
  const formattedDate = format(new Date(updatedDate), "MMMM d, yyyy");
  const displayText = updatedText ?? `Updated: ${formattedDate}`;
  const textClassName = `${updatedText ? "" : "uppercase "}tracking-wide text-xs text-muted-foreground/80`.trim();

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground border-b border-border/70 pb-4">
      <a
        href={`#${authorAnchorId}`}
        className="font-semibold text-foreground hover:text-primary transition-colors"
      >
        {authorName}
      </a>
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" aria-hidden />
      <span className={textClassName}>
        {displayText}
      </span>
    </div>
  );
}
