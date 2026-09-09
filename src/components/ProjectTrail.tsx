import React from 'react';
import { motion } from 'motion/react';
import { GitBranch, Repeat2 } from 'lucide-react';
import { ProjectActivity, TrailEntry } from '../types';

interface ProjectTrailProps {
  trail: TrailEntry[];
  activity: ProjectActivity[];
  onViewTrail?: () => void;
}

const actionLabels: Record<TrailEntry['action'], string> = {
  started: 'Started',
  continued: 'Continued',
  passed: 'Passed it on',
  branched: 'Created a branch',
  remixed: 'Remixed',
  added: 'Added a piece',
};

export const ProjectTrail: React.FC<ProjectTrailProps> = ({ trail, activity, onViewTrail }) => (
  <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-5">
    <section className="bg-white border border-[#DDD9D0] rounded-2xl p-5 sm:p-7 shadow-card">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-[#6657E8]">Social lineage</p>
          <h3 className="font-serif-editorial text-3xl font-bold mt-1">Trail</h3>
        </div>
        <button onClick={onViewTrail} className="text-[10px] font-mono-tech font-bold uppercase px-3 py-2 rounded-lg border border-[#181818] hover:bg-[#FFE28A] cursor-pointer">View trail</button>
      </div>
      <div className="relative pl-1">
        {trail.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.07 }}
            className="relative flex gap-3 min-h-[68px]"
          >
            {index < trail.length - 1 && <span className="absolute left-4 top-9 bottom-0 w-px bg-[#B8A7FF]" />}
            <img src={entry.author.avatar} alt="" className="relative z-10 w-8 h-8 rounded-full object-cover border-2 border-white ring-1 ring-[#181818]" referrerPolicy="no-referrer" />
            <div className="min-w-0 pb-4">
              <div className="flex flex-wrap items-baseline gap-2">
                <strong className="font-display text-sm">{entry.author.name}</strong>
                <span className="text-[10px] font-mono-tech text-[#6657E8] font-bold">{actionLabels[entry.action]}</span>
                <span className="text-[10px] font-mono-tech text-[#77736D]">{entry.timestamp}</span>
              </div>
              {entry.preview && <p className="font-serif-editorial italic text-sm text-[#181818]/70 mt-1 line-clamp-2">{entry.preview}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="bg-[#FFFDF8] border border-[#DDD9D0] rounded-2xl p-5 sm:p-7 shadow-subtle">
      <div className="flex items-center gap-2 mb-5">
        <Repeat2 className="w-4 h-4 text-[#6657E8]" />
        <h3 className="font-display font-black text-lg">Activity</h3>
      </div>
      <div className="space-y-4">
        {activity.map((event) => (
          <div key={event.id} className="flex gap-3 items-start">
            <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: event.accent || '#B8A7FF' }} />
            <div>
              <p className="text-xs font-sans-clean leading-relaxed"><strong>{event.actor.name}</strong> {event.text}</p>
              <span className="text-[10px] font-mono-tech text-[#77736D]">{event.timestamp}</span>
            </div>
          </div>
        ))}
        {activity.length === 0 && <p className="text-xs text-[#77736D]">The next move will appear here.</p>}
      </div>
    </section>
  </div>
);
