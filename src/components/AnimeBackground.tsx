
import { useState, useEffect, useRef } from "react";

const AnimeBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = backgroundRef.current;
    if (!container) return;
    
    // Clear any existing elements
    container.innerHTML = '';
    
    // Create animated elements
    createSakuraPetals(container);
    createGlowOrbs(container);
    createEnergyLines(container);
    createStars(container);
    
  }, []);
  
  // Create sakura petals
  const createSakuraPetals = (container: HTMLDivElement) => {
    for (let i = 0; i < 15; i++) {
      const petal = document.createElement('div');
      const size = Math.random() * 20 + 10;
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 10;
      
      petal.className = 'absolute pointer-events-none';
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.backgroundImage = 'radial-gradient(circle at 30% 30%, rgba(255, 207, 210, 0.8), rgba(255, 180, 190, 0.6))';
      petal.style.borderRadius = '100% 0 100% 0';
      petal.style.left = `${startX}px`;
      petal.style.top = `${startY}px`;
      petal.style.opacity = '0.6';
      petal.style.boxShadow = '0 0 5px rgba(255, 180, 190, 0.3)';
      petal.style.zIndex = '-1';
      petal.style.transform = `rotate(${Math.random() * 360}deg)`;
      petal.style.animation = `
        fall ${duration}s linear ${delay}s infinite,
        rotate ${duration / 2}s ease-in-out ${delay}s infinite alternate
      `;
      
      container.appendChild(petal);
    }
  };
  
  // Create glowing orbs (like chi or spiritual energy)
  const createGlowOrbs = (container: HTMLDivElement) => {
    for (let i = 0; i < 10; i++) {
      const orb = document.createElement('div');
      const size = Math.random() * 12 + 5;
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const duration = Math.random() * 40 + 20;
      
      // Choose random color - blues/purples for mystical feel
      const hue = Math.random() * 60 + 200; // blue to purple range
      const color = `hsla(${hue}, 80%, 70%, 0.6)`;
      
      orb.className = 'absolute pointer-events-none';
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      orb.style.background = color;
      orb.style.borderRadius = '50%';
      orb.style.left = `${startX}px`;
      orb.style.top = `${startY}px`;
      orb.style.opacity = '0.6';
      orb.style.boxShadow = `0 0 ${size * 2}px ${color}`;
      orb.style.zIndex = '-1';
      orb.style.animation = `
        float ${duration}s linear infinite,
        pulse 4s ease-in-out infinite alternate
      `;
      
      container.appendChild(orb);
    }
  };
  
  // Create energy lines (like sword slashes or energy beams)
  const createEnergyLines = (container: HTMLDivElement) => {
    for (let i = 0; i < 4; i++) {
      const line = document.createElement('div');
      const width = Math.random() * 150 + 100;
      const height = Math.random() * 2 + 1;
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const angle = Math.random() * 360;
      const delay = Math.random() * 20;
      
      // Color variations
      const colors = [
        'linear-gradient(90deg, transparent, rgba(150, 200, 255, 0.8), transparent)',
        'linear-gradient(90deg, transparent, rgba(255, 150, 200, 0.8), transparent)',
        'linear-gradient(90deg, transparent, rgba(200, 255, 150, 0.8), transparent)'
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      line.className = 'absolute pointer-events-none';
      line.style.width = `${width}px`;
      line.style.height = `${height}px`;
      line.style.background = color;
      line.style.left = `${startX}px`;
      line.style.top = `${startY}px`;
      line.style.opacity = '0';
      line.style.zIndex = '-1';
      line.style.transform = `rotate(${angle}deg)`;
      line.style.animation = `slash 5s ease-in-out ${delay}s infinite`;
      
      container.appendChild(line);
    }
  };
  
  // Create twinkling stars (for night sky aesthetic)
  const createStars = (container: HTMLDivElement) => {
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 5;
      
      star.className = 'absolute pointer-events-none';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      star.style.borderRadius = '50%';
      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;
      star.style.zIndex = '-1';
      star.style.boxShadow = '0 0 4px rgba(255, 255, 255, 0.8)';
      star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite alternate`;
      
      container.appendChild(star);
    }
  };

  return (
    <>
      <style>
        {`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); }
          100% { transform: translateY(calc(100vh + 50px)) rotate(360deg); }
        }
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(20px, 30px); }
          50% { transform: translate(-20px, 50px); }
          75% { transform: translate(-30px, 20px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(0.8); }
          100% { opacity: 0.7; transform: scale(1.2); }
        }
        @keyframes slash {
          0% { opacity: 0; width: 0; }
          10% { opacity: 0.8; width: 100%; }
          20% { opacity: 0; width: 100%; }
          100% { opacity: 0; width: 100%; }
        }
        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        `}
      </style>
      <div 
        ref={backgroundRef} 
        className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]"
      />
    </>
  );
};

export default AnimeBackground;
