"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
}

export function Hero({
  eyebrow = "🌅 WELCOME TO SUNSPOT BERLIN",
  title,
  subtitle,
  ctaLabel = "Find Your Sunny Moment",
  ctaHref = "#",
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full pt-40 px-6 text-center md:px-8 
      min-h-[calc(100vh-40px)] overflow-hidden 
      bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100
      rounded-b-xl"
    >
      {/* Grid BG */}
      <div
        className="absolute -z-10 inset-0 opacity-80 h-[600px] w-full 
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
        bg-[size:6rem_5rem] 
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* Radial Accent - Customized with yellow-orange-red */}
      <div
        className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)] 
        h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[140%] 
        -translate-x-1/2 rounded-[100%] border-yellow-400 bg-white
        bg-[radial-gradient(closest-side,#fff_82%,#fbbf24_20%,#f97316_40%,#dc2626_60%)] 
        animate-fade-up"
      />

      {/* Eyebrow */}
      {eyebrow && (
        <a href="#" className="group">
          <span
            className="text-sm text-yellow-800 font-geist mx-auto px-5 py-2 
            bg-gradient-to-tr from-yellow-300/20 via-orange-400/20 to-red-400/20  
            border-[2px] border-yellow-400/30 
            rounded-3xl w-fit tracking-tight uppercase flex items-center justify-center"
          >
            {eyebrow}
            <ChevronRight className="inline w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </a>
      )}

      {/* Title */}
      <h1
        className="animate-fade-in -translate-y-4 text-balance 
        bg-gradient-to-br from-gray-900 via-yellow-500 to-red-600 
        bg-clip-text py-6 text-5xl font-black leading-none tracking-tighter 
        text-transparent opacity-0 sm:text-6xl md:text-7xl lg:text-8xl"
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        className="animate-fade-in mb-12 -translate-y-4 text-balance 
        text-lg tracking-tight text-gray-700 
        opacity-0 md:text-xl"
      >
        {subtitle}
      </p>

      {/* CTA */}
      {ctaLabel && (
        <div className="flex justify-center">
          <Button
            asChild
            className="mt-[-20px] w-fit md:w-52 z-20 font-geist tracking-tighter text-center text-lg
            bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700
            text-white border-2 border-yellow-400 shadow-lg"
          >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      )}

      {/* Bottom Fade */}
      <div
        className="animate-fade-up relative mt-32 opacity-0 [perspective:2000px] 
        after:absolute after:inset-0 after:z-50 
        after:[background:linear-gradient(to_top,hsl(var(--background))_10%,transparent)]"
      />
    </section>
  )
}
