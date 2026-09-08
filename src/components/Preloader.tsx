import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user already saw preloader in this session for fast re-visits
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Slide overlay out with a smooth curtain reveal
          gsap.to(containerRef.current, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 0.65,
            ease: 'power3.inOut',
            onComplete: () => {
              setIsDismissed(true);
              onComplete();
            }
          });
        }
      });

      // Initialize initial states
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
        opacity: 0,
        scale: 0.6,
        y: 30,
      });

      if (lineRef.current) {
        const length = lineRef.current.getTotalLength() || 400;
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        });
      }

      gsap.set(letterRefs.current, {
        y: 45,
        opacity: 0,
        rotateX: -45,
      });

      gsap.set([taglineRef.current, badgeRef.current], {
        opacity: 0,
        y: 15,
      });

      // 1. First card appears and passes baton (relay concept)
      tl.to(card1Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        x: -50,
        rotation: -6,
        duration: 0.35,
        ease: 'back.out(1.7)',
      })
      // 2. Connecting line starts drawing
      .to(lineRef.current, {
        opacity: 0.8,
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      }, '-=0.15')
      // 3. Second card catches the pass
      .to(card2Ref.current, {
        opacity: 1,
        scale: 1.05,
        y: -10,
        x: 0,
        rotation: 4,
        duration: 0.35,
        ease: 'back.out(1.7)',
      }, '-=0.4')
      // 4. Third card finishes the relay pass
      .to(card3Ref.current, {
        opacity: 1,
        scale: 1,
        y: 10,
        x: 50,
        rotation: -2,
        duration: 0.35,
        ease: 'back.out(1.7)',
      }, '-=0.25')
      // 5. Cards gracefully converge into the central brand mark
      .to([card1Ref.current, card2Ref.current, card3Ref.current], {
        scale: 0.4,
        x: 0,
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        stagger: 0.05,
      })
      // 6. Reveal RELAY letters in sequence
      .to(letterRefs.current, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power3.out',
      }, '-=0.1')
      // 7. Badge & Tagline reveal: "START SOMETHING. PASS IT ON."
      .to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
      }, '-=0.2')
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
      }, '-=0.15')
      // Hold for reader appreciation
      .to({}, { duration: 0.45 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (isDismissed) return null;

  return (
    <div
      ref={containerRef}
      id="preloader-overlay"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8F6F0] text-[#181818] select-none"
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}
    >
      {/* Paper grain pattern */}
      <div className="absolute inset-0 bg-paper-grain opacity-40 pointer-events-none" />

      {/* Decorative corner tapes */}
      <div className="washi-tape absolute top-6 left-8 w-24 h-5 border border-[#DDD9D0] rotate-[-3deg] hidden sm:block" />
      <div className="washi-tape-lavender absolute top-8 right-10 w-28 h-5 border border-[#DDD9D0] rotate-[4deg] hidden sm:block" />

      {/* Skip button for quick navigation */}
      <button
        onClick={() => {
          setIsDismissed(true);
          onComplete();
        }}
        className="absolute bottom-6 right-6 text-[10px] font-mono-tech uppercase tracking-widest text-[#77736D] hover:text-[#181818] border border-[#DDD9D0] px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white shadow-subtle transition-all cursor-pointer z-10"
      >
        Skip intro
      </button>

      {/* Stage: Interactive Relay Passing Animation */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-md px-6">
        
        {/* Animated Cards & Baton Passing */}
        <div className="relative h-24 w-full flex items-center justify-center mb-6">
          {/* Connecting SVG relay trace */}
          <svg className="absolute w-64 h-20 pointer-events-none" viewBox="0 0 240 80">
            <path
              ref={lineRef}
              d="M 30,50 Q 80,10 120,40 T 210,35"
              fill="none"
              stroke="#6657E8"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              strokeLinecap="round"
            />
          </svg>

          {/* Card 1: Lavender (Story) */}
          <div
            ref={card1Ref}
            className="absolute w-14 h-18 bg-[#B8A7FF] border border-[#181818]/80 rounded-xl shadow-card flex flex-col justify-between p-2"
          >
            <div className="w-5 h-1 bg-[#181818] rounded-full" />
            <div className="space-y-1">
              <div className="w-full h-1 bg-[#181818]/30 rounded-full" />
              <div className="w-3/4 h-1 bg-[#181818]/30 rounded-full" />
            </div>
            <span className="text-[8px] font-mono-tech font-bold text-[#181818]">01</span>
          </div>

          {/* Card 2: Butter Yellow (Idea) */}
          <div
            ref={card2Ref}
            className="absolute w-14 h-18 bg-[#FFE28A] border border-[#181818]/80 rounded-xl shadow-card flex flex-col justify-between p-2"
          >
            <div className="w-5 h-1 bg-[#181818] rounded-full" />
            <div className="space-y-1">
              <div className="w-full h-1 bg-[#181818]/30 rounded-full" />
              <div className="w-2/3 h-1 bg-[#181818]/30 rounded-full" />
            </div>
            <span className="text-[8px] font-mono-tech font-bold text-[#181818]">02</span>
          </div>

          {/* Card 3: Mint Green (Remix) */}
          <div
            ref={card3Ref}
            className="absolute w-14 h-18 bg-[#A9E3CF] border border-[#181818]/80 rounded-xl shadow-card flex flex-col justify-between p-2"
          >
            <div className="w-5 h-1 bg-[#181818] rounded-full" />
            <div className="space-y-1">
              <div className="w-full h-1 bg-[#181818]/30 rounded-full" />
              <div className="w-4/5 h-1 bg-[#181818]/30 rounded-full" />
            </div>
            <span className="text-[8px] font-mono-tech font-bold text-[#181818]">03</span>
          </div>
        </div>

        {/* Brand Stamp & Letters */}
        <div ref={logoRef} className="flex flex-col items-center text-center">
          {/* Issue Badge */}
          <div ref={badgeRef} className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#DDD9D0] rounded-full text-[10px] font-sans-clean font-bold tracking-wider text-[#181818] shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-[#6657E8] animate-pulse" />
              COLLABORATIVE ARCHIVE
            </span>
          </div>

          {/* RELAY Letters */}
          <div className="flex items-center justify-center gap-1 text-5xl sm:text-6xl font-display font-black tracking-widest text-[#181818] overflow-hidden">
            {['R', 'E', 'L', 'A', 'Y'].map((letter, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  letterRefs.current[idx] = el;
                }}
                className="inline-block"
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <div
            ref={taglineRef}
            className="mt-3 flex items-center gap-2.5 text-xs sm:text-sm font-sans-clean font-bold tracking-widest uppercase text-[#77736D]"
          >
            <span className="w-3 h-0.5 bg-[#6657E8]" />
            <span className="text-[#181818]">START SOMETHING. PASS IT ON.</span>
            <span className="w-3 h-0.5 bg-[#6657E8]" />
          </div>
        </div>
      </div>
    </div>
  );
};
