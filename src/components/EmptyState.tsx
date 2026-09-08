import React from 'react';
import { motion } from 'motion/react';
import { Plus, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Someone has to start.',
  subtitle = 'Every sprawling epic, modular chord track, and strange invention begins with a single line.',
  actionText = 'Start something',
  onAction,
}) => {
  return (
    <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center">
      {/* Editorial Illustration: Unfinished paper with quill / drifting leaf */}
      <div className="relative w-40 h-32 flex items-center justify-center mb-6">
        {/* Shadow card underneath */}
        <div className="absolute w-28 h-36 bg-[#202124] rounded-xl rotate-[-4deg] translate-y-1 translate-x-1 opacity-20" />

        {/* Main unfinished paper card */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [2, -1, 2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-28 h-36 bg-white border-2 border-[#202124] rounded-xl shadow-sticker p-3 flex flex-col justify-between"
        >
          {/* Top washi tape */}
          <div className="washi-tape-butter absolute -top-2 left-6 w-14 h-4 border border-[#202124]/20 rotate-[-2deg]" />

          <div className="space-y-1.5 pt-2">
            <div className="w-8 h-1.5 bg-[#FFE38A] rounded-full" />
            <div className="w-full h-1 bg-[#202124]/20 rounded-full" />
            <div className="w-4/5 h-1 bg-[#202124]/20 rounded-full" />
            {/* Blinking cursor line indicating unfinished thought */}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1.5 h-3 bg-[#202124] inline-block mt-1"
            />
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono-tech font-bold text-[#777777]">
            <span>PAGE 01</span>
            <span>✦</span>
          </div>
        </motion.div>

        {/* Floating Quill / Pen SVG */}
        <motion.div
          animate={{
            rotate: [0, 8, 0],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-1 -right-2 w-10 h-10"
        >
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-sm">
            <path
              d="M 5,35 Q 20,25 35,5 C 28,15 25,25 20,30 Z"
              fill="#FFE38A"
              stroke="#202124"
              strokeWidth="2"
            />
            <path d="M 5,35 L 12,32" stroke="#202124" strokeWidth="2" />
          </svg>
        </motion.div>
      </div>

      {/* Narrative Headline */}
      <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight max-w-md">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-[#777777] font-sans-clean max-w-sm leading-relaxed">
        {subtitle}
      </p>

      {/* Action Button */}
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="mt-6 px-6 py-2.5 bg-[#202124] text-white hover:bg-[#FFE38A] hover:text-[#202124] border-2 border-[#202124] rounded-xl text-xs font-mono-tech font-bold tracking-wider uppercase shadow-sticker transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFE38A]" />
          <span>{actionText}</span>
        </motion.button>
      )}
    </div>
  );
};
