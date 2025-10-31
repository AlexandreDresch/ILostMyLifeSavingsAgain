"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import ShinyButton from "./shiny-button";
import gsap from "gsap";
import Link from "next/link";

interface HeroSectionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
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
  };
  backgroundImage: string;
}

export default function Hero({
  className,
  logo,
  slogan,
  title,
  subtitle,
  callToAction,
  backgroundImage,
  ...props
}: HeroSectionProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const element = imageRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = ((xPos - centerX) / centerX) * 30;
    const moveY = ((yPos - centerY) / centerY) * 30;
    const scale = 1.05;
    const blur = 0.5;

    const tiltY = ((xPos - centerX) / centerX) * -10;
    const tiltX = ((yPos - centerY) / centerY) * 5;

    const innerImage = element.querySelector(
      "div:first-child"
    ) as HTMLDivElement;

    if (innerImage) {
      gsap.to(innerImage, {
        duration: 0.4,
        x: moveX,
        y: moveY,
        scale: scale,
        filter: `blur(${blur}px)`,
        rotateY: `${-5 + tiltY}deg`,
        rotateX: `${tiltX}deg`,
        ease: "power1.out",
      });
    }
  };

  const handleMouseLeave = () => {
    const element = imageRef.current;

    if (element) {
      const innerImage = element.querySelector(
        "div:first-child"
      ) as HTMLDivElement;

      if (innerImage) {
        gsap.to(innerImage, {
          duration: 0.6,
          x: 0,
          y: 0,
          scale: 1.1,
          filter: "blur(0px)",
          rotateY: "-5deg",
          rotateX: "0deg",
          ease: "power2.out",
        });
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ...safeProps } = props as any;

  return (
    <motion.section
      className={cn(
        "relative flex w-full min-h-screen flex-col overflow-hidden bg-background text-foreground md:flex-row",
        className
      )}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      {...safeProps}
    >
      <div
        ref={contentRef}
        className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16"
      >
        <div>
          <motion.header className="mb-12" variants={itemVariants}>
            {logo && (
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={logo.url}
                  alt={logo.alt}
                  className="mr-3 border border-white rounded-lg"
                  width={38}
                  height={38}
                />
                <div>
                  {logo.text && (
                    <motion.p
                      className="text-lg font-bold text-foreground"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {logo.text}
                    </motion.p>
                  )}
                  {slogan && (
                    <motion.p
                      className="text-xs tracking-wider text-muted-foreground"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {slogan}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}
          </motion.header>

          <motion.main variants={containerVariants}>
            <motion.h1
              className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {title}
            </motion.h1>

            <motion.div
              className="my-6 h-1 w-20 bg-primary"
              variants={itemVariants}
              whileHover={{ width: 100 }}
              transition={{ type: "spring", stiffness: 300 }}
            />

            <motion.p
              className="mb-8 max-w-md text-base text-muted-foreground md:text-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {subtitle}
            </motion.p>

            <Link href={callToAction.href}>
              <motion.div variants={itemVariants}>
                <ShinyButton>{callToAction.text}</ShinyButton>
              </motion.div>
            </Link>
          </motion.main>
        </div>

        <motion.div
          className="mt-auto hidden md:flex flex-col items-center gap-3 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
        >
  

         <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-base flex items-center gap-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-4 border border-white/60 rounded-full relative">
              <motion.div
                className="w-1 h-1 bg-white/60 rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            Scroll to explore
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        ref={imageRef}
        className="relative w-full min-h-[50vh] md:w-1/2 md:min-h-screen lg:w-2/5 overflow-hidden"
        style={{
          clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseLeave}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: "scaleX(-1)",
            transformOrigin: "left center",
          }}
          initial={{
            scale: 1.15,
            x: "0%",
            y: "0%",
            filter: "blur(0px)",
            rotateY: "0deg",
          }}
          animate={{
            scale: 1.1,
            rotateY: "-5deg",
          }}
          transition={{
            duration: 1.5,
            ease: "circOut",
          }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-background/60 via-background/20 to-transparent md:bg-gradient-to-r"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-48 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -top-48 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </motion.section>
  );
}
