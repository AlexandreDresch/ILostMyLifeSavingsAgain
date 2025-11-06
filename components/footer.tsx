"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { XIcon, InstagramIcon, YoutubeIcon, LinkedinIcon } from "lucide-react";
import { Button } from "./ui/button";
import Logo from "./logo";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterLinkGroup {
  label: string;
  links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<"footer">;

export function Footer({ className, ...props }: StickyFooterProps) {
  return (
    <footer
      className={cn("relative h-[420px] w-full", className)}
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      {...props}
    >
      <div className="fixed bottom-0 h-[420px] w-full">
        <div className="sticky top-[calc(100vh-420px)] h-full overflow-y-auto">
          <div className="relative flex size-full flex-col justify-between gap-5 border-t border-slate-400/40 px-4 py-8 md:px-12 ">
            <div
              aria-hidden
              className="absolute inset-0 isolate z-0 contain-strict"
            >
              <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
              <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
              <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
            </div>
            <div className="mt-10 flex flex-col gap-8 md:flex-row xl:mt-0">
              <AnimatedContainer className="w-full max-w-sm min-w-2xs space-y-4">
                <Logo />
                <p className="text-muted-foreground mt-8 text-sm md:mt-0">
                  Stop scrolling, start winning. Track every dollar, dodge bad buys, and run your finances like a pro with our razor-sharp platform.
                </p>
                <div className="flex gap-2">
                  {socialLinks.map((link) => (
                    <Button
                      key={link.title}
                      size="icon"
                      variant="default"
                      className="size-8 hover:bg-cyan-400 cursor-pointer transition-colors duration-300"
                    >
                      <link.icon className="size-4" />
                    </Button>
                  ))}
                </div>
              </AnimatedContainer>
              {footerLinkGroups.map((group, index) => (
                <AnimatedContainer
                  key={group.label}
                  delay={0.1 + index * 0.1}
                  className="w-full"
                >
                  <div className="mb-10 md:mb-0">
                    <h3 className="text-sm uppercase tracking-widest text-slate-400">{group.label}</h3>
                    <ul className="text-muted-foreground mt-4 space-y-2 text-sm md:text-xs lg:text-sm">
                      {group.links.map((link) => (
                        <li key={link.title}>
                          <a
                            href={link.href}
                            className="hover:text-cyan-300 inline-flex items-center transition-all duration-300"
                          >
                            {link.icon && <link.icon className="me-1 size-4" />}
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedContainer>
              ))}
            </div>
            <div className="text-muted-foreground flex flex-col items-center justify-between gap-2 border-t border-slate-400/30 pt-2 text-sm md:flex-row">
              <p>© 202x ILostMyLifeSavingsAgain, Inc. All rights reserved.</p>
              <p>Built for the crew crushing it.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const socialLinks = [
  { title: "X", href: "#", icon: XIcon },
  { title: "Instagram", href: "#", icon: InstagramIcon },
  { title: "Youtube", href: "#", icon: YoutubeIcon },
  { title: "LinkedIn", href: "#", icon: LinkedinIcon },
];

const footerLinkGroups: FooterLinkGroup[] = [
  {
    label: "Features",
    links: [
      { title: "Real-Time Tracking", href: "#" },
      { title: "Income & Expense Dashboard", href: "#" },
      { title: "Smart Budgeting", href: "#" },
      { title: "Investment Dashboard", href: "#" },
      { title: "Spending Alerts", href: "#" },
      { title: "Daily AI Insights", href: "#" },
      { title: "Export to CSV", href: "#" },
    ],
  },
  {
    label: "Solutions",
    links: [
      { title: "Freelancers", href: "#" },
      { title: "Small Businesses", href: "#" },
      { title: "Startups", href: "#" },
      { title: "E-commerce", href: "#" },
      { title: "Personal Finance", href: "#" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Blog", href: "#" },
      { title: "Guides & Tutorials", href: "#" },
      { title: "Documentation", href: "#" },
      { title: "Community Forum", href: "#" },
      { title: "Support Center", href: "#" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About Us", href: "#" },
      { title: "Careers", href: "#" },
      { title: "Press", href: "#" },
      { title: "Privacy Policy", href: "#" },
      { title: "Terms of Service", href: "#" },
    ],
  },
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode;
  delay?: number;
};

function AnimatedContainer({
  delay = 0.1,
  children,
  ...props
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}