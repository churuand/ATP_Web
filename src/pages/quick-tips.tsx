import { useLocation } from "wouter";
import { useState } from "react";
import { clsx } from "clsx";
import { Home, ChevronRight, User } from "lucide-react";
import { motion } from "framer-motion";

// Mock Assets
import short1 from "@assets/generated_images/quick_career_tip_vertical.png";

// Mock data for quick tips
const mockQuickTips = [
  {
    id: 1,
    title: "How to Ace Your First Interview",
    description: "Learn the essential tips to make a great first impression in your first job interview. We'll cover body language, common questions, and how to showcase your strengths effectively. This comprehensive guide will prepare you for success in any interview situation.",
    category: "Career Preparation",
    thumbnail_url: short1,
    youtube_video_id: "dQw4w9WgXcQ",
    duration: "2:45",
    tags: ["Interview", "Career Prep", "First Job", "Communication"]
  },
  {
    id: 2,
    title: "Building a Growth Mindset for Success",
    description: "Discover how to develop a growth mindset that will help you overcome challenges and achieve your career goals. Learn practical strategies to embrace learning and resilience in your professional journey.",
    category: "Mindset and Culture",
    thumbnail_url: short1,
    youtube_video_id: "dQw4w9WgXcQ",
    duration: "3:12",
    tags: ["Mindset", "Personal Growth", "Resilience", "Success"]
  },
  {
    id: 3,
    title: "Crafting the Perfect Resume",
    description: "Master the art of resume writing with our expert tips. Learn how to highlight your achievements, use action verbs, and format your resume to stand out from the competition. Get insider secrets from hiring managers.",
    category: "Career Development",
    thumbnail_url: short1,
    youtube_video_id: "dQw4w9WgXcQ",
    duration: "4:20",
    tags: ["Resume", "Career Development", "Job Search", "Professional"]
  },
  {
    id: 4,
    title: "Networking Like a Pro",
    description: "Unlock the secrets to effective networking. Learn how to build meaningful professional relationships, leverage LinkedIn, and create opportunities for career advancement through strategic connections.",
    category: "Career Preparation",
    thumbnail_url: short1,
    youtube_video_id: "dQw4w9WgXcQ",
    duration: "3:45",
    tags: ["Networking", "LinkedIn", "Relationships", "Career Growth"]
  }
];

type Category = "All" | "Career Development" | "Career Preparation" | "Mindset and Culture";

export default function QuickTips() {
  const [location, setLocation] = useLocation();
  const [activeTipId, setActiveTipId] = useState(1);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [showFullDescription, setShowFullDescription] = useState(false);

  const activeTip = mockQuickTips.find(tip => tip.id === activeTipId) || mockQuickTips[0];

  // Filter tips based on active category
  const filteredTips = activeCategory === "All"
    ? mockQuickTips
    : mockQuickTips.filter(tip => tip.category === activeCategory);

  const categories: Category[] = ["All", "Career Development", "Career Preparation", "Mindset and Culture"];

  const handleTipClick = (tipId: number) => {
    setActiveTipId(tipId);
    setShowFullDescription(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Top Navigation Bar */}
      <nav className="h-16 bg-black border-b border-gray-800 px-8 flex items-center justify-between">
        {/* Left: Logo and Nav */}
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold text-primary">ATP</div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setLocation("/")}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Home
            </button>
            <button className="text-sm text-gray-300 hover:text-white transition-colors">
              Categories
            </button>
          </div>
        </div>

        {/* Right: Profile */}
        <button className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
          <User className="w-5 h-5" />
        </button>
      </nav>

      {/* Main Content: Two Column Layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Column: Video Player (70%) */}
        <div className="flex-[7] bg-black flex items-center justify-center p-8">
          <div className="w-full max-w-5xl">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-900 shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${activeTip.youtube_video_id}?autoplay=0`}
                title={activeTip.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar (30%) */}
        <div className="flex-[3] bg-[#1a1a1a] border-l border-gray-800 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Home className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
              <span>{activeTip.category}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white truncate">{activeTip.title}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-white leading-tight">
              {activeTip.title}
            </h1>

            {/* Description */}
            <div className="space-y-2">
              <p className={clsx(
                "text-gray-300 text-sm leading-relaxed",
                !showFullDescription && "line-clamp-3"
              )}>
                {activeTip.description}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-primary text-sm font-medium hover:underline"
              >
                {showFullDescription ? "Show less" : "More"}
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {activeTip.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-gray-700 text-gray-200 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="text-primary font-bold">{activeTip.duration}</span>
              <span>•</span>
              <span>Duration</span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700"></div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                Filter by Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={clsx(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                      activeCategory === category
                        ? "bg-primary text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tip Grid */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                All Tips
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {filteredTips.map((tip) => (
                  <motion.button
                    key={tip.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTipClick(tip.id)}
                    className={clsx(
                      "aspect-square rounded-lg font-bold text-sm transition-all",
                      activeTipId === tip.id
                        ? "bg-primary text-white shadow-lg shadow-primary/50"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    )}
                  >
                    {tip.id}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Empty state for filtered tips */}
            {filteredTips.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No tips found in this category
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
