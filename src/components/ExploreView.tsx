import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Flame, 
  Users, 
  Sparkles, 
  Compass, 
  ArrowRight, 
  UserPlus, 
  UserCheck, 
  Music, 
  Feather, 
  Lightbulb, 
  Eye, 
  Trophy,
  GitBranch,
  Layers
} from 'lucide-react';
import { Project, Collaborator, ProjectCategory } from '../types';

interface ExploreViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onContinueProject: (project: Project) => void;
  onSelectCreator: (creator: Collaborator) => void;
  followingUserIds: string[];
  onToggleFollow: (userId: string) => void;
  onOpenCreate: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  projects = [],
  onSelectProject,
  onContinueProject,
  onSelectCreator,
  followingUserIds = [],
  onToggleFollow,
  onOpenCreate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; label: string; icon: any }[] = [
    { id: 'all', label: 'All Sparks', icon: Compass },
    { id: 'story', label: 'Stories', icon: Feather },
    { id: 'idea', label: 'Ideas', icon: Lightbulb },
    { id: 'visual', label: 'Visuals', icon: Eye },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'challenge', label: 'Challenges', icon: Trophy },
  ];

  // Distinct popular creators
  const safeProjects = projects || [];
  const creatorsMap = new Map<string, Collaborator>();
  safeProjects.forEach((p) => {
    if (!p || !p.creator) return;
    const creator = p.creator;
    const id = creator.id || `user-${(creator.name || '').toLowerCase().replace(/\s+/g, '')}`;
    if (!creatorsMap.has(id)) {
      creatorsMap.set(id, { ...creator, id });
    }
  });
  const popularCreators = Array.from(creatorsMap.values()).slice(0, 8);

  // Filter projects
  const filteredProjects = safeProjects.filter((p) => {
    if (!p) return false;
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (p.title || '').toLowerCase().includes(q);
      const matchCreator = (p.creator?.name || '').toLowerCase().includes(q);
      const matchPiece = (p.currentPiece || '').toLowerCase().includes(q);
      const matchTag = (p.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchCreator || matchPiece || matchTag;
    }
    return true;
  });

  // Trending projects (high contributors/activity)
  const trendingProjects = [...safeProjects].sort((a, b) => (b.contributorsCount || 0) - (a.contributorsCount || 0)).slice(0, 3);
  // Active collaborations
  const activeCollabs = safeProjects.filter((p) => p && (p.liveNow || (p.branchesCount || 0) >= 5)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Search & Filter Banner */}
      <div className="bg-white rounded-3xl border-2 border-[#171717] p-6 sm:p-8 shadow-sticker">
        <div className="max-w-2xl mb-6">
          <h1 className="font-display font-black text-2xl sm:text-3xl text-[#171717] tracking-tight mb-2">
            Explore Open Seeds
          </h1>
          <p className="text-xs sm:text-sm font-sans-clean text-[#171717]/70">
            Find active collaborative rooms, discover creators, and build on something unexpected.
          </p>
        </div>

        {/* Big Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by title, prompt, sound stem, or creator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF9F6] border-2 border-[#171717] rounded-2xl pl-12 pr-4 py-3.5 text-sm font-sans-clean text-[#171717] placeholder-[#171717]/45 focus:outline-none focus:border-[#635BFF] focus:bg-white transition-all shadow-sticker-sm"
          />
          <Search className="w-5 h-5 text-[#171717]/50 absolute left-4 top-4" />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech font-bold transition-all cursor-pointer flex items-center gap-2 border-2 ${
                  isSelected
                    ? 'bg-[#171717] text-white border-[#171717] shadow-sticker-sm'
                    : 'bg-white hover:bg-[#FAF9F6] text-[#171717] border-[#171717]/20 hover:border-[#171717]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Creators Carousel / Row */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#635BFF]" />
            <h2 className="font-display font-black text-lg sm:text-xl text-[#171717]">
              Popular Creators
            </h2>
          </div>
          <span className="text-xs font-mono-tech text-[#171717]/60">
            Open for branches
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularCreators.map((creator) => {
            const creatorId = creator.id!;
            const isFollowing = followingUserIds.includes(creatorId);

            return (
              <div
                key={creator.id}
                className="bg-white rounded-2xl border-2 border-[#171717] p-4 shadow-sticker-sm hover:shadow-sticker transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-3">
                  <button
                    onClick={() => onSelectCreator(creator)}
                    className="cursor-pointer focus:outline-none"
                  >
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#171717]"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                  <div className="min-w-0">
                    <button
                      onClick={() => onSelectCreator(creator)}
                      className="font-display font-bold text-sm text-[#171717] hover:text-[#635BFF] transition-colors truncate block text-left"
                    >
                      {creator.name}
                    </button>
                    <span className="text-[11px] font-mono-tech text-[#171717]/50 block truncate">
                      @{creator.username || creator.name.toLowerCase().replace(/\s+/g, '')}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-sans-clean text-[#171717]/70 line-clamp-2 mb-4 leading-relaxed">
                  {creator.bio || 'Starting creative seeds and passing the baton.'}
                </p>

                <button
                  onClick={() => onToggleFollow(creatorId)}
                  className={`w-full py-1.5 rounded-xl text-xs font-mono-tech font-bold border-2 border-[#171717] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isFollowing
                      ? 'bg-[#C7EBDD] text-[#171717]'
                      : 'bg-[#FAF9F6] hover:bg-[#FFE49A] text-[#171717] shadow-sm'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trending Projects Spotlight */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-amber-500" />
          <h2 className="font-display font-black text-lg sm:text-xl text-[#171717]">
            Trending Sparks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="bg-white rounded-3xl border-2 border-[#171717] shadow-sticker hover:shadow-sticker-lg transition-all overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-stone-100 border-b-2 border-[#171717]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full border border-[#171717] text-[10px] font-mono-tech font-bold uppercase tracking-wider text-[#171717]">
                  {project.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#171717] group-hover:text-[#635BFF] transition-colors leading-snug mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs font-serif-editorial text-[#171717]/80 line-clamp-2 italic mb-4">
                    "{project.currentPiece}"
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#171717]/60 pt-3 border-t border-[#171717]/10 mb-3">
                    <span>{project.contributorsCount} contributors</span>
                    <span>{project.branchesCount} branches</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onContinueProject(project);
                    }}
                    className="w-full py-2 bg-[#635BFF] hover:bg-[#5249ea] text-white text-xs font-mono-tech font-bold rounded-xl border-2 border-[#171717] shadow-sticker-sm flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>BUILD ON THIS →</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Filtered Feed Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#635BFF]" />
            <h2 className="font-display font-black text-lg sm:text-xl text-[#171717]">
              Recommended Projects ({filteredProjects.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="bg-white rounded-3xl border-2 border-[#171717] shadow-sticker hover:shadow-sticker-lg transition-all overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="p-4 border-b border-[#171717]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={project.creator.avatar}
                    alt={project.creator.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#171717]"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-display font-bold text-[#171717]">
                    {project.creator.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono-tech text-[#171717]/60">
                  {project.lastActive || 'Today'}
                </span>
              </div>

              <div className="relative h-44 overflow-hidden bg-stone-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-[#171717] group-hover:text-[#635BFF] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs font-sans-clean text-[#171717]/70 line-clamp-2 mb-4">
                    {project.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#171717]/10 flex items-center justify-between">
                  <span className="text-xs font-mono-tech text-[#171717]/70">
                    {project.contributorsCount} makers
                  </span>
                  <span className="text-xs font-mono-tech font-bold text-[#635BFF] group-hover:translate-x-0.5 transition-transform">
                    Pass it on →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
