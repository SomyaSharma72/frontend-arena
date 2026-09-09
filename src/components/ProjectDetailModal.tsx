import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, GitBranch, Sparkles, Share2, MessageSquare, Check, Users, Send } from 'lucide-react';
import { Project, ContributionNode, Collaborator, ProjectActivity, TrailEntry } from '../types';
import { ContributionTree } from './ContributionTree';
import { ProjectTrail } from './ProjectTrail';

interface ProjectDetailModalProps {
  project: Project;
  treeNodes: ContributionNode[];
  onClose: () => void;
  currentUser: Collaborator;
  onOpenContribution: (node?: ContributionNode, mode?: 'continue' | 'branch' | 'remix') => void;
  onOpenProjectChat?: (project: Project) => void;
  onSelectCreator?: (creator: Collaborator) => void;
  onPassItOn?: () => void;
  trail?: TrailEntry[];
  activity?: ProjectActivity[];
  passedRecipient?: Collaborator | null;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  treeNodes,
  onClose,
  currentUser,
  onOpenContribution,
  onOpenProjectChat,
  onSelectCreator,
  onPassItOn,
  trail = [],
  activity = [],
  passedRecipient,
}) => {
  const [selectedNode, setSelectedNode] = useState<ContributionNode>(
    treeNodes[treeNodes.length - 1] || treeNodes[0]
  );
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-paper-grain text-[#181818]"
    >
      {/* Top Floating Control Bar */}
      <div className="sticky top-0 z-40 bg-[#F8F6F0]/92 backdrop-blur-md border-b border-[#DDD9D0] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-subtle">
        <button
          id="project-detail-back-btn"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#DDD9D0] text-xs font-sans-clean font-bold text-[#181818] hover:bg-[#B8A7FF] shadow-subtle hover:shadow-card transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO GALLERY</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenProjectChat && (
            <button
              onClick={() => onOpenProjectChat(project)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFE28A] hover:bg-[#FFB49F] border border-[#DDD9D0] text-xs font-sans-clean font-bold text-[#181818] shadow-subtle hover:shadow-card transition-all cursor-pointer"
              title="Open project conversation"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PROJECT CHAT</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#DDD9D0] text-xs font-sans-clean font-bold text-[#181818] hover:bg-[#8FD8FF] shadow-subtle transition-all cursor-pointer"
            title="Share project"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'COPIED!' : 'SHARE'}</span>
          </button>

          <button
            id="detail-top-continue-btn"
            onClick={() => onOpenContribution(selectedNode, 'continue')}
            className="px-4 sm:px-5 py-2 rounded-xl bg-[#6657E8] hover:bg-[#5142d1] text-white text-xs font-sans-clean font-bold border border-[#5142d1] shadow-card hover:shadow-card-purple transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>BUILD ON THIS</span>
          </button>
        </div>
      </div>

      {/* Main Project Scrapbook Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Editorial Header Card */}
        <div className="bg-white border border-[#DDD9D0] rounded-2xl p-6 sm:p-10 shadow-card relative overflow-hidden">
          {/* Washi Tape Accent */}
          <div className="washi-tape absolute -top-3.5 left-12 w-32 h-6 border border-[#202124]/20 rotate-[-1.5deg]" />

          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#B8A7FF] border border-[#9d8cf0] rounded-full text-xs font-sans-clean font-bold text-[#181818] uppercase">
                {project.categoryLabel}
              </span>

              {project.liveNow && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF8D91]/20 border border-[#FFB49F] rounded-full text-xs font-sans-clean font-bold text-[#181818]">
                  <span className="w-2 h-2 rounded-full bg-[#FF8F8F] animate-pulse" />
                  LIVE LOOP
                </span>
              )}
            </div>

            <div className="text-xs font-mono-tech text-[#777777]">
              Started {project.createdAt} by <strong className="text-[#202124]">{project.creator.name}</strong>
            </div>
          </div>

          <h1 className="font-serif-editorial text-4xl sm:text-6xl font-bold text-[#202124] tracking-tight leading-[0.95] mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#202124]/85 font-sans-clean leading-relaxed max-w-2xl">
            {project.description}
          </p>

          {/* Social Stats Ribbon */}
          <div className="mt-8 pt-6 border-t border-[#DDD9D0] flex flex-wrap items-center justify-between gap-4 text-xs font-sans-clean">
            <div className="flex flex-wrap items-center gap-5">
              <div>
                <span className="text-[#777777] block text-[10px] uppercase font-bold">Contributors</span>
                <span className="text-xl font-bold text-[#202124]">{project.contributorsCount} makers</span>
              </div>
              <div className="h-8 w-px bg-[#202124]/15 hidden sm:block" />
              <div>
                <span className="text-[#777777] block text-[10px] uppercase font-bold">Contributions</span>
                <span className="text-xl font-bold text-[#202124]">{project.contributionsCount} pieces</span>
              </div>
              <div className="h-8 w-px bg-[#202124]/15 hidden sm:block" />
              <div>
                <span className="text-[#777777] block text-[10px] uppercase font-bold">Branches Forked</span>
                <span className="text-xl font-bold text-[#202124]">{project.branchesCount} forks</span>
              </div>
              <div className="h-8 w-px bg-[#202124]/15 hidden sm:block" />
              <div>
                <span className="text-[#777777] block text-[10px] uppercase font-bold">Remixed</span>
                <span className="text-xl font-bold text-[#202124]">{project.remixesCount} times</span>
              </div>
            </div>

            {/* Recent Social Pulse */}
            <div className="px-3.5 py-1.5 bg-[#FFE28A] border border-[#e4c95d] rounded-xl text-xs font-bold text-[#181818] flex items-center gap-2 shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-[#202124]" />
              <span>{project.recentActivity}</span>
            </div>
          </div>
        </div>

        {/* Current Piece Focus Box with 3 Primary Actions */}
        <div className="bg-white border border-[#DDD9D0] rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#202124]/10 pb-3">
            <span className="text-xs font-mono-tech font-bold uppercase text-[#777777]">
              LATEST CANONICAL LAYER // ACTIVE PIECE
            </span>
            <span className="text-xs font-mono-tech font-bold text-[#202124]">
              STEP #{project.contributionsCount}
            </span>
          </div>

          {project.passedTo && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#FFB49F]/25 border border-[#FFB49F]"
            >
              <div className="flex items-center gap-3">
                <img src={project.passedTo.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-[#181818]" referrerPolicy="no-referrer" />
                <div>
                  <p className="text-sm font-display font-bold">{project.passedBy?.name || 'Someone'} passed this to {project.passedTo.name}.</p>
                  <p className="text-[10px] font-mono-tech text-[#77736D]">The next move belongs to the chain.</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => onOpenContribution(selectedNode, 'continue')} className="px-3 py-2 rounded-lg bg-[#FFE28A] border border-[#181818] text-[10px] font-mono-tech font-bold cursor-pointer">CONTINUE</button>
                <button onClick={() => onOpenContribution(selectedNode, 'branch')} className="px-3 py-2 rounded-lg bg-[#8FD8FF] border border-[#181818] text-[10px] font-mono-tech font-bold cursor-pointer">ANOTHER WAY</button>
              </div>
            </motion.div>
          )}

          <div className="p-6 bg-[#F8F6F0] border border-[#DDD9D0] rounded-xl shadow-subtle">
            <p className="font-serif-editorial text-2xl sm:text-3xl italic text-[#202124] leading-relaxed">
              “{selectedNode ? selectedNode.content : project.currentPiece}”
            </p>
            {selectedNode && (
              <div className="mt-4 pt-3 border-t border-[#202124]/15 flex items-center justify-between text-xs font-mono-tech text-[#777777]">
                <span>Added by <strong className="text-[#202124]">{selectedNode.author.name}</strong></span>
                <span>{selectedNode.timestamp}</span>
              </div>
            )}
          </div>

          {/* 3 Distinct Collaboration Actions: No Likes, No Comments */}
          <div className="pt-2">
            <div className="text-[11px] font-mono-tech font-bold text-[#777777] uppercase tracking-wider mb-3">
              WHAT WOULD YOU ADD? (CHOOSE AN ACTION):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                id="action-btn-continue"
                onClick={() => onOpenContribution(selectedNode, 'continue')}
                className="p-3.5 rounded-xl bg-[#FFE28A] hover:bg-[#FFB49F] border border-[#e4c95d] shadow-subtle hover:shadow-card transition-all text-left cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono-tech font-bold text-[#202124]">✍️ CONTINUE</span>
                  <span className="text-[10px] font-mono-tech text-[#777777]">LINEAR</span>
                </div>
                <p className="text-xs text-[#202124]/80 mt-1 font-sans-clean">
                  Write or drop the next piece in this line.
                </p>
              </button>

              <button
                id="action-btn-branch"
                onClick={() => onOpenContribution(selectedNode, 'branch')}
                className="p-3.5 rounded-xl bg-[#8FD8FF] hover:bg-[#B8A7FF] border border-[#72bfdc] shadow-subtle hover:shadow-card transition-all text-left cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono-tech font-bold text-[#202124]">🌿 CREATE BRANCH</span>
                  <span className="text-[10px] font-mono-tech text-[#777777]">FORK</span>
                </div>
                <p className="text-xs text-[#202124]/80 mt-1 font-sans-clean">
                  Split off an alternate narrative or perspective.
                </p>
              </button>

              <button
                id="action-btn-remix"
                onClick={() => onOpenContribution(selectedNode, 'remix')}
                className="p-3.5 rounded-xl bg-[#A9E3CF] hover:bg-[#CBEF91] border border-[#88cdb4] shadow-subtle hover:shadow-card transition-all text-left cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono-tech font-bold text-[#202124]">🔀 REMIX THIS</span>
                  <span className="text-[10px] font-mono-tech text-[#777777]">SPIN-OFF</span>
                </div>
                <p className="text-xs text-[#202124]/80 mt-1 font-sans-clean">
                  Re-interpret this piece in your own style.
                </p>
              </button>

              {onPassItOn && (
                <button
                  id="action-btn-pass"
                  onClick={onPassItOn}
                  className="p-3.5 rounded-xl bg-[#FFB49F] hover:bg-[#FFE28A] border border-[#e69c88] shadow-subtle hover:shadow-card transition-all text-left cursor-pointer active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono-tech font-bold text-[#202124]">PASS IT ON</span>
                    <Send className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-[#202124]/80 mt-1 font-sans-clean">Hand the next turn to a person.</p>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono-tech font-bold uppercase tracking-wide">
          <span className="px-3 py-1.5 rounded-full bg-[#FFE28A] border border-[#e4c95d]">Built on {Math.max(1, project.contributionsCount - 1)}x</span>
          <span className="px-3 py-1.5 rounded-full bg-[#A9E3CF] border border-[#88cdb4]">Remixed {project.remixesCount}x</span>
          <span className="px-3 py-1.5 rounded-full bg-[#FFB49F] border border-[#e69c88]">Passed to {project.passedCount || 0} people</span>
          <span className="px-3 py-1.5 rounded-full bg-[#8FD8FF] border border-[#72bfdc]">{project.contributorsCount} contributors</span>
        </div>

        {/* Visual Branch Tree Section */}
        <section className="space-y-4">
          <ContributionTree
            nodes={treeNodes}
            selectedNodeId={selectedNode?.id}
            onSelectNode={(node) => setSelectedNode(node)}
            onStartContributionForNode={(node, mode) => onOpenContribution(node, mode)}
          />
        </section>

        <ProjectTrail trail={trail} activity={activity} />

        {/* Project Piece Chronicle (Linear Archive) */}
        <div className="bg-white border border-[#DDD9D0] rounded-2xl p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#202124]/10 pb-3">
            <h3 className="font-serif-editorial text-2xl font-bold text-[#202124]">
              Piece History ({treeNodes.length} Layers)
            </h3>
            <span className="text-xs font-mono-tech text-[#777777]">
              CHRONOLOGICAL ORDER
            </span>
          </div>

          <div className="space-y-3">
            {treeNodes.map((node, i) => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                  selectedNode?.id === node.id
                    ? 'bg-[#F7F5EF] border-[#202124] shadow-sticker-sm'
                    : 'bg-white border-[#DDD9D0] hover:border-[#B8A7FF] hover:shadow-subtle'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono-tech text-xs font-bold text-[#777777] pt-0.5">
                    #{i + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <img
                        src={node.author.avatar}
                        alt={node.author.name}
                        className="w-5 h-5 rounded-full object-cover border border-[#202124]"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-xs font-bold text-[#202124]">
                        {node.author.name}
                      </span>
                      <span className="px-2 py-0.5 bg-[#FFE38A] border border-[#202124] text-[9px] font-mono-tech font-bold rounded uppercase">
                        {node.type}
                      </span>
                      {node.branchName && (
                        <span className="text-[10px] font-mono-tech text-[#777777]">
                          · {node.branchName}
                        </span>
                      )}
                    </div>
                    <p className="font-serif-editorial text-base italic text-[#202124] mt-2">
                      “{node.content}”
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono-tech text-[#777777] shrink-0 self-end sm:self-start">
                  {node.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
