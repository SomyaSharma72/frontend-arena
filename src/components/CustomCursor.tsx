import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CustomCursorProps {
  cursorText?: string;
  cursorVariant?: 'default' | 'card' | 'explore' | 'action' | 'grab' | 'image';
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  cursorText: propCursorText = '',
  cursorVariant: propCursorVariant = 'default',
}) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [currentText, setCurrentText] = useState(propCursorText);
  const [currentVariant, setCurrentVariant] = useState(propCursorVariant);

  // Keep internal state updated from props
  useEffect(() => {
    if (propCursorText) setCurrentText(propCursorText);
    if (propCursorVariant) setCurrentVariant(propCursorVariant);
  }, [propCursorText, propCursorVariant]);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    const checkPointer = () => setIsFinePointer(mediaQuery.matches);
    checkPointer();
    mediaQuery.addEventListener('change', checkPointer);

    if (!mediaQuery.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // GSAP quickTo for ultra-smooth fluid interpolation
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    
    // Trailing ring with slight lag and smooth spring damping
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });

    let isMagnetActive = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      setDotX(mouseX);
      setDotY(mouseY);

      if (!isMagnetActive) {
        setRingX(mouseX);
        setRingY(mouseY);
      }
    };

    // Global listener for hover targets to automatically morph cursor states
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Project card detection
      const cardEl = target.closest('[data-project-card], .project-card, [data-cursor="card"]');
      if (cardEl) {
        setCurrentVariant('card');
        const customLabel = cardEl.getAttribute('data-cursor-text') || 'OPEN →';
        setCurrentText(customLabel);
        return;
      }

      // Media image detection
      const imgEl = target.closest('img, [data-cursor="image"]');
      if (imgEl && !cardEl) {
        setCurrentVariant('image');
        setCurrentText('');
        return;
      }

      // Draggable or tree node area
      const dragEl = target.closest('[data-cursor="grab"], .draggable-area, .tree-canvas');
      if (dragEl) {
        setCurrentVariant('grab');
        setCurrentText('PAN');
        return;
      }

      // Magnetic button or link detection
      const buttonEl = target.closest('button, a, [role="button"], [data-cursor="action"]');
      if (buttonEl) {
        setCurrentVariant('action');
        setCurrentText('');

        // Magnetic attraction pull around buttons
        const rect = buttonEl.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        
        // If cursor is near button center, attract the outer ring
        isMagnetActive = true;
        gsap.to(ring, {
          x: btnCenterX,
          y: btnCenterY,
          duration: 0.25,
          ease: 'power2.out',
        });
        return;
      }

      // Default fallback if not hovering special target
      isMagnetActive = false;
      setCurrentVariant(propCursorVariant || 'default');
      setCurrentText(propCursorText || '');
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest('button, a, [role="button"], [data-project-card]')) {
        isMagnetActive = false;
        setCurrentVariant(propCursorVariant || 'default');
        setCurrentText(propCursorText || '');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', checkPointer);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, propCursorText, propCursorVariant]);

  // Animate the ring morph based on state
  useEffect(() => {
    if (!ringRef.current || !dotRef.current) return;

    if (currentVariant === 'card') {
      gsap.to(ringRef.current, {
        width: 58,
        height: 58,
        backgroundColor: '#6657E8',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 1.5,
        borderRadius: '50%',
        scale: 1,
        opacity: 0.98,
        duration: 0.28,
        ease: 'back.out(2)',
      });
      gsap.to(ringRef.current, {
        boxShadow: '0 0 0 8px rgba(184, 167, 255, 0.16), 0 12px 28px rgba(102, 87, 232, 0.2)',
        duration: 0.28,
      });
      gsap.to(dotRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
      });
    } else if (currentVariant === 'action') {
      gsap.to(ringRef.current, {
        width: 36,
        height: 36,
        backgroundColor: 'rgba(184, 167, 255, 0.22)',
        borderColor: '#6657E8',
        borderWidth: 1.5,
        borderRadius: '50%',
        scale: 1.1,
        opacity: 0.9,
        duration: 0.22,
        ease: 'power2.out',
      });
      gsap.to(ringRef.current, {
        boxShadow: '0 0 0 6px rgba(184, 167, 255, 0.12)',
        duration: 0.22,
      });
      gsap.to(dotRef.current, {
        opacity: 1,
        scale: 0.85,
        backgroundColor: '#6657E8',
        duration: 0.2,
      });
    } else if ((currentVariant as string) === 'image') {
      gsap.to(ringRef.current, {
        width: 44,
        height: 44,
        backgroundColor: 'rgba(102, 87, 232, 0.12)',
        borderColor: '#B8A7FF',
        borderWidth: 1.5,
        borderRadius: '50%',
        scale: 1.15,
        opacity: 0.85,
        duration: 0.25,
        ease: 'power2.out',
      });
      gsap.to(ringRef.current, {
        boxShadow: '0 0 0 7px rgba(143, 216, 255, 0.14)',
        duration: 0.25,
      });
      gsap.to(dotRef.current, {
        opacity: 1,
        scale: 0.7,
        backgroundColor: '#6657E8',
        duration: 0.2,
      });
    } else if (currentVariant === 'grab') {
      gsap.to(ringRef.current, {
        width: 48,
        height: 48,
        backgroundColor: '#A9E3CF',
        borderColor: '#181818',
        borderWidth: 1.5,
        borderRadius: '50%',
        scale: 1,
        opacity: 0.95,
        duration: 0.25,
        ease: 'back.out(1.8)',
      });
      gsap.to(ringRef.current, {
        boxShadow: '0 0 0 7px rgba(169, 227, 207, 0.18)',
        duration: 0.25,
      });
      gsap.to(dotRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
      });
    } else {
      // Default: refined dot + subtle soft trailing ring
      gsap.to(ringRef.current, {
        width: 24,
        height: 24,
        backgroundColor: 'transparent',
        borderColor: '#B8A7FF',
        borderWidth: 1.5,
        borderRadius: '50%',
        scale: 1,
        opacity: 0.6,
        duration: 0.25,
        ease: 'power2.out',
      });
      gsap.to(ringRef.current, {
        boxShadow: '0 0 0 0 rgba(184, 167, 255, 0)',
        duration: 0.25,
      });
      gsap.to(dotRef.current, {
        opacity: 1,
        scale: 1,
        backgroundColor: '#181818',
        duration: 0.2,
      });
    }
  }, [currentVariant]);

  if (!isFinePointer || !isVisible) return null;

  const isCard = currentVariant === 'card';
  const isGrab = currentVariant === 'grab';

  return (
    <>
      {/* Primary Precision Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#181818] pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2"
      />

      {/* Trailing Fluid Interaction Ring / Badge */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center transition-[width,height,background-color,border-color,box-shadow]"
        style={{ width: 24, height: 24 }}
      >
        {isCard && (
          <span
            ref={labelRef}
            className="text-[9px] font-sans-clean font-extrabold uppercase tracking-wider text-white select-none leading-none flex items-center gap-0.5"
          >
            {currentText || 'OPEN →'}
          </span>
        )}
        {isGrab && (
          <span
            ref={labelRef}
            className="text-[9px] font-mono-tech font-bold uppercase tracking-wider text-[#181818] select-none leading-none"
          >
            PAN
          </span>
        )}
      </div>
    </>
  );
};
