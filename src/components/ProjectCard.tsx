import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, GitBranch } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  onContinueQuick?: (project: Project, e: React.MouseEvent) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  onContinueQuick,
  index,
}) => {
  const { cardStyle } = project;

  // Washi tape color helper
  const getTapeClass = () => {
    switch (cardStyle.tapeColor) {
      case 'lavender':
        return 'washi-tape-lavender';
      case 'mint':
        return 'washi-tape-mint';
      case 'peach':
        return 'washi-tape-peach';
      default:
        return 'washi-tape';
    }
  };

  // Subtle rotation jitter for scrapbook feel
  const rotations = [-0.6, 0.7, -0.4, 0.5, 0];
  const initialRotation = rotations[index % rotations.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.3) }}
      whileHover={{
        y: -5,
        rotate: 0,
        transition: { type: 'spring', stiffness: 350, damping: 22 }
      }}
      onClick={() => onSelect(project)}
      data-project-card="true"
      data-cursor="card"
      data-cursor-text="OPEN"
      className="group relative rounded-2xl border border-[#DDD9D0] shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between select-none before:absolute before:inset-0 before:-translate-x-full group-hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:transition-transform before:duration-700 before:pointer-events-none before:z-30 after:absolute after:bottom-0 after:left-5 after:right-5 after:h-1 after:rounded-full after:bg-[var(--card-accent)] after:opacity-0 group-hover:after:opacity-80 after:transition-opacity after:duration-300"
      style={{
        backgroundColor: cardStyle.bg || '#FFFFFF',
        ['--card-accent' as string]: cardStyle.accent || '#6657E8',
        transform: `rotate(${initialRotation}deg)`,
      }}
    >
      {/* Corner Washi Tape Motif */}
      <div
        className={`absolute -top-3 right-6 w-20 h-5.5 border border-[#202124]/20 rotate-[3deg] z-20 pointer-events-none ${getTapeClass()}`}
      />

      {/* Top Image Area */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#202124]/5 border-b border-[#DDD9D0]">
        <img
          src={project?.image || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop'}
          alt={project?.title || 'Creative Project'}
          className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-[1.02] transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Sticker Badge on top left */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span
            className="text-[11px] font-sans-clean font-bold px-2.5 py-0.5 rounded-full border border-white/70 shadow-sm tracking-wide uppercase"
            style={{
              backgroundColor: cardStyle.badgeBg || '#FFFFFF',
              color: cardStyle.badgeText || '#202124',
            }}
          >
            {project.categoryLabel}
          </span>

          {cardStyle.sticker && (
            <span className="text-[10px] font-sans-clean font-bold px-2 py-0.5 rounded bg-white/90 border border-[#DDD9D0] shadow-sm text-[#202124]">
              {cardStyle.sticker}
            </span>
          )}
        </div>

        {/* Live Now indicator */}
        {project.liveNow && (
          <div className="absolute bottom-2.5 right-3 px-2 py-0.5 bg-white/95 backdrop-blur-sm border border-[#DDD9D0] rounded-full text-[10px] font-sans-clean font-bold text-[#202124] flex items-center gap-1 shadow-sm">
            <span className="relay-live-dot w-1.5 h-1.5 rounded-full bg-[#FF8F8F]" />
            <span>LIVE</span>
          </div>
        )}
      </div>

      {/* Card Body: Title, Excerpt, Metadata & Primary Action */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3 group-hover:bg-white/45 transition-colors duration-300">
        <div>
          {/* Social Activity Line */}
          <div className="flex items-center gap-1.5 text-[11px] font-sans-clean text-[#77736D] mb-1.5">
            <span className="relay-live-dot w-1.5 h-1.5 rounded-full bg-[var(--card-accent)]" />
            <span className="truncate">{project.recentActivity}</span>
          </div>

          {/* Project Title with refined typography */}
          <h3 className="font-display text-lg sm:text-[1.18rem] font-black text-[#202124] leading-snug tracking-tight group-hover:text-[var(--card-accent)] group-hover:-translate-y-0.5 transition-all duration-300 line-clamp-2">
            {project.title}
          </h3>

          {/* Short Excerpt of current piece */}
          <p className="mt-2 text-xs sm:text-[13px] text-[#202124]/80 font-serif-editorial italic line-clamp-2 leading-relaxed">
            “{project.currentPiece}”
          </p>
        </div>

        {/* Footer Area: Contributor Avatars & One Primary Action Button */}
        <div className="pt-3 border-t border-[#DDD9D0] flex items-center justify-between gap-2">
          {/* Contributor Avatars & Stats */}
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-2">
              {project.activeContributors.slice(0, 3).map((c, i) => (
                <img
                  key={i}
                  src={c.avatar}
                  alt={c.name}
                  className="w-6 h-6 rounded-full border border-white object-cover group-hover:-translate-y-1 transition-transform shadow-sm"
                  style={{ transitionDelay: `${i * 40}ms` }}
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className="text-[11px] font-sans-clean text-[#202124]">
              <span className="font-bold">{project.contributorsCount}</span> makers · <span className="font-bold">{project.contributionsCount}</span> pieces
            </div>
          </div>

          {/* Primary Action Button: [ CONTINUE ] */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onContinueQuick) {
                onContinueQuick(project, e);
              } else {
                onSelect(project);
              }
            }}
            className="group/btn px-3 py-1.5 bg-white hover:bg-[var(--card-accent)] hover:text-[#181818] text-[#202124] text-xs font-bold font-sans-clean rounded-lg border border-[#DDD9D0] shadow-subtle hover:shadow-card transition-all flex items-center gap-1 cursor-pointer shrink-0 active:scale-95"
          >
            <span>CONTINUE</span>
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};
