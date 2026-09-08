import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, GitBranch, Shuffle, Send, Check, ArrowRight } from 'lucide-react';
import { Project, ContributionNode, Collaborator } from '../types';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  targetNode?: ContributionNode | null;
  mode?: 'continue' | 'branch' | 'remix';
  currentUser: Collaborator;
  onSubmitContribution: (content: string, type: 'continue' | 'branch' | 'remix', branchLabel: string) => void;
}

export const ContributionModal: React.FC<ContributionModalProps> = ({
  isOpen,
  onClose,
  project,
  targetNode,
  mode = 'continue',
  currentUser,
  onSubmitContribution,
}) => {
  const [contributionType, setContributionType] = useState<'continue' | 'branch' | 'remix'>(mode);
  const [branchLabel, setBranchLabel] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitted(true);
    setTimeout(() => {
      onSubmitContribution(content, contributionType, branchLabel || 'Community Branch');
      setTimeout(() => {
        setIsSubmitted(false);
        setContent('');
        setBranchLabel('');
        onClose();
      }, 700);
    }, 1100);
  };

  const handleQuickPrompt = (promptText: string) => {
    setContent((prev) => (prev ? `${prev} ${promptText}` : promptText));
  };

  const isBranch = contributionType === 'branch';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isSubmitted && onClose()}
          className="fixed inset-0 bg-[#202124]/45 backdrop-blur-sm"
        />

        {/* Scrapbook Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-white border-2 border-[#202124] rounded-2xl p-6 sm:p-8 shadow-sticker-lg overflow-hidden z-10"
        >
          {/* Top Washi Tape Motif */}
          <div className="washi-tape-butter absolute -top-3 left-10 w-28 h-5 border border-[#202124]/20 rotate-[-1deg]" />

          {/* Modal Header */}
          <div className="flex items-start justify-between border-b-2 border-[#202124]/10 pb-4">
            <div>
              <span className="text-[10px] font-mono-tech uppercase font-bold text-[#777777] tracking-wider block mb-1">
                PASS THE BATON // COLLABORATIVE WORKSPACE
              </span>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#202124]">
                {contributionType === 'continue'
                  ? `Continue “${project.title}”`
                  : contributionType === 'branch'
                  ? `Fork an Alternative Branch`
                  : `Remix into a New Piece`}
              </h3>
            </div>

            {!isSubmitted && (
              <button
                id="close-contribution-modal-btn"
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-[#F7F5EF] hover:bg-[#FFE38A] border border-[#202124] flex items-center justify-center text-[#202124] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Success Animated Stage overlay when submitted */}
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 flex flex-col items-center justify-center text-center space-y-5"
            >
              {/* Traveling connecting beam from Adam's avatar into the project */}
              <div className="relative w-full max-w-sm h-28 flex items-center justify-between px-6">
                {/* Adam's avatar */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-full border-2 border-[#202124] shadow-sticker-sm object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[10px] font-mono-tech font-bold text-[#202124] mt-1">
                    {currentUser.name}
                  </span>
                </motion.div>

                {/* Animated traveling line */}
                <div className="flex-1 relative mx-4">
                  <svg className="w-full h-8" viewBox="0 0 160 30" fill="none">
                    {isBranch ? (
                      // Splitting branch line
                      <>
                        <path
                          d="M 10,15 L 60,15 Q 90,15 110,5 L 150,5"
                          stroke="#202124"
                          strokeWidth="2"
                          strokeDasharray="3 3"
                        />
                        <motion.circle
                          cx="150"
                          cy="5"
                          r="4"
                          fill="#8ED8FF"
                          stroke="#202124"
                          strokeWidth="1.5"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                        />
                      </>
                    ) : (
                      // Direct relay line
                      <motion.path
                        d="M 10,15 Q 80,5 150,15"
                        stroke="#202124"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                      />
                    )}
                  </svg>
                </div>

                {/* The new node joining */}
                <motion.div
                  initial={{ scale: 0, rotate: -8 }}
                  animate={{ scale: 1, rotate: 2 }}
                  transition={{ delay: 0.35, type: 'spring', damping: 15 }}
                  className="w-14 h-16 rounded-xl border-2 border-[#202124] shadow-sticker-sm flex flex-col justify-between p-1.5"
                  style={{ backgroundColor: isBranch ? '#8ED8FF' : '#B9A7FF' }}
                >
                  <div className="w-4 h-1 bg-[#202124] rounded-full" />
                  <div className="w-full h-0.5 bg-[#202124]/40 rounded-full" />
                  <span className="text-[8px] font-mono-tech font-bold text-[#202124]">
                    {isBranch ? 'BRANCH' : 'NEW'}
                  </span>
                </motion.div>
              </div>

              {/* Rewarding celebration badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFE38A] border-2 border-[#202124] rounded-full shadow-sticker font-mono-tech font-bold text-xs text-[#202124]"
              >
                <Sparkles className="w-4 h-4 text-[#202124]" />
                <span>{isBranch ? 'New direction started.' : 'Added to the story.'}</span>
              </motion.div>
            </motion.div>
          ) : (
            <>
              {/* Anchor Context: What you are replying to */}
              <div className="mt-4 p-3.5 bg-[#F7F5EF] border border-[#202124] rounded-xl">
                <span className="text-[10px] font-mono-tech uppercase font-bold text-[#777777] block mb-1">
                  CURRENT PIECE TO BUILD ON:
                </span>
                <p className="font-serif-editorial text-sm italic text-[#202124] line-clamp-2">
                  “{targetNode ? targetNode.content : project.currentPiece}”
                </p>
              </div>

              {/* Action Selector Pills */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setContributionType('continue')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-mono-tech font-bold border-2 border-[#202124] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    contributionType === 'continue'
                      ? 'bg-[#FFE38A] shadow-sticker-sm text-[#202124]'
                      : 'bg-white text-[#777777] hover:bg-[#F7F5EF]'
                  }`}
                >
                  <span>✍️ Continue</span>
                </button>

                <button
                  type="button"
                  onClick={() => setContributionType('branch')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-mono-tech font-bold border-2 border-[#202124] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    contributionType === 'branch'
                      ? 'bg-[#8ED8FF] shadow-sticker-sm text-[#202124]'
                      : 'bg-white text-[#777777] hover:bg-[#F7F5EF]'
                  }`}
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Branch</span>
                </button>

                <button
                  type="button"
                  onClick={() => setContributionType('remix')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-mono-tech font-bold border-2 border-[#202124] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    contributionType === 'remix'
                      ? 'bg-[#A8E6CF] shadow-sticker-sm text-[#202124]'
                      : 'bg-white text-[#777777] hover:bg-[#F7F5EF]'
                  }`}
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Remix</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
                {contributionType !== 'continue' && (
                  <div>
                    <label className="block text-[11px] font-mono-tech font-bold text-[#777777] uppercase mb-1">
                      BRANCH NAME OR ANGLE:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Midnight Timeline / Acoustic Stem / 30 Years Later"
                      value={branchLabel}
                      onChange={(e) => setBranchLabel(e.target.value)}
                      className="w-full bg-[#F7F5EF] border-2 border-[#202124] rounded-xl px-3 py-2 text-xs font-mono-tech text-[#202124] placeholder-gray-500 focus:outline-none focus:bg-white"
                    />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono-tech font-bold text-[#777777] uppercase">
                      WHAT WILL YOU ADD NEXT?
                    </label>
                    <span className="text-[10px] font-mono-tech text-[#777777]">
                      {content.length} characters
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    autoFocus
                    placeholder="Write the next line, introduce a twist, drop an image description, or contribute a verse..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-[#F7F5EF] border-2 border-[#202124] rounded-xl p-3.5 text-sm font-serif-editorial text-[#202124] placeholder-gray-500 focus:outline-none focus:bg-white resize-none leading-relaxed"
                  />
                </div>

                {/* Quick Inspiration Sparks */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono-tech text-[#777777]">Sparks:</span>
                  <button
                    type="button"
                    onClick={() => handleQuickPrompt('Suddenly, the power grid flickered.')}
                    className="px-2 py-0.5 bg-white border border-[#202124] rounded text-[10px] font-mono-tech hover:bg-[#FFE38A] transition-colors cursor-pointer"
                  >
                    + Plot Twist
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPrompt('She whispered something nobody else noticed.')}
                    className="px-2 py-0.5 bg-white border border-[#202124] rounded text-[10px] font-mono-tech hover:bg-[#FFE38A] transition-colors cursor-pointer"
                  >
                    + Dialogue
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPrompt('Add heavy analog distortion.')}
                    className="px-2 py-0.5 bg-white border border-[#202124] rounded text-[10px] font-mono-tech hover:bg-[#FFE38A] transition-colors cursor-pointer"
                  >
                    + Sonic Texture
                  </button>
                </div>

                {/* Submitter Info & CTA */}
                <div className="flex items-center justify-between pt-3 border-t-2 border-[#202124]/10">
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-[#777777]">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-5 h-5 rounded-full object-cover border border-[#202124]"
                      referrerPolicy="no-referrer"
                    />
                    <span>Adding as <strong className="text-[#202124]">{currentUser.name}</strong></span>
                  </div>

                  <button
                    id="submit-contribution-btn"
                    type="submit"
                    disabled={!content.trim()}
                    className="px-5 py-2 rounded-xl font-mono-tech text-xs font-bold border-2 border-[#202124] bg-[#B9A7FF] hover:bg-[#FFE38A] text-[#202124] shadow-sticker hover:shadow-sticker-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>ADD PIECE</span>
                  </button>
                </div>
              </form>
            </>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
