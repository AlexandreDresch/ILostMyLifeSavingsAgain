"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className="flex items-center">
      <motion.span whileHover={{ scale: 1.2 }} className="flex items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className={className}
          priority
        />
      </motion.span>
    </Link>
  );
}
