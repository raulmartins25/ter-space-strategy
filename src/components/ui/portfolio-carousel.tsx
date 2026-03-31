"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";

export type PortfolioItem = {
  title: string;
  category: string;
  description: string;
  src: string;
};

const PortfolioCarousel = ({
  items,
  autoplay = true,
}: {
  items: PortfolioItem[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (!autoplay || lightboxOpen) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext, lightboxOpen]);

  // Pre-compute stable random rotations per item
  const rotations = useMemo(
    () => items.map(() => Math.floor(Math.random() * 16) - 8),
    [items.length]
  );

  return (
    <>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <div className="relative h-[400px] sm:h-[480px] w-full">
              {items.map((item, index) => (
                <motion.div
                  key={item.src}
                  animate={{
                    opacity: index === active ? 1 : 0.7,
                    scale: index === active ? 1 : 0.95,
                    rotate: index === active ? 0 : rotations[index],
                    zIndex: index === active ? 40 : items.length - index,
                    y: index === active ? 0 : (rotations[index] % 5),
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full rounded-2xl object-cover shadow-xl"
                    draggable={false}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Text and Controls */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="font-body text-[11px] tracking-[0.4em] uppercase text-accent mb-4">
                    {items[active].category}
                  </p>
                  <h3 className="font-display tracking-display text-2xl sm:text-3xl text-foreground mb-4 leading-[1.1]">
                    {items[active].title}
                  </h3>
                  <p className="font-body font-light text-[15px] text-muted-foreground leading-[1.8]">
                    {items[active].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-3 mt-10">
              <button
                onClick={handlePrev}
                className="group w-11 h-11 flex items-center justify-center rounded-full border border-border hover:border-foreground transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
              <button
                onClick={handleNext}
                className="group w-11 h-11 flex items-center justify-center rounded-full border border-border hover:border-foreground transition-colors duration-300"
              >
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
              <span className="ml-3 font-body text-sm text-muted-foreground self-center">
                {active + 1} / {items.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <X size={32} />
            </button>

            {items.length > 1 && (
              <>
                <button
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <motion.img
              key={active}
              src={items[active].src}
              alt={items[active].title}
              className="max-w-[80vw] max-h-[80vh] object-contain rounded-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 font-body text-sm">
              {active + 1} / {items.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { PortfolioCarousel };
