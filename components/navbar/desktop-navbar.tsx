import React from "react";
import Logo from "../logo";
import { navbarItems } from "@/constants";
import NavbarItem from "./navbar-item";
import { ThemeToggle } from "../theme-toggle-button";
import { UserButton } from "@clerk/nextjs";

export default function DesktopNavbar() {
  return (
    <header className="hidden border-separate border-b bg-background md:block">
      <nav className=" flex items-center justify-between px-8 w-full">
        <div className="flex h-[80px] min-h-[80px] items-center gap-x-4">
          <Logo className="size-16" />

          <div className="flex h-full">
            {navbarItems.map((item) => (
              <NavbarItem
                key={item.label}
                label={item.label}
                href={item.href}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <UserButton />
        </div>
      </nav>
    </header>
  );
}
