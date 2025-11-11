import OnboardingWizard from "@/components/wizard/onboarding-wizard";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Wizard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full flex flex-col justify-between gap-4">
      <OnboardingWizard />
    </div>
  );
}
