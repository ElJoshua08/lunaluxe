import { Variants } from 'framer-motion';

export type AnimationVariant =
  | 'fadeIn'
  | 'blurIn'
  | 'blurInUp'
  | 'blurInDown'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleUp'
  | 'scaleDown';

export const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const animationVariants: Record<AnimationVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    show: ({ delay = 0 }: { delay: number }) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.3 },
    }),
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    show: ({ delay = 0 }: { delay: number }) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: { delay, duration: 0.3 },
    }),
    exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 0.3 } },
  },
  blurInUp: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    show: ({ delay = 0 }: { delay: number }) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay, duration: 0.3 },
    }),
    exit: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
      transition: { duration: 0.3 },
    },
  },
  blurInDown: {
    hidden: { opacity: 0, y: -20, filter: 'blur(10px)' },
    show: ({ delay = 0 }: { delay: number }) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay, duration: 0.3 },
    }),
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(10px)',
      transition: { duration: 0.3 },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    show: ({ delay = 0 }: { delay: number }) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.3 },
    }),
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    show: ({ delay = 0 }: { delay: number }) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.3 },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    show: ({ delay = 0 }: { delay: number }) => ({
      opacity: 1,
      x: 0,
      transition: { delay, duration: 0.3 },
    }),
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    show: ({ delay = 0 }: { delay: number }) => ({
      opacity: 1,
      x: 0,
      transition: { delay, duration: 0.3 },
    }),
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.5 },
    show: ({ delay = 0 }: { delay: number }) => ({
      opacity: 1,
      scale: 1,
      transition: { delay, duration: 0.3 },
    }),
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
  },
  scaleDown: {
    hidden: { opacity: 0, scale: 1.5 },
    show: ({ delay = 0 }: { delay: number }) => ({
      opacity: 1,
      scale: 1,
      transition: { delay, duration: 0.3 },
    }),
    exit: { opacity: 0, scale: 1.5, transition: { duration: 0.3 } },
  },
};
