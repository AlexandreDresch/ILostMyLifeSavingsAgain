"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const moonIconRef = useRef<HTMLDivElement>(null);
  const sunIconRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (
      !sliderRef.current ||
      !moonIconRef.current ||
      !sunIconRef.current ||
      !backgroundRef.current
    )
      return;

    const tl = gsap.timeline();

    if (isDark) {
      tl.to(sliderRef.current, {
        x: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      })
        .to(
          moonIconRef.current,
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(
          sunIconRef.current,
          {
            scale: 0.8,
            rotation: 180,
            opacity: 0.5,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          backgroundRef.current,
          {
            backgroundColor: "#09090b",
            borderColor: "#27272a",
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.6"
        );
    } else {
      tl.to(sliderRef.current, {
        x: 32,
        duration: 0.6,
        ease: "back.out(1.7)",
      })
        .to(
          sunIconRef.current,
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(
          moonIconRef.current,
          {
            scale: 0.8,
            rotation: -180,
            opacity: 0.5,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          backgroundRef.current,
          {
            backgroundColor: "#ffffff",
            borderColor: "#e4e4e7",
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.6"
        );
    }
  }, [isDark]);

  const handleMouseEnter = () => {
    if (!toggleRef.current) return;
    gsap.to(toggleRef.current, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!toggleRef.current) return;
    gsap.to(toggleRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    if (!toggleRef.current) return;

    gsap.to(toggleRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setTheme(isDark ? "light" : "dark");
      },
    });
  };

  if (!mounted) {
    // Avoid hydration mismatch by not rendering toggle until after mount
    return <div className="w-16 h-8 rounded-full bg-zinc-200" />;
  }

  return (
    <div
      ref={toggleRef}
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer relative overflow-hidden",
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: isDark ? "#09090b" : "#ffffff",
          border: `1px solid ${isDark ? "#27272a" : "#e4e4e7"}`,
        }}
      />

      <div
        ref={sliderRef}
        className="flex justify-center items-center w-6 h-6 rounded-full bg-white dark:bg-zinc-800 relative z-10 shadow-sm"
        style={{ transform: `translateX(${isDark ? 0 : 32}px)` }}
      >
        <div ref={moonIconRef} className="absolute">
          <Moon
            className="w-4 h-4 text-zinc-700 dark:text-white"
            strokeWidth={1.5}
            style={{
              opacity: isDark ? 1 : 0.5,
              transform: `scale(${isDark ? 1 : 0.8}) rotate(${
                isDark ? 0 : -180
              }deg)`,
            }}
          />
        </div>

        <div ref={sunIconRef} className="absolute">
          <Sun
            className="w-4 h-4 text-amber-500"
            strokeWidth={1.5}
            style={{
              opacity: isDark ? 0.5 : 1,
              transform: `scale(${isDark ? 0.8 : 1}) rotate(${
                isDark ? 180 : 0
              }deg)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
