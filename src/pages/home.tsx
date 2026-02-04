import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Building2,
  GraduationCap,
  ArrowDown,
  Search,
  FileSearchIcon,
  Globe,
  Star,
  Quote,
  Briefcase,
  Check,
  TrendingUp,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";

// Mock Assets
import studentPortrait from "@assets/generated_images/friendly_female_student_portrait.png";
import employerPortrait from "@assets/generated_images/friendly_employer_portrait.png";
import groupImage from "@assets/generated_images/diverse_group_of_graduates.png";
import atpLogo from "@assets/image_1764912058849.png";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      <Navbar />
      {/* Hero Section - Clean White */}
      <section className="relative pt-12 pb-32 lg:pt-20 lg:pb-40 overflow-hidden bg-white rounded-b-[3rem] z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="lg:col-span-5 space-y-8"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-xs font-bold uppercase tracking-wide">
                <span className="w-3 h-3 rounded-full bg-success animate-pulse"></span>
                Now accepting applications
              </div>
              <h1 className="text-5xl lg:text-6xl/tight font-serif text-primary">
                Your career in Australia starts with the right opportunity.
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                We help international students turn their studies into
                real-world experience through guided internship placements with
                trusted employers.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <p className="text-sm text-gray-600">
                    Over 10,000 graduates placed in leading companies.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <p className="text-sm text-gray-600">
                    Personalized matching for Engineering, IT, Marketing, and
                    more.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              {/* <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href="/students-graduates">
                  <Button className="rounded-full bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                    Apply now!
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="rounded-full border-primary/20 text-primary hover:bg-primary/5 px-8 py-6 text-lg font-medium hover:-translate-y-0.5 transition-all"
                  onClick={() => {
                    const nextSection =
                      document.getElementById("welcome-section");
                    nextSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Learn more
                </Button>
              </div>
            </motion.div> */}
              {/* CTA Buttons */}
              <div className="pt-6 space-y-4">

                {/* Top row */}
                <div className="flex flex-col sm:flex-row gap-4 justify-left">
                  <Link href="/apply-internship">
                    <Button className="rounded-full bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                      Apply now!
                    </Button>
                  </Link>

                  <Link href="internship-program">
                    <Button
                      variant="outline"
                      className="rounded-full border-primary/20 text-primary hover:bg-primary/5 px-8 py-6 text-lg font-medium hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                    >
                      Learn more
                    </Button>
                  </Link>
                </div>

                {/* Bottom button */}
                <div className="flex justify-left">
                  <Link href="/job-search">
                    <Button
                      variant="outline"
                      className="rounded-full border-primary/20 text-primary hover:bg-primary/5 px-10 py-5 text-base font-semibold hover:-translate-y-0.5 transition-all w-full sm:w-auto flex items-center gap-2"
                    >
                      Explore Internship Jobs
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

              </div>
            </motion.div>

            {/* Right Content - The Arches */}
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-6 relative mt-12 lg:mt-0">
              {/* Student Card */}
              <Link href="/students-graduates">
                <motion.div
                  className="bg-primary rounded-t-[10rem] rounded-b-[2rem] p-8 text-center text-white relative overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 h-full"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <div className="relative z-10 flex flex-col h-full items-center">
                    <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
                      Welcome!
                    </p>
                    <h3 className="text-2xl font-serif mb-8 pb-4 border-b border-white/20 w-full max-w-[200px]">
                      I'm a Student
                    </h3>

                    <Button
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white hover:text-primary rounded-full px-8 mb-12 group-hover:scale-105 transition-transform"
                    >
                      Get Started
                    </Button>

                    <div className="mt-auto w-full aspect-[3/4] relative rounded-t-full overflow-hidden border-4 border-white/10">
                      <img
                        src={studentPortrait}
                        alt="Student"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Employer Card */}
              <Link href="/programs">
                <motion.div
                  className="bg-secondary rounded-t-[10rem] rounded-b-[2rem] p-8 text-center text-primary relative overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 mt-12 md:mt-24 h-full"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <div className="relative z-10 flex flex-col h-full items-center">
                    <p className="text-primary/70 text-sm font-medium uppercase tracking-wider mb-2">
                      Welcome!
                    </p>
                    <h3 className="text-2xl font-serif mb-8 pb-4 border-b border-primary/20 w-full max-w-[200px]">
                      I'm an Employer
                    </h3>

                    <Button
                      variant="outline"
                      className="bg-transparent border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8 mb-12 group-hover:scale-105 transition-transform"
                    >
                      Get Started
                    </Button>

                    <div className="mt-auto w-full aspect-[3/4] relative rounded-t-full overflow-hidden border-4 border-primary/10">
                      <img
                        src={employerPortrait}
                        alt="Employer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Welcome / About Section - Warm Mist Background */}
      <section
        id="welcome-section"
        className="py-24 bg-secondary relative -mt-12 pt-32"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-primary mb-6">
              We help international students secure real internship experience
              in Australia - step by step.
            </h2>
            <ul className="space-y-3 text-lg font-medium text-gray-700">
              <li className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                We prepare you with Australian-standard resumes and interview
                coaching
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                We match you with host companies through our employer network
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                We support you before, during, and after your internship
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Block 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-[#1f2025] bg-[#caccde]">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Employer Network
              </h3>
              <div className="text-sm font-bold text-blue-600 mb-4 uppercase tracking-wide">
                Real companies, real experience
              </div>
              <p className="text-gray-600 leading-relaxed">
                We place students through our network of host companies across
                Australia — reducing ghosting and increasing real interview
                outcomes.
              </p>
            </div>

            {/* Block 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-[#1f2025] bg-[#caccde]">
                <FileSearchIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Preparation
              </h3>
              <div className="text-sm font-bold text-blue-600 mb-4 uppercase tracking-wide">
                Prepared for the Australian market
              </div>
              <p className="text-gray-600 leading-relaxed">
                Your resume, interview skills, and expectations are tailored to
                local industry standards before placement.
              </p>
            </div>

            {/* Block 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-[#1f2025] bg-[#caccde]">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Hidden Opportunities
              </h3>
              <div className="text-sm font-bold text-blue-600 mb-4 uppercase tracking-wide">
                Opportunities you can’t find online
              </div>
              <p className="text-gray-600 leading-relaxed">
                Many of our placements are with companies that don't list
                positions on public job boards.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Evidence and Metrics - Redesigned */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
                ATP Global
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 leading-tight">
                You’re in good company.
              </h2>
            </div>

            {/* Right Content */}
            <div className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Over the years, Apex Talent Partners has helped international
              students across Australia gain real industry experience through
              structured internship placements. Our results reflect a proven
              process — one that focuses on preparation, employer matching, and
              ongoing support.
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
              <div className="text-4xl font-serif font-bold text-primary mb-3 group-hover:scale-110 transition-transform">
                10,000+
              </div>
              <div className="text-sm font-bold text-gray-500">
                Internship placements completed
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
              <div className="text-4xl font-serif font-bold text-primary mb-3 group-hover:scale-110 transition-transform">
                &lt; 30 days
              </div>
              <div className="text-sm font-bold text-gray-500">
                Average time from start to placement
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
              <div className="text-4xl font-serif font-bold text-primary mb-3 group-hover:scale-110 transition-transform">
                90%+
              </div>
              <div className="text-sm font-bold text-gray-500">
                Placement success rate after preparation
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
              <div className="text-4xl font-serif font-bold text-primary mb-3 group-hover:scale-110 transition-transform">
                100+
              </div>
              <div className="text-sm font-bold text-gray-500">
                Active host companies across Australia
              </div>
            </div>
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
      {/* Partners Section - Clean White */}
      <section className="py-24 bg-[#ecf0ee]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-medium text-gray-500 mb-12 max-w-3xl mx-auto">
            Extraordinary network of host companies
          </p>

          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-100 grayscale-0">
            {/* Partner Logos - Using text placeholders for now, in production would be SVGs/Images */}
            <div className="text-2xl font-bold font-serif text-primary/80 flex items-center gap-2 hover:scale-105 transition-transform cursor-default">
              <Building2 className="w-8 h-8" /> Assistance Abroad
            </div>
            <div className="text-3xl font-bold font-sans text-blue-700 flex items-center gap-2 hover:scale-105 transition-transform cursor-default">
              grcg<sup className="text-xs">®</sup>
            </div>
            <div className="bg-[#d95d2e] text-white p-2 font-bold text-xl rounded-sm hover:scale-105 transition-transform cursor-default">
              abc
            </div>
            <div className="italic font-bold text-2xl text-blue-600 hover:scale-105 transition-transform cursor-default">
              GEM
            </div>
            <div className="border-2 border-primary/30 rounded-lg px-4 py-2 text-xl font-light tracking-wide hover:border-primary hover:scale-105 transition-transform cursor-default">
              applicaa
            </div>
          </div>
        </div>
      </section>
      {/* CTA / Contact Section - Deep Red Background for Maximum Contrast */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-serif leading-tight">
                You're qualified. <br />
                The jobs are there. <br />
                <span className="text-white/60 italic">
                  You just need to connect.
                </span>
              </h2>
              <p className="text-white/80 text-lg font-light">
                We observe the disconnect between graduates seeking employment
                and employers who desperately want and need good candidates. An
                internship is a key means of landing a job you want.
              </p>
              <div className="pt-4">
                <div className="flex -space-x-4">
                  <div className="w-12 h-12 rounded-full border-2 border-primary bg-gray-200 flex items-center justify-center text-xs text-primary font-bold">
                    JD
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-primary bg-gray-300 flex items-center justify-center text-xs text-primary font-bold">
                    AS
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-primary bg-gray-400 flex items-center justify-center text-xs text-primary font-bold">
                    MR
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-primary bg-white text-primary flex items-center justify-center text-xs font-bold">
                    +2k
                  </div>
                </div>
                <p className="text-sm text-white/60 mt-2">
                  Join thousands of others today.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* White Card on Dark Background */}
              <div className="bg-white rounded-[2rem] p-8 lg:p-12 text-primary shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-serif mb-8">
                    Book a Session to understand internships
                  </h3>

                  <form
                    className="space-y-6"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Phone (Optional)
                        </label>
                        <input
                          type="tel"
                          className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                          placeholder="+61 ..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Degree / Major
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                          placeholder="e.g. Master of IT"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Graduation Year
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                          placeholder="e.g. 2025"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          City in Australia
                        </label>
                        <select className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900">
                          <option>Select City</option>
                          <option>Sydney</option>
                          <option>Melbourne</option>
                          <option>Brisbane</option>
                          <option>Perth</option>
                          <option>Adelaide</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Preferred Internship Start Month
                        </label>
                        <select className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900">
                          <option>Select Month</option>
                          <option>Immediately</option>
                          <option>Next Month</option>
                          <option>In 3 Months</option>
                          <option>Next Year</option>
                        </select>
                      </div>
                    </div>

                    <Button className="w-full rounded-xl bg-primary text-white hover:bg-primary/90 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all">
                      Book My Session
                    </Button>

                    <div className="text-center flex items-center justify-center gap-2 text-gray-500 text-xs mt-4">
                      <ShieldCheck className="w-3 h-3" />
                      Your details are kept private and only used to contact you
                      about internship options.
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
