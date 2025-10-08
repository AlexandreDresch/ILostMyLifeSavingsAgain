import Greeting from "@/components/dashboard/greeting";
import Sidebar from "@/components/dashboard/sidebar";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }

  return (
    <div className="w-full bg-background">
      <div className="border-b border-slate-700/50 flex items-center justify-center">
        <div className="w-full flex items-center justify-between gap-6 py-8 px-6">
          <p className="text-lg sm:text-xl font-bold">
            Welcome back,{" "}
            {user.firstName ? (
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {user.firstName}
              </span>
            ) : (
              "User"
            )}
            !
          </p>

          <Greeting />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 p-6">
        <Sidebar />
      </div>
    </div>
  );
}
