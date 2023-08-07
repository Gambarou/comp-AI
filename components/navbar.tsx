"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"
import { Poppins } from "next/font/google"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { MobileSidebar } from "./mobile-sidebar"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useProModal } from "@/hooks/use-pro-modal"

const font = Poppins({
  weight: "600",
  subsets: ["latin"]
})

interface NavBarProps {
  isPro: boolean;
}

export const Navbar = ({
  isPro
}: NavBarProps) => {
  const proModal = useProModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div 
      className="
        fixed 
        w-full 
        h-16
        z-50 
        flex 
        justify-between 
        items-center 
        py-2 
        px-4 
        border-b 
        border-primary/10 
        bg-secondary
      "
    >
      <div className="flex items-center">
        <MobileSidebar isPro={isPro} />
        <Link href="/">
          <h1 
            className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary", font.className)}>
            Personif<span className="font-bold text-yellow-300">AI</span>
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        {!isPro ? (
          <Button onClick={proModal.onOpen} variant="premium" size="sm">
            Upgrade
            <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
          </Button>
        ) : null}
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}