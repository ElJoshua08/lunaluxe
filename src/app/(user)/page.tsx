"use client"

import section2RingImg from "@/../public/images/ring-2.webp"
import { SceneOne } from "@/app/(auth)/_components/scene-one"
import { TextAnimate } from "@/components/ui/text-animate"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { CTA } from "./_components/cta"
import { SectionSelector } from "./_components/section-selector"

export default function Home() {
  return (
    <div className="top-0 flex h-full w-full flex-col items-center justify-start overflow-x-clip">
      {/* Section Selector */}
      <SectionSelector
        containerClassname="right-7 bottom-20 md:bottom-40 md:right-12"
        selectorClassname="h-8 md:h-3"
      />

      {/* First Section */}
      <section id="hero" className="h-full w-full shrink-0 grow">
        {/* Hero Section */}
        <div className="relative -z-[5] mt-20 flex w-full flex-row items-center justify-start pl-16 gap-x-8 bg-secondary py-8 dark:bg-primary">
          <TextAnimate
            by="word"
            animation="blurInUp"
            duration={2500}
            as="h1"
            className="max-w-[20ch] shrink-0 text-balance font-italiana text-3xl font-semibold text-foreground md:text-8xl">
            Exquisite,{" "}
            <span className="font-bold text-primary dark:text-secondary">
              artisan-crafted
            </span>{" "}
            jewelry of unparalleled quality.
          </TextAnimate>
          <div className="absolute -right-10 min-h-[1000px] min-w-[700px] bg-red-500 flex items-center justify-center">
            <SceneOne />
          </div> 
        </div>

        {/* CTA and Info */}
        <div className="mt-32 flex w-full flex-col-reverse items-center justify-center gap-y-16 px-10 py-8 md:flex-row md:gap-y-0 md:px-40">
          <CTA className="md:text-left" />

          <TextAnimate
            by="word"
            animation="blurInUp"
            duration={2500}
            as="h1"
            className="w-full text-balance text-center font-italiana text-2xl font-semibold leading-tight sm:text-7xl md:text-right xl:text-8xl">
            Jewelry isn’t just an accessory. it’s a wearable memory
          </TextAnimate>
        </div>

        {/* Next section icon */}
        <ChevronDown
          size={32}
          strokeWidth={2}
          className="absolute bottom-10 left-1/2 z-0 -translate-x-1/2 animate-bounce cursor-pointer text-foreground animate-duration-[1500ms] animate-infinite animate-ease-in-out"
          onClick={() => {
            document.getElementById("about-us")?.scrollIntoView({
              behavior: "smooth",
            })
          }}
        />
      </section>

      {/* Section 2 */}
      <section
        className="relative h-full w-full shrink-0 grow py-8"
        id="about-us">
        {/* Section Ring */}
        <Image
          src={section2RingImg}
          alt="Section Ring"
          width={1050}
          height={1050}
          quality={100}
          draggable={false}
          className="motion-preset-blur-up-lg absolute left-0 top-[10px] -z-10 -translate-x-[50%] select-none"
        />

        {/* Tell about personalitation */}
        <div className="flex w-full flex-col justify-around gap-y-16 px-40 py-28">
          <TextAnimate
            by="word"
            animation="blurInUp"
            duration={2500}
            as="h1"
            className="ml-24 self-start text-balance text-left font-italiana text-9xl font-semibold leading-snug">
            Make It{" "}
            <span className="bg-primary px-10 py-4 font-bold text-secondary">
              Truly
            </span>{" "}
            Yours
          </TextAnimate>

          <p className="mt-28 max-w-[50ch] text-balance text-right font-italiana text-6xl font-medium leading-tight">
            Explore a wide selection of unique jewelry and make it your own with
            easy-to-use customization tools.
          </p>

          <div className="-z-20 flex h-40 w-full items-center justify-center bg-secondary">
            <h2 className="text-2xl text-black">
              Here we put some rings in a row that rotates{" "}
            </h2>
          </div>
        </div>
      </section>
    </div>
  )
}
