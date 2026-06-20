/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';
import bgImage from './assets/images/pink_aesthetic_wallpaper_1781991440844.jpg';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
}

export default function App() {
  const [pressed, setPressed] = useState<boolean>(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [heartbeatActive, setHeartbeatActive] = useState<boolean>(false);

  // Generate interactive particles that burst from the screen center on click
  const triggerBurst = () => {
    setPressed(true);
    setHeartbeatActive(true);

    const newParticles: Particle[] = [];
    const colors = ['#f472b6', '#ec4899', '#f43f5e', '#fda4af', '#fb7185', '#fff0f2'];
    
    // Create 24 individual flying decorative items (hearts and stars)
    for (let i = 0; i < 24; i++) {
      const angle = (i * (360 / 24) + Math.random() * 15) * (Math.PI / 180);
      const speed = 4 + Math.random() * 8;
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        size: 15 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle,
        speed,
      });
    }
    setParticles(newParticles);
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center select-none bg-[#fce7f3]"
      style={{
        background: `radial-gradient(circle at 20% 20%, #fdf2f8 0%, #fce7f3 40%, #fbcfe8 100%)`,
      }}
    >
      {/* Decorative Immersive UI Organic Glowing Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full blur-[100px] opacity-40 bg-[#f472b6] pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 bg-[#db2777] pointer-events-none" />
      <div className="absolute top-[20%] right-[15%] w-[150px] h-[150px] rounded-full blur-[60px] opacity-20 bg-[#ec4899] pointer-events-none" />

      {/* Subtle Aesthetic Noise Overlay from Immersive UI theme */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')`,
        }}
      />

      {/* Decorative ambient background sparkles - completely borderless */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, idx) => (
          <motion.div
            key={`ambient-${idx}`}
            className="absolute rounded-full opacity-30"
            style={{
              top: `${15 + idx * 11}%`,
              left: `${5 + (idx * 17) % 90}%`,
              width: `${6 + (idx % 3) * 6}px`,
              height: `${6 + (idx % 3) * 6}px`,
              backgroundColor: idx % 2 === 0 ? '#f472b6' : '#fda4af',
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{
              duration: 3 + (idx % 4) * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main interactive container */}
      <div className="z-10 flex flex-col items-center justify-center text-center px-6 max-w-xl">
        <AnimatePresence mode="wait">
          {!pressed ? (
            <motion.div
              key="button-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
                filter: "blur(8px)",
                transition: { duration: 0.6, ease: "easeInOut" }
              }}
              className="flex flex-col items-center justify-center"
            >
              {/* Pulsing floating heart above the button to draw interest */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-8 cursor-pointer"
                onClick={triggerBurst}
              >
                <Heart className="w-14 h-14 text-pink-500 fill-pink-300/60 stroke-[1.5]" />
              </motion.div>

              {/* Centered button "premimi" matching glassmorphism Immersive UI */}
              <motion.button
                id="btn-premimi"
                onClick={triggerBurst}
                whileHover={{ 
                  scale: 1.06, 
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  boxShadow: "0 10px 25px -5px rgba(219, 39, 119, 0.25)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 rounded-full bg-white/40 text-pink-600 font-sans font-medium text-xl tracking-widest shadow-lg backdrop-blur-md border border-white/50 cursor-pointer transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-pulse text-pink-400" />
                  premimi
                  <Sparkles className="w-4 h-4 animate-pulse text-pink-400" />
                </span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="message-container"
              className="relative flex flex-col items-center justify-center"
            >
              {/* Silent pulsating background aura representing tachicardia heartbeat */}
              <AnimatePresence>
                {heartbeatActive && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.05, 0.2]
                    }}
                    transition={{
                      duration: 0.38, // Rapid heartbeat rate
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -z-10 w-96 h-96 rounded-full bg-radial from-pink-400/25 to-transparent pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Main sentence "sorry, i'm a dumbass" - integrated directly into the background without containers */}
              <motion.h1
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={{ 
                  opacity: 0.9, 
                  y: 0, 
                  filter: "blur(0px)",
                  transition: { delay: 0.2, duration: 0.8, ease: "easeOut" }
                }}
                className="font-sans text-5xl md:text-6xl text-pink-700/90 font-bold drop-shadow-sm mb-4 leading-tight tracking-wide"
              >
                sorry, i'm a dumbass
              </motion.h1>

              {/* Secondary text "però mi hai fatto venire la tachicardia" in a smaller font below */}
              <motion.h2
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ 
                  opacity: 0.8, 
                  y: 0, 
                  filter: "blur(0px)",
                  transition: { delay: 0.9, duration: 1.0, ease: "easeOut" }
                }}
                className="mt-4 font-sans text-xl md:text-2xl text-pink-600/70 italic tracking-wide drop-shadow-sm"
              >
                però mi hai fatto venire la tachicardia
              </motion.h2>

              {/* Cute final beating heart icon that pulses dynamically */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 0.95, 
                  scale: [1, 1.25, 1],
                  transition: { 
                    delay: 1.5,
                    opacity: { delay: 1.5, duration: 0.5 },
                    scale: { repeat: Infinity, duration: 0.45, ease: "easeInOut" }
                  }
                }}
                className="mt-12"
              >
                <Heart className="w-10 h-10 text-pink-500 fill-pink-400 stroke-pink-600/40" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Explosion/Burst particles rendered on canvas/layer when clicked */}
      {particles.map((p) => {
        const destX = Math.cos(p.angle) * p.speed * 45;
        const destY = Math.sin(p.angle) * p.speed * 45;
        const isHeart = p.id % 2 === 0;

        return (
          <motion.div
            key={`part-${p.id}`}
            initial={{ x: 0, y: 0, scale: 0.2, opacity: 1, rotate: 0 }}
            animate={{
              x: destX,
              y: destY,
              scale: [0.5, 1.2, 0],
              opacity: [1, 0.8, 0],
              rotate: p.id * 15,
            }}
            transition={{
              duration: 1.4,
              ease: "easeOut",
            }}
            className="absolute z-20 pointer-events-none select-none"
            style={{
              width: p.size,
              height: p.size,
              color: p.color,
            }}
          >
            {isHeart ? (
              <Heart className="w-full h-full fill-current stroke-none" />
            ) : (
              <Sparkles className="w-full h-full fill-current text-yellow-300" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
