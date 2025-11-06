"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Currency } from "@/types";
import { currencies } from "@/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "./skeleton-wrapper";
import { UserSettings } from "@prisma/client";
import { updateUserCurrency } from "@/app/wizard/_actions/user-settings";
import { toast } from "sonner";

export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedCurrency, setSelectedCurrency] =
    React.useState<Currency | null>(null);

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const userSettings = useQuery<UserSettings>({
    queryKey: ["userSettings"],
    queryFn: () => fetch("/api/user-settings").then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: updateUserCurrency,
    onSuccess: (data) => {
      toast.success(`Currency updated to ${data.currency} successfully!`);

      setSelectedCurrency(
        currencies.find((c) => c.value === data.currency) || null
      );
    },
    onError: () => {
      toast.error("Failed to update currency. Please try again.");
    },
    onSettled: () => {
      toast.dismiss("update-currency");
    },
  });

  const selectCurrency = React.useCallback(
    (currency: Currency | null) => {
      if (!currency) {
        toast.error("Invalid currency selected. Please try again.");
        return;
      }

      toast.loading("Updating currency...", { id: "update-currency" });

      mutation.mutate(currency.value);
    },
    [mutation]
  );

  React.useEffect(() => {
    if (userSettings.data && userSettings.data.currency) {
      const currency = currencies.find(
        (c) => c.value === userSettings.data?.currency
      );
      if (currency) {
        setSelectedCurrency(currency);
      }
    }
  }, [userSettings.data]);

  React.useEffect(() => {
    if (selectedCurrency && triggerRef.current) {
      gsap.fromTo(
        triggerRef.current,
        { scale: 1 },
        {
          scale: 1.05,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        }
      );
    }
  }, [selectedCurrency]);

  React.useEffect(() => {
    if (open && contentRef.current) {
      const items = contentRef.current.querySelectorAll("[data-currency-item]");
      gsap.fromTo(
        items,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [open]);

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={userSettings.isFetching}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <motion.div>
              <Button
                ref={triggerRef}
                variant="outline"
                className="w-full justify-start relative overflow-hidden group bg-transparent !border-slate-700/50"
                disabled={mutation.isPending}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <AnimatePresence mode="wait">
                  {selectedCurrency ? (
                    <motion.span
                      key="selected"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10"
                    >
                      {selectedCurrency.label}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="placeholder"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10 text-muted-foreground"
                    >
                      Select Currency
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </PopoverTrigger>
          <AnimatePresence>
            {open && (
              <PopoverContent className="w-[200px] p-0 bg-slate-900/50 border-slate-700/50 backdrop-blur-sm" align="start" asChild>
                <motion.div
                  ref={contentRef}
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.2,
                  }}
                >
                  <CurrencyList
                    setOpen={setOpen}
                    setSelectedCurrency={selectCurrency}
                  />
                </motion.div>
              </PopoverContent>
            )}
          </AnimatePresence>
        </Popover>
      </SkeletonWrapper>
    );
  }

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <motion.div>
            <Button
              ref={triggerRef}
              variant="outline"
              className="w-full justify-start relative overflow-hidden group bg-transparent"
              disabled={mutation.isPending}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <AnimatePresence mode="wait">
                {selectedCurrency ? (
                  <motion.span
                    key="selected-mobile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    {selectedCurrency.label}
                  </motion.span>
                ) : (
                  <motion.span
                    key="placeholder-mobile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 text-muted-foreground"
                  >
                    Set Currency
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </DrawerTrigger>
        <DrawerContent className="bg-background">
          <motion.div
            className="mt-4 border-t"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <CurrencyList
              setOpen={setOpen}
              setSelectedCurrency={selectCurrency}
            />
          </motion.div>
        </DrawerContent>
      </Drawer>
    </SkeletonWrapper>
  );
}

function CurrencyList({
  setOpen,
  setSelectedCurrency,
}: {
  setOpen: (open: boolean) => void;
  setSelectedCurrency: (status: Currency | null) => void;
}) {
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.querySelectorAll("[data-currency-item]");
      gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.03,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }
  }, []);

  return (
    <Command ref={listRef}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CommandInput placeholder="Search currencies..." />
      </motion.div>
      <CommandList className="bg-background">
        <CommandEmpty>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-4"
          >
            No currencies found.
          </motion.div>
        </CommandEmpty>
        <CommandGroup>
          {currencies.map((currency, index) => (
            <motion.div
              key={currency.value}
              data-currency-item
              whileHover={{
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                x: 4,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <CommandItem
                value={currency.value}
                onSelect={(value) => {
                  const selected =
                    currencies.find((currency) => currency.value === value) ||
                    null;
                  setSelectedCurrency(selected);
                  setOpen(false);

                  if (selected) {
                    gsap.to(listRef.current, {
                      scale: 1.02,
                      duration: 0.1,
                      yoyo: true,
                      repeat: 1,
                      ease: "power2.out",
                    });
                  }
                }}
                className="cursor-pointer relative overflow-hidden group"
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="relative z-10"
                >
                  {currency.label}
                </motion.span>
              </CommandItem>
            </motion.div>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
