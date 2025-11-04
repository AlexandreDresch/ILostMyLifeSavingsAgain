"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { features } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const currentFeature = features[activeFeature];
  const nextFeatureIndex = (activeFeature + 1) % features.length;
  const nextFeature = features[nextFeatureIndex];

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current || !progressRef.current)
      return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const progressBar = progressRef.current;

    const totalScrollHeight = features.length * window.innerHeight;

    gsap.set(container, {
      height: totalScrollHeight,
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${totalScrollHeight - window.innerHeight}`,
      pin: true,
      pinSpacing: false,
      scrub: 1,
      onUpdate: (self) => {
        const featureIndex = Math.floor(self.progress * features.length);
        setActiveFeature(Math.min(featureIndex, features.length - 1));
      },
      onEnter: () => {
        gsap.to(progressBar, { opacity: 1, duration: 0.3 });
      },
      onLeave: () => {
        gsap.to(progressBar, { opacity: 0, duration: 0.3 });
      },
      onEnterBack: () => {
        gsap.to(progressBar, { opacity: 1, duration: 0.3 });
      },
      onLeaveBack: () => {
        gsap.to(progressBar, { opacity: 0, duration: 0.3 });
      },
    });

    gsap.to(progressBar, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `bottom bottom`,
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.5,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      rotateY: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      rotateY: 10,
      transition: {
        duration: 0.5,
      },
    },
  };

  const backgroundVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 0.7,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 w-0"
        />
      </div>

      <div ref={containerRef} className="relative w-full bg-black">
        <section
          ref={sectionRef}
          className="relative h-screen w-full overflow-hidden flex items-center justify-center"
        >
          <div className="w-full px-6 md:px-10 relative z-10 mx-auto">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                ref={featuresRef}
                className="flex flex-col gap-8 max-w-3xl mx-auto lg:mx-0"
              >
                <div className="relative h-[200px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`feature-${activeFeature}`}
                      className="absolute inset-0"
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="flex items-start gap-4 h-full">
                        <div className="flex-1">
                          <h3 className="text-white text-3xl md:text-[40px] font-semibold leading-tight md:leading-[53px]">
                            {currentFeature.title}
                          </h3>
                          <p className="text-sm leading-6 text-slate-400">
                            {currentFeature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div
                ref={mockupRef}
                className="relative w-full max-w-[300px] md:max-w-[471px] mx-auto"
              >
                <motion.div
                  className="absolute w-[300px] h-[317px] md:w-[472px] md:h-[500px] bg-[#090909] rounded-sm z-0"
                  style={{
                    top: "0%",
                    left: "-15%",
                    transform: "translateY(15%)",
                    filter: "blur(4px)",
                  }}
                  animate={{
                    y: [15, 5, 15],
                    rotateZ: [0, 1, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`next-${activeFeature}`}
                      className="relative w-full h-full bg-cover bg-center rounded-[32px] overflow-hidden"
                      style={{
                        backgroundImage: `url(${nextFeature.secondaryImageSrc})`,
                      }}
                      variants={backgroundVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="absolute inset-0 bg-black/50 flex items-end justify-center p-4">
                        <span className="text-white/70 text-sm text-center">
                          Next: {nextFeature.title}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  className="relative w-full h-[405px] md:h-[637px] bg-white/10 border border-white/20 rounded-sm backdrop-blur-lg z-10 overflow-hidden"
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`current-${activeFeature}`}
                      className="h-full relative"
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${currentFeature.primaryImageSrc})`,
                        }}
                      />

                      <motion.div
                        className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20 whitespace-nowrap"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {currentFeature.title}
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
