
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    
    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = 
            target.tagName === 'BUTTON' || 
            target.tagName === 'A' || 
            target.closest('button') || 
            target.closest('a') ||
            target.classList.contains('cursor-pointer');
            
        if (isInteractive) {
            setIsHovering(true);
        }
    };

    const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = 
            target.tagName === 'BUTTON' || 
            target.tagName === 'A' || 
            target.closest('button') || 
            target.closest('a');
            
        if (isInteractive) {
           setIsHovering(false);
        }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
        <style>{`
            @media (pointer: fine) {
                body, a, button, input, textarea { 
                    cursor: none !important; 
                }
            }
        `}</style>
        
        {/* Main Dot */}
        <motion.div
            className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            animate={{
                x: mousePosition.x - 4,
                y: mousePosition.y - 4,
            }}
            transition={{ type: "spring", stiffness: 1500, damping: 60, mass: 0.1 }}
        />

        {/* Outer Ring */}
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-electric-blue pointer-events-none z-[9998]"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isHovering ? 2 : 1,
                opacity: 1,
                backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                borderColor: isHovering ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.8)'
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        />
    </>
  );
};

export default CustomCursor;
