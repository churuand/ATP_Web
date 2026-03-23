import { Facebook, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { CARD_RADIUS } from "@/styles/designTokens";

interface AuthorBioCardProps {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  facebook?: string;
  className?: string;
}

export function AuthorBioCard({
  id,
  name,
  role,
  bio,
  image,
  linkedin,
  facebook,
  className,
}: AuthorBioCardProps) {
  const socialLinks = [
    linkedin && { href: linkedin, label: "LinkedIn", Icon: Linkedin },
    facebook && { href: facebook, label: "Facebook", Icon: Facebook },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof Linkedin }[];

  return (
    <section
      id={id}
      className={cn(
        CARD_RADIUS,
        "border border-border/70 bg-white/95 shadow-md p-6 flex flex-col gap-4",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-2xl object-cover shadow-md"
          loading="lazy"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground/70 mb-1">
            About the author
          </p>
          <h3 className="text-xl font-serif text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <p className="text-base text-muted-foreground leading-relaxed">{bio}</p>
      {socialLinks.length > 0 && (
        <div className="flex items-center gap-3 pt-2">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-primary transition hover:bg-primary/10"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
