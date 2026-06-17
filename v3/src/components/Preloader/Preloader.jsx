import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Reveal Animation
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
            if (containerRef.current) containerRef.current.style.display = 'none';
          }
        });

        tl.to(contentRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.inOut'
        })
        .to(leftPanelRef.current, {
          yPercent: -100,
          duration: 1.5,
          ease: 'power4.inOut'
        }, 'split')
        .to(rightPanelRef.current, {
          yPercent: 100,
          duration: 1.5,
          ease: 'power4.inOut'
        }, 'split');
      }
      setProgress(currentProgress);
    }, 100);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] flex pointer-events-none">
      <div ref={leftPanelRef} className="w-1/2 h-full bg-[#FAFAFA] border-r border-black/5"></div>
      <div ref={rightPanelRef} className="w-1/2 h-full bg-[#FAFAFA]"></div>
      
      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-mono tracking-[0.4em] uppercase text-text-secondary mb-4">
          Araf Real Estate
        </span>
        <div className="text-8xl font-display font-light text-text-primary tracking-tighter">
          {progress}<span className="text-4xl text-text-secondary">%</span>
        </div>
      </div>
    </div>
  );
}
