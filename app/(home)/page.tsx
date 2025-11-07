import { Footer } from "@/components/footer";
import Cta from "@/components/home/cta";
import { FAQ } from "@/components/home/faq";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import { Pricing } from "@/components/pricing";
import { demoPlans } from "@/constants";

export default function Home() {
  return (
    <div className="w-full flex flex-col relative">
      <Hero
        logo={{
          url: "/logo.png",
          alt: "ILostMyLifeSavingsAgain Logo",
          text: "I Lost My Life Savings Again",
        }}
        slogan="THE ULTIMATE FINANCE TRACK EXPERIENCE"
        title={
          <>
            Each Expense <br />
            <span className="text-primary">Teaches Something</span>
          </>
        }
        subtitle="Track your expenses, analyze your spending habits, and gain insights to make smarter financial decisions. Take control of your finances before they control you."
        callToAction={{
          text: "I'M READY TO CHANGE MY LIFE",
          href: "/login",
        }}
        backgroundImage="/hero-image.webp"
      />

      <Features />

      <HowItWorks />

      <Pricing
        title="Pick Your Vibe, Save Your Cash"
        description="Choose a plan that fits your grind and quit doomscrolling your finances into oblivion. From free to baller, we’ve got you covered to track, plan, and win — no excuses."
        plans={demoPlans}
      />

      <FAQ />

      <Cta />

      <Footer />
    </div>
  );
}
