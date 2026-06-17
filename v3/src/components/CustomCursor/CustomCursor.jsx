import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorMode, setCursorMode] = useState('default');
  const location = useLocation();

  useEffect(() => {
    // Hide default cursor on body
    document.body.style.cursor = 'none';

    const cursor = cursorRef.current;
    
    // Performance optimized setters
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Check for specific interactive elements
      if (target.closest('.magnetic-btn')) {
        setCursorMode('magnetic');
        setCursorText('');
      } else if (target.closest('.view-project')) {
        setCursorMode('expand');
        setCursorText('VIEW');
      } else if (target.closest('.scroll-area')) {
        setCursorMode('expand');
        setCursorText('SCROLL');
      } else if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button') {
        setCursorMode('hover');
        setCursorText('');
      } else {
        setCursorMode('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [location.pathname]); // Re-bind on route change

  // Animate cursor state changes
  useEffect(() => {
    if (!cursorRef.current) return;
    
    if (cursorMode === 'expand') {
      gsap.to(cursorRef.current, { width: 80, height: 80, backgroundColor: 'transparent', border: '1px solid #1A1A1A', duration: 0.3 });
    } else if (cursorMode === 'magnetic' || cursorMode === 'hover') {
      gsap.to(cursorRef.current, { width: 10, height: 10, backgroundColor: '#B08D57', border: 'none', duration: 0.3 });
    } else {
      // Default
      gsap.to(cursorRef.current, { width: 16, height: 16, backgroundColor: '#1A1A1A', border: 'none', duration: 0.3 });
    }
    
    // Adjust colors for dark mode context
    const isDarkSection = document.elementFromPoint(
      gsap.getProperty(cursorRef.current, 'x'), 
      gsap.getProperty(cursorRef.current, 'y')
    )?.closest('.dark-section');
    
    if (isDarkSection && cursorMode === 'default') {
      gsap.to(cursorRef.current, { backgroundColor: '#FFFFFF', duration: 0.1 });
    } else if (isDarkSection && cursorMode === 'expand') {
      gsap.to(cursorRef.current, { borderColor: '#FFFFFF', color: '#FFFFFF', duration: 0.1 });
    } else if (!isDarkSection && cursorMode === 'expand') {
      gsap.to(cursorRef.current, { borderColor: '#1A1A1A', color: '#1A1A1A', duration: 0.1 });
    }
  }, [cursorMode]);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-text-primary rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference text-white"
    >
      <span ref={textRef} className="text-[10px] font-display tracking-widest font-bold opacity-100 whitespace-nowrap">
        {cursorText}
      </span>
    </div>
  );
}
