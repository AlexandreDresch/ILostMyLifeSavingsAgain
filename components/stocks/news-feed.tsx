"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink } from "lucide-react";
import Image from "next/image";
import { newsStories } from "@/constants";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.45,
      ease: "easeOut" as const,
    },
  }),
} as const;

export function NewsFeed() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current.querySelectorAll(".news-tile"), {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.08,
      duration: 0.55,
      ease: "power3.out",
    });
  }, []);

  return (
    <Card
      ref={containerRef}
      className="bg-background border-slate-700/50 h-full relative overflow-hidden"
    >
      <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold">Top Stories</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-white/5">
          {newsStories.map((story, i) => (
            <motion.div
              key={story.id}
              variants={itemVariants}
              initial="initial"
              animate="animate"
              custom={i}
            >
              <div className="news-tile p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <div className="h-10 w-10 rounded bg-white/10 overflow-hidden relative">
                      <motion.div
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.12 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src={story.image || "/placeholder.svg"}
                          alt={story.source}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Badge
                        variant="outline"
                        className="text-[10px] h-4 px-1 border-white/10 text-gray-400 bg-white/5"
                      >
                        {story.source}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {story.time}
                      </span>
                    </div>
                    <motion.h3
                      className="text-sm font-medium leading-snug text-gray-200 group-hover:text-white transition-colors line-clamp-2"
                      whileHover={{ x: 2 }}
                    >
                      {story.title}
                    </motion.h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
