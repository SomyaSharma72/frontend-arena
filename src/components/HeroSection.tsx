import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Compass, Users, GitBranch, Layers, Play } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { BackgroundIllustrations } from './BackgroundIllustrations';

interface HeroSectionProps {
  onOpenCreate: () => void;
  onSelectCategory: (category: ProjectCategory | 'all') => void;
  selectedCategory: ProjectCategory | 'all';
  spotlightProject?: Project;
  onSelectProject: (project: Project) => void;
  totalProjectsCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCreate,
  onSelectCategory,
  selectedCategory,
  spotlightProject,
  onSelectProject,
  totalProjectsCount,
}) => {
  const fallbackSpotlight: Project = {
    id: 'spotlight-fallback',
    title: 'Echoes of the Solar Colony',
    description: 'A shared science-fiction universe built paragraph by paragraph, visual by visual.',
    category: 'story',
    categoryLabel: 'Speculative Fiction',
    cardStyle: {
      bg: '#FFFFFF',
      accent: '#B8A7FF',
      badgeBg: '#B8A7FF',
      badgeText: '#181818',
      layout: 'standard',
    },
    creator: {
      id: 'maya-chen',
      name: 'Maya Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      username: 'mayachen',
      role: 'Worldbuilder',
    },
    contributorsCount: 18,
    contributionsCount: 42,
    branchesCount: 7,
    remixesCount: 3,
    recentActivity: 'Maya added a piece just now',
    activeContributors: [],
    lastActive: 'Just now',
    createdAt: '3 days ago',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    currentPiece: 'Chapter 6: The Oxygen Synthesizer began humming in F-sharp minor...',
    treeRootNodeId: 'root-1',
    treeRootId: 'root-1',
    tags: ['Sci-Fi', 'Worldbuilding', 'Audio Stems'],
    liveNow: true,
  };

  const spotlight = spotlightProject || fallbackSpotlight;

  const categories: { id: ProjectCategory | 'all'; label: string; icon: string; bg: string; activeColor: string }[] = [
    { id: 'all', label: 'All Disciplines', icon: '✦', bg: '#F8F6F0', activeColor: '#181818' },
    { id: 'story', label: 'Stories & Lore', icon: '✍️', bg: '#B8A7FF', activeColor: '#6657E8' },
    { id: 'idea', label: 'Ideas & Brainstorms', icon: '💡', bg: '#FFE28A', activeColor: '#D97706' },
    { id: 'visual', label: 'Visual Art & Design', icon: '🎨', bg: '#FF8D91', activeColor: '#E11D48' },
    { id: 'music', label: 'Music & Stems', icon: '🎧', bg: '#8FD8FF', activeColor: '#0284C7' },
    { id: 'challenge', label: 'Creative Prompts', icon: '⚡', bg: '#A9E3CF', activeColor: '#0D9488' },
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:py-12 bg-paper-grain">
      {/* 2D Background Illustrations */}
      <BackgroundIllustrations variant="hero" />

      {/* Subtle Floating Banner Badges */}
      <div className="absolute top-4 right-10 rotate-[2deg] hidden lg:block pointer-events-none z-10">
        <span className="px-3.5 py-1 bg-[#A9E3CF]/70 border border-[#DDD9D0] shadow-subtle text-[11px] font-sans-clean font-bold text-[#181818] rounded-full flex items-center gap-1.5 backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse" />
          COMMUNAL CREATION · LIVE BRANCHING
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Playful Editorial Manifesto with Illustrated Accents */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="relative">
              {/* Category Pill Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-[#DDD9D0] rounded-full shadow-subtle mb-4"
              >
                <span className="w-2 h-2 rounded-full bg-[#6657E8]" />
                <span className="text-xs font-sans-clean font-bold text-[#181818] tracking-wide">
                  {totalProjectsCount} OPEN COLLABORATIVE SPARKS
                </span>
              </motion.div>

              {/* Main Headline with Illustrated Paper Flying Across and Tiny Stars */}
              <div className="relative">
                {/* 1. Paper Plane / Flying Paper Sheet animation across heading */}
                <motion.div
                  animate={{
                    x: [-10, 20, -10],
                    y: [0, -6, 0],
                    rotate: [-6, 6, -6],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-6 left-52 sm:left-64 pointer-events-none select-none z-10"
                >
                  <div className="w-9 h-11 bg-[#FFE28A] border border-[#181818]/60 rounded-md shadow-subtle rotate-[12deg] p-1 flex flex-col justify-between opacity-90">
                    <div className="w-3 h-0.5 bg-[#181818]/60 rounded" />
                    <div className="w-full h-0.5 bg-[#181818]/30 rounded" />
                    <span className="text-[6px] font-mono-tech font-bold text-[#181818]">✦</span>
                  </div>
                </motion.div>

                {/* 2. Tiny Lavender Twinkling Star near 'building' */}
                <motion.div
                  animate={{
                    scale: [0.85, 1.25, 0.85],
                    rotate: [0, 180, 360],
                    opacity: [0.4, 0.9, 0.4],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-1 -left-6 pointer-events-none"
                >
                  <Sparkles className="w-5 h-5 text-[#6657E8]" />
                </motion.div>

                {/* 3. Tiny Coral Star near the bottom */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.8,
                  }}
                  className="absolute bottom-2 right-12 sm:right-24 pointer-events-none"
                >
                  <span className="text-xs text-[#FF8D91]">✦</span>
                </motion.div>

                <h1 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-bold text-[#181818] tracking-tight leading-[1.02]">
                  What are people <br />
                  <span className="italic font-display font-black underline decoration-[#FFE28A] decoration-wavy decoration-2">
                    building today?
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="mt-4 text-base sm:text-lg text-[#77736D] font-sans-clean max-w-lg leading-relaxed">
                Start something. Pass it on. Let creative conspirators expand it with a paragraph, a stem, an illustration, or an impossible branch.
              </p>
            </div>

            {/* Social Interaction Paradigm: The Collaboration Loop */}
            <div className="p-4 bg-white border border-[#DDD9D0] rounded-2xl shadow-subtle">
              <div className="text-[10px] font-sans-clean uppercase font-bold text-[#77736D] mb-2.5 tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6657E8]" />
                HOW RELAY WORKS:
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-sans-clean font-bold text-[#181818]">
                <span className="px-3 py-1 bg-[#FFE28A]/80 border border-[#DDD9D0] rounded-lg">
                  1. START
                </span>
                <span className="text-[#77736D]">→</span>
                <span className="px-3 py-1 bg-[#B8A7FF]/60 border border-[#DDD9D0] rounded-lg">
                  2. CONTRIBUTE
                </span>
                <span className="text-[#77736D]">→</span>
                <span className="px-3 py-1 bg-[#8FD8FF]/60 border border-[#DDD9D0] rounded-lg">
                  3. REMIX
                </span>
                <span className="text-[#77736D]">→</span>
                <span className="px-3 py-1 bg-[#A9E3CF]/70 border border-[#DDD9D0] rounded-lg">
                  4. BRANCH
                </span>
              </div>
            </div>

            {/* Action CTAs with subtle micro-interactions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.96 }}
                id="hero-start-project-btn"
                onClick={onOpenCreate}
                data-cursor="action"
                className="px-6 py-3 bg-[#6657E8] text-white hover:bg-[#5848DF] text-sm font-sans-clean font-bold rounded-xl shadow-subtle hover:shadow-card-purple transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#FFE28A]" />
                <span>Start a Project</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.96 }}
                id="hero-random-jump-btn"
                onClick={() => onSelectProject(spotlight)}
                data-cursor="action"
                className="px-5 py-3 bg-white text-[#181818] hover:bg-[#F8F6F0] text-sm font-sans-clean font-bold rounded-xl border border-[#DDD9D0] shadow-subtle hover:shadow-card transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Jump Into Spotlight</span>
                <ArrowRight className="w-4 h-4 text-[#6657E8]" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Featured Spotlight Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-6"
          >
            <div className="relative">
              {/* Soft Washi Tape Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 washi-tape w-32 h-5.5 border border-[#DDD9D0] rotate-[-1.5deg] z-20 shadow-xs" />

              <div
                onClick={() => onSelectProject(spotlight)}
                data-project-card="true"
                data-cursor="card"
                data-cursor-text="SPOTLIGHT"
                className="group relative bg-white border border-[#DDD9D0] rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
              >
                {/* Visual Header / Image */}
                <div className="relative h-60 sm:h-68 w-full overflow-hidden bg-[#FFE28A]">
                  <img
                    src={spotlight.image}
                    alt={spotlight.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-600 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-xs border border-white/40 text-xs font-sans-clean font-bold text-[#181818] rounded-full shadow-subtle flex items-center gap-1.5">
                      <span className="text-[#6657E8]">★</span>
                      <span>SPOTLIGHT SPARK</span>
                    </span>
                    {spotlight.liveNow && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/95 backdrop-blur-xs rounded-full text-[11px] font-sans-clean font-bold text-[#181818]">
                        <span className="w-2 h-2 rounded-full bg-[#FF8D91] animate-pulse" />
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-sans-clean text-[#FFE28A] uppercase font-bold tracking-wider block mb-1">
                      {spotlight.categoryLabel}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-xs">
                      {spotlight.title}
                    </h2>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="p-3 bg-[#F8F6F0] border border-[#DDD9D0]/60 rounded-xl">
                    <span className="text-[10px] font-sans-clean uppercase font-bold text-[#77736D] block mb-1">
                      LATEST CONTRIBUTION:
                    </span>
                    <p className="text-sm font-serif-editorial italic text-[#181818] line-clamp-2">
                      “{spotlight.currentPiece}”
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#DDD9D0]/60">
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center -space-x-1.5 group-hover:space-x-0 transition-all">
                        {(spotlight.activeContributors || []).slice(0, 4).map((c, i) => (
                          <img
                            key={i}
                            src={c.avatar}
                            alt={c.name}
                            className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                            referrerPolicy="no-referrer"
                          />
                        ))}
                      </div>
                      <div className="text-xs font-sans-clean text-[#77736D] font-medium">
                        <span className="font-bold text-[#181818]">{spotlight.contributorsCount}</span> collaborators · <span className="font-bold text-[#181818]">{spotlight.contributionsCount}</span> additions
                      </div>
                    </div>

                    {/* Primary Action Button */}
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#6657E8] text-white text-xs font-bold font-sans-clean rounded-xl shadow-subtle group-hover:bg-[#5848DF] transition-all">
                      <span>BUILD ON THIS</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Category Filter Pills Bar with Soft Palette */}
        <div className="mt-10 pt-6 border-t border-[#DDD9D0]">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-xs font-sans-clean font-bold uppercase tracking-wider text-[#181818] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6657E8]" />
              BROWSE BY MEDIUM:
            </span>
            <span className="text-xs font-sans-clean text-[#77736D] hidden sm:inline">
              Select category to discover open seeds
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-sans-clean transition-all cursor-pointer flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-[#181818] text-white border-[#181818] shadow-card -translate-y-0.5'
                      : 'bg-white text-[#181818] border-[#DDD9D0] shadow-subtle hover:border-[#6657E8] hover:-translate-y-0.5'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
