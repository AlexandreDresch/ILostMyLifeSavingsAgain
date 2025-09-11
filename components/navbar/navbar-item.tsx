"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";

interface NavbarItemProps {
  label: string;
  href: string;
  onClick?: () => void;
}

export default function NavbarItem({ label, href, onClick }: NavbarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <div className="relative flex items-center" onClick={onClick}>
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground font-medium"
        )}
      >
        {label}
      </Link>

      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
      )}
    </div>
  );
}
