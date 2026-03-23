import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BreadcrumbTrail } from "@/components/blog/BreadcrumbTrail";
import { ArticleByline } from "@/components/blog/ArticleByline";
import {
  TableOfContents,
  TocHeading,
} from "@/components/blog/TableOfContents";
import { MobileContentsAccordion } from "@/components/blog/MobileContentsAccordion";
import { CalloutBox } from "@/components/blog/CalloutBox";
import { ArticleTable } from "@/components/blog/ArticleTable";
import { InternshipSearchPod } from "@/components/blog/InternshipSearchPod";
import { NewsletterSignupCard } from "@/components/blog/NewsletterSignupCard";
import { AuthorBioCard } from "@/components/blog/AuthorBioCard";
import { FaqItem, FaqSection } from "@/components/blog/FaqSection";
import { Button } from "@/components/ui/button";
import { CARD_RADIUS } from "@/styles/designTokens";
import heroImage from "@assets/generated_images/mentorship_moment_in_office.png";
import authorPortrait from "@assets/generated_images/pixel_art_avatar_of_asian_male_in_suit.png";

import type { ReactNode } from "react";

type ArticleBlock =
  | { type: "paragraph"; content: ReactNode }
  | { type: "heading"; level: "h3" | "h4"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "ordered"; items: string[] }
  | { type: "callout"; title: string; body: ReactNode }
  | {
    type: "table";
    caption: string;
    headers: string[];
    rows: string[][];
    source?: string;
  }
  | { type: "media"; mediaType: "image" | "video"; src: string; alt?: string }
  | { type: "quote"; text: string; attribution?: string }
  | {
    type: "cta";
    title: string;
    body: ReactNode;
    buttonLabel: string;
    buttonHref: string;
  };

type ArticleSection = {
  id: string;
  title: string;
  nextCta?: {
    label: string;
    href: string;
  };
  blocks: ArticleBlock[];
};

const breadcrumbItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Nguồn lực", href: "/resources" },
  { label: "Blog", href: "/blog" },
  {
    label: "Chiến lược thực tập & visa 2025",
  },
];

const articleHeader = {
  category: "Thực tập quốc tế",
  title: "Chiến lược xin thực tập và visa thực sự hiệu quả trong 2025",
  intro:
    "Từ chuẩn bị hồ sơ đến chứng minh năng lực với nhà tuyển dụng, bài viết này giúp bạn xây dựng lộ trình thực tập rõ ràng, tối ưu cho cả SEO và nhà tuyển dụng quốc tế.",
};

const hero = {
  src: heroImage,
  alt: "Sinh viên quốc tế trao đổi với mentor tại văn phòng của ATP",
};

const byline = {
  author: "Hoang Nguyen",
  anchorId: "article-author",
  updatedDate: "2025-02-01",
};

const articleSections: ArticleSection[] = [
  {
    id: "visa-basics",
    title: "Hiểu rõ yêu cầu visa trước khi nộp hồ sơ",
    nextCta: {
      label: "NEXT: Xem chương trình chuẩn bị visa & phỏng vấn của ATP",
      href: "/students-graduates",
    },
    blocks: [
      {
        type: "paragraph",
        content:
          "Visa thực tập 408, 485 hay 500 đều yêu cầu bằng chứng thực tập rõ ràng. Bạn cần xác định loại visa phù hợp với ngành, thời lượng thực tập và kế hoạch định cư của mình.",
      },
      {
        type: "bullets",
        items: [
          "Kiểm tra yêu cầu chứng minh tài chính tối thiểu",
          "Chuẩn hóa thư mời thực tập với thông tin vị trí, thời lượng, địa điểm",
          "Chuẩn bị bản dịch công chứng cho bảng điểm và thư giới thiệu",
        ],
      },
      {
        type: "callout",
        title: "Mẹo nhanh",
        body: "Luôn lưu lại email trao đổi với nhà tuyển dụng dưới dạng PDF. Đây là bằng chứng bổ sung hữu ích khi Lãnh sự quán yêu cầu.",
      },
      {
        type: "table",
        caption: "Yêu cầu trọng yếu giữa các loại visa thực tập phổ biến",
        headers: ["Visa", "Đối tượng", "Điểm khác biệt"],
        rows: [
          ["Subclass 500", "Sinh viên đang học", "Cần thư xác nhận từ trường và tổ chức thực tập"],
          ["Subclass 485", "Sinh viên mới tốt nghiệp", "Có thể đi làm full-time nhưng cần bằng chứng kỹ năng"],
          ["Subclass 408", "Chương trình trao đổi", "Tập trung vào giá trị văn hóa và đào tạo"],
        ],
        source: "Department of Home Affairs",
      },
      {
        type: "media",
        mediaType: "image",
        src: heroImage,
        alt: "Sinh viên quốc tế trao đổi với mentor",
      },
      {
        type: "quote",
        text: "This is a quote",
      },
      {
        type: "cta",
        title: "Chúng tôi mới có job data",
        body: "Dữ liệu mới giúp bạn biết chính xác doanh nghiệp nào đang tuyển thực tập sinh phù hợp. Gửi CV để được ưu tiên match với các vị trí vừa mở.",
        buttonLabel: "Nộp CV bây giờ",
        buttonHref: "/upload-cv",
      },
    ],
  },
  {
    id: "seo-readiness",
    title: "Tối ưu nội dung và trải nghiệm để bài viết lên top",
    nextCta: {
      label: "NEXT: Đặt lịch tư vấn SEO nội dung với ATP",
      href: "/contact-us",
    },
    blocks: [
      {
        type: "paragraph",
        content:
          "Bài viết chi tiết cần cấu trúc rõ ràng để Google hiểu mục đích và để người đọc hành động ngay. Sử dụng heading H2 để tạo TOC tự động, H3 cho các micro-topic và thêm CTA nội bộ ở cuối mỗi mục.",
      },
      {
        type: "heading",
        level: "h3",
        text: "Checklist SEO thân thiện với GEO",
      },
      {
        type: "ordered",
        items: [
          "Thêm schema Article, FAQ, Breadcrumb và Person",
          "Giữ đoạn mở đầu 2-4 câu với từ khóa chính",
          "Dùng anchor nội bộ dẫn người đọc tới dịch vụ liên quan",
          "Sử dụng bảng dữ liệu và callout box để tăng thời gian onsite",
        ],
      },
      {
        type: "callout",
        title: "Trải nghiệm người dùng",
        body: (
          <>
            Ưu tiên tốc độ tải trang, lazy-load hình và giữ chiều rộng đoạn văn khoảng 65-75 ký tự để dễ đọc trên mobile.
          </>
        ),
      },
    ],
  },
  {
    id: "conversion-framework",
    title: "Thiết kế trải nghiệm chuyển đổi đa điểm chạm",
    nextCta: {
      label: "NEXT: Khám phá chương trình Internship Accelerator của ATP",
      href: "/internship-program",
    },
    blocks: [
      {
        type: "paragraph",
        content:
          "Mỗi mục lớn nên kết thúc bằng một lời kêu gọi hành động phù hợp với nội dung vừa đọc. Ví dụ: sau phần về visa, dẫn tới chương trình tư vấn visa của ATP; sau phần SEO, dẫn tới dịch vụ nội dung.",
      },
      {
        type: "bullets",
        items: [
          "CTA chính ở đầu bài: Đăng ký tư vấn",
          "CTA phụ trong TOC: Internship Search Pod",
          "CTA cuối bài: Newsletter + Internship Pod",
        ],
      },
      {
        type: "callout",
        title: "ROI cần đo lường",
        body: "Sử dụng UTM riêng cho từng CTA để xem phần nội dung nào mang lại nhiều đăng ký nhất.",
      },
    ],
  },
];

const faqItems: FaqItem[] = [
  {
    question: "ATP có hỗ trợ chuẩn bị chứng từ visa không?",
    answer:
      "Có. Đội ngũ Student Success sẽ kiểm tra thư mời thực tập, hợp đồng và giúp bạn chuẩn bị checklist trước khi nộp visa.",
  },
  {
    question: "Bài viết nên dài bao nhiêu để tối ưu SEO?",
    answer:
      "Tối thiểu 1.500 từ với các mục H2 rõ ràng và FAQ cuối bài. Nội dung phải trả lời đầy đủ ý định tìm kiếm, không kéo dài vô nghĩa.",
  },
  {
    question: "TOC sticky có ảnh hưởng Core Web Vitals?",
    answer:
      "Không nếu bạn dùng Intersection Observer và tránh layout shift. Sidebar của ATP nhẹ và dùng CSS sticky nên ổn định.",
  },
  {
    question: "Có thể gắn liên kết nội bộ nào trong phần NEXT?",
    answer:
      "Bạn nên gắn tới chương trình Internship Program, Job Board hoặc form tư vấn tùy theo nội dung từng mục.",
  },
];

const tocHeadings: TocHeading[] = articleSections.map((section) => ({
  id: section.id,
  label: section.title,
}));

const canonicalPath = "/blog/internship-strategy-2025";

export default function BlogArticlePage() {
  const [activeHeadingId, setActiveHeadingId] = useState<string>(articleSections[0]?.id);
  const headingRefs = useRef<Record<string, HTMLElement | null>>({});

  const canonicalUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return `https://atp-global.com.au${canonicalPath}`;
    }
    const origin = window.location.origin;
    return `${origin}${canonicalPath}`;
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title = `${articleHeader.title} | ATP Global`;

    function upsertMeta(name: string, content: string) {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    }

    upsertMeta(
      "description",
      "Chiến lược thực tập và visa 2025 với TOC sticky, CTA đa điểm chạm và checklist SEO dành cho sinh viên quốc tế."
    );

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;
  }, [canonicalUrl]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 1],
      }
    );

    Object.values(headingRefs.current).forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const handleRegisterHeading = (id: string) => (node: HTMLElement | null) => {
    headingRefs.current[id] = node;
  };

  const handleNavigate = (id: string) => {
    if (typeof document === "undefined") return;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveHeadingId(id);
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articleHeader.title,
    image: hero.src,
    datePublished: "2025-01-15",
    dateModified: byline.updatedDate,
    author: {
      "@type": "Person",
      name: byline.author,
      url: canonicalUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "ATP Global",
      logo: {
        "@type": "ImageObject",
        url: "https://atp-global.com.au/images/logo.webp",
      },
    },
    mainEntityOfPage: canonicalUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${window?.location?.origin ?? "https://atp-global.com.au"}${item.href}` : canonicalUrl,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: byline.author,
    jobTitle: "Head of Student Experience",
    url: canonicalUrl,
  };

  const jsonLdPayloads = [articleSchema, breadcrumbSchema, faqSchema, personSchema];

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <Navbar />
      <main className="container mx-auto px-4 py-10 lg:py-16">
        <div className="space-y-8">
          <BreadcrumbTrail items={breadcrumbItems} />

          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {articleHeader.category}
            </span>
            <h1 className="text-4xl lg:text-5xl font-serif leading-tight text-foreground">
              {articleHeader.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {articleHeader.intro}
            </p>
          </div>

          <ArticleByline
            authorName={byline.author}
            authorAnchorId={byline.anchorId}
            updatedDate={byline.updatedDate}
            updatedText="Cập nhật vào ngày 1 tháng 2, 2025"
          />

          <div className="lg:grid lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)_minmax(220px,280px)] gap-10 items-start">
            <aside className="hidden lg:block h-full">
              <div className="sticky top-28 space-y-6">
                <TableOfContents headings={tocHeadings} activeId={activeHeadingId} onNavigate={handleNavigate} />
              </div>
            </aside>

            <section className="space-y-10">
              <div className="space-y-8">
                <div className="lg:hidden sticky top-24 z-30">
                  <MobileContentsAccordion
                    headings={tocHeadings}
                    onNavigate={handleNavigate}
                    activeId={activeHeadingId}
                  />
                </div>

                <article className="space-y-12 leading-relaxed">
                  {hero?.src && (
                    <figure className="w-full overflow-hidden rounded-3xl shadow-xl">
                      <img
                        src={hero.src}
                        alt={hero.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </figure>
                  )}
                  {articleSections.map((section, index) => (
                    <div key={section.id} className="space-y-6">
                      <h2
                        id={section.id}
                        ref={handleRegisterHeading(section.id)}
                        className={`text-3xl font-serif font-semibold text-foreground ${index === 0 ? "mt-4" : "mt-10"} mb-4`}
                      >
                        {section.title}
                      </h2>

                      <div className="space-y-5 text-base">
                        {section.blocks.map((block, index) => {
                          switch (block.type) {
                            case "paragraph":
                              return (
                                <p key={index} className="text-lg leading-relaxed text-gray-700">
                                  {block.content}
                                </p>
                              );
                            case "heading":
                              if (block.level === "h3") {
                                return (
                                  <h3 key={index} className="mt-8 text-2xl font-semibold text-foreground">
                                    {block.text}
                                  </h3>
                                );
                              }
                              return (
                                <h4 key={index} className="mt-6 text-xl font-semibold text-foreground">
                                  {block.text}
                                </h4>
                              );
                            case "bullets":
                              return (
                                <ul key={index} className="list-disc space-y-3 pl-6 text-base leading-relaxed text-gray-700">
                                  {block.items.map((item) => (
                                    <li key={item} className="text-gray-700">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              );
                            case "ordered":
                              return (
                                <ol key={index} className="list-decimal space-y-3 pl-6 text-base leading-relaxed text-gray-700">
                                  {block.items.map((item) => (
                                    <li key={item} className="text-gray-700">
                                      {item}
                                    </li>
                                  ))}
                                </ol>
                              );
                            case "callout":
                              return (
                                <CalloutBox key={index} title={block.title} body={block.body} />
                              );
                            case "table":
                              return (
                                <ArticleTable
                                  key={index}
                                  caption={block.caption}
                                  headers={block.headers}
                                  rows={block.rows}
                                  source={block.source}
                                />
                              );
                            case "media":
                              if (block.mediaType === "video") {
                                return (
                                  <div key={index} className="my-6 overflow-hidden rounded-xl shadow-lg">
                                    <video controls className="h-full w-full" poster={block.src}>
                                      <source src={block.src} />
                                      Trình duyệt của bạn không hỗ trợ video.
                                    </video>
                                  </div>
                                );
                              }
                              return (
                                <div key={index} className="my-6 overflow-hidden rounded-xl shadow-lg">
                                  <img src={block.src} alt={block.alt ?? "Embedded media"} className="h-full w-full object-cover" />
                                </div>
                              );
                            case "quote":
                              return (
                                <blockquote
                                  key={index}
                                  className={`my-6 ${CARD_RADIUS} border border-primary/30 p-6`}
                                >
                                  <div className="flex items-start gap-4">
                                    <span className="text-3xl font-serif text-primary">|</span>
                                    <div>
                                      <p className="text-lg font-medium italic text-gray-800 leading-relaxed">{block.text}</p>
                                      {block.attribution && (
                                        <span className="mt-2 block text-sm font-semibold text-gray-500">{block.attribution}</span>
                                      )}
                                    </div>
                                  </div>
                                </blockquote>
                              );
                            case "cta":
                              return (
                                <div
                                  key={index}
                                  className={`my-8 ${CARD_RADIUS} border border-primary/30 bg-primary/5 p-6 shadow-sm`}
                                >
                                  <div className="space-y-3">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary/70">
                                      {block.title}
                                    </p>
                                    <div className="text-lg font-semibold text-primary leading-relaxed">
                                      {block.body}
                                    </div>
                                  </div>
                                  <Button
                                    asChild
                                    className="mt-5 w-full rounded-full bg-primary text-white hover:bg-primary/90"
                                  >
                                    <a href={block.buttonHref}>{block.buttonLabel}</a>
                                  </Button>
                                </div>
                              );
                            default:
                              return null;
                          }
                        })}
                      </div>

                      {section.nextCta && (
                        <a
                          href={section.nextCta.href}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 underline decoration-2 underline-offset-4 transition hover:text-blue-700"
                        >
                          {section.nextCta.label}
                        </a>
                      )}
                    </div>
                  ))}
                </article>
              </div>

              <div className="flex flex-col gap-8">
                <FaqSection items={faqItems} />

                <AuthorBioCard
                  id={byline.anchorId}
                  name={byline.author}
                  role="Head of Student Experience"
                  bio="Hoang dẫn dắt đội ngũ tư vấn thực tập và chịu trách nhiệm xây dựng trải nghiệm nội dung chuẩn SEO để sinh viên quốc tế dễ dàng tìm đến ATP."
                  image={authorPortrait}
                  linkedin="https://www.linkedin.com/company/atp-global-au"
                  facebook="https://www.facebook.com/apextalentpartners"
                />

                <div className="flex flex-col gap-6 lg:hidden">
                  <InternshipSearchPod />
                  <NewsletterSignupCard source="blog_internship_strategy_mobile" />
                </div>
              </div>
            </section>

            <aside className="hidden lg:block h-full">
              <div className="sticky top-28 space-y-6">
                <InternshipSearchPod />
                <NewsletterSignupCard source="blog_internship_strategy_sidebar" />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      {jsonLdPayloads.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </div>
  );
}
