import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, CheckCircle2, Calendar, UserCheck, Briefcase, GraduationCap, MapPin, Clock, HelpCircle, MessageCircle, Lock } from "lucide-react";
import heroImage from "@assets/generated_images/mentorship_moment_in_office.png";
import studentPortrait from "@assets/generated_images/friendly_female_student_portrait.png";
import employerPortrait from "@assets/generated_images/friendly_employer_portrait.png";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export default function InternJobs() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const scrollToForm = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      {/* Navigation - Consistent with Home */}
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <span className="text-2xl font-serif font-bold text-primary tracking-tight cursor-pointer">ATP Global.</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
            <Link href="/">
              <a className="hover:text-primary transition-colors">About Us</a>
            </Link>
            <Link href="/programs">
              <a className="hover:text-primary transition-colors">Programs</a>
            </Link>
            <a href="#" className="hover:text-primary transition-colors">For Employers</a>
            <a href="#" className="hover:text-primary transition-colors">Internships</a>
            <a href="#" className="hover:text-primary transition-colors">Insights</a>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={scrollToForm} className="rounded-full bg-primary text-white hover:bg-primary/90 px-6 shadow-lg shadow-primary/20">
              Book Session
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 bg-[linear-gradient(135deg,hsl(var(--secondary)),hsl(var(--background)))] flex flex-col justify-center p-8 lg:p-20 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="max-w-xl"
          >
            <h1 className="text-4xl lg:text-6xl font-serif text-primary mb-6 leading-tight">
              Land a 12-week Australian internship with local expert support.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Designed for international students and recent graduates in Engineering, IT, and Business seeking to launch their careers in Australia.
            </p>

            <Button
              onClick={scrollToForm}
              className="w-full sm:w-auto rounded-full bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg h-auto shadow-xl shadow-primary/20 mb-4"
            >
              Book My Free Internship Placement Session
            </Button>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <UserCheck className="w-4 h-4 text-primary" />
              <span>Join 10,000+ successful graduates</span>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent z-10 lg:w-32 w-full h-32 lg:h-full pointer-events-none" />
          <img
            src={heroImage}
            alt="Student mentorship"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Section 1 - How it works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">HereΓÇÖs how ATP helps you go from study to internship to job.</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-primary/10 -z-10" />

            {[
              { step: "1", title: "Book your session", desc: "15ΓÇô20 minute online call to discuss your goals." },
              { step: "2", title: "Assessment", desc: "Skill and competency assessment (DataCAP / mentoring)." },
              { step: "3", title: "Matching", desc: "We connect you with host companies in your field." },
              { step: "4", title: "Internship", desc: "12-week internship and pathway to job offers." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-secondary border-4 border-white shadow-lg flex items-center justify-center text-3xl font-serif font-bold text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button onClick={scrollToForm} variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg">
              Start with your free session
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2 - Why choose ATP */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">Why students choose Apex Talent Partners.</h2>
            <p className="text-gray-500">10,000+ students supported, 500+ internship opportunities in Australia each year.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <UserCheck />, title: "Personalised Pathway", desc: "One-to-one mentoring and a tailored career plan just for you." },
              { icon: <MapPin />, title: "Australian Insight", desc: "Local mentors and real interview prep for the Australian market." },
              { icon: <Briefcase />, title: "Internship Outcomes", desc: "Premium internships in key cities and industries across Australia." },
              { icon: <CheckCircle2 />, title: "Confidence & Mindset", desc: "Build the professional confidence to succeed in any interview." }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5 hover:border-primary/20 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-primary mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Social Proof */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-16">Real students. Real outcomes.</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { name: "Ted", role: "Data Analyst", quote: "I gained clarity and confidence. The mentorship helped me land a role straight after my internship." },
              { name: "Sarah", role: "Marketing Coordinator", quote: "ATP connected me with a startup where I could actually make an impact. I was hired full-time!" },
              { name: "Michael", role: "Civil Engineer", quote: "The local insight was invaluable. I learned what Australian employers are really looking for." }
            ].map((story, i) => (
              <motion.div
                key={i}
                className="bg-secondary/20 p-8 rounded-2xl relative"
              >
                <div className="text-4xl text-primary/20 font-serif absolute top-6 left-6">"</div>
                <p className="text-gray-700 italic mb-6 relative z-10 pt-4">{story.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {story.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-primary">{story.name}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{story.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center border-t border-gray-100 pt-12">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-6">Placing students in</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale">
              <span className="text-xl font-serif font-bold">Startups</span>
              <span className="text-xl font-serif font-bold">SMEs</span>
              <span className="text-xl font-serif font-bold">Corporates</span>
              <span className="text-xl font-serif font-bold">Government</span>
            </div>
            <div className="mt-12">
              <Button onClick={scrollToForm} className="rounded-full bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg shadow-lg shadow-primary/20">
                Book my internship placement session now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Snapshot / FAQs */}
      <section className="py-24 bg-secondary text-primary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-8">Program snapshot</h3>
              <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
                {[
                  "12-week internship (approx. 3 days/week)",
                  "Workplace and communication skills",
                  "Interview and CV coaching",
                  "Industry mentoring and references"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold mb-8">Quick answers students ask</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 font-bold mb-2">
                    <Clock className="w-5 h-5" /> Duration / hours
                  </div>
                  <p className="text-gray-600 ml-7">12 weeks (approx. 252 hours total), designed to fit around your studies.</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 font-bold mb-2">
                    <Calendar className="w-5 h-5" /> When can I start?
                  </div>
                  <p className="text-gray-600 ml-7">Year-round intakes. We start whenever you are ready, subject to availability.</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 font-bold mb-2">
                    <GraduationCap className="w-5 h-5" /> Eligibility
                  </div>
                  <p className="text-gray-600 ml-7">Available to international students and graduates with relevant study background and English proficiency.</p>
                </div>
                <div className="pt-4">
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }} className="text-primary font-medium hover:underline flex items-center gap-1 ml-7">
                    Still unsure? Ask us in your free session <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Conversion Block */}
      <section id="booking-form" className="py-24 bg-primary text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif mb-6">Book your free internship placement session.</h2>
            <p className="text-white/80 text-lg">
              No commitment. WeΓÇÖll understand your goals, review your CV, and suggest the best internship options for you.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone (Optional)</label>
                  <input type="tel" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900" placeholder="+61 ..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Degree / Major</label>
                  <input type="text" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900" placeholder="e.g. Master of IT" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Graduation Year</label>
                  <input type="text" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900" placeholder="e.g. 2025" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City in Australia</label>
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
                  <label className="text-sm font-medium text-gray-700">Preferred Internship Start Month</label>
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

              <div className="text-center flex items-center justify-center gap-2 text-gray-500 text-xs">
                <Lock className="w-3 h-3" />
                Your details are kept private and only used to contact you about internship options.
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
