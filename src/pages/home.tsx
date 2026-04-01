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
  RefreshCw,
  MessageCircle,
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
              <h1 className="text-5xl lg:text-6xl/tight font-serif text-black leading-tight">
                Study Abroad.
                <br />
                Intern in your
                <br />
                <span className="text-primary font-semibold transition-all duration-500 ease-in-out hover:tracking-wide">
                  actual field
                </span>
                <br />
                ATP makes it happen
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                ATP places international students in field-relevant internships with a warm employer introduction,
                full preparation, and support throughout. Currently active in Australia, UK, and US.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <p className="text-sm text-gray-600">
                    Over 100 graduates placed per year.
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
                      Explore Jobs
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

                    <ul className="text-left text-sm lg:text-base text-white/90 space-y-2 mb-10">
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white"></span>
                        <span>Internship matched to your degree</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white"></span>
                        <span>CV prep, interview coaching + training</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white"></span>
                        <span>30-day interview guarantee in writing</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white"></span>
                        <span>Weekly support during your placement</span>
                      </li>
                    </ul>

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

                    <ul className="text-left text-sm lg:text-base text-primary/80 space-y-2 mb-10">
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                        <span>Pre-screened, field-matched candidates</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                        <span>Interns briefed before day one</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                        <span>ATP stays involved throughout</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                        <span>No upfront consulting fees</span>
                      </li>
                    </ul>

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
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-sm font-bold text-primary uppercase tracking-widest">
              Why the market is harder than ever
            </p>
            <h2 className="text-4xl lg:text-5xl font-serif text-primary">
              Fewer internships. More applicants. Cold applying doesn't cut through.
            </h2>
            <p className="text-lg font-medium text-gray-700">
              These numbers are from independent global research. This is the environment your classmates are navigating right now.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Block 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-[#1f2025] bg-[#caccde]">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">109+</h3>
              <div className="text-sm font-bold text-blue-600 mb-4 uppercase tracking-wide">
                Average applications per internship posting in 2024-25
              </div>
              <p className="text-gray-600 leading-relaxed">
                Up from 43 just two years ago. Handshake Internship Index 2025 - Global.
              </p>
            </div>

            {/* Block 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-[#1f2025] bg-[#caccde]">
                <FileSearchIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">-15%</h3>
              <div className="text-sm font-bold text-blue-600 mb-4 uppercase tracking-wide">
                Internship postings declined globally since 2023
              </div>
              <p className="text-gray-600 leading-relaxed">
                Applications surged while listings fell. Handshake Internship Index 2025 - Global.
              </p>
            </div>

            {/* Block 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5 hover:border-primary/20 hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-[#1f2025] bg-[#caccde]">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">273</h3>
              <div className="text-sm font-bold text-blue-600 mb-4 uppercase tracking-wide">
                Applications per tech internship posting
              </div>
              <p className="text-gray-600 leading-relaxed">
                Financial services average 192; professional services 187. Handshake Internship Index 2025 - Global.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gray-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-lg leading-relaxed max-w-3xl">
              "A warm introduction from a trusted contact gets your CV read by a human. A cold application gets filtered by an algorithm. ATP's network is the difference."
            </p>
            <Link href="/students-graduates">
              <Button className="rounded-full bg-primary text-white hover:bg-primary/90 whitespace-nowrap">
                How ATP places students
              </Button>
            </Link>
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
                ~100
              </div>
              <div className="text-sm font-bold text-gray-600">
                Students placed in year one
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Australia - 2024
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
              <div className="text-4xl font-serif font-bold text-primary mb-3 group-hover:scale-110 transition-transform">
                &gt;90%
              </div>
              <div className="text-sm font-bold text-gray-600">
                Placement success rate
              </div>
              <div className="text-xs text-gray-400 mt-1">
                2024 track record
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
              <div className="text-4xl font-serif font-bold text-primary mb-3 group-hover:scale-110 transition-transform">
                30
              </div>
              <div className="text-sm font-bold text-gray-600">
                Days to first interview -- guaranteed
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Written in every contract
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
              <div className="text-4xl font-serif font-bold text-primary mb-3 group-hover:scale-110 transition-transform">
                3
              </div>
              <div className="text-sm font-bold text-gray-600">
                Interview opportunities per placement
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Up to 3 sequential attempts
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Why ATP Exists */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-sm font-bold text-primary uppercase tracking-widest">
                Why ATP exists
              </p>
              <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 leading-tight">
                Built by someone who's been in <span className="text-primary">exactly your position.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our Founder studied Business at Monash and Hospitality at William Angliss in Melbourne. He landed a Sales intern role at Vodafone Australia and went on to top the team's sales rankings. In 2024 he founded ATP -- because he knew most students never got that same shot, and that even when they did, no one was there to help them succeed once inside.
              </p>
              <div className="flex items-center gap-4 bg-rose-50 rounded-2xl p-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  F
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Founder · Apex Talent Partners</p>
                  <p className="text-sm text-gray-600">Monash · William Angliss · Vodafone AU Top Sales · Est. 2024</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-[2rem] p-8 shadow-xl">
              <div className="relative w-full aspect-video rounded-2xl bg-black flex items-center justify-center mb-6">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1"></div>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">Hear why our Founder built ATP</p>
                <p className="text-sm text-white/70">Cựu sinh viên Monash · Top Sales Vodafone Úc</p>
                <div className="text-xs text-white/60 mt-2">1:30</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* What Makes ATP Different */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-sm font-bold text-primary uppercase tracking-widest">
              What makes ATP different
            </p>
            <h2 className="text-4xl lg:text-5xl font-serif text-gray-900">
              Not just a placement. A warm introduction, full preparation, and support the whole way.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Matched to your field",
                desc: "Only roles aligned to your degree. Business stays in business. Hospitality in hospitality.",
                icon: <FileSearchIcon className="w-6 h-6" />,
              },
              {
                title: "30-day guarantee",
                desc: "An interview in your field within 30 days, written into your contract. Refund if we don't deliver.",
                icon: <Star className="w-6 h-6" />,
              },
              {
                title: "Job Ready Training",
                desc: "Workplace culture, professional expectations, company-specific briefing before day one.",
                icon: <GraduationCap className="w-6 h-6" />,
              },
              {
                title: "Support during internship",
                desc: "Weekly check-ins and on-the-job task support. ATP doesn't disappear once you start.",
                icon: <RefreshCw className="w-6 h-6" />,
              },
              {
                title: "Pay by milestone",
                desc: "Instalments tied to what's been delivered. No large upfront cost. Nothing agreed until you're ready.",
                icon: <MessageCircle className="w-6 h-6" />,
              },
              {
                title: "Personalised, not automated",
                desc: "Every CV reviewed by a person. ATP recommends the right support level for your situation.",
                icon: <ShieldCheck className="w-6 h-6" />,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-3xl border border-primary/10 shadow-sm p-6 flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-sm font-bold text-primary uppercase tracking-widest">
              How it works
            </p>
            <h2 className="text-4xl lg:text-5xl font-serif text-gray-900">
              From CV submission to your first day and beyond.
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Submit CV",
                desc: "Upload your CV. No commitment at this stage.",
                meta: "3 minutes - Free",
              },
              {
                step: "2",
                title: "ATP reviews and consults",
                desc: "We review your profile and recommend the right support plan.",
                meta: "Within 48h",
              },
              {
                step: "3",
                title: "Prep and training",
                desc: "CV polish, Job Ready Training, interview coaching.",
                meta: "Before any employer",
              },
              {
                step: "4",
                title: "Placed and supported",
                desc: "Warm introduction, offer secured, ongoing support.",
                meta: "Guaranteed in 30 days",
              },
            ].map((item, index) => (
              <div key={item.step} className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                    {item.step}
                  </div>
                  {index !== 3 && (
                    <div className="flex-1 h-px bg-gray-200 hidden md:block" />
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest">{item.meta}</p>
                </div>
              </div>
            ))}
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
              href="/success-stories"
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

          <div className="mt-16 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Where we operate
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {[
                { code: "AU", name: "Australia", status: "Active · Est. 2024", badgeClass: "bg-primary/10 text-primary" },
                { code: "UK", name: "United Kingdom", status: "Active · Est. 2025", badgeClass: "bg-primary/10 text-primary" },
                { code: "US", name: "United States", status: "Active · Est. 2026", badgeClass: "bg-primary/10 text-primary" },
                { code: "CA", name: "Canada", status: "Coming soon", badgeClass: "bg-gray-100 text-gray-500" },
              ].map((item, index) => (
                <div
                  key={item.code}
                  className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full md:w-auto ${index !== 0 ? "md:border-l md:border-gray-200 md:pl-6" : ""
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-gray-900">{item.code}</span>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${item.badgeClass}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
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
