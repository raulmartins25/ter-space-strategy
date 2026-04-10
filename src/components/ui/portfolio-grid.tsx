"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type PortfolioGridItem = {
  title: string;
  image: string;
};

const PortfolioGrid = ({ items }: { items: PortfolioGridItem[] }) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lightboxIdx === null) return;
      setLightboxIdx((lightboxIdx + dir + items.length) % items.length);
    },
    [lightboxIdx, items.length]
  );

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setLightboxIdx(index)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <span
                className="font-display text-lg sm:text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
              >
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIdx(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              onClick={() => setLightboxIdx(null)}
            >
              <X size={32} />
            </button>

            {items.length > 1 && (
              <>
                <button
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  onClick={(e) => { e.stopPropagation(); navigate(1); }}
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <motion.img
              key={lightboxIdx}
              src={items[lightboxIdx].image}
              alt={items[lightboxIdx].title}
              className="max-w-[80vw] max-h-[80vh] object-contain rounded-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 font-body text-sm">
              {lightboxIdx + 1} / {items.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { PortfolioGrid };
