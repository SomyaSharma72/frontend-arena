import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '../types';
import { ProjectCard } from './ProjectCard';
import { Sparkles, SlidersHorizontal, Layers, Flame } from 'lucide-react';

interface ProjectGalleryProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onContinueProject: (project: Project) => void;
  searchQuery: string;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  onSelectProject,
  onContinueProject,
  searchQuery,
  selectedCategory,
  onSelectCategory,
}) => {
  const [filterTag, setFilterTag] = useState<'all' | 'needs-piece' | 'active' | 'trending'>('all');
  const [sortBy, setSortBy] = useState<'activity' | 'contributors' | 'branches'>('activity');

  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        // Category check
        const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;

        // Search check
        const matchesSearch =
          !searchQuery ||
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.currentPiece.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

        // Tag filter check
        let matchesTag = true;
        if (filterTag === 'needs-piece') {
          matchesTag = p.contributionsCount < 40;
        } else if (filterTag === 'active') {
          matchesTag = !!p.liveNow;
        } else if (filterTag === 'trending') {
          matchesTag = p.contributorsCount > 25;
        }

        return matchesCat && matchesSearch && matchesTag;
      })
      .sort((a, b) => {
        if (sortBy === 'contributors') {
          return b.contributorsCount - a.contributorsCount;
        }
        if (sortBy === 'branches') {
          return b.branchesCount - a.branchesCount;
        }
        return (b.liveNow ? 1 : 0) - (a.liveNow ? 1 : 0);
      });
  }, [projects, selectedCategory, searchQuery, filterTag, sortBy]);

  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Subheader: Title, Filter Chips & Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-[#202124]/10">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#202124]">
                The Community Gallery
              </h2>
              <span className="px-2.5 py-0.5 bg-[#FFE38A] border border-[#202124] rounded-full text-xs font-mono-tech font-bold text-[#202124]">
                {filteredProjects.length} ITEMS
              </span>
            </div>
            <p className="text-xs font-mono-tech text-[#777777] mt-0.5">
              Every project is an open invitation. Click any card to view its tree or add a piece.
            </p>
          </div>

          {/* Quick Filter Tags & Sorting */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Tag Pills */}
            <div className="inline-flex bg-white p-1 rounded-xl border-2 border-[#202124] shadow-sticker-sm text-xs font-mono-tech font-bold">
              <button
                onClick={() => setFilterTag('all')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filterTag === 'all' ? 'bg-[#202124] text-white' : 'text-[#202124] hover:bg-[#F7F5EF]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterTag('active')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filterTag === 'active' ? 'bg-[#202124] text-white' : 'text-[#202124] hover:bg-[#F7F5EF]'
                }`}
              >
                ⚡ Active
              </button>
              <button
                onClick={() => setFilterTag('needs-piece')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filterTag === 'needs-piece' ? 'bg-[#202124] text-white' : 'text-[#202124] hover:bg-[#F7F5EF]'
                }`}
              >
                🌱 Needs Piece
              </button>
              <button
                onClick={() => setFilterTag('trending')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filterTag === 'trending' ? 'bg-[#202124] text-white' : 'text-[#202124] hover:bg-[#F7F5EF]'
                }`}
              >
                🔥 Trending
              </button>
            </div>

            {/* Sort Toggle */}
            <div className="inline-flex bg-white p-1 rounded-xl border-2 border-[#202124] shadow-sticker-sm text-xs font-mono-tech font-bold">
              <button
                onClick={() => setSortBy('activity')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  sortBy === 'activity' ? 'bg-[#B9A7FF] text-[#202124]' : 'text-[#777777] hover:text-[#202124]'
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setSortBy('contributors')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  sortBy === 'contributors' ? 'bg-[#B9A7FF] text-[#202124]' : 'text-[#777777] hover:text-[#202124]'
                }`}
              >
                Makers
              </button>
              <button
                onClick={() => setSortBy('branches')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  sortBy === 'branches' ? 'bg-[#B9A7FF] text-[#202124]' : 'text-[#777777] hover:text-[#202124]'
                }`}
              >
                Forks
              </button>
            </div>
          </div>
        </div>

        {/* The Visual Grid: responsive columns */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center bg-white border-2 border-dashed border-[#202124]/30 rounded-2xl p-8 my-8">
            <p className="font-serif-editorial text-2xl italic text-[#202124]">
              No seeds matched this criteria.
            </p>
            <p className="text-xs font-mono-tech text-[#777777] mt-1">
              Try resetting your category or search query to see all 27 projects.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setFilterTag('all');
              }}
              className="mt-4 px-4 py-2 bg-[#FFE38A] border-2 border-[#202124] rounded-xl text-xs font-mono-tech font-bold shadow-sticker-sm hover:shadow-sticker transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
                onContinueQuick={() => onContinueProject(project)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
