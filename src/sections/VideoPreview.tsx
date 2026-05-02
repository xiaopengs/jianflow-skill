import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { Play, Pause, SkipBack, SkipForward, Maximize } from 'lucide-react';
import type { PageConfig } from '@/types';

interface VideoPreviewProps {
  pages: PageConfig[];
  currentPage: number;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  setCurrentPage: (v: number) => void;
  shakeIntensity: number;
}

export default function VideoPreview({ pages, currentPage, isPlaying, setIsPlaying, setCurrentPage, shakeIntensity }: VideoPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const textsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [progress, setProgress] = useState(0);
  const isTransitioningRef = useRef(false);

  // Calculate total duration
  const totalDuration = pages.reduce((sum, p) => sum + p.duration, 0);

  const currentPageRef = useRef(currentPage);
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  // Play/Pause logic
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const playNext = () => {
      const prev = currentPageRef.current;
      const next = (prev + 1) % pages.length;
      if (next === 0 && prev === pages.length - 1) {
        setIsPlaying(false);
        return;
      }
      triggerTransition(prev, next);
      setCurrentPage(next);
    };

    const currentDuration = pages[currentPage]?.duration || 3;
    timerRef.current = setTimeout(playNext, currentDuration * 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentPage, pages, setCurrentPage, setIsPlaying]);

  // Progress bar animation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const elapsed = pages.slice(0, currentPage).reduce((s, p) => s + p.duration, 0);
      const currentElapsed = Date.now() - (window as any)._playStart || 0;
      const totalElapsed = elapsed * 1000 + currentElapsed;
      setProgress(Math.min((totalElapsed / (totalDuration * 1000)) * 100, 100));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, currentPage, pages, totalDuration]);

  useEffect(() => {
    if (isPlaying) {
      (window as any)._playStart = Date.now();
    }
  }, [isPlaying, currentPage]);

  // Transition animation using GSAP
  const triggerTransition = useCallback((fromIndex: number, toIndex: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const container = containerRef.current;
    const fromImg = imagesRef.current[fromIndex];
    const toImg = imagesRef.current[toIndex];
    const fromText = textsRef.current[fromIndex];
    const toText = textsRef.current[toIndex];

    if (!container || !fromImg || !toImg) {
      isTransitioningRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false;
        gsap.set(container, { x: 0, y: 0 });
      },
    });

    // 1. Screen shake
    tl.to(container, {
      x: `random(-${shakeIntensity}, ${shakeIntensity})`,
      y: `random(-${shakeIntensity * 0.7}, ${shakeIntensity * 0.7})`,
      duration: 0.05,
      repeat: 26,
      repeatDelay: 0.0,
      ease: 'power1.inOut',
      yoyo: true,
    }, 0);

    // 2. Slide images
    tl.to(fromImg, {
      xPercent: -40,
      duration: 1.3,
      ease: 'power2.inOut',
    }, 0);

    tl.fromTo(toImg,
      { xPercent: 40, opacity: 1 },
      { xPercent: 0, duration: 1.3, ease: 'power2.inOut' },
      0
    );

    // 3. Skew text fly in
    if (toText) {
      const spans = toText.querySelectorAll('.fly-text');
      spans.forEach((span, i) => {
        const fromTop = i % 2 === 0;
        tl.fromTo(span,
          {
            yPercent: fromTop ? -160 : 160,
            skewY: fromTop ? -8 : 8,
            opacity: 0,
          },
          {
            yPercent: 0,
            skewY: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          0.08 * i
        );
      });
    }

    // Hide old text
    if (fromText) {
      tl.to(fromText, { opacity: 0, duration: 0.3 }, 0);
    }

    // Ensure container position is reset
    tl.set(container, { x: 0, y: 0 }, 1.3);
  }, [shakeIntensity]);

  // Initial text animation on mount
  useEffect(() => {
    const text = textsRef.current[0];
    if (text) {
      const spans = text.querySelectorAll('.fly-text');
      gsap.fromTo(spans,
        { yPercent: 120, skewY: 6, opacity: 0 },
        { yPercent: 0, skewY: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.06 }
      );
    }
  }, []);

  const handlePrev = () => {
    if (isTransitioningRef.current) return;
    const prev = currentPage > 0 ? currentPage - 1 : pages.length - 1;
    triggerTransition(currentPage, prev);
    setCurrentPage(prev);
  };

  const handleNext = () => {
    if (isTransitioningRef.current) return;
    const next = (currentPage + 1) % pages.length;
    triggerTransition(currentPage, next);
    setCurrentPage(next);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  };

  const currentElapsed = pages.slice(0, currentPage).reduce((s, p) => s + p.duration, 0);

  return (
    <div className="flex-1 flex flex-col bg-black overflow-hidden">
      {/* Video viewport */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div
          ref={containerRef}
          className="relative"
          style={{
            width: 'min(100%, 405px)',
            aspectRatio: '9/16',
          }}
        >
          {/* Recording corner indicators */}
          <div className="absolute -top-1 -left-1 w-3 h-3 z-20">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500 recording-dot" />
            <div className="absolute top-0 left-0 w-[2px] h-full bg-red-500 recording-dot" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 z-20">
            <div className="absolute top-0 right-0 w-full h-[2px] bg-red-500 recording-dot" />
            <div className="absolute top-0 right-0 w-[2px] h-full bg-red-500 recording-dot" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 z-20">
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 recording-dot" />
            <div className="absolute bottom-0 left-0 w-[2px] h-full bg-red-500 recording-dot" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 z-20">
            <div className="absolute bottom-0 right-0 w-full h-[2px] bg-red-500 recording-dot" />
            <div className="absolute bottom-0 right-0 w-[2px] h-full bg-red-500 recording-dot" />
          </div>

          {/* Border */}
          <div className="absolute inset-0 border border-[#333] rounded-sm z-10 pointer-events-none" />

          {/* Video content */}
          <div ref={videoRef} className="relative w-full h-full overflow-hidden bg-black">
            {/* Image layers */}
            {pages.map((page, i) => (
              <div
                key={i}
                ref={el => { if (el) imagesRef.current[i] = el; }}
                className="absolute inset-0"
                style={{
                  opacity: i === currentPage ? 1 : 0,
                  zIndex: i === currentPage ? 1 : 0,
                }}
              >
                <img
                  src={page.image}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}

            {/* Text overlays for each page */}
            {pages.map((page, i) => (
              <div
                key={`text-${i}`}
                ref={el => { textsRef.current[i] = el; }}
                className="absolute inset-0 z-10 flex flex-col justify-between p-4"
                style={{ opacity: i === currentPage ? 1 : 0, pointerEvents: 'none' }}
              >
                {/* Top title */}
                <div className="mt-2">
                  {page.title.map((line, li) => (
                    <div
                      key={li}
                      className="fly-text text-white font-black leading-tight tracking-tight"
                      style={{
                        fontSize: li === 0 ? '22px' : '28px',
                        textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.5)',
                        fontStyle: li === 0 ? 'italic' : 'normal',
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>

                {/* Bottom text */}
                <div className="mb-2">
                  {/* White gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent" style={{ pointerEvents: 'none' }} />

                  <div className="relative z-10">
                    <div className="text-white text-sm font-bold mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
                      {page.subtitle}
                    </div>
                    {page.description.map((line, di) => (
                      <div
                        key={di}
                        className="flex items-start gap-2 text-white/90 text-xs leading-relaxed"
                        style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
                      >
                        {di === 1 && <div className="w-[2px] h-4 bg-white/60 shrink-0 mt-0.5" />}
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Page indicator */}
            <div className="absolute top-3 right-3 z-20 flex gap-1">
              {pages.map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-0.5 rounded-full transition-colors"
                  style={{ backgroundColor: i === currentPage ? 'white' : 'rgba(255,255,255,0.3)' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom control bar */}
      <div className="h-10 bg-[#0a0a0a] border-t border-[#222] flex items-center px-4 gap-4 shrink-0">
        {/* Playback controls */}
        <div className="flex items-center gap-2">
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-1.5 hover:bg-[#161616] rounded transition-colors">
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button onClick={handlePrev} className="p-1.5 hover:bg-[#161616] rounded transition-colors">
            <SkipBack size={14} />
          </button>
          <button onClick={handleNext} className="p-1.5 hover:bg-[#161616] rounded transition-colors">
            <SkipForward size={14} />
          </button>
        </div>

        {/* Timeline */}
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1 h-1 bg-[#222] rounded-full relative">
            {/* Page markers */}
            {pages.slice(0, -1).map((_p, i) => {
              const pos = (pages.slice(0, i + 1).reduce((s, pg) => s + pg.duration, 0) / totalDuration) * 100;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-0.5 h-2 bg-[#444]"
                  style={{ left: `${pos}%` }}
                />
              );
            })}
            <div
              className="absolute top-0 left-0 h-full bg-[#00D2FF] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-[#8A8B90] font-mono-data w-20 text-right">
            {formatTime(currentElapsed)} / {formatTime(totalDuration)}
          </span>
        </div>

        {/* Fullscreen */}
        <button className="p-1.5 hover:bg-[#161616] rounded transition-colors">
          <Maximize size={14} />
        </button>
      </div>
    </div>
  );
}
