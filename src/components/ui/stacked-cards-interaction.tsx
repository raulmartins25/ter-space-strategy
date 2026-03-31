"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const Card = ({
  className,
  image,
  children,
  onClick,
}: {
  className?: string;
  image?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn("relative w-full h-full rounded-2xl overflow-hidden", onClick && "cursor-pointer", className)}
      onClick={onClick}
    >
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
      {children && (
        <div className="relative z-10 p-6">{children}</div>
      )}
    </div>
  );
};

interface CardData {
  image: string;
  title: string;
  description: string;
}

const StackedCardsInteraction = ({
  cards,
  spreadDistance = 40,
  rotationAngle = 5,
  animationDelay = 0.1,
}: {
  cards: CardData[];
  spreadDistance?: number;
  rotationAngle?: number;
  animationDelay?: number;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const limitedCards = cards.slice(0, 3);

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="relative w-[320px] h-[420px] sm:w-[380px] sm:h-[480px]">
          {limitedCards.map((card, index) => {
            const isFirst = index === 0;

            let xOffset = 0;
            let rotation = 0;

            if (limitedCards.length > 1) {
              if (index === 1) {
                xOffset = -spreadDistance;
                rotation = -rotationAngle;
              } else if (index === 2) {
                xOffset = spreadDistance;
                rotation = rotationAngle;
              }
            }

            return (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ x: 0, rotate: 0 }}
                animate={{
                  x: isHovering ? xOffset : 0,
                  rotate: isHovering ? rotation : 0,
                  zIndex: isFirst ? 30 : 30 - index * 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: isHovering ? index * animationDelay : 0,
                }}
                {...(isFirst && {
                  onHoverStart: () => setIsHovering(true),
                  onHoverEnd: () => setIsHovering(false),
                })}
              >
                <Card image={card.image} className="shadow-xl" onClick={() => setLightboxImg(card.image)}>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="font-display text-xl text-white">{card.title}</h3>
                    <p className="font-body text-sm text-white/70 mt-1">{card.description}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-pointer p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
              onClick={() => setLightboxImg(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              src={lightboxImg}
              alt=""
              className="max-w-[85vw] max-h-[85vh] object-contain rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)]"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { StackedCardsInteraction, Card };
