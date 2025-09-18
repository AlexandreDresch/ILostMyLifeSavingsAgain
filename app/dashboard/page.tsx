import Greeting from "@/components/dashboard/greeting";
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
      <div className="border-b bg-card flex  items-center justify-center">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <p>
            Welcome back,{" "}
            {user.username ? (
              <span className="font-bold">{user.firstName}</span>
            ) : (
              "User"
            )}
            !
          </p>

          <Greeting />
        </div>
      </div>
    </div>
  );
}
