import { CurrencyComboBox } from "@/components/currency-combo-box";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Wizard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4 bg-pattern">
      <div>
        <h1 className="text-2xl font-bold text-center ">
          Welcome to the Setup Wizard,
          {user.username ? (
            <span className="ml-2 font-bold">{user.firstName}!</span>
          ) : (
            "!"
          )}
        </h1>

        <p className="text-center text-muted-foreground mt-4">
          Let&apos;s get started by setting up your preferences and
          configurations.
        </p>

        <h3 className="mt-2 text-center text-sm text-muted-foreground">
          You can change these settings at any time later.
        </h3>
      </div>

      <Separator />

      <Card className="w-full bg-background border-slate-700/50">
        <CardHeader>
          <CardTitle>Currency</CardTitle>

          <CardDescription>
            Select your preferred currency for transactions and display.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>

      <Separator />

      <Card className="w-full bg-background border-slate-700/50">
        <CardHeader>
          <CardTitle>Language</CardTitle>

          <CardDescription>
            Choose your preferred language for the application interface.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            (This feature is coming soon! For now, the application is only
            available in English.)
          </p>
        </CardContent>
      </Card>

      <Separator />

      <Button className="w-full" asChild>
        <Link href="/dashboard">Continue to Dashboard</Link>
      </Button>
    </div>
  );
}
