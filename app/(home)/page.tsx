import Features from "@/components/home/features";
import Hero from "@/components/home/hero";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
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

      <div className="h-screen"></div>
    </div>
  );
}
