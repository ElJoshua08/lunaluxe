import heroRingImg from '@/../public/images/hero-ring.webp';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col">
      {/* Hero Section */}
      <div className="flex flex-row items-center justify-center gap-x-8 px-32 mt-20">
        <h1 className="font-italiana font-semibold text-8xl text-balance">
          Exquisite, <span className="text-primary">artisan-crafted</span>{' '}
          jewelry of unparalleled quality.
        </h1>

        <Image
          src={heroRingImg}
          alt="Hero Ring"
          width={400}
          height={400}
          draggable={false}
          className="select-none"
        />
      </div>

      {/* CTA and Info */}
      <div className='flex flex-row items-center justify-around px-32 w-full'>
        <Button
          variant="accent"
          className="mt-32 h-auto text-xl py-3 hover:shadow-lg hover:shadow-accent/70 transition-all"
        >
          Explore our collection
        </Button>
      </div>

      {/* About Us Section */}

      {/* Satisfied Customers and Testimonials Section  */}
    </div>
  );
}
