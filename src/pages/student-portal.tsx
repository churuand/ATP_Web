import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Coins,
  Loader2,
  Search,
  PlayCircle,
  Check,
  ArrowRight,
  RefreshCw,
  Play,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { clsx } from "clsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getVideos, checkPurchaseStatus, getVideoCategories } from "@/services/videoService";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/Sidebar";
import PurchaseVideoDialog from "@/components/PurchaseVideoDialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Briefcase as BriefcaseIcon, 
  Target, 
  MessageSquare,
  Lightbulb
} from "lucide-react";

// Mock Assets
import masterclass1 from "@assets/generated_images/interview_masterclass_thumbnail.png";
import short1 from "@assets/generated_images/quick_career_tip_vertical.png";
import welcomeAvatar from "@assets/generated_images/pixel_art_avatar_of_asian_male_in_suit.png";

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const createVideoUrl = (video: any, type: 'full' | 'short'): string => {
  const slug = generateSlug(video.title);
  const basePath = type === 'full' ? '/video' : '/quick-tips';
  return `${basePath}/${slug}-${video.id}`;
};

export default function StudentPortal() {
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"all" | "curriculum">("curriculum");
  const { member, refreshMember } = useAuth();
  const userCredits = member?.total_credit || 0;
  const queryClient = useQueryClient();
  const [checkingPurchase, setCheckingPurchase] = useState(false);
  
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Carousel states
  const [shortsIndex, setShortsIndex] = useState(0);
  const [fullIndex, setFullIndex] = useState(0);
  const [challengesIndices, setChallengesIndices] = useState<Record<string, number>>({});
  const itemsPerPage = 4;

  const hasSeenWelcome = localStorage.getItem('atp_welcome_seen') === 'true';
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(!hasSeenWelcome);

  const [purchaseDialog, setPurchaseDialog] = useState<{
    isOpen: boolean;
    video: any | null;
    type: 'full' | 'short';
  }>({
    isOpen: false,
    video: null,
    type: 'full'
  });

  const { data: videosData, isLoading: isLoadingVideos } = useQuery({
    queryKey: ['videos'],
    queryFn: () => getVideos(),
  });

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['video-categories'],
    queryFn: () => getVideoCategories(),
  });

  const allVideos = videosData?.videos || [];
  const fullVideos = allVideos.filter(video => !video.is_short);
  const shortVideos = allVideos.filter(video => video.is_short);

  // Get parent categories (topics) with their children
  const problemTopics = useMemo(() => {
    if (!categoriesData?.categories || !categoriesData?.tree) return [];
    
    // Icon mapping based on category name
    const getIconForCategory = (name: string) => {
      const lowerName = name.toLowerCase();
      if (lowerName.includes('career development')) return Target;
      if (lowerName.includes('career preparation') || lowerName.includes('career prep')) return BriefcaseIcon;
      if (lowerName.includes('mindset') || lowerName.includes('culture')) return Brain;
      if (lowerName.includes('workplace') || lowerName.includes('skill')) return MessageSquare;
      return Lightbulb;
    };

    // Get color based on category name
    const getColorForCategory = (name: string) => {
      const lowerName = name.toLowerCase();
      if (lowerName.includes('career development')) return "bg-red-100 text-red-700";
      if (lowerName.includes('career preparation') || lowerName.includes('career prep')) return "bg-teal-100 text-teal-700";
      if (lowerName.includes('mindset') || lowerName.includes('culture')) return "bg-purple-100 text-purple-700";
      if (lowerName.includes('workplace') || lowerName.includes('skill')) return "bg-indigo-100 text-indigo-700";
      return "bg-blue-100 text-blue-700";
    };

    // Build a flat list of all categories from the categories array
    const allCategories = categoriesData.categories.map(item => item.category);

    // Filter only parent categories (no parent_id) from tree
    return categoriesData.tree
      .filter(cat => !cat.parent_id && cat.is_active)
      .map(category => {
        // Find children from the flat list
        const children = allCategories.filter(
          child => child.parent_id === category.id && child.is_active
        );
        
        return {
          id: category.id.toString(),
          title: category.name,
          description: category.slug || '',
          points: children.map(child => child.name),
          icon: getIconForCategory(category.name),
          color: getColorForCategory(category.name),
          categoryData: category
        };
      });
  }, [categoriesData]);

  const recommendedVideosByCategory = useMemo(() => {
    if (selectedTopics.length === 0 || !categoriesData?.categories) return {};
    
    const grouped: Record<string, any[]> = {};
    
    // Build a flat list of all categories
    const allCategories = categoriesData.categories.map(item => item.category);
    
    // Get selected category IDs (including parent and children)
    const selectedCategoryIds = new Set<number>();
    selectedTopics.forEach(topicId => {
      const categoryId = parseInt(topicId);
      selectedCategoryIds.add(categoryId);
      
      // Add all children of this category from the flat list
      const children = allCategories.filter(cat => cat.parent_id === categoryId);
      children.forEach(child => selectedCategoryIds.add(child.id));
    });
    
    // Group videos by their category
    allVideos.forEach(video => {
      if (!video.category_id) return;
      
      // Check if video's category is in selected categories
      if (selectedCategoryIds.has(video.category_id)) {
        const catName = video.category?.name || "Other";
        if (!grouped[catName]) grouped[catName] = [];
        grouped[catName].push(video);
      }
    });
    
    return grouped;
  }, [allVideos, selectedTopics, categoriesData]);

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(id)) {
        return prev.filter(t => t !== id);
      } else {
        if (prev.length >= 3) return prev;
        return [...prev, id];
      }
    });
  };

  const handleVideoClick = async (video: any, type: 'full' | 'short') => {
    setCheckingPurchase(true);
    try {
      const purchaseStatus = await checkPurchaseStatus(video.id);
      if (purchaseStatus.purchased) {
        setLocation(createVideoUrl(video, type));
      } else {
        setPurchaseDialog({ isOpen: true, video, type });
      }
    } catch (error) {
      setPurchaseDialog({ isOpen: true, video, type });
    } finally {
      setCheckingPurchase(false);
    }
  };

  const handlePurchaseSuccess = () => {
    if (purchaseDialog.video) {
      setLocation(createVideoUrl(purchaseDialog.video, purchaseDialog.type));
    }
  };

  const handleCloseWelcome = () => {
    localStorage.setItem('atp_welcome_seen', 'true');
    setIsWelcomeOpen(false);
  };

  return (
    <div className="min-h-screen bg-secondary/30 font-sans text-foreground flex">
      <Sidebar activePage="videos" />

      {checkingPurchase && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 shadow-xl">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm font-medium text-gray-600">Checking video status...</p>
          </div>
        </div>
      )}

      {/* Welcome Dialog */}
      <Dialog open={isWelcomeOpen} onOpenChange={setIsWelcomeOpen}>
        <DialogContent className="bg-transparent border-0 shadow-none p-0 max-w-xl w-full flex flex-col items-center justify-center focus:outline-none">
          <DialogTitle className="sr-only">Welcome to ATP</DialogTitle>
          <div className="w-full bg-white p-8 rounded-3xl shadow-2xl relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                <img
                  src={welcomeAvatar}
                  alt="Viet Dang"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Viet Dang</span>
                  <span className="text-xs text-gray-500">1:06 PM</span>
                </div>

                <div className="text-gray-800 leading-relaxed space-y-4 text-[15px]">
                  <p>Hey {member?.full_name}, welcome to ATP! 🎉</p>
                  <p>
                    I'm Viet Dang from the Student Experience team — super
                    excited to have you here!
                  </p>
                  <p>
                    To get you started, we've gifted you <span className="font-extrabold text-amber-600 text-lg">10 free credits</span> so you can explore and watch everything on the platform. 🎁
                  </p>
                  <p>
                    If you've got a question, idea, or found a bug, just email us anytime at{" "}
                    <span className="text-primary font-medium cursor-pointer hover:underline">
                      wecare@atp-global.com.au
                    </span>{" "}
                    — we're here for you.
                  </p>
                  <p>Let's make your career journey amazing! 🚀</p>
                  <p>Cheers!</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleCloseWelcome}
            className="mt-6 bg-gradient-to-r from-primary to-red-600 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-full font-medium text-sm shadow-lg shadow-red-200 transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            Got it <span className="text-lg leading-none">→</span>
          </button>
        </DialogContent>
      </Dialog>

      <PurchaseVideoDialog
        open={purchaseDialog.isOpen}
        onOpenChange={(open) => setPurchaseDialog(prev => ({ ...prev, isOpen: open }))}
        video={purchaseDialog.video}
        type={purchaseDialog.type}
        onSuccess={handlePurchaseSuccess}
      />

      <main className="flex-1 min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 sticky top-0 z-10 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search videos, topics, or mentors..."
                className="pl-10 bg-secondary/30 border-transparent focus:bg-white transition-all rounded-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-6 pl-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-100">
              <Coins className="w-4 h-4 text-amber-500 fill-current" />
              <span className="text-sm font-bold text-amber-700">{userCredits} credits</span>
            </div>
            <div className="h-8 w-[1px] bg-gray-200"></div>
            <div className="text-right hidden md:block">
              <div className="text-xs text-gray-500">Student Success</div>
              <div className="text-sm font-bold text-primary">MasterClasses</div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                Student Portal
              </h1>
              <p className="text-gray-500">
                {showRecommendations ? "Your personalized learning plan." : "What are you working on today?"}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white p-1.5 rounded-full border border-gray-100 shadow-sm overflow-x-auto">
              <button
                onClick={() => { setActiveTab("curriculum"); setShowRecommendations(false); }}
                className={clsx(
                  "px-8 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                  activeTab === "curriculum" && !showRecommendations
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-500 hover:text-primary",
                )}
              >
                Challenges
              </button>
              <button
                onClick={() => { setActiveTab("all"); setShowRecommendations(false); }}
                className={clsx(
                  "px-8 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                  activeTab === "all"
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-500 hover:text-primary",
                )}
              >
                Courses
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "curriculum" && !showRecommendations ? (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center max-w-2xl mx-auto">
                  <Badge variant="outline" className="mb-4 text-primary border-primary bg-primary/5 uppercase tracking-wider font-bold">
                    Personalized Learning
                  </Badge>
                  <h2 className="text-3xl font-serif text-gray-900 mb-4">What are your current goals?</h2>
                  <p className="text-gray-500 text-lg">Pick up to 3 areas you'd like to improve, and we'll build a custom video curriculum for you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {isLoadingCategories ? (
                    <div className="col-span-full flex justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : problemTopics.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-500">
                      No categories available yet.
                    </div>
                  ) : (
                    problemTopics.map((topic) => {
                      const isSelected = selectedTopics.includes(topic.id);
                      const Icon = topic.icon;
                      return (
                        <Card 
                          key={topic.id}
                          className={clsx(
                            "cursor-pointer transition-all duration-200 border-2 rounded-2xl",
                            isSelected 
                              ? "border-primary bg-primary/5 shadow-md" 
                              : "border-gray-100 hover:border-primary/50 hover:shadow-sm bg-white"
                          )}
                          onClick={() => toggleTopic(topic.id)}
                        >
                          <div className="p-6 flex items-start gap-4">
                            <div className={clsx(
                              "p-3 rounded-xl",
                              isSelected ? "bg-primary text-white" : "bg-secondary text-gray-500"
                            )}>
                              {isSelected ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                            </div>
                            <div>
                              <h3 className={clsx("font-bold text-lg mb-2", isSelected ? "text-primary" : "text-gray-900")}>
                                {topic.title}
                              </h3>
                              {topic.points.length > 0 && (
                                <ul className="space-y-1">
                                  {topic.points.map((point, idx) => (
                                    <li key={idx} className="text-sm text-gray-500 flex items-start gap-2">
                                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })
                  )}
                </div>

                <div className="flex justify-center pt-8">
                  <Button 
                    size="lg" 
                    className="rounded-full bg-primary text-white hover:bg-primary/90 px-10 py-7 text-xl shadow-xl shadow-primary/20"
                    onClick={() => setShowRecommendations(true)}
                    disabled={selectedTopics.length === 0}
                  >
                    Generate My Learning Plan
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </div>
              </motion.div>
            ) : activeTab === "curriculum" && showRecommendations ? (
              <motion.div
                key="recommendations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setShowRecommendations(false)}
                      className="p-2 hover:bg-white rounded-full transition-colors border border-gray-100"
                    >
                      <ArrowRight className="w-5 h-5 rotate-180" />
                    </button>
                    <h2 className="text-2xl font-serif text-gray-900">Your Learning Plan</h2>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => { setShowRecommendations(false); setSelectedTopics([]); }}
                    className="rounded-full border-primary/20 text-primary hover:bg-primary/5"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Selection
                  </Button>
                </div>

                {Object.keys(recommendedVideosByCategory).length > 0 ? (
                  <div className="space-y-12">
                    {Object.entries(recommendedVideosByCategory).map(([category, videos]) => {
                      const currentIndex = challengesIndices[category] || 0;
                      return (
                        <div key={category} className="space-y-6">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-3">
                              <Badge className={clsx(
                                "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full",
                                category === "Career Development" ? "bg-red-50 text-red-600 hover:bg-red-50 border-red-100" :
                                category === "Workplace Skills" ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-50 border-indigo-100" :
                                category === "Career Preparation" ? "bg-teal-50 text-teal-600 hover:bg-teal-50 border-teal-100" :
                                "bg-purple-50 text-purple-600 hover:bg-purple-50 border-purple-100"
                              )}>
                                {category}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full w-8 h-8"
                                onClick={() => setChallengesIndices(prev => ({
                                  ...prev,
                                  [category]: Math.max(0, (prev[category] || 0) - 1)
                                }))}
                                disabled={currentIndex === 0}
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full w-8 h-8"
                                onClick={() => setChallengesIndices(prev => ({
                                  ...prev,
                                  [category]: Math.min(videos.length - itemsPerPage, (prev[category] || 0) + 1)
                                }))}
                                disabled={currentIndex >= videos.length - itemsPerPage}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {videos.slice(currentIndex, currentIndex + itemsPerPage).map((video) => (
                              <div
                                key={video.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all flex flex-col h-full"
                                onClick={() => handleVideoClick(video, video.is_short ? 'short' : 'full')}
                              >
                                <div className="relative aspect-video overflow-hidden">
                                  <img
                                    src={video.thumbnail_url || masterclass1}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold rounded">
                                    {video.is_short ? `${video.duration || 0}s` : `${Math.floor((video.duration || 0) / 60)}:${String((video.duration || 0) % 60).padStart(2, '0')}`}
                                  </div>
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                    <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg">
                                      <Play className="w-4 h-4 fill-current ml-1" />
                                    </div>
                                  </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                      Career
                                    </span>
                                    <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-amber-200 text-amber-600 bg-amber-50 uppercase font-bold">
                                      Premium
                                    </Badge>
                                  </div>
                                  <h4 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2 flex-1">{video.title}</h4>
                                  <div className="text-[11px] text-gray-500 mb-3">{video.mentor}</div>
                                  
                                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                                    <div className="flex items-center gap-1 text-amber-500">
                                      <span className="text-[10px] font-bold">★</span>
                                      <span className="text-[10px] font-bold text-gray-600">4.9</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <Coins className="w-3 h-3 text-blue-500 fill-current opacity-70" />
                                      <span className="text-[10px] font-bold text-gray-600">{video.price_credit}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                    <p className="text-gray-500 mb-6 text-lg">We couldn't find specific videos matching those exact topics yet, but here's our latest masterclass to get you started!</p>
                    {fullVideos.length > 0 && (
                       <Button 
                         onClick={() => handleVideoClick(fullVideos[0], 'full')}
                         className="rounded-full bg-primary text-white px-8 py-6"
                       >
                         Watch Latest Masterclass
                       </Button>
                    )}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="library"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Featured Hero Video */}
                {activeTab === "all" && fullVideos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-3xl overflow-hidden bg-gray-900 aspect-[21/9] group cursor-pointer shadow-xl"
                    onClick={() => handleVideoClick(fullVideos[0], 'full')}
                  >
                    <img
                      src={fullVideos[0].thumbnail_url || masterclass1}
                      alt="Featured"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute top-6 right-6 z-20">
                       <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold border border-white/10">
                          <Coins className="w-4 h-4 text-amber-400 fill-current" />
                          {fullVideos[0].price_credit} credits
                       </div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wide mb-4">
                        Featured Masterclass
                      </div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                        {fullVideos[0].title}
                      </h2>
                      <p className="text-gray-300 mb-8 line-clamp-2">
                        {fullVideos[0].description || 'Watch this featured masterclass to enhance your career development.'}
                      </p>
                      <div className="flex items-center gap-4">
                        <Button className="rounded-full bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg">
                          <Play className="w-5 h-5 mr-2 fill-current" /> Watch Now
                        </Button>
                        <span className="text-white/60 text-sm font-medium">
                          {fullVideos[0].duration ? `${Math.floor(fullVideos[0].duration / 60)} min` : '45 min'} duration
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Quick Tips Section */}
                {activeTab === "all" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                          <Clock className="w-5 h-5" />
                        </span>
                        Quick Tips
                      </h3>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full w-8 h-8"
                          onClick={() => setShortsIndex(prev => Math.max(0, prev - 1))}
                          disabled={shortsIndex === 0}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full w-8 h-8"
                          onClick={() => setShortsIndex(prev => Math.min(shortVideos.length - itemsPerPage, prev + 1))}
                          disabled={shortsIndex >= shortVideos.length - itemsPerPage}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {isLoadingVideos ? (
                        <div className="col-span-full flex justify-center py-12"><Loader2 className="animate-spin text-primary" /></div>
                      ) : shortVideos.slice(shortsIndex, shortsIndex + itemsPerPage).map((video) => (
                        <div
                          key={video.id}
                          className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer shadow-md"
                          onClick={() => handleVideoClick(video, 'short')}
                        >
                          <img src={video.thumbnail_url || short1} alt={video.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                          <div className="absolute top-3 right-3">
                             <div className="bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold">
                                <Coins className="w-3 h-3 text-amber-400 fill-current" />
                                {video.price_credit}
                             </div>
                          </div>
                          <div className="absolute bottom-0 p-4">
                            <h4 className="text-white font-bold text-sm mb-1 line-clamp-2">{video.title}</h4>
                            <span className="text-xs text-gray-300">{video.duration} sec</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Masterclasses Section */}
                {activeTab === "all" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <PlayCircle className="w-5 h-5" />
                        </span>
                        Latest Masterclasses
                      </h3>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full w-8 h-8"
                          onClick={() => setFullIndex(prev => Math.max(0, prev - 1))}
                          disabled={fullIndex === 0}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full w-8 h-8"
                          onClick={() => setFullIndex(prev => Math.min(fullVideos.length - itemsPerPage, prev + 1))}
                          disabled={fullIndex >= fullVideos.length - itemsPerPage}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {fullVideos.slice(fullIndex, fullIndex + itemsPerPage).map((video) => (
                        <div
                          key={video.id}
                          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all"
                          onClick={() => handleVideoClick(video, 'full')}
                        >
                          <div className="relative aspect-video overflow-hidden">
                            <img src={video.thumbnail_url || masterclass1} alt={video.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                            <div className="absolute top-3 right-3">
                               <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold">
                                  <Coins className="w-3 h-3 text-amber-400 fill-current" />
                                  {video.price_credit}
                               </div>
                            </div>
                          </div>
                          <div className="p-5">
                            <span className="px-2 py-0.5 rounded-full bg-secondary text-primary text-[10px] font-bold uppercase tracking-wide inline-block mb-3">
                              {video.category?.name || 'Masterclass'}
                            </span>
                            <h4 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2">{video.title}</h4>
                            <div className="text-[10px] text-gray-500">{video.mentor || 'Expert Mentor'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
