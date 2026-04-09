import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const icons = {
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    address: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  };
  return <span className="text-muted-foreground">{icons[type]}</span>;
};

interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  backgroundImage: string;
  backgroundTexture?: string;
  contactInfo: {
    website: string;
    phone: string;
    address: string;
  };
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, logo, slogan, title, subtitle, callToAction, backgroundImage, contactInfo, ...props }, ref) => {

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut" as const,
        },
      },
    };

    return (
      <div
        ref={ref}
        className={cn("relative min-h-[auto] lg:min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background", className)}
        {...props}
      >
        {/* Mobile background image */}
        <div className="absolute inset-0 lg:hidden">
          <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        </div>

        {/* Left Side: Content */}
        <motion.div
          className="relative z-10 flex flex-col justify-between w-full lg:w-[55%] px-8 sm:px-12 lg:px-16 py-12 lg:py-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Section: Logo & Main Content */}
          <div className="flex flex-col gap-12 lg:gap-16">
            <motion.div variants={itemVariants}>
              {logo && (
                <div className="flex items-center gap-4">
                  <img src={logo.url} alt={logo.alt} className="h-10 sm:h-16 w-auto" />
                  <div className="flex flex-col">
                    {logo.text && <span className="font-display text-lg text-foreground">{logo.text}</span>}
                    {slogan && <span className="font-body text-[11px] tracking-[0.3em] uppercase text-muted-foreground">{slogan}</span>}
                  </div>
                </div>
              )}
            </motion.div>

            <div className="flex flex-col gap-8">
              <motion.h1
                variants={itemVariants}
                className="font-display tracking-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.08] text-foreground"
              >
                {title}
              </motion.h1>

              <motion.div variants={itemVariants} className="deco-line" />

              <motion.p
                variants={itemVariants}
                className="font-body font-light text-sm sm:text-lg text-muted-foreground max-w-lg leading-[1.8]"
              >
                {subtitle}
              </motion.p>

              <motion.a
                variants={itemVariants}
                href={callToAction.href}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-hero-whatsapp"
                data-gtm-event="cta_hero_click"
                data-gtm-label="Hero WhatsApp"
                className="gtm-cta gtm-cta-hero inline-flex items-center gap-3 bg-foreground text-background font-body font-medium text-sm px-10 py-4 rounded-full hover:bg-accent hover:text-foreground transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl w-fit"
              >
                {callToAction.icon}
                {callToAction.text}
              </motion.a>
            </div>
          </div>

        </motion.div>

        {/* Right Side: Image with Clip Path Animation */}
        <motion.div
          className="relative hidden lg:block w-[45%] min-h-0"
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 0 }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        >
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </div>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
