import React from 'react';
import { motion } from 'motion/react';

interface BrandedLoaderProps {
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandedLoader: React.FC<BrandedLoaderProps> = ({
  label = 'Weaving lines...',
  sublabel = 'Passing the baton to the next contributor',
  size = 'md',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Three Illustrated Relay Cards Passing in a continuous loop */}
      <div className="relative w-36 h-16 flex items-center justify-center mb-3">
        {/* Card 1: Lavender */}
        <motion.div
          animate={{
            x: [-30, 0, 30, -30],
            y: [0, -8, 0, 0],
            rotate: [-6, 2, 6, -6],
            scale: [0.9, 1.05, 0.9, 0.9],
            zIndex: [1, 3, 2, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-9 h-12 bg-[#B9A7FF] border-2 border-[#202124] rounded-lg shadow-sticker-sm flex flex-col justify-between p-1"
        >
          <div className="w-3 h-0.5 bg-[#202124] rounded" />
          <div className="w-full h-0.5 bg-[#202124]/30" />
          <div className="w-2 h-0.5 bg-[#202124]/30" />
        </motion.div>

        {/* Card 2: Butter Yellow */}
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [-8, 0, 0, -8],
            rotate: [2, 6, -6, 2],
            scale: [1.05, 0.9, 0.9, 1.05],
            zIndex: [3, 2, 1, 3],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-9 h-12 bg-[#FFE38A] border-2 border-[#202124] rounded-lg shadow-sticker-sm flex flex-col justify-between p-1"
        >
          <div className="w-3 h-0.5 bg-[#202124] rounded" />
          <div className="w-full h-0.5 bg-[#202124]/30" />
          <div className="w-2 h-0.5 bg-[#202124]/30" />
        </motion.div>

        {/* Card 3: Mint Green */}
        <motion.div
          animate={{
            x: [30, -30, 0, 30],
            y: [0, 0, -8, 0],
            rotate: [6, -6, 2, 6],
            scale: [0.9, 0.9, 1.05, 0.9],
            zIndex: [2, 1, 3, 2],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-9 h-12 bg-[#A8E6CF] border-2 border-[#202124] rounded-lg shadow-sticker-sm flex flex-col justify-between p-1"
        >
          <div className="w-3 h-0.5 bg-[#202124] rounded" />
          <div className="w-full h-0.5 bg-[#202124]/30" />
          <div className="w-2 h-0.5 bg-[#202124]/30" />
        </motion.div>
      </div>

      {/* Label and description */}
      <span className="font-serif-editorial font-bold text-base text-[#202124] tracking-tight block">
        {label}
      </span>
      {sublabel && (
        <span className="text-[11px] font-mono-tech text-[#777777] mt-0.5 block max-w-xs">
          {sublabel}
        </span>
      )}
    </div>
  );
};
