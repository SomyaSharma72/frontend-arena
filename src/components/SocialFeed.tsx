import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  GitBranch, 
  Users, 
  Layers, 
  Play, 
  Pause, 
  Share2, 
  MessageSquare, 
  Volume2, 
  ArrowUpRight, 
  UserPlus, 
  UserCheck, 
  Flame, 
  Music, 
  Feather, 
  Compass,
  Check,
  Radio
} from 'lucide-react';
import { Project, Collaborator, UserProfile } from '../types';

interface SocialFeedProps {
  projects: Project[];
  currentUser: UserProfile;
  followingUserIds: string[];
  onToggleFollow: (userId: string) => void;
  onSelectProject: (project: Project) => void;
  onContinueProject: (project: Project) => void;
  onRemixProject: (project: Project) => void;
  onOpenProjectChat: (project: Project) => void;
  onSelectCreator: (creator: Collaborator) => void;
  onOpenCreate: () => void;
  searchQuery?: string;
}

export const SocialFeed: React.FC<SocialFeedProps> = ({
  projects = [],
  currentUser,
  followingUserIds = [],
  onToggleFollow,
  onSelectProject,
  onContinueProject,
  onRemixProject,
  onOpenProjectChat,
  onSelectCreator,
  onOpenCreate,
  searchQuery = '',
}) => {
  const [feedFilter, setFeedFilter] = useState<'all' | 'following' | 'collaborations' | 'short_updates'>('all');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  const handleShare = (id: string, title: string) => {
    navigator.clipboard?.writeText?.(`${window.location.origin}/#${id}`);
    setCopiedShareId(id);
    setTimeout(() => setCopiedShareId(null), 2000);
  };

  // Filter projects based on tab & search
  const filteredProjects = (projects || []).filter((project) => {
    if (!project) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (project.title || '').toLowerCase().includes(q);
      const matchCreator = (project.creator?.name || '').toLowerCase().includes(q);
      const matchPiece = (project.currentPiece || '').toLowerCase().includes(q);
      const matchTag = (project.tags || []).some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCreator && !matchPiece && !matchTag) return false;
    }

    if (feedFilter === 'following') {
      const creatorId = project.creator?.id || `user-${(project.creator?.name || '').toLowerCase()}`;
      return (followingUserIds || []).includes(creatorId);
    }
    if (feedFilter === 'collaborations') {
      return (project.contributorsCount || 0) > 15 || (project.branchesCount || 0) > 3;
    }
    if (feedFilter === 'short_updates') {
      return project.category === 'music' || project.mediaType === 'audio' || project.category === 'visual';
    }
    return true;
  });

  // Featured creator recommendations for sidebar
  const recommendedCreators: Collaborator[] = [
    {
      id: 'user-maya',
      name: 'Maya Lin',
      username: 'maya_lin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop',
      role: 'Sound Sculptor',
      bio: 'Analog synth stems & tape decay loops',
      followersCount: 1240,
    },
    {
      id: 'user-rahul',
      name: 'Rahul Sen',
      username: 'rahulsen',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=240&auto=format&fit=crop',
      role: 'Speculative Architect',
      bio: 'Prototyping recursive philosophical software',
      followersCount: 940,
    },
    {
      id: 'user-aditi',
      name: 'Aditi Rao',
      username: 'aditi_rao',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=240&auto=format&fit=crop',
      role: 'Flash Fiction Writer',
      bio: 'One-breath stories that end on a question',
      followersCount: 810,
    },
    {
      id: 'user-priya',
      name: 'Priya Nair',
      username: 'priyanair',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop',
      role: 'Visual Poet',
      bio: 'Risograph 2D textures & open collages',
      followersCount: 1450,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Feed Column (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Feed Sub-Navigation Bar */}
          <div className="bg-white rounded-2xl border border-[#DDD9D0] p-2 shadow-subtle flex items-center justify-between gap-2 overflow-x-auto">
            <div className="flex items-center gap-1.5 min-w-max">
              {[
                { id: 'all', label: 'All Sparks' },
                { id: 'following', label: 'Following' },
                { id: 'collaborations', label: 'Active Rooms' },
                { id: 'short_updates', label: 'Short Updates' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFeedFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-tech font-bold transition-all cursor-pointer ${
                    feedFilter === tab.id
                      ? 'bg-[#6657E8] text-white shadow-sm'
                      : 'text-[#77736D] hover:bg-[#B8A7FF]/35 hover:text-[#181818]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Plant Trigger */}
            <button
              onClick={onOpenCreate}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#FFE28A] hover:bg-[#FFB49F] border border-[#DDD9D0] rounded-xl text-xs font-sans-clean font-bold text-[#181818] cursor-pointer shadow-subtle shrink-0 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Seed</span>
            </button>
          </div>

          {/* Feed Post List */}
          {filteredProjects.length === 0 ? (
            <div className="bg-white border border-[#DDD9D0] rounded-3xl p-12 text-center shadow-card">
              <div className="w-16 h-16 rounded-2xl bg-[#FFE28A] border border-[#e4c95d] flex items-center justify-center mx-auto mb-4 shadow-subtle">
                <Compass className="w-8 h-8 text-[#171717]" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#171717] mb-1">
                No seeds found in this feed
              </h3>
              <p className="text-sm font-sans-clean text-[#171717]/65 max-w-sm mx-auto mb-6">
                Try toggling back to All Sparks or explore other creators to follow.
              </p>
              <button
                onClick={() => setFeedFilter('all')}
                className="px-4 py-2 bg-[#6657E8] text-white text-xs font-sans-clean font-bold rounded-xl border border-[#5142d1] shadow-subtle hover:shadow-card transition-all cursor-pointer active:scale-[0.98]"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            filteredProjects.map((project, idx) => {
              const creatorId = project.creator.id || `user-${project.creator.name.toLowerCase().replace(/\s+/g, '')}`;
              const isFollowing = followingUserIds.includes(creatorId);
              const isAudio = project.category === 'music';
              const isRemix = !!project.remixedFromTitle;
              const contributionLabel = project.category === 'music'
                ? 'ADD A LAYER'
                : project.category === 'visual'
                ? 'ADD TO THE PIECE'
                : project.category === 'challenge'
                ? 'ADD THE NEXT RULE'
                : project.category === 'story'
                ? 'CONTINUE THE STORY'
                : 'BUILD ON THIS';

              return (
                <article
                  key={project.id}
                  id={`post-${project.id}`}
                  className="bg-white rounded-3xl border border-[#DDD9D0] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Card Header: Creator Info + Follow CTA */}
                  <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#DDD9D0] bg-[#F8F6F0]/55">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onSelectCreator(project.creator)}
                        className="relative group cursor-pointer focus:outline-none"
                      >
                        <img
                          src={project.creator.avatar}
                          alt={project.creator.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white ring-1 ring-[#DDD9D0] group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#A9E3CF] rounded-full border-2 border-white relay-live-dot" />
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectCreator(project.creator)}
                            className="font-display font-bold text-sm text-[#171717] hover:text-[#635BFF] transition-colors cursor-pointer text-left"
                          >
                            {project.creator.name}
                          </button>
                          <span className="text-xs font-mono-tech text-[#171717]/50">
                            @{project.creator.username || project.creator.name.toLowerCase().replace(/\s+/g, '')}
                          </span>
                          <span className="text-[#171717]/30">·</span>
                          <span className="text-xs font-mono-tech text-[#171717]/60">
                            {project.lastActive || '12m ago'}
                          </span>
                        </div>

                        {/* Sub-label: Project or Remix indicator */}
                        <div className="flex items-center gap-2 mt-0.5">
                          {isRemix ? (
                            <span className="text-[11px] font-mono-tech text-[#635BFF] flex items-center gap-1 font-bold">
                              <span>⚡ Remixed:</span>
                              <span className="underline decoration-[#635BFF]/40">{project.remixedFromTitle}</span>
                            </span>
                          ) : (
                            <span className="text-[11px] font-mono-tech text-[#171717]/65 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#635BFF]" />
                              {project.categoryLabel}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Follow / Unfollow Button */}
                    <button
                      onClick={() => onToggleFollow(creatorId)}
                      className={`px-3 py-1.5 rounded-full text-xs font-sans-clean font-bold border border-[#DDD9D0] transition-all cursor-pointer flex items-center gap-1.5 ${
                        isFollowing
                          ? 'bg-[#C7EBDD] text-[#171717] shadow-sm'
                          : 'bg-white hover:bg-[#FFE49A] text-[#171717] shadow-sticker-sm'
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

                  {/* Project Title & Short Excerpt */}
                  <div className="p-5 sm:p-6">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-left w-full group cursor-pointer focus:outline-none"
                    >
                        <h2 className="font-display font-black text-xl sm:text-2xl text-[#181818] tracking-tight group-hover:text-[#6657E8] transition-colors leading-snug mb-2.5">
                        {project.title}
                      </h2>
                    </button>

                    {/* Project Current Piece / Manuscript Quote */}
                    <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#DDD9D0] mb-4 relative">
                      <p className="font-serif-editorial text-[#171717] text-base sm:text-lg leading-relaxed italic">
                        "{project.currentPiece}"
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[11px] font-mono-tech text-[#171717]/60">
                        <span>Latest piece on the tree</span>
                        <span className="font-bold text-[#635BFF]">Pass it on →</span>
                      </div>
                    </div>

                    {/* Media Container: Visual / Audio Preview */}
                    <div 
                      onClick={() => onSelectProject(project)}
                      className="relative rounded-2xl overflow-hidden border border-[#DDD9D0] mb-4 bg-stone-100 group cursor-pointer shadow-subtle"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 sm:h-80 object-cover group-hover:scale-[1.045] transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />

                      {/* Floating Badge on Media */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full border border-[#DDD9D0] text-[10px] font-sans-clean font-bold uppercase tracking-wider text-[#181818] shadow-sm">
                          {project.category}
                        </span>
                        {project.liveNow && (
                          <span className="px-2.5 py-1 bg-[#FFB49F] rounded-full border border-[#e8a28d] text-[10px] font-sans-clean font-bold uppercase tracking-wider text-[#181818] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                            Live Room
                          </span>
                        )}
                      </div>

                      {/* Interactive Audio Stems Bar if Music Project */}
                      {isAudio && (
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlayingAudioId(playingAudioId === project.id ? null : project.id);
                          }}
                          className="absolute bottom-3 left-3 right-3 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDD9D0] flex items-center justify-between gap-3 shadow-card"
                        >
                          <div className="flex items-center gap-3">
                              <button className="w-9 h-9 rounded-lg bg-[#6657E8] text-white flex items-center justify-center border border-[#5142d1] shadow-sm cursor-pointer active:scale-95 transition-transform">
                              {playingAudioId === project.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4 translate-x-0.5" />
                              )}
                            </button>
                            <div>
                              <div className="text-xs font-mono-tech font-bold text-[#171717] flex items-center gap-1.5">
                                <Music className="w-3.5 h-3.5 text-[#635BFF]" />
                                <span>STEM PREVIEW: 84 BPM tape Rhodes</span>
                              </div>
                              <div className="text-[10px] font-mono-tech text-[#171717]/60">
                                {playingAudioId === project.id ? 'Playing acoustic stem layer...' : 'Click to preview audio layers'}
                              </div>
                            </div>
                          </div>

                          <span className="text-[10px] font-mono-tech font-bold text-[#635BFF] bg-[#FAF9F6] px-2 py-1 rounded border border-[#171717]/20">
                            + ADD YOUR STEM
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Social Collaboration Stats (Instead of 1283 likes / 84 comments) */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-t border-b border-[#171717]/10 text-xs font-mono-tech">
                      <div className="flex items-center gap-4 text-[#171717]/80">
                        <span className="font-bold text-[#171717] flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-[#635BFF]" />
                          {project.contributorsCount} contributors
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-[#171717]/60" />
                          {project.contributionsCount} pieces
                        </span>
                        <span>·</span>
                        <span className="text-[#6657E8] font-bold">Built on {Math.max(1, project.contributionsCount - 1)}x</span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5">
                          <GitBranch className="w-4 h-4 text-[#171717]/60" />
                          {project.branchesCount} branches
                        </span>
                      </div>

                      {/* Active Contributors overlapping avatars */}
                      <div className="flex items-center -space-x-2">
                        {project.activeContributors?.slice(0, 4).map((c, i) => (
                          <img
                            key={i}
                            src={c.avatar}
                            alt={c.name}
                            className="w-6 h-6 rounded-full border-2 border-white object-cover"
                            title={c.name}
                            referrerPolicy="no-referrer"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Action Bar (The RELAY Engagement Model) */}
                    <div className="pt-4 flex flex-wrap items-center justify-between gap-2.5">
                      
                      {/* PRIMARY SOCIAL CTA: BUILD ON THIS */}
                      <button
                        onClick={() => onContinueProject(project)}
                        data-cursor="action"
                        className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#6657E8] hover:bg-[#5142d1] text-white text-xs font-sans-clean font-bold rounded-xl border border-[#5142d1] shadow-card hover:shadow-card-purple transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>
                          {isRemix ? 'VIEW REMIX ⚡' : `${contributionLabel} →`}
                        </span>
                      </button>

                      {/* Secondary Actions: Remix, Project Discuss, Share */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onRemixProject(project)}
                          title="Remix this project"
                          className="px-3 py-2 bg-white hover:bg-[#FFE28A] text-[#181818] text-xs font-sans-clean font-bold rounded-xl border border-[#DDD9D0] shadow-subtle transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <GitBranch className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Remix</span>
                        </button>

                        <button
                          onClick={() => onOpenProjectChat(project)}
                          title="Open Project Discussion"
                          className="px-3 py-2 bg-white hover:bg-[#8FD8FF] text-[#181818] text-xs font-sans-clean font-bold rounded-xl border border-[#DDD9D0] shadow-subtle transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Discuss</span>
                        </button>

                        <button
                          onClick={() => handleShare(project.id, project.title)}
                          title="Share seed link"
                          className="p-2 bg-white hover:bg-[#B8A7FF] text-[#181818] rounded-xl border border-[#DDD9D0] shadow-subtle transition-all cursor-pointer"
                        >
                          {copiedShareId === project.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Right Rail: Social Suggestions & Live Activity (4 cols on lg) */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-24">
          
          {/* User Quick Identity Pill */}
          <div className="bg-white rounded-3xl border-2 border-[#171717] p-5 shadow-sticker-sm">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#171717]"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-display font-bold text-base text-[#171717]">
                  {currentUser.name}
                </h4>
                <p className="text-xs font-mono-tech text-[#171717]/60">
                  @{currentUser.username}
                </p>
              </div>
            </div>

            <p className="text-xs font-sans-clean text-[#171717]/70 leading-relaxed mb-4">
              {currentUser.bio}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#171717]/10 text-center">
              <div className="p-2 rounded-xl bg-[#FAF9F6] border border-[#171717]/10">
                <span className="block font-display font-black text-base text-[#171717]">
                  {currentUser.followingCount + followingUserIds.length - 1}
                </span>
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#171717]/60">
                  Following
                </span>
              </div>
              <div className="p-2 rounded-xl bg-[#FAF9F6] border border-[#171717]/10">
                <span className="block font-display font-black text-base text-[#171717]">
                  {currentUser.contributionsCount}
                </span>
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#171717]/60">
                  Pieces Built
                </span>
              </div>
            </div>
          </div>

          {/* Creators to Follow */}
          <div className="bg-white rounded-3xl border-2 border-[#171717] p-5 shadow-sticker-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm text-[#171717] flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#FFC7B5]" />
                <span>Creators to Follow</span>
              </h3>
            </div>

            <div className="space-y-4">
              {recommendedCreators.map((creator) => {
                const creatorId = creator.id!;
                const isFollowing = followingUserIds.includes(creatorId);

                return (
                  <div key={creator.id} className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectCreator(creator)}
                      className="flex items-center gap-2.5 text-left group cursor-pointer"
                    >
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#171717] group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-display font-bold text-[#171717] group-hover:text-[#635BFF] transition-colors">
                          {creator.name}
                        </div>
                        <div className="text-[10px] font-mono-tech text-[#171717]/50 truncate max-w-[120px]">
                          @{creator.username}
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => onToggleFollow(creatorId)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-mono-tech font-bold border border-[#171717] transition-all cursor-pointer ${
                        isFollowing
                          ? 'bg-[#C7EBDD] text-[#171717]'
                          : 'bg-[#FAF9F6] hover:bg-[#FFE49A] text-[#171717]'
                      }`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trending Sparks */}
          <div className="bg-white rounded-3xl border-2 border-[#171717] p-5 shadow-sticker-sm">
            <h3 className="font-display font-bold text-sm text-[#171717] mb-3 flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#635BFF]" />
              <span>Trending Sparks</span>
            </h3>

            <div className="space-y-2.5">
              {[
                { tag: '#urbanlore', count: '14 branches open', category: 'Story' },
                { tag: '#tapeloops', count: '8 audio stems', category: 'Music' },
                { tag: '#speculativeai', count: '19 remixes active', category: 'Idea' },
                { tag: '#risocollage', count: '11 visual seeds', category: 'Visual' },
              ].map((spark, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-[#FAF9F6] hover:bg-[#BFE3FF]/30 border border-[#171717]/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-mono-tech font-bold text-[#171717]">
                    <span>{spark.tag}</span>
                    <span className="text-[10px] text-[#635BFF] bg-white px-1.5 py-0.5 rounded border border-[#171717]/20">
                      {spark.category}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono-tech text-[#171717]/60 mt-0.5">
                    {spark.count}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
};
