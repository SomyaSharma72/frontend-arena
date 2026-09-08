import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { Sparkles, ArrowRight, Zap, Flame, Compass, HelpCircle } from 'lucide-react';

interface DiscoverViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenCreate: () => void;
  onContinueProject: (project: Project) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  projects,
  onSelectProject,
  onOpenCreate,
  onContinueProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter projects if category selected
  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Curated subsets
  const activeNow = filtered.filter(p => p.liveNow).slice(0, 4);
  const needsContribution = filtered.filter(p => p.contributionsCount < 45).slice(0, 4);
  const popular = [...filtered].sort((a, b) => b.branchesCount - a.branchesCount).slice(0, 4);
  const strangeThings = filtered.filter(p =>
    ['challenge', 'idea', 'visual'].includes(p.category) &&
    (p.title.includes('STRANGE') || p.title.includes('STARTUP') || p.title.includes('GRAVITY') || p.title.includes('MONSTERS') || p.title.includes('TAROT') || p.title.includes('NOUNS') || p.title.includes('MARS') || p.title.includes('TIKTOK'))
  ).slice(0, 4);
  const newSeeds = [...filtered].slice(-4).reverse();

  const categories = [
    { id: 'all', label: 'All Artifacts', icon: '✦' },
    { id: 'story', label: 'Stories', icon: '📖' },
    { id: 'idea', label: 'Ideas', icon: '💡' },
    { id: 'visual', label: 'Visuals', icon: '🎨' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'challenge', label: 'Challenges', icon: '⚡' },
  ];

  return (
    <div className="w-full py-8 space-y-12 bg-[#F7F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Discover Header */}
        <div className="p-6 sm:p-8 bg-white border-2 border-[#202124] rounded-2xl shadow-sticker-lg mb-8 relative">
          <div className="washi-tape-mint absolute -top-3 left-8 w-28 h-5 border border-[#202124]/20 rotate-[-1deg]" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFE38A] border border-[#202124] rounded-full text-xs font-mono-tech font-bold text-[#202124] mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>VISUAL CURATION</span>
              </div>
              <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-[#202124]">
                Explore by Creative Energy
              </h1>
              <p className="text-sm font-sans-clean text-[#777777] mt-1 max-w-xl">
                Browse projects currently in flight, jump into high-branch debates, or answer strange creative prompts.
              </p>
            </div>

            <button
              onClick={onOpenCreate}
              className="px-5 py-2.5 bg-[#B9A7FF] hover:bg-[#a591fc] text-[#202124] text-xs font-mono-tech font-bold rounded-xl border-2 border-[#202124] shadow-sticker hover:shadow-sticker-lg transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plant New Seed</span>
            </button>
          </div>

          {/* Category Pills inside header */}
          <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-[#202124]/10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-tech font-bold border-2 border-[#202124] transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-[#202124] text-white shadow-sticker-sm'
                    : 'bg-[#F7F5EF] text-[#202124] hover:bg-[#FFE38A]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 01: ACTIVE NOW */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#202124]/10">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#FF8F8F] animate-pulse border border-[#202124]" />
              <h2 className="font-serif-editorial text-2xl font-bold text-[#202124]">
                Active Now
              </h2>
              <span className="text-xs font-mono-tech text-[#777777] hidden sm:inline">
                · makers adding pieces right now
              </span>
            </div>
            <span className="text-xs font-mono-tech font-bold text-[#202124]">
              {activeNow.length} IN FLIGHT
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {activeNow.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative bg-white border-2 border-[#202124] rounded-xl p-4 shadow-sticker hover:shadow-sticker-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 rounded-lg overflow-hidden border border-[#202124] mb-3 bg-[#202124]/5">
                    <img
                      src={project?.image || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop'}
                      alt={project?.title || 'Creative Project'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#FF8F8F] border border-[#202124] text-white text-[10px] font-mono-tech font-bold rounded-full">
                      LIVE LOOP
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#202124] group-hover:text-[#7C5CFF] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-serif-editorial italic text-[#777777] mt-1 line-clamp-2">
                    “{project.currentPiece}”
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#202124]/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono-tech text-[#202124]">
                    <strong>{project.contributorsCount}</strong> makers
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onContinueProject(project);
                    }}
                    className="px-2.5 py-1 bg-[#FFE38A] hover:bg-[#FFD966] text-[#202124] text-xs font-mono-tech font-bold rounded border border-[#202124] shadow-sticker-sm flex items-center gap-1"
                  >
                    <span>CONTINUE</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 02: NEEDS YOUR CONTRIBUTION */}
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#202124]/10">
            <div className="flex items-center gap-2.5">
              <span className="text-base">🌱</span>
              <h2 className="font-serif-editorial text-2xl font-bold text-[#202124]">
                Needs Your Contribution
              </h2>
              <span className="text-xs font-mono-tech text-[#777777] hidden sm:inline">
                · seeds waiting for the next sentence, stem, or spark
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {needsContribution.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative bg-[#FFE38A]/20 border-2 border-[#202124] rounded-xl p-4 shadow-sticker hover:shadow-sticker-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 rounded-lg overflow-hidden border border-[#202124] mb-3 bg-[#202124]/5">
                    <img
                      src={project?.image || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop'}
                      alt={project?.title || 'Creative Project'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#FFE38A] border border-[#202124] text-[#202124] text-[10px] font-mono-tech font-bold rounded-full">
                      OPEN PROMPT
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#202124] group-hover:text-[#7C5CFF] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-serif-editorial italic text-[#777777] mt-1 line-clamp-2">
                    “{project.currentPiece}”
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#202124]/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono-tech text-[#777777]">
                    {project.categoryLabel}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onContinueProject(project);
                    }}
                    className="px-2.5 py-1 bg-[#B9A7FF] hover:bg-[#a591fc] text-[#202124] text-xs font-mono-tech font-bold rounded border border-[#202124] shadow-sticker-sm flex items-center gap-1"
                  >
                    <span>ADD PIECE</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 03: STRANGE THINGS PEOPLE ARE MAKING */}
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#202124]/10">
            <div className="flex items-center gap-2.5">
              <span className="text-base">🔮</span>
              <h2 className="font-serif-editorial text-2xl font-bold text-[#202124]">
                Strange Things People Are Making
              </h2>
              <span className="text-xs font-mono-tech text-[#777777] hidden sm:inline">
                · zero commercial utility, 100% wild imagination
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {strangeThings.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative bg-[#D8CCFF]/30 border-2 border-[#202124] rounded-xl p-4 shadow-sticker hover:shadow-sticker-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 rounded-lg overflow-hidden border border-[#202124] mb-3 bg-[#202124]/5">
                    <img
                      src={project?.image || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop'}
                      alt={project?.title || 'Creative Project'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#D8CCFF] border border-[#202124] text-[#202124] text-[10px] font-mono-tech font-bold rounded-full">
                      ANOMALY
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#202124] group-hover:text-[#7C5CFF] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-serif-editorial italic text-[#777777] mt-1 line-clamp-2">
                    “{project.currentPiece}”
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#202124]/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono-tech text-[#202124]">
                    <strong>{project.branchesCount}</strong> branches
                  </span>
                  <span className="text-xs font-mono-tech font-bold text-[#202124] group-hover:underline">
                    VIEW TREE ➔
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 04: POPULAR BRANCHES */}
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#202124]/10">
            <div className="flex items-center gap-2.5">
              <span className="text-base">🌟</span>
              <h2 className="font-serif-editorial text-2xl font-bold text-[#202124]">
                Most Branched & Remixed
              </h2>
              <span className="text-xs font-mono-tech text-[#777777] hidden sm:inline">
                · high divergence & alternative storylines
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popular.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative bg-white border-2 border-[#202124] rounded-xl p-4 shadow-sticker hover:shadow-sticker-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 rounded-lg overflow-hidden border border-[#202124] mb-3 bg-[#202124]/5">
                    <img
                      src={project?.image || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop'}
                      alt={project?.title || 'Creative Project'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#8ED8FF] border border-[#202124] text-[#202124] text-[10px] font-mono-tech font-bold rounded-full">
                      🔥 {project.branchesCount} FORKS
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#202124] group-hover:text-[#7C5CFF] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-serif-editorial italic text-[#777777] mt-1 line-clamp-2">
                    “{project.currentPiece}”
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#202124]/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono-tech text-[#202124]">
                    <strong>{project.remixesCount}</strong> remixes
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onContinueProject(project);
                    }}
                    className="px-2.5 py-1 bg-[#A8E6CF] hover:bg-[#8ee0c3] text-[#202124] text-xs font-mono-tech font-bold rounded border border-[#202124] shadow-sticker-sm flex items-center gap-1"
                  >
                    <span>REMIX</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
