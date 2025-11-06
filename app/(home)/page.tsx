import { Footer } from "@/components/footer";
import Cta from "@/components/home/cta";
import { FAQ } from "@/components/home/faq";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";

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

      <FAQ />

      <Cta />

      <Footer />
    </div>
  );
}
