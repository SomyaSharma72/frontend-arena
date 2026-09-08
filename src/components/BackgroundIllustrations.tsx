import React from 'react';
import { motion } from 'motion/react';

interface BackgroundIllustrationsProps {
  variant?: 'hero' | 'gallery' | 'ambient';
}

export const BackgroundIllustrations: React.FC<BackgroundIllustrationsProps> = ({ variant = 'ambient' }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* 1. Subtle Paper Sheet / Mini Card Drifting in upper quadrant */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-16 right-[7%] hidden xl:block opacity-45"
      >
        <div className="w-16 h-22 bg-[#FFE28A] border border-[#DDD9D0] rounded-xl shadow-subtle p-2 flex flex-col justify-between">
          <div className="w-4 h-1 bg-[#181818]/70 rounded" />
          <div className="space-y-1">
            <div className="w-full h-0.5 bg-[#181818]/30 rounded-full" />
            <div className="w-4/5 h-0.5 bg-[#181818]/30 rounded-full" />
          </div>
          <span className="text-[7px] font-mono-tech font-bold text-[#181818]">SEED ✦</span>
        </div>
      </motion.div>

      {/* 2. Floating Lavender Sparkle / 4-point Star */}
      <motion.div
        animate={{
          scale: [0.9, 1.2, 0.9],
          rotate: [0, 90, 180, 270, 360],
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-28 left-[4%] hidden lg:block"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
            fill="#B8A7FF"
            stroke="#6657E8"
            strokeWidth="1.2"
          />
        </svg>
      </motion.div>

      {/* 3. Tiny Coral Star floating near center */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          y: [0, -8, 0],
          opacity: [0.4, 0.75, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
        className="absolute top-[42%] right-[14%] hidden 2xl:block"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L14 9.5L21.5 12L14 14.5L12 22L10 14.5L2.5 12L10 9.5L12 2Z"
            fill="#FF8D91"
            stroke="#E11D48"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* 4. Subtle Playful Relay Arrow Drawing Loop */}
      <div className="absolute top-[26%] left-[2%] hidden 2xl:block opacity-40">
        <svg width="110" height="75" viewBox="0 0 110 75" fill="none">
          <motion.path
            d="M 12,65 C 32,15 75,15 92,48"
            stroke="#6657E8"
            strokeWidth="1.8"
            strokeDasharray="4 4"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -32] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <path
            d="M 87,51 L 95,50 L 93,42"
            stroke="#6657E8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 5. Mint Floating Geometric Capsule */}
      <motion.div
        animate={{
          y: [0, 14, 0],
          x: [0, -6, 0],
          rotate: [8, -6, 8],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-24 right-[5%] hidden lg:block opacity-40"
      >
        <div className="px-2.5 py-1 rounded-full bg-[#A9E3CF] border border-[#DDD9D0] shadow-subtle flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
          <span className="text-[8px] font-sans-clean font-bold text-[#181818]">PASS IT ON</span>
        </div>
      </motion.div>

      {/* 6. Hand-drawn Delicate Waveform / Pencil Sketch Line */}
      <motion.div
        animate={{
          scaleX: [0.96, 1.04, 0.96],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[68%] left-[7%] hidden xl:block"
      >
        <svg width="130" height="24" viewBox="0 0 130 24" fill="none">
          <path
            d="M 5,12 Q 35,2 65,14 T 125,10"
            stroke="#8FD8FF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
        </svg>
      </motion.div>

      {/* 7. Tiny 5-petal flower / creative symbol */}
      <motion.div
        animate={{
          rotate: [0, 360],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-40 left-[12%] hidden 2xl:block opacity-35"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="7" r="3.5" fill="#FFE28A" />
          <circle cx="17" cy="12" r="3.5" fill="#B8A7FF" />
          <circle cx="12" cy="17" r="3.5" fill="#FF8D91" />
          <circle cx="7" cy="12" r="3.5" fill="#A9E3CF" />
          <circle cx="12" cy="12" r="2.5" fill="#181818" />
        </svg>
      </motion.div>

      {/* 8. A small relay stack that passes from card to card */}
      <motion.div
        animate={{ x: [0, 10, 0], y: [0, -8, 0], rotate: [-4, 2, -4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-[54%] left-[4%] hidden xl:block"
      >
        <div className="relative w-24 h-20">
          <div className="absolute top-3 left-4 w-14 h-16 rounded-lg bg-[#8FD8FF] border border-[#72bfdc] rotate-[-12deg] shadow-subtle" />
          <div className="absolute top-1 left-8 w-14 h-16 rounded-lg bg-[#FFB49F] border border-[#e8a28d] rotate-[8deg] shadow-card p-2">
            <div className="w-5 h-1 rounded-full bg-[#181818]/50 mb-3" />
            <div className="space-y-1">
              <div className="h-0.5 w-full rounded-full bg-[#181818]/25" />
              <div className="h-0.5 w-4/5 rounded-full bg-[#181818]/25" />
            </div>
            <span className="absolute bottom-1.5 right-1.5 text-[8px] text-[#181818]/70">→</span>
          </div>
        </div>
      </motion.div>

      {/* 9. Dotted handoff path */}
      <motion.div
        animate={{ opacity: [0.3, 0.65, 0.3], x: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[36%] right-[5%] hidden xl:block"
      >
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
          <path d="M6 44C30 8 74 10 110 28" stroke="#6657E8" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
          <circle cx="7" cy="44" r="4" fill="#FFE28A" stroke="#6657E8" strokeWidth="1.5" />
          <circle cx="110" cy="28" r="4" fill="#A9E3CF" stroke="#0D9488" strokeWidth="1.5" />
          <path d="M100 22L111 28L101 34" stroke="#6657E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* 10. Tiny orbiting creative tools */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[22%] right-[18%] hidden 2xl:block"
      >
        <div className="relative w-16 h-16 rounded-full border border-dashed border-[#B8A7FF]/70">
          <span className="absolute -top-1 left-1/2 w-3 h-3 rounded-full bg-[#FFE28A] border border-[#D9B940]" />
          <span className="absolute top-1/2 -right-1 w-3 h-3 rounded-full bg-[#FF8D91] border border-[#df6c72]" />
          <span className="absolute -bottom-1 left-1/2 w-3 h-3 rounded-full bg-[#8FD8FF] border border-[#72bfdc]" />
          <span className="absolute inset-0 m-auto w-5 h-5 rounded-md bg-white border border-[#DDD9D0] shadow-subtle rotate-12" />
        </div>
      </motion.div>

      {/* 11. Soft Warm Pastel Ambient Blobs (Low saturation, dreamy backdrop) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#FFE28A]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-[#B8A7FF]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-[#A9E3CF]/10 blur-3xl pointer-events-none" />
    </div>
  );
};
