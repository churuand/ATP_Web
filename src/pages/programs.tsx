import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Building2, 
  Users, 
  Handshake, 
  Search, 
  CheckCircle2,
  LineChart,
  Target
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Mock Assets
import employerHero from "@assets/generated_images/friendly_employer_portrait.png";

export default function Programs() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img 
          src={employerHero} 
          alt="Employers success" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="max-w-3xl"
          >
            <p className="text-sm font-bold tracking-widest uppercase mb-4 text-white/90">For Employers</p>
            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-6">
              Empower your team with world-class talent.
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Main Content Sections */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            
            {/* Recruitment Solutions */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] p-10 flex flex-col h-full shadow-2xl border border-primary/5 relative overflow-hidden group"
            >
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
              
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 text-primary">
                <Search className="w-8 h-8" />
              </div>
              
              <h3 className="text-4xl font-serif text-primary mb-6">Recruitment Solutions</h3>
              
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                Stop filtering through thousands of unqualified resumes. We deliver pre-assessed, high-potential graduates tailored to your specific industry requirements.
              </p>

              <div className="space-y-4 mb-12 flex-1">
                {[
                  "Pre-screened candidates based on DataCAP competency",
                  "Direct access to Engineering, IT, and Business graduates",
                  "Reduced time-to-hire through qualified matching",
                  "Support with Australian market recruitment standards"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              
              <Link href="/recruitment">
                <Button className="w-full rounded-full bg-primary text-white hover:bg-primary/90 py-6 text-lg font-bold shadow-lg group-hover:shadow-xl transition-all">
                  Hire Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Become a Partner */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-secondary rounded-[2rem] p-10 flex flex-col h-full shadow-2xl border border-primary/5 relative overflow-hidden group"
            >
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
              
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 text-primary">
                <Handshake className="w-8 h-8" />
              </div>
              
              <h3 className="text-4xl font-serif text-primary mb-6">Become Our Partner</h3>
              
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                Host an intern and shape the future of your industry. Our partnership programs allow you to mentor top talent while solving real business challenges.
              </p>

              <div className="space-y-4 mb-12 flex-1">
                {[
                  "Host structured 12-week internship placements",
                  "Build a sustainable talent pipeline for your company",
                  "Ongoing support from ATP student success managers",
                  "Collaborative data and business solutions projects"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              
              <Link href="/partner">
                <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white py-6 text-lg font-bold shadow-sm transition-all cursor-pointer">
                  Partner with us <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-12 italic">Connecting excellence with opportunity.</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto font-medium">
            <div className="space-y-2">
              <div className="text-4xl text-primary font-serif">100+</div>
              <div className="text-gray-500 uppercase tracking-widest text-xs">Active Host Companies</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl text-primary font-serif">1,000+</div>
              <div className="text-gray-500 uppercase tracking-widest text-xs">Graduates Placed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl text-primary font-serif">90%+</div>
              <div className="text-gray-500 uppercase tracking-widest text-xs">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
