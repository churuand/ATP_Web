import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CARD_RADIUS } from "@/styles/designTokens";

interface InternshipSearchPodProps {
  className?: string;
}

export function InternshipSearchPod({ className }: InternshipSearchPodProps) {
  return (
    <div
      className={cn(
        CARD_RADIUS,
        "border border-[#9fd8e5]/60 p-6 shadow-xl",
        "bg-gradient-to-br from-[#d9f4ff] via-[#c8eff5] to-[#bff0ea]",
        "flex flex-col gap-4 text-sm text-[#014159]",
        className
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#0b5568]">
        Internship Search
      </p>
      <h3 className="text-xl font-semibold leading-snug text-[#014159]">
        Bước tiếp theo trên con đường sự nghiệp của bạn
      </h3>
      <p className="leading-relaxed text-[#0b5568]/90">
        Bộ lọc vị trí thực tập được cập nhật mỗi tuần, ưu tiên chuyên ngành và tình trạng visa của bạn.
      </p>

      <Button
        asChild
        className="mt-2 w-full rounded-full bg-[#0ca5b0] text-white hover:bg-[#08919b]"
      >
        <a href="/internship-program">Khám phá ngay</a>
      </Button>
    </div>
  );
}
