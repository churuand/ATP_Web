import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  ShieldCheck,
  MapPin,
  Filter,
  Layers,
  ClipboardList,
  FileText,
  Building2,
  Star,
  Clock,
  Briefcase,
  PhoneCall
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { submitEmployerBrief } from "@/services/employerService";

const heroHighlights = ["Internships", "Part-time", "Graduate-ready", "International talent"];
const heroSupports = [
  "internships, part-time, graduate, junior roles",
  "fast shortlisting",
  "candidates already screened and prepared",
  "strong access to international student talent"
];

const heroStats = [
  { label: "Host companies", value: "100+", detail: "hiring partners across AU" },
  { label: "Shortlist speed", value: "< 5 days", detail: "average turnaround" },
  { label: "Screened candidates", value: "1,000+", detail: "profiles ready now" }
];

const whyBlocks = [
  {
    title: "Save time on sourcing",
    desc: "Share the role once. We surface pre-qualified candidates instead of you chasing resumes.",
    tag: "Speed"
  },
  {
    title: "Access pre-screened pools",
    desc: "Tap into a curated community of students, graduates, and junior professionals across functions.",
    tag: "Lower effort"
  },
  {
    title: "Reduce mismatch risk",
    desc: "Structured screening, readiness coaching, and hiring guidance mean fewer false starts.",
    tag: "Lower risk"
  },
  {
    title: "Hire flexibly",
    desc: "Internship, part-time, graduate, or junior headcount. Scale without agency retainers.",
    tag: "Better fit"
  },
  {
    title: "Partner-level support",
    desc: "A dedicated ATP consultant keeps the process moving and aligns to your priorities.",
    tag: "Support"
  }
];

const poolFilters = [
  {
    title: "By function",
    chips: ["Data", "IT", "Marketing", "Finance", "Business", "Operations"]
  },
  {
    title: "By city",
    chips: ["Melbourne", "Sydney", "Brisbane", "Perth", "Adelaide", "Remote"]
  },
  {
    title: "By study level",
    chips: ["Bachelor", "Masters", "Grad Cert", "PhD", "TAFE"]
  },
  {
    title: "By availability",
    chips: ["Internship", "Part-time", "Casual", "Graduate-ready"]
  },
  {
    title: "By language",
    chips: ["English ready", "Mandarin", "Hindi", "Vietnamese", "Malay", "Spanish"]
  },
  {
    title: "By work readiness",
    chips: ["Work rights confirmed", "Visa support", "Interview prepped", "Industry briefed"]
  }
];

const poolStats = [
  { label: "Candidate profiles", value: "1,000+" },
  { label: "Universities", value: "40+" },
  { label: "Fields represented", value: "6" },
  { label: "Visa categories", value: "5" }
];

const processSteps = [
  {
    title: "Submit role requirements",
    desc: "Quick JD intake captures scope, priorities, and operating mode.",
    icon: <ClipboardList className="w-6 h-6" />
  },
  {
    title: "ATP matches",
    desc: "Consultants shortlist from the candidate pool, applying your must-haves.",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    title: "Receive profiles",
    desc: "You review curated candidates with notes, availability, and readiness.",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Interview & onboard",
    desc: "We coordinate interviews, feedback loops, and onboarding support.",
    icon: <ShieldCheck className="w-6 h-6" />
  }
];

const submissionModes = [
  { id: "upload", label: "Upload JD", desc: "Attach an existing PDF or DOC." },
  { id: "paste", label: "Paste JD", desc: "Drop job description text directly." },
  { id: "describe", label: "Describe manually", desc: "No JD? Tell us what you need." }
];

const trustStats = [
  { label: "Host companies", value: "100+", icon: <Building2 className="w-6 h-6" /> },
  { label: "Internships completed", value: "1,000+", icon: <Briefcase className="w-6 h-6" /> },
  { label: "Shortlist time", value: "4 days", icon: <Clock className="w-6 h-6" /> },
  { label: "Retention", value: "90%", icon: <Star className="w-6 h-6" /> }
];

const testimonials = [
  {
    quote: "ATP felt like an extension of our team. Three shortlisted profiles, two hires, zero back-and-forth.",
    name: "People Lead, Fintech Scaleup"
  },
  {
    quote: "They delivered ready candidates for our internship pipeline in under a week.",
    name: "Head of Operations, SaaS"
  }
];

const screeningChecklist = [
  "Motivation and goals interview",
  "Role-interest and function alignment",
  "CV and portfolio review",
  "Interview coaching and case prep",
  "Workplace readiness training",
  "Communication level validation"
];

const faqItems = [
  {
    question: "What types of roles can ATP support?",
    answer: "Internships, part-time, graduate, and junior roles across Data, IT, Marketing, Finance, Business, and Operations."
  },
  {
    question: "Are candidates ready to work in Australia?",
    answer: "Yes. We confirm work rights, location, and availability before shortlisting and highlight any visa considerations."
  },
  {
    question: "Can we convert interns to full-time?",
    answer: "Most companies do. We flag conversion interest early and coordinate transitions when you're ready."
  },
  {
    question: "How fast can ATP send profiles?",
    answer: "Typical turnaround is within four business days once the JD snapshot is submitted. Urgent briefs can be prioritized."
  },
  {
    question: "What if we need a niche profile?",
    answer: "We leverage the broader ATP community and targeted sourcing while still managing screening and readiness."
  }
];

export default function EmployerMatching() {
  const [activeFilter, setActiveFilter] = useState(poolFilters[0].title);
  const [submissionMode, setSubmissionMode] = useState(submissionModes[0].id);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const activeFilterChips = useMemo(() => {
    return poolFilters.find((filter) => filter.title === activeFilter)?.chips ?? [];
  }, [activeFilter]);

  const scrollToForm = () => {
    const form = document.getElementById("jd-form");
    form?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const sanitize = (value: FormDataEntryValue | null) => value?.toString().trim() ?? "";

    const payload = {
      companyName: sanitize(formData.get("companyName")),
      contactName: sanitize(formData.get("contactName")),
      email: sanitize(formData.get("email")),
      roleTitle: sanitize(formData.get("roleTitle")),
      hiringType: sanitize(formData.get("hiringType")) || "Internship",
      functionArea: sanitize(formData.get("functionArea")) || "Data",
      location: sanitize(formData.get("location")),
      startDate: sanitize(formData.get("startDate")) || undefined,
      numberOfHires: (() => {
        const raw = sanitize(formData.get("numberOfHires"));
        const parsed = Number(raw);
        return Number.isNaN(parsed) || parsed <= 0 ? undefined : parsed;
      })(),
      jdNotes: sanitize(formData.get("jdNotes")) || undefined,
      idealCandidate: sanitize(formData.get("idealCandidate")) || undefined,
      submissionMode,
      mustHaveSkills: sanitize(formData.get("mustHaveSkills")) || undefined,
      preferredUniversity: sanitize(formData.get("preferredUniversity")) || undefined,
      workRights: sanitize(formData.get("workRights")) || undefined,
      compensationType: sanitize(formData.get("compensationType")) || undefined,
      budgetRange: sanitize(formData.get("budgetRange")) || undefined,
      weeklyHours: sanitize(formData.get("weeklyHours")) || undefined,
      conversionPotential: sanitize(formData.get("conversionPotential")) || undefined
    };

    if (!payload.companyName || !payload.contactName || !payload.email || !payload.roleTitle) {
      setSubmitFeedback({ type: "error", message: "Please add company, contact, email, and role title." });
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitFeedback(null);
      await submitEmployerBrief(payload);
      setSubmitFeedback({ type: "success", message: "Thanks! Our team will send a shortlist update shortly." });
      event.currentTarget.reset();
      setShowAdvanced(false);
    } catch (error: any) {
      console.error(error);
      setSubmitFeedback({ type: "error", message: error?.message || "We couldn't submit the form. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <section className="relative bg-white pt-20 pb-16 lg:pt-24 lg:pb-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <motion.div
                className="lg:col-span-6 space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-widest text-primary">
                  {heroHighlights.map((item) => (
                    <span key={item} className="rounded-full bg-primary/10 px-3 py-1">
                      {item}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif text-primary leading-tight">
                  Tell us the role. We'll match you with pre-qualified candidates from our talent pool.
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  ATP acts as your matching partner. Share your JD once and receive vetted candidates who are screened, briefed, and ready to contribute.
                </p>
                <div className="space-y-3">
                  {heroSupports.map((point) => (
                    <div key={point} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="rounded-full px-8 py-6 text-base font-semibold" onClick={scrollToForm}>
                    Submit a role
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-primary/20 text-primary px-8 py-6 text-base font-semibold"
                    onClick={() => {
                      const contact = document.getElementById("final-cta");
                      contact?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Speak to our team
                  </Button>
                </div>
              </motion.div>
              <motion.div
                className="lg:col-span-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="rounded-[2.5rem] bg-secondary/40 border border-secondary/60 p-8 space-y-8">
                  <div className="flex items-center gap-3 text-sm font-semibold text-gray-600 uppercase tracking-widest">
                    <Filter className="w-5 h-5 text-primary" /> Matching snapshot
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {heroStats.map((stat) => (
                      <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm text-center">
                        <p className="text-2xl font-serif text-primary">{stat.value}</p>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500 mt-2">{stat.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" /> Dedicated consultant
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" /> Melbourne · Sydney · Brisbane
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" /> Screened, interview-ready candidates
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Why companies use ATP</p>
              <h2 className="text-4xl font-serif text-primary mt-4">We solve hiring pain, not just forms.</h2>
              <p className="text-gray-600 mt-4">
                Employers come to ATP for speed, lower effort, lower risk, and better-fit talent. We wrap the experience in consultancy-level support.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6 text-[11px] font-bold uppercase tracking-widest">
                {["Speed", "Lower effort", "Lower risk", "Better fit"].map((driver) => (
                  <span key={driver} className="px-4 py-1 rounded-full border border-primary/20 text-primary">
                    {driver}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyBlocks.map((block) => (
                <Card key={block.title} className="p-6 rounded-3xl border-primary/5 bg-white shadow-sm h-full flex flex-col">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">{block.tag}</div>
                  <h3 className="text-xl font-serif text-primary mb-3">{block.title}</h3>
                  <p className="text-sm text-gray-600 flex-1">{block.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-1 space-y-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Candidate pool proof</p>
                <h2 className="text-4xl font-serif text-primary leading-tight">Make the talent pool feel real.</h2>
                <p className="text-gray-600">
                  Browse by function, city, study level, availability, language, or readiness. Every profile includes visa category, location, and English preparedness.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {poolStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-gray-100 p-5 text-center">
                      <p className="text-3xl font-serif text-primary">{stat.value}</p>
                      <p className="text-[11px] uppercase tracking-widest text-gray-500 mt-2">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-secondary/30 rounded-[2.5rem] p-6 lg:p-10 border border-secondary/50">
                  <div className="flex flex-wrap gap-3 mb-6">
                    {poolFilters.map((filter) => {
                      const isActive = filter.title === activeFilter;
                      return (
                        <button
                          type="button"
                          key={filter.title}
                          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest border ${isActive ? "bg-primary text-white border-primary" : "border-gray-200 text-gray-600"}`}
                          onClick={() => setActiveFilter(filter.title)}
                        >
                          {filter.title}
                        </button>
                      );
                    })}
                  </div>
                  <div className="bg-white rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 text-sm font-semibold text-gray-600 uppercase tracking-[0.3em] mb-6">
                      <Layers className="w-5 h-5 text-primary" /> {activeFilter}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {activeFilterChips.map((chip) => (
                        <span key={chip} className="px-4 py-2 rounded-full bg-secondary/40 text-sm font-medium text-primary">
                          {chip}
                        </span>
                      ))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 mt-8">
                      <div className="rounded-2xl border border-gray-100 p-5">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Locations</p>
                        <p className="text-lg text-gray-800 mt-2">Melbourne · Sydney · Brisbane · Remote</p>
                      </div>
                      <div className="rounded-2xl border border-gray-100 p-5">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Readiness</p>
                        <p className="text-lg text-gray-800 mt-2">English-ready · Interview prepared · Visa confirmed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">How matching works</p>
              <h2 className="text-4xl font-serif text-primary">Clean, transparent process.</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={step.title} className="bg-white rounded-3xl p-6 text-center border border-gray-100 shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-serif text-lg mb-4">
                    0{index + 1}
                  </div>
                  <div className="text-primary mb-3">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="jd-form" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">JD submission</p>
                <h2 className="text-4xl font-serif text-primary leading-tight">Drop your JD. We'll handle the shortlist.</h2>
                <p className="text-gray-600">
                  Step 1 captures the essentials so we can start matching quickly. Step 2 collects optional qualifiers when you want to go deeper.
                </p>
                <div className="rounded-[2.5rem] border border-primary/10 bg-secondary/30 p-6 space-y-4">
                  <div className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Submission modes</div>
                  <div className="grid gap-3">
                    {submissionModes.map((mode) => {
                      const isActive = submissionMode === mode.id;
                      return (
                        <button
                          type="button"
                          key={mode.id}
                          className={`w-full text-left rounded-2xl border px-5 py-4 transition ${isActive ? "border-primary bg-white shadow" : "border-transparent bg-white/50"}`}
                          onClick={() => setSubmissionMode(mode.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-primary">{mode.label}</p>
                              <p className="text-xs text-gray-600 mt-1">{mode.desc}</p>
                            </div>
                            {isActive && <CheckCircle2 className="w-5 h-5 text-primary" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="bg-secondary/20 rounded-[2.5rem] p-8 lg:p-10 border border-secondary/40">
                <form className="space-y-8" onSubmit={handleFormSubmit}>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">Step 1 · Quick capture</p>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Company name</label>
                        <input name="companyName" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm" placeholder="Acme Labs" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Contact name</label>
                        <input name="contactName" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm" placeholder="Jane Smith" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Email</label>
                        <input name="email" type="email" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm" placeholder="jane@company.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Role title</label>
                        <input name="roleTitle" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm" placeholder="Data Analyst Intern" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Hiring type</label>
                        <select name="hiringType" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm">
                          <option>Internship</option>
                          <option>Part-time</option>
                          <option>Full-time</option>
                          <option>Graduate</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Function</label>
                        <select name="functionArea" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm">
                          <option>Data</option>
                          <option>IT</option>
                          <option>Marketing</option>
                          <option>Finance</option>
                          <option>Business</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Location</label>
                        <input name="location" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm" placeholder="Sydney" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Start date</label>
                        <input name="startDate" type="date" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Number of hires</label>
                        <input name="numberOfHires" type="number" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm" placeholder="1" min={1} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">JD upload or paste</label>
                        <textarea name="jdNotes" className="w-full rounded-2xl border border-gray-200 bg-white p-3 text-sm min-h-[120px]" placeholder="Paste JD or note upload preference" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Ideal candidate / priorities</label>
                        <textarea name="idealCandidate" className="w-full rounded-2xl border border-gray-200 bg-white p-3 text-sm" placeholder="Top must-haves, interview availability, etc." />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3"
                      onClick={() => setShowAdvanced((prev) => !prev)}
                    >
                      <span className="text-sm font-semibold text-gray-700">{showAdvanced ? "Hide" : "Add"} optional qualification questions</span>
                      <ArrowRight className={`w-4 h-4 transition ${showAdvanced ? "rotate-90" : ""}`} />
                    </button>
                    {showAdvanced && (
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Must-have skills</label>
                          <input name="mustHaveSkills" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm" placeholder="SQL, Tableau" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Preferred university / degree</label>
                          <input name="preferredUniversity" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm" placeholder="Monash, RMIT" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Work rights requirement</label>
                          <select name="workRights" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm">
                            <option>Full work rights</option>
                            <option>Internship visa acceptable</option>
                            <option>Open to sponsorship</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Paid or unpaid</label>
                          <select name="compensationType" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm">
                            <option>Paid</option>
                            <option>Unpaid</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Budget range</label>
                          <input name="budgetRange" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm" placeholder="$30-$35/hr" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Weekly days / hours</label>
                          <input name="weeklyHours" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm" placeholder="3 days · 24 hrs" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">Conversion potential</label>
                          <select name="conversionPotential" className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm">
                            <option>Possible</option>
                            <option>Planned</option>
                            <option>Not available</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full py-5 text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting" : "Submit requirements"} <ArrowRight className="w-4 h-4" />
                  </Button>
                  <p className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" /> We only use your details to coordinate matching.
                  </p>
                  {submitFeedback && (
                    <p
                      className={`text-sm text-center ${submitFeedback.type === "success" ? "text-green-600" : "text-red-600"}`}
                      aria-live="polite"
                    >
                      {submitFeedback.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Proof & trust</p>
                <h2 className="text-4xl font-serif text-primary">Numbers, logos, testimonials.</h2>
                <div className="grid grid-cols-2 gap-4">
                  {trustStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-white p-6 border border-gray-100">
                      <div className="text-primary mb-3">{stat.icon}</div>
                      <p className="text-3xl font-serif text-primary">{stat.value}</p>
                      <p className="text-[11px] uppercase tracking-widest text-gray-500 mt-2">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-6 text-gray-500 uppercase text-xs">
                  {["Summit Labs", "Arcadia", "Blueleaf", "GRCG"].map((logo) => (
                    <span key={logo} className="tracking-[0.3em] text-primary/70">{logo}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.name} className="p-8 rounded-3xl bg-white shadow-sm border border-gray-100">
                    <QuoteBlock quote={testimonial.quote} author={testimonial.name} />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-5">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Candidate quality</p>
                <h2 className="text-4xl font-serif text-primary">Screened and ready.</h2>
                <p className="text-gray-600">
                  We go beyond job boards with a hands-on vetting model, so every shortlisted profile feels risk-free.
                </p>
                <div className="space-y-3">
                  {screeningChecklist.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-secondary/20 rounded-[2.5rem] p-8 border border-secondary/40">
                <div className="rounded-[2rem] bg-white p-8 shadow-sm">
                  <div className="flex items-center gap-3 text-sm font-semibold text-gray-600 uppercase tracking-[0.3em]">
                    <FileText className="w-5 h-5 text-primary" /> Screening snapshot
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    {["Motivation interview", "Role-fit filter", "English readiness", "Workplace training"].map((item) => (
                      <div key={item} className="rounded-xl border border-gray-100 p-4 text-sm text-gray-700">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">FAQ</p>
              <h2 className="text-4xl font-serif text-primary">Answer employer objections upfront.</h2>
            </div>
            <Accordion type="single" collapsible className="max-w-4xl mx-auto bg-white rounded-[2rem] border border-gray-100 shadow-sm">
              {faqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index}`}>
                  <AccordionTrigger className="text-base font-semibold text-gray-800 px-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 px-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="final-cta" className="py-24 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-serif leading-tight">
                  Drop your JD and let ATP shortlist candidates for you.
                </h2>
                <p className="text-white/80 text-lg">
                  We already have supply, understand hiring pain, reduce risk, and make submission easy. That's the job of this page—and your next hire.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-primary rounded-full px-8 py-6 text-base font-semibold" onClick={scrollToForm}>
                    Submit a role
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-white/40 text-white px-8 py-6 text-base font-semibold"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.open("tel:+6112345678", "_self");
                      }
                    }}
                  >
                    Book a call
                  </Button>
                </div>
              </div>
              <div className="bg-white/10 rounded-[2.5rem] p-8 border border-white/20 space-y-6">
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em]">
                  <PhoneCall className="w-5 h-5" /> Talk to ATP
                </div>
                <p className="text-white/80">Prefer to chat before submitting the JD? Schedule a quick discovery session and we'll guide you through the matching process.</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p>• Shortlisting typically within 4 business days</p>
                  <p>• Candidates prepared with resume & interview coaching</p>
                  <p>• Dedicated consultant for every employer</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

type QuoteBlockProps = {
  quote: string;
  author: string;
};

function QuoteBlock({ quote, author }: QuoteBlockProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-700 leading-relaxed">"{quote}"</p>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">{author}</p>
    </div>
  );
}
