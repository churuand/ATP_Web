import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Check, Upload, Plus, Trash2, Linkedin, Facebook } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const stats = [
    {
        value: "~100",
        label: "Students placed in year one",
        helper: "Australia · 2024",
    },
    {
        value: ">90%",
        label: "Placement success rate",
        helper: "2024 track record",
    },
    {
        value: "30",
        label: "Days guaranteed to first interview",
        helper: "Written in every contract",
    },
    {
        value: "3",
        label: "Interview opportunities per placement",
        helper: "Up to 3 attempts",
    },
];

const plans = [
    {
        name: "Package 1 — Interview Placement",
        description:
            "Entry-level, outcome-focused support. Your CV is matched directly to a company’s job description for a fast interview pathway.",
        features: [
            "CV matched directly to a specific company’s job description",
            "1 guaranteed interview opportunity",
            "No coaching — for candidates confident in their readiness",
            "Fast-track placement without unnecessary steps",
            "Pay only when the interview is secured",
        ],
        badge: null,
    },
    {
        name: "Package 2 — Career Coaching Session",
        description:
            "Low-ticket, trust-building session designed to get clarity. Ideal if you need direction before committing to a placement pathway.",
        features: [
            "1-on-1 session with an experienced industry mentor",
            "Personalized feedback on CV, positioning, and career direction",
            "Practical advice on running your internship/job search",
            "Perfect for students unsure about their readiness",
            "One-time session — no long-term commitment",
        ],
        badge: null,
    },
    {
        name: "Package 3 — Placement + Full Support",
        description:
            "The flagship experience. Full placement support plus coaching, training, and ongoing accountability so you land — and perform.",
        features: [
            "Minimum 3 interview opportunities with partner companies",
            "5+ coaching sessions covering CV, interview, communication, mindset",
            "Online application strategy training with Viet",
            "Networking guidance to unlock hidden opportunities",
            "Company-specific briefing before each interview",
            "Ongoing support plus refund guarantee if no interviews secured",
        ],
        badge: "Most complete",
    },
];

const steps = [
    {
        title: "Submit your CV",
        description:
            "Fill in the short form and upload your CV. No commitment at this stage.",
        meta: "3 minutes · Free · No commitment",
    },
    {
        title: "ATP reviews and gets in touch",
        description:
            "Our team reviews your profile and contacts you within 48 hours to discuss your goals.",
        meta: "Within 48 business hours",
    },
    {
        title: "CV prep + training",
        description:
            "HR mentor session, Job Ready Training, interview coaching — before any employer sees you.",
        meta: "Before any employer introduction",
    },
    {
        title: "Matched, interviewed, offered — and supported",
        description:
            "Warm introduction to a matched employer, interview support, offer confirmed, plus weekly support.",
        meta: "Guaranteed within 30 days",
    },
];

const partnerLogos = [
    "https://atp-global.com.au/images/client-1.png",
    "https://atp-global.com.au/images/client-3.svg",
    "https://atp-global.com.au/images/client-7.svg",
    "https://atp-global.com.au/images/client-8.svg",
    "https://atp-global.com.au/images/client-9.png",
    "https://atp-global.com.au/images/client-10.png",
    "https://atp-global.com.au/images/client-11.jpg",
    "https://atp-global.com.au/images/client-12.png",
];

const INTERNSHIP_POSITIONS = [
    "Accounting & Finance",
    "Business / Commerce",
    "Engineering",
    "Information Technology",
    "Marketing & Communications",
    "Hospitality",
    "Data & Analytics",
    "Design / UX",
    "Human Resources",
    "Supply Chain",
    "Other",
];

const SOCIAL_PLATFORMS = ["LinkedIn", "Facebook", "Instagram", "Portfolio / Website", "WhatsApp", "Other"];

const HEAR_OPTIONS = [
    "Friend or alumni",
    "University partner",
    "Social media - LinkedIn",
    "Social media - Facebook",
    "Social media - TikTok",
    "Search engine",
    "Campus event",
    "Other",
];

const PREVIOUS_APPLICATION_OPTIONS = [
    "No — first time applying",
    "Yes — applied but no responses",
    "Yes — had interviews",
];

const CANDIDATE_NETWORK_LINK = "https://www.linkedin.com/groups/19203002/";
const CANDIDATE_NETWORK_FB_LINK = "https://www.facebook.com/share/g/18WuJgnEMF/";

type FormFields = {
    fullName: string;
    email: string;
    phone: string;
    startDate: string;
    prevApplications: string;
    howHeard: string;
    socialPlatform: string;
    socialLink: string;
    goal: string;
    expectations: string;
    experienceSummary: string;
};

type EducationEntry = {
    id: number;
    school: string;
    field: string;
    year: string;
};

const INITIAL_FORM_VALUES: FormFields = {
    fullName: "",
    email: "",
    phone: "",
    startDate: "",
    prevApplications: PREVIOUS_APPLICATION_OPTIONS[0],
    howHeard: "",
    socialPlatform: "",
    socialLink: "",
    goal: "",
    expectations: "",
    experienceSummary: "",
};

export default function InternshipProgram() {
    const [formValues, setFormValues] = useState<FormFields>(INITIAL_FORM_VALUES);
    const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
    const [otherPosition, setOtherPosition] = useState("");
    const [hasCV, setHasCV] = useState<"yes" | "no" | null>(null);
    const [cvFileName, setCvFileName] = useState<string>("");
    const [cvError, setCvError] = useState<string>("");
    const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
        { id: 1, school: "", field: "", year: "" },
    ]);
    const [locationValues, setLocationValues] = useState({
        country: "",
        state: "",
        city: "",
    });
    const [hasExperience, setHasExperience] = useState<"yes" | "no" | null>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    const togglePosition = (role: string) => {
        const alreadySelected = selectedPositions.includes(role);
        if (alreadySelected) {
            setSelectedPositions(selectedPositions.filter((item) => item !== role));
            return;
        }

        if (selectedPositions.length >= 3) {
            return;
        }

        setSelectedPositions([...selectedPositions, role]);
    };

    const handleEducationChange = (
        id: number,
        key: "school" | "field" | "year",
        value: string,
    ) => {
        setEducationEntries((prev) =>
            prev.map((entry) => (entry.id === id ? { ...entry, [key]: value } : entry)),
        );
    };

    const addEducationEntry = () => {
        setEducationEntries((prev) => [
            ...prev,
            { id: Date.now(), school: "", field: "", year: "" },
        ]);
    };

    const removeEducationEntry = (id: number) => {
        setEducationEntries((prev) => prev.filter((entry) => entry.id !== id));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setCvError("");

        if (!file) {
            setCvFileName("");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setCvError("File is larger than 5MB");
            setCvFileName("");
            return;
        }

        const isAccepted = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type);

        if (!isAccepted) {
            setCvError("Please upload a PDF or Word document");
            setCvFileName("");
            return;
        }

        setCvFileName(file.name);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowSuccessPopup(true);
    };

    const updateFormValue = (field: keyof FormFields, value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };


    return (
        <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <motion.div initial="initial" animate="animate" variants={fadeIn}>
                            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                                Customized Internship Placement
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-serif text-primary mb-8 leading-tight uppercase tracking-tight">
                                Unlock Your <br /> global Career
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-10">
                                Guided internship placements that unlock global work
                                experience for ambitious international students. We combine
                                strategic intake, personalised matching, and HR mentor coaching.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#submit-cv">
                                    <Button className="rounded-full bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
                                        Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </a>
                                <Link href="/job-search">
                                    <Button
                                        variant="outline"
                                        className="rounded-full border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg font-bold"
                                    >
                                        Explore Internship Jobs
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white aspect-[4/5] relative">
                                <img
                                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800"
                                    alt="Internship Program"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white border-y border-gray-100">
                <div className="container mx-auto px-4 py-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-3xl border border-gray-100 bg-gray-50 p-6 text-center"
                        >
                            <div className="text-4xl font-serif text-primary">{stat.value}</div>
                            <p className="mt-2 text-sm font-semibold text-gray-700">
                                {stat.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{stat.helper}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Plans */}
            <section className="bg-secondary/20 py-20">
                <div className="container mx-auto px-4 space-y-12">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
                            What ATP does for you
                        </p>
                        <h2 className="mt-4 text-3xl sm:text-4xl font-serif text-gray-900">
                            After reviewing your CV, ATP recommends a support plan tailored to your
                            situation.
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            No prices posted here — ATP reviews every CV personally before
                            recommending a plan. Pricing is discussed during your free consultation
                            before anything is agreed.
                        </p>
                    </div>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`rounded-3xl border bg-white p-8 shadow-sm ${plan.badge ? "border-primary" : "border-gray-100"}`}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-serif text-gray-900">{plan.name}</h3>
                                    {plan.badge && (
                                        <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                                            {plan.badge}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-4 text-gray-600">{plan.description}</p>
                                <ul className="mt-6 space-y-3">
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3 text-sm text-gray-700"
                                        >
                                            <Check className="h-5 w-5 text-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 space-y-12">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
                            How it works
                        </p>
                        <h2 className="text-4xl font-serif text-gray-900">
                            From CV submission to offer — and we stay with you throughout.
                        </h2>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, index) => (
                            <div key={step.title} className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-lg font-bold">
                                        {index + 1}
                                    </div>
                                    {index !== steps.length - 1 && (
                                        <div className="hidden flex-1 border-t border-dashed border-gray-300 lg:block" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-primary">
                                        {step.meta}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form section */}
            <section id="submit-cv" className="bg-secondary/10 py-20">
                <div className="container mx-auto px-4">
                    <div className="rounded-[2rem] bg-white p-8 shadow-sm lg:p-12">
                        <div className="space-y-2 text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
                                Submit your CV
                            </p>
                            <h2 className="text-4xl font-serif text-gray-900">
                                ATP reviews your profile and recommends the right plan.
                            </h2>
                            <p className="text-sm text-gray-500">
                                No commitment required. ATP responds within 48h. All information is
                                kept strictly confidential.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-12 space-y-10">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Full name *</label>
                                    <input
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                        placeholder="Nguyen Van A"
                                        value={formValues.fullName}
                                        onChange={(e) => updateFormValue("fullName", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email address *</label>
                                    <input
                                        type="email"
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                        placeholder="email@gmail.com"
                                        value={formValues.email}
                                        onChange={(e) => updateFormValue("email", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Phone / WhatsApp *</label>
                                    <input
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                        placeholder="+61 or international number"
                                        value={formValues.phone}
                                        onChange={(e) => updateFormValue("phone", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Available to start from *
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                        value={formValues.startDate}
                                        onChange={(e) => updateFormValue("startDate", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Previous applications *</label>
                                    <select
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                        value={formValues.prevApplications}
                                        onChange={(e) => updateFormValue("prevApplications", e.target.value)}
                                    >
                                        {PREVIOUS_APPLICATION_OPTIONS.map((option) => (
                                            <option key={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Social platform + link</label>
                                    <div className="flex flex-col gap-3 sm:flex-row">
                                        <select
                                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 sm:w-40"
                                            value={formValues.socialPlatform}
                                            onChange={(e) => updateFormValue("socialPlatform", e.target.value)}
                                        >
                                            <option value="">Select platform</option>
                                            {SOCIAL_PLATFORMS.map((platform) => (
                                                <option key={platform} value={platform}>
                                                    {platform}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                            placeholder="Link to profile"
                                            value={formValues.socialLink}
                                            onChange={(e) => updateFormValue("socialLink", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Desired positions *</label>
                                    <div className="flex flex-wrap gap-3">
                                        {INTERNSHIP_POSITIONS.map((role) => {
                                            const active = selectedPositions.includes(role);
                                            const disabled = !active && selectedPositions.length >= 3;

                                            return (
                                                <button
                                                    type="button"
                                                    key={role}
                                                    onClick={() => togglePosition(role)}
                                                    disabled={disabled}
                                                    className={`rounded-full border px-4 py-2 text-sm transition ${
                                                        active
                                                            ? "border-primary bg-primary text-white"
                                                            : "border-gray-200 text-gray-700 hover:border-primary/60"
                                                    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {active && <Check className="h-4 w-4" />}
                                                        {role}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <p className="text-xs text-gray-500">Select up to 3 roles that best match your goals.</p>
                                </div>
                                {selectedPositions.includes("Other") && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Tell us the role you have in mind</label>
                                        <input
                                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                            placeholder="e.g. Sustainability consulting"
                                            value={otherPosition}
                                            onChange={(e) => setOtherPosition(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-700">Do you already have a CV? *</label>
                                <div className="flex flex-wrap gap-3">
                                    {["yes", "no"].map((value) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => setHasCV(value as "yes" | "no")}
                                            className={`rounded-full border px-6 py-2 text-sm uppercase tracking-wide ${
                                                hasCV === value
                                                    ? "border-primary bg-primary text-white"
                                                    : "border-gray-200 text-gray-700 hover:border-primary/60"
                                            }`}
                                        >
                                            {value === "yes" ? "Yes" : "No"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {hasCV === "yes" && (
                                <div className="rounded-3xl border-2 border-dashed border-rose-200 bg-rose-50 p-6 text-sm text-gray-600">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-900">Upload your CV *</p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                PDF or Word · Max 5MB · Give us the latest version
                                            </p>
                                            {cvFileName && (
                                                <p className="mt-2 text-sm text-primary">{cvFileName}</p>
                                            )}
                                            {cvError && (
                                                <p className="mt-2 text-xs text-red-500">{cvError}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="file"
                                                id="cv-upload"
                                                className="hidden"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileChange}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="rounded-full border-primary text-primary"
                                                onClick={() => document.getElementById("cv-upload")?.click()}
                                            >
                                                <Upload className="mr-2 h-4 w-4" /> Browse files
                                            </Button>
                                            {cvFileName && (
                                                <button
                                                    type="button"
                                                    onClick={() => setCvFileName("")}
                                                    className="text-xs font-semibold text-gray-500 hover:text-gray-800"
                                                >
                                                    Clear
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {hasCV === "no" && (
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-base font-semibold text-gray-900">Tell us about your background</p>
                                            <p className="text-sm text-gray-500">
                                                Fill these fields if you don’t have a CV yet — we’ll capture the essentials manually.
                                            </p>
                                        </div>
                                        <div className="grid gap-6 md:grid-cols-3">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Country *</label>
                                                <input
                                                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                                    value={locationValues.country}
                                                    onChange={(e) =>
                                                        setLocationValues((prev) => ({
                                                            ...prev,
                                                            country: e.target.value,
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">State *</label>
                                                <input
                                                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                                    value={locationValues.state}
                                                    onChange={(e) =>
                                                        setLocationValues((prev) => ({
                                                            ...prev,
                                                            state: e.target.value,
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">City</label>
                                                <input
                                                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                                    value={locationValues.city}
                                                    onChange={(e) =>
                                                        setLocationValues((prev) => ({
                                                            ...prev,
                                                            city: e.target.value,
                                                        }))
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-base font-semibold text-gray-900">Education</p>
                                                <p className="text-sm text-gray-500">Add each degree or program you’re currently in.</p>
                                            </div>
                                            <Button type="button" variant="outline" onClick={addEducationEntry} className="rounded-full border-primary text-primary">
                                                <Plus className="mr-2 h-4 w-4" /> Add education
                                            </Button>
                                        </div>
                                        <div className="space-y-6">
                                            {educationEntries.map((entry) => (
                                                <div
                                                    key={entry.id}
                                                    className="grid gap-4 rounded-2xl border border-gray-100 p-4 md:grid-cols-12"
                                                >
                                                    <div className="md:col-span-5 space-y-2">
                                                        <label className="text-sm font-medium text-gray-700">University</label>
                                                        <input
                                                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                                            value={entry.school}
                                                            onChange={(e) => handleEducationChange(entry.id, "school", e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-5 space-y-2">
                                                        <label className="text-sm font-medium text-gray-700">Field / Major</label>
                                                        <input
                                                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                                            value={entry.field}
                                                            onChange={(e) => handleEducationChange(entry.id, "field", e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2 space-y-2">
                                                        <label className="text-sm font-medium text-gray-700">Start year</label>
                                                        <input
                                                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                                            value={entry.year}
                                                            onChange={(e) => handleEducationChange(entry.id, "year", e.target.value)}
                                                        />
                                                    </div>
                                                    {educationEntries.length > 1 && (
                                                        <div className="md:col-span-12 flex justify-end">
                                                            <button
                                                                type="button"
                                                                onClick={() => removeEducationEntry(entry.id)}
                                                                className="inline-flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-red-500"
                                                            >
                                                                <Trash2 className="h-4 w-4" /> Remove
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-medium text-gray-700">Do you have prior work experience?</label>
                                        <div className="flex flex-wrap gap-3">
                                            {["yes", "no"].map((value) => (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    onClick={() => setHasExperience(value as "yes" | "no")}
                                                    className={`rounded-full border px-6 py-2 text-sm uppercase tracking-wide ${
                                                        hasExperience === value
                                                            ? "border-primary bg-primary text-white"
                                                            : "border-gray-200 text-gray-700 hover:border-primary/60"
                                                    }`}
                                                >
                                                    {value === "yes" ? "Yes" : "No"}
                                                </button>
                                            ))}
                                        </div>
                                        {hasExperience === "yes" && (
                                            <textarea
                                                className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                                rows={4}
                                                placeholder="Share quick bullet points about what you’ve done"
                                                value={formValues.experienceSummary}
                                                onChange={(e) => updateFormValue("experienceSummary", e.target.value)}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">How did you hear about ATP?</label>
                                    <select
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                        value={formValues.howHeard}
                                        onChange={(e) => updateFormValue("howHeard", e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {HEAR_OPTIONS.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        What’s your goal for this internship?
                                    </label>
                                    <textarea
                                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                        rows={4}
                                        placeholder="E.g. I want analytics experience before graduation..."
                                        value={formValues.goal}
                                        onChange={(e) => updateFormValue("goal", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">What do you expect from ATP?</label>
                                <textarea
                                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3"
                                    rows={4}
                                    placeholder="Coaching, introductions, mentor support..."
                                    value={formValues.expectations}
                                    onChange={(e) => updateFormValue("expectations", e.target.value)}
                                />
                            </div>

                            <div className="rounded-3xl bg-rose-50 p-6 text-sm text-gray-700">
                                <p className="font-semibold text-gray-900">What happens after you submit:</p>
                                <ul className="mt-3 space-y-2 text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /> ATP reviews your CV or profile within 48h.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /> We contact you to discuss goals, readiness, and the right package.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /> You decide after seeing the plan — no commitment until you’re confident.
                                    </li>
                                </ul>
                            </div>

                            <Button className="w-full rounded-full bg-primary py-6 text-lg font-semibold" type="submit">
                                Submit CV
                            </Button>
                            <p className="text-center text-xs text-gray-500">
                                No commitment at this stage · ATP responds within 48h · All information kept strictly confidential
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-4">
                            Why students chose us:
                        </h2>
                        <p className="text-gray-500 text-lg">Real voices, real results</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                                    A
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">Amy</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                                        Finance
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm flex-1">
                                "As a Master's student at Monash University, I found the career
                                consultation session incredibly valuable. I received detailed
                                feedback on my resume, helping me refine key sections to make my
                                CV more concise and impactful. I also learned how to structure
                                an effective cover letter, giving me a clearer understanding of
                                how to present myself in job applications."
                            </p>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary/20"></div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">
                                    T
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">Ted</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                                        Data Analyst
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm flex-1">
                                "Two weeks ago, I received the email I had been waiting for a
                                job offer! Since then, I've been working through the onboarding
                                process, and next week, I'll officially begin this new chapter
                                in my career. This achievement wouldn't have been possible
                                without the support and reference from my mentor."
                            </p>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-lg">
                                    M
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">My Ngoc</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                                        Marketing
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm flex-1">
                                "As a student at Torrens University, I found the competency
                                assessment session truly essential. It helped me clearly
                                understand what skills I was lacking and where to start
                                improving. Eric, who conducted the assessment, was approachable,
                                friendly, and explained everything thoroughly with plenty of
                                examples."
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <a
                            href="https://atp-global.com.au/testimonials"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                className="rounded-full border-primary text-primary hover:bg-primary hover:text-white px-8 transition-colors"
                            >
                                See more success stories
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
            {/* Partner Logos */}
            <section className="py-24 bg-[#ecf0ee]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-serif text-primary uppercase mb-4">
                        Our Partners
                    </h2>
                    <div className="h-1 w-20 bg-primary mx-auto mb-6" />
                    <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
                        Trusted by leading companies across global.
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16 max-w-5xl mx-auto">
                        {partnerLogos.map((logo, i) => (
                            <div
                                key={i}
                                // className="w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                                className="w-32 h-20 flex items-center justify-center hover:scale-110 transition-all duration-300"
                            >
                                <img
                                    src={logo}
                                    alt={`Partner ${i + 1}`}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary text-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
                    <h2 className="text-4xl lg:text-6xl font-serif mb-6 uppercase tracking-tight">
                        Ready to Start?
                    </h2>
                    <div className="h-1 w-20 bg-white mx-auto mb-6" />
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 font-serif italic">
                        Apply now and receive a personalised consultation within 48 hours.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/apply-internship">
                            <Button className="rounded-full bg-white text-primary hover:bg-white/90 px-10 py-6 text-lg font-bold shadow-lg transition-all hover:-translate-y-1">
                                Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/contact-us">
                            <Button
                                variant="outline"
                                className="rounded-full border-white text-white hover:bg-white/10 px-10 py-6 text-lg font-bold"
                            >
                                Schedule a Chat
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />

            {showSuccessPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/40 to-amber-400/30 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-lg rounded-[2.5rem] border border-white/30 bg-white p-8 text-center shadow-[0_30px_80px_rgba(15,23,42,0.25)]"
                    >
                        <div className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.5em] text-primary">
                            <CheckCircle2 className="h-6 w-6" />
                            <span>Success</span>
                        </div>
                        <p className="mt-4 text-2xl font-serif text-slate-900">
                            Thanks for applying!
                        </p>
                        <p className="mt-3 text-base leading-relaxed text-slate-600">
                            We will reach out within 48 hours. Meanwhile, you can join our ATP Candidate Network for roles, referrals, and interview prep support.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                            <a
                                href={CANDIDATE_NETWORK_LINK}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-primary/10"
                            >
                                <Linkedin className="h-4 w-4" />
                                Join via LinkedIn
                            </a>
                            <a
                                href={CANDIDATE_NETWORK_FB_LINK}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-primary/10"
                            >
                                <Facebook className="h-4 w-4" />
                                Join via Facebook
                            </a>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowSuccessPopup(false)}
                            className="mt-4 text-sm font-semibold text-primary underline"
                        >
                            Close
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
