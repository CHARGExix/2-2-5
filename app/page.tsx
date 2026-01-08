'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollSequence from './components/ScrollSequence';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the main container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Text Overlay Opacity Transforms
  const opacityIntro = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const scaleIntro = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const opacityFeature1 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const yFeature1 = useTransform(scrollYProgress, [0.2, 0.3, 0.5], [50, 0, -50]);

  const opacityFeature2 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const xFeature2 = useTransform(scrollYProgress, [0.5, 0.6], [50, 0]);

  const opacityCTA = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const scaleCTA = useTransform(scrollYProgress, [0.8, 0.9], [0.9, 1]);

  return (
    <main className="bg-black text-white selection:bg-red-500 selection:text-white">
      <Navbar />

      {/* Scroll Container */}
      <div ref={containerRef} className="relative h-[600vh]">

        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background Sequence */}
          <div className="absolute inset-0 w-full h-full z-0">
            <ScrollSequence
              progress={scrollYProgress}
              frames={240}
              imagesPath="./burger/ezgif-frame-"
              imageExtension=".jpg"
              padZeros={3}
            />
          </div>

          {/* Content Overlays - Pointer events none ensures scroll works over them */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex flex-col justify-center items-center">

            {/* Intro Section */}
            <motion.div
              style={{ opacity: opacityIntro, scale: scaleIntro }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
            >
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 mix-blend-overlay">
                THE <br /> BURGER
              </h1>
              <p className="text-xl md:text-2xl font-light tracking-wide max-w-lg text-neutral-300">
                Experience the art of flavor.
              </p>
              <div className="mt-8">
                <div className="animate-bounce text-white/50 text-sm">SCROLL TO DISCOVER</div>
              </div>
            </motion.div>

            {/* Feature 1 - Left Aligned */}
            <motion.div
              style={{ opacity: opacityFeature1, y: yFeature1 }}
              className="absolute inset-0 flex items-center justify-start p-8 md:p-24"
            >
              <div className="max-w-xl text-left pl-4 md:pl-0 border-l-4 border-red-600 md:border-l-0">
                <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
                  FRESHLY FLAME-GRILLED
                </h2>
                <p className="text-lg md:text-2xl text-neutral-300 leading-relaxed font-light">
                  Perfection takes time. Our patties are seared to lock in juices,
                  creating that signature char and smoky aroma you crave.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 - Right Aligned */}
            <motion.div
              style={{ opacity: opacityFeature2, x: xFeature2 }}
              className="absolute inset-0 flex items-center justify-end p-8 md:p-24"
            >
              <div className="max-w-xl text-right pr-4 md:pr-0 border-r-4 border-yellow-500 md:border-r-0">
                <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                  LOCALLY SOURCED
                </h2>
                <p className="text-lg md:text-2xl text-neutral-300 leading-relaxed font-light">
                  From farm to table. We partner with local growers to bring you
                  crisp lettuce, ripe tomatoes, and artisan buns baked daily.
                </p>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              style={{ opacity: opacityCTA, scale: scaleCTA }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/40 backdrop-blur-sm"
            >
              <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter">
                TASTE THE <br /> DIFFERENCE.
              </h2>
              <button className="pointer-events-auto px-8 py-4 bg-white text-black text-lg font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 rounded-full">
                Reserve Your Table
              </button>
            </motion.div>

          </div>

          {/* Gradient Vignette for better text readability */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-1 mix-blend-multiply" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
