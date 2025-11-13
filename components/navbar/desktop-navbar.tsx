import React from "react";
import Logo from "../logo";
import { ThemeToggle } from "../theme-toggle-button";
import { UserButton } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  type NavItemType,
  NavGridCard,
  NavSmallItem,
  NavLargeItem,
} from "@/components/ui/navigation-menu";
import {
  Users,
  Star,
  FileText,
  Shield,
  RotateCcw,
  Handshake,
  Newspaper,
  HelpCircle,
  DollarSign,
  PieChart,
  BarChart,
  Users2,
  Zap,
  Lock,
  Code,
  ShoppingCart,
} from "lucide-react";

export default function DesktopNavbar() {
  const companyLinks: NavItemType[] = [
    {
      title: "About the Chaos",
      href: "/about",
      description: "How we turned financial despair into a snarky app",
      icon: Users,
    },
    {
      title: "Meme-Worthy Wins",
      href: "/stories",
      description: "Users who didn’t lose *everything* using our tools",
      icon: Star,
    },
    {
      title: "Rules of the Game",
      href: "/terms",
      description: "The fine print for surviving our app",
      icon: FileText,
    },
    {
      title: "Privacy (LOL)",
      href: "/privacy",
      description: "We guard your data better than your portfolio",
      icon: Shield,
    },
    {
      title: "Refund Vibes",
      href: "/refunds",
      description: "How to beg for your money back",
      icon: RotateCcw,
    },
    {
      title: "Squad Up",
      href: "/partnerships",
      description: "Join forces with our meme-finance empire",
      icon: Handshake,
    },
    {
      title: "Dank Blog",
      href: "/blog",
      description: "Hot takes, finance memes, and bad advice",
      icon: Newspaper,
    },
    {
      title: "Help (Send It)",
      href: "/support",
      description: "For when you’re financially *and* emotionally lost",
      icon: HelpCircle,
    },
  ];

  const productLinks: NavItemType[] = [
    {
      title: "Budget or Bust",
      href: "/features/budget",
      description: "Track your cash before it vanishes again",
      icon: DollarSign,
    },
    {
      title: "Portfolio Pain",
      href: "/features/portfolio",
      description: "Watch your investments cry in real-time",
      icon: PieChart,
    },
    {
      title: "Meme Metrics",
      href: "/features/analytics",
      description: "Charts to confirm you’re NGMI",
      icon: BarChart,
    },
    {
      title: "Squad Goals",
      href: "/features/collaboration",
      description: "Plan financial doom with your frens",
      icon: Users2,
    },
    {
      title: "Turbo Transactions",
      href: "/features/integrations",
      description: "Link your bank before it links you",
      icon: Zap,
    },
    {
      title: "Meme Mart",
      href: "/features/ecommerce",
      description: "Buy stonks-themed merch, why not?",
      icon: ShoppingCart,
    },
    {
      title: "Fort Knox Mode",
      href: "/features/security",
      description: "Protect your pennies from hackers",
      icon: Lock,
    },
    {
      title: "Dev Shenanigans",
      href: "/api",
      description: "API for building your own financial mess",
      icon: Code,
    },
  ];
  return (
    <header className="hidden border-separate border-b border-slate-700/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block sticky top-0 z-50">
      <nav className=" flex items-center justify-between px-8 w-full">
        <div className="flex h-[70px] min-h-[70px] items-center justify-between w-full gap-x-4">
          <Logo className="size-16" />

          <div className="flex items-center justify-center w-full h-full">
            {/* {navbarItems.map((item) => (
              <NavbarItem
                key={item.label}
                label={item.label}
                href={item.href}
              />
            ))} */}

            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                <NavigationMenuItem >
                  <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                  <NavigationMenuContent >
                    <div className="grid w-full md:w-4xl md:grid-cols-[1fr_.30fr]">
                      <ul className="grid grow gap-4 p-4 md:grid-cols-3 md:border-r">
                        {productLinks.slice(0, 3).map((link) => (
                          <li key={link.href}>
                            <NavGridCard link={link} />
                          </li>
                        ))}
                      </ul>
                      <ul className="space-y-1 p-4">
                        {productLinks.slice(3).map((link) => (
                          <li key={link.href}>
                            <NavSmallItem
                              item={link}
                              href={link.href}
                              className="gap-x-1"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-full md:w-4xl md:grid-cols-[1fr_.40fr]">
                      <ul className="grid grow grid-cols-2 gap-4 p-4 md:border-r">
                        {companyLinks.slice(0, 2).map((link) => (
                          <li key={link.href}>
                            <NavGridCard link={link} className="min-h-36" />
                          </li>
                        ))}
                        <div className="col-span-2 grid grid-cols-3 gap-x-4">
                          {companyLinks.slice(2, 5).map((link) => (
                            <li key={link.href}>
                              <NavLargeItem href={link.href} link={link} />
                            </li>
                          ))}
                        </div>
                      </ul>
                      <ul className="space-y-2 p-4">
                        {companyLinks.slice(5, 10).map((link) => (
                          <li key={link.href}>
                            <NavLargeItem href={link.href} link={link} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="cursor-pointer">
                    Pricing
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
