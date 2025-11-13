"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navbarItems } from "@/constants";
import NavbarItem from "./navbar-item";
import { ThemeToggle } from "../theme-toggle-button";
import Logo from "../logo";
import { UserButton } from "@clerk/nextjs";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const toggleMenu = () => {
    if (!isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  const openMenu = () => {
    setIsOpen(true);

    setTimeout(() => {
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }

      if (menuRef.current) {
        gsap.fromTo(
          menuRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.4, ease: "power3.out" }
        );
      }

      if (hamburgerRef.current) {
        gsap.to(hamburgerRef.current, {
          rotation: 180,
          scale: 1.1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      }

      const validItems = itemsRef.current.filter((item) => item !== null);
      if (validItems.length > 0) {
        gsap.fromTo(
          validItems,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.1,
            delay: 0.2,
            ease: "power2.out",
          }
        );
      }
    }, 10);
  };

  const closeMenu = () => {
    const validItems = itemsRef.current.filter((item) => item !== null);
    if (validItems.length > 0) {
      gsap.to(validItems, {
        opacity: 0,
        x: 50,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in",
      });
    }

    if (menuRef.current) {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.3,
        delay: 0.1,
        ease: "power3.in",
        onComplete: () => setIsOpen(false),
      });
    }

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.in",
      });
    }

    if (hamburgerRef.current) {
      gsap.to(hamburgerRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleItemClick = () => {
    closeMenu();
  };

  useEffect(() => {
    const button = hamburgerRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      if (!isOpen) {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      if (!isOpen) {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isOpen]);

  return (
    <>
      <header className="block border-separate border-b border-slate-700/50 bg-background md:hidden">
        <nav className="flex items-center justify-between px-4 py-3">
          <Logo className="size-10" />

          <Button
            ref={hamburgerRef}
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="relative z-50"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </nav>
      </header>

      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 right-0 h-full w-80 bg-background border-l border-slate-700/50 shadow-xl z-40 md:hidden"
        >
          <div className="flex flex-col h-full pt-20 px-6">
            
            <div className="flex flex-col space-y-2">
              {navbarItems.map((item, index) => (
                <div
                  key={item.label}
                  ref={(el) => {
                    if (el) itemsRef.current[index] = el;
                  }}
                  className="opacity-0"
                >
                  <NavbarItem
                    label={item.label}
                    href={item.href}
                    onClick={handleItemClick}
                  />
                </div>
              ))}
            </div>

            <div
              ref={(el) => {
                if (el) itemsRef.current[navbarItems.length] = el;
              }}
              className="mt-auto mb-8 opacity-0"
            >
              <div className="flex items-center justify-between">
                <ThemeToggle />

                <UserButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}