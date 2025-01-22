import heroRingImg from '@/../public/images/hero-ring.webp';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col overflow-x-clip h-full ">
      {/* Hero Section */}
      <div className="flex flex-row items-center justify-center gap-x-8 px-32 mt-20 relative ">
        <h1 className="font-italiana font-semibold text-8xl text-balance">
          Exquisite, <span className="text-primary">artisan-crafted</span>{' '}
          jewelry of unparalleled quality.
        </h1>

        <Image
          src={heroRingImg}
          alt="Hero Ring"
          width={820}
          height={820}
          quality={100}
          draggable={false}
          className="select-none absolute right-0 top-[155px] -translate-y-1/2 translate-x-1/2 -z-10 "
        />
      </div>

      {/* CTA and Info */}
      <div className="flex flex-row items-center justify-center px-40 w-full mt-32 py-8">
        <Button
          variant="accent"
          className=" h-auto text-xl py-3 hover:shadow-lg hover:shadow-accent/70 transition-all"
        >
          Explore our collection
        </Button>

        <h2 className="font-italiana text-right text-8xl font-semibold text-balance leading-tight ">
          Jewelry isn’t just an accessory. it’s a wearable memory
        </h2>
      </div>

      {/* About Us Section */}

      {/* Satisfied Customers and Testimonials Section  */}
    </div>
  );
}
