import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { Project, ProjectCategory, Collaborator } from '../types';

interface CreateProjectViewProps {
  currentUser: Collaborator;
  onCreateProject: (newProject: Project) => void;
  onCancel: () => void;
}

export const CreateProjectView: React.FC<CreateProjectViewProps> = ({
  currentUser,
  onCreateProject,
  onCancel,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('story');
  const [title, setTitle] = useState('');
  const [firstPiece, setFirstPiece] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryTypes = [
    {
      id: 'story' as ProjectCategory,
      name: 'Story',
      subtitle: 'Opening line or scene',
      placeholder: '“The lighthouse beam stopped rotating at 03:00, locked onto an empty boat...”',
      defaultImg: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop',
      bg: '#FFFDF9',
      tape: 'butter' as const,
      icon: '📖',
    },
    {
      id: 'idea' as ProjectCategory,
      name: 'Idea',
      subtitle: 'First radical proposal',
      placeholder: '“What if currency was pegged to the cubic meters of clean water restored to river basins?”',
      defaultImg: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
      bg: '#FFF9E6',
      tape: 'butter' as const,
      icon: '💡',
    },
    {
      id: 'visual' as ProjectCategory,
      name: 'Visual',
      subtitle: 'Concept or moodboard',
      placeholder: '“A brutalist concrete flower stand on a rainy street in Tokyo, illuminated by neon pink tulips.”',
      defaultImg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
      bg: '#F5F0FF',
      tape: 'lavender' as const,
      icon: '🎨',
    },
    {
      id: 'music' as ProjectCategory,
      name: 'Music',
      subtitle: 'Stems or chord loop',
      placeholder: '“84 BPM tape-decay Rhodes chords with rain on greenhouse mic. Needs clarinet or lead synth.”',
      defaultImg: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
      bg: '#EAF7F0',
      tape: 'mint' as const,
      icon: '🎵',
    },
    {
      id: 'challenge' as ProjectCategory,
      name: 'Challenge',
      subtitle: 'Creative constraint',
      placeholder: '“Write a short story where every sentence begins with the last letter of the preceding sentence.”',
      defaultImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      bg: '#FFF0ED',
      tape: 'peach' as const,
      icon: '⚡',
    },
  ];

  const activeCategory = categoryTypes.find((c) => c.id === selectedCategory) || categoryTypes[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !firstPiece.trim()) return;

    setIsSubmitting(true);

    const projectId = `proj-${Date.now()}`;
    const newProject: Project = {
      id: projectId,
      title: title.trim().toUpperCase(),
      category: selectedCategory,
      categoryLabel: activeCategory.name,
      description: `A new ${selectedCategory} seed started by ${currentUser.name}. Open for anyone to build on.`,
      currentPiece: firstPiece.trim(),
      image: activeCategory.defaultImg,
      cardStyle: {
        bg: activeCategory.bg,
        accent: '#635BFF',
        border: '#171717',
        tapeColor: activeCategory.tape,
        sticker: '🌱 NEW SEED',
        badgeBg: '#FFE49A',
        badgeText: '#171717',
        layout: 'standard',
      },
      contributorsCount: 1,
      contributionsCount: 1,
      branchesCount: 0,
      remixesCount: 0,
      liveNow: true,
      activeContributors: [currentUser],
      creator: currentUser,
      createdAt: 'Just now',
      lastActive: 'Just now',
      treeRootNodeId: `${projectId}-root`,
      recentActivity: `${currentUser.name} planted this seed`,
      tags: [activeCategory.name, 'Community', 'New Seed'],
    };

    setTimeout(() => {
      onCreateProject(newProject);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="w-full py-10 bg-[#FAF9F6]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Simple, modern composer card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-[#171717] rounded-3xl p-6 sm:p-8 shadow-sticker relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#171717]/10 mb-6">
            <div>
              <span className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-[#635BFF] block mb-1">
                RELAY COMPOSER
              </span>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-[#171717] tracking-tight">
                Start something.
              </h1>
              <p className="text-xs font-sans-clean text-[#171717]/60 mt-1">
                Share an unfinished thought. The community will build the rest.
              </p>
            </div>

            <button
              onClick={onCancel}
              className="p-2 rounded-full hover:bg-[#FAF9F6] text-[#171717]/60 hover:text-[#171717] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Category Selector: Story, Idea, Visual, Music, Challenge */}
            <div>
              <label className="block text-xs font-mono-tech font-bold uppercase tracking-wider text-[#171717]/60 mb-2.5">
                Select Format
              </label>

              <div className="grid grid-cols-5 gap-2">
                {categoryTypes.map((cat) => {
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#FFE49A] border-[#171717] shadow-sticker-sm scale-105'
                          : 'bg-[#FAF9F6] hover:bg-white border-[#171717]/20 text-[#171717]/70'
                      }`}
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span className="font-display font-bold text-xs text-[#171717]">
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-xs font-mono-tech font-bold uppercase tracking-wider text-[#171717]/60 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. THE CITY WITHOUT NAMES"
                className="w-full bg-[#FAF9F6] border-2 border-[#171717] rounded-2xl px-4 py-3 text-sm sm:text-base font-display font-bold text-[#171717] placeholder-[#171717]/35 focus:outline-none focus:border-[#635BFF] focus:bg-white transition-all shadow-sticker-sm uppercase"
              />
            </div>

            {/* Opening Piece / Spark Textarea */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#171717]/60">
                  Initial Piece / Stems
                </label>
                <span className="text-[11px] font-mono-tech text-[#171717]/50">
                  {firstPiece.length} characters
                </span>
              </div>

              <textarea
                value={firstPiece}
                onChange={(e) => setFirstPiece(e.target.value)}
                placeholder={activeCategory.placeholder}
                rows={4}
                className="w-full bg-[#FAF9F6] border-2 border-[#171717] rounded-2xl p-4 text-sm font-serif-editorial text-[#171717] placeholder-[#171717]/40 focus:outline-none focus:border-[#635BFF] focus:bg-white transition-all shadow-sticker-sm leading-relaxed"
              />
            </div>

            {/* Submit & Cancel Actions */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 rounded-xl border border-[#171717]/30 text-xs font-mono-tech font-bold text-[#171717] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!title.trim() || !firstPiece.trim() || isSubmitting}
                className="px-6 py-3 bg-[#635BFF] hover:bg-[#5249ea] disabled:opacity-40 disabled:hover:bg-[#635BFF] text-white text-xs font-mono-tech font-bold rounded-xl border-2 border-[#171717] shadow-sticker-sm hover:shadow-sticker transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'Planting Seed...' : 'START SOMETHING →'}</span>
              </button>
            </div>

          </form>
        </motion.div>

      </div>
    </div>
  );
};
