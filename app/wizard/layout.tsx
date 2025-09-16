import Navbar from "@/components/navbar/navbar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen w-full flex-col">
      <Navbar />
      <div className="relative flex h-screen w-full flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
