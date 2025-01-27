'use client';

import heroRingImg from '@/../public/images/hero-ring.webp';
import section2RingImg from '@/../public/images/ring-2.webp';
import { TextAnimate } from '@/components/ui/text-animate';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { CTA } from './_components/cta';
import { SectionSelector } from './_components/section-selector';

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
            animation="blurInUp"
            duration={2500}
            as="h1"
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
          <CTA />

          <TextAnimate
            by="word"
            animation="blurInUp"
            duration={2500}
            as="h1"
            className="font-italiana text-right sm:text-7xl xl:text-8xl font-semibold text-balance leading-tight"
          >
            Jewelry isn’t just an accessory. it’s a wearable memory
          </TextAnimate>
        </div>

        {/* Next section icon */}
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

        {/* Tell about personalitation */}
        <div className="flex flex-col justify-around py-28 px-40 gap-y-16 w-full">
          <TextAnimate
            by="word"
            animation="blurInUp"
            duration={2500}
            as="h1"
            className="text-9xl font-italiana font-semibold text-left self-start ml-24"
          >
            Make It{' '}
            <span className="font-bold text-secondary bg-primary py-4 px-10">
              Truly
            </span>{' '}
            Yours
          </TextAnimate>

          <p className="max-w-[50ch] text-balance text-5xl leading-tight mt-28 text-right">
            Explore a wide selection of unique jewelry and make it your own with
            easy-to-use customization tools.
          </p>

          <div className="w-full h-40 bg-secondary -z-20 flex items-center justify-center">
            <h2 className="text-2xl text-black">
              Here we put some rings in a row that rotates{' '}
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
