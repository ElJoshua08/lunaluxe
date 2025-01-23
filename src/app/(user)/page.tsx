'use client';

import heroRingImg from '@/../public/images/hero-ring.webp';
import section2RingImg from '@/../public/images/ring-2.webp';
import { buttonVariants } from '@/components/ui/button';
import { TextAnimate } from '@/components/ui/text-animate';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionSelector } from './_components/section-selector';
import { TotalCustomers } from './_components/total-customers';

export default function Home() {
  return (
    <div className="flex items-center justify-start flex-col overflow-x-clip h-full w-full top-0 ">
      {/* Section Selector */}
      <SectionSelector />

      {/* First Section */}
      <section
        id="hero"
        className="shrink-0 grow w-full h-full "
      >
        {/* Hero Section */}
        <div className="flex flex-row items-center justify-center gap-x-8 px-32 py-8 mt-20 relative bg-secondary dark:bg-primary -z-[5]">
          <TextAnimate
            by="word"
            animation="blurInDown"
            duration={10000}
            className="font-italiana font-semibold text-8xl text-balance text-black"
          >
            Exquisite,{' '}
            <span className="text-primary dark:text-secondary font-bold">
              artisan-crafted
            </span>{' '}
            jewelry of unparalleled quality.
          </TextAnimate>

          <Image
            src={heroRingImg}
            alt="Hero Ring"
            width={820}
            height={820}
            quality={100}
            draggable={false}
            className="select-none absolute right-0 top-[155px] -translate-y-1/2 translate-x-1/2 -z-10 motion-preset-blur-up-lg"
          />
        </div>

        {/* CTA and Info */}
        <div className="flex flex-row items-center justify-center px-40 w-full mt-32 py-8">
          <Link
            href="/our-collection"
            className={cn(
              buttonVariants({ variant: 'accent' }),
              'h-auto text-xl py-3 hover:shadow-lg hover:shadow-accent/70 transition-all'
            )}
          >
            Explore our collection
          </Link>

          <TextAnimate
            by="word"
            animation="blurInUp"
            delay={1000}
            duration={2500}
            as="h1"
            className="font-italiana text-right sm:text-7xl xl:text-8xl font-semibold text-balance leading-tight"
          >
            Jewelry isn’t just an accessory. it’s a wearable memory
          </TextAnimate>
        </div>

        {/* Go down button */}

        <ChevronDown
          size={32}
          strokeWidth={2}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce animate-infinite animate-duration-[1500ms] animate-ease-in-out z-0"
          onClick={() => {
            document.getElementById('about-us')?.scrollIntoView({
              behavior: 'smooth',
            });
          }}
        />
      </section>

      {/* Section 2 */}
      <section
        className="shrink-0 grow w-full h-full py-8 relative"
        id="about-us"
      >
        {/* Section Ring */}
        <Image
          src={section2RingImg}
          alt="Section Ring"
          width={1050}
          height={1050}
          quality={100}
          draggable={false}
          className="select-none absolute left-0 top-[10px] -translate-x-[50%] -z-10 motion-preset-blur-up-lg"
        />

        {/* About Us Section and customers count */}
        <div className="flex flex-row items-center justify-around py-8 px-40 w-full ">
          <div className="flex flex-col items-center justify-center w-full h-auto ">
            <h2 className="text-7xl font-italiana font-semibold">
              Our Story, Your Sparkle
            </h2>

            <p className="max-w-[50ch] text-balance text-2xl leading-normal text-center mt-6">
              At Luna, jewelry isn’t just adornment—it’s your story. Crafted
              with care, using sustainable materials and timeless designs, each
              piece celebrates the moments that define you.
            </p>
          </div>

          <TotalCustomers totalCustomers={1500} />
        </div>

        {/* Satisfied Customers and Testimonials Section  */}
      </section>
    </div>
  );
}
