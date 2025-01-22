'use client';

import heroRingImg from '@/../public/images/hero-ring.webp';
import { buttonVariants } from '@/components/ui/button';
import { TextAnimate } from '@/components/ui/text-animate';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-start flex-col overflow-x-clip h-full w-full top-0 ">
      {/* First Section */}
      <div className="shrink-0 grow w-full h-full ">
        {/* Hero Section */}
        <div className="flex flex-row items-center justify-center gap-x-8 px-32 py-8 mt-20 relative bg-secondary -z-[5]">
          <TextAnimate
            by="word"
            animation="blurInDown"
            duration={10000}
            className="font-italiana font-semibold text-8xl text-balance"
          >
            Exquisite,{' '}
            <span className="text-primary font-bold">artisan-crafted</span>{' '}
            jewelry of unparalleled quality.
          </TextAnimate>

          <Image
            src={heroRingImg}
            alt="Hero Ring"
            width={820}
            height={820}
            quality={100}
            draggable={false}
            className="select-none absolute right-0 top-[155px] -translate-y-1/2 translate-x-1/2 -z-10 animate-fade-up animate-duration-1000 animate-delay-500 animate-ease-in-out"
          />
        </div>

        {/* CTA and Info */}
        <div className="flex flex-row items-center justify-center px-40 w-full mt-32 py-8">
          <Link
            href="/our-collection"
            className={cn(
              buttonVariants({ variant: 'secondary' }),
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
      </div>

      {/* Section 2 */}
      <div
        className="shrink-0 grow w-full h-full"
        id="about-us"
      >
        {/* About Us Section and customers count */}
        <div className="flex flex-row items-center justify-around px-40 w-full">
          <div>
            <h2 className="text-lg font-italiana font-semibold">
              Our Story, Your Sparkle
            </h2>

            <p>
              At Luna, we believe jewelry is more than adornment—it’s an
              expression of your unique story. With a commitment to exceptional
              craftsmanship, sustainable materials, and timeless designs, every
              piece we create is made to celebrate the beauty and moments that
              define you.
            </p>
          </div>
        </div>

        {/* Satisfied Customers and Testimonials Section  */}
      </div>
    </div>
  );
}
