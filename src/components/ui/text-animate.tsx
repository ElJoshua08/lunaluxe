/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion, MotionProps, Variants } from 'motion/react';
import { ElementType, ReactNode, useState } from 'react';

type AnimationType = 'text' | 'word' | 'character' | 'line';
type AnimationVariant =
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

interface TextAnimateProps extends MotionProps {
  children: ReactNode;
  className?: string;
  segmentClassName?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  as?: ElementType;
  by?: AnimationType;
  startOnView?: boolean;
  once?: boolean;
  animation?: AnimationVariant;
  hoverAnimate?: boolean; // New prop for hover-based focus animation
}

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const defaultItemAnimationVariants: Record<
  AnimationVariant,
  { container: Variants; item: Variants }
> = {
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      show: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay,
          duration: 0.3,
        },
      }),
      exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.3 },
      },
    },
  },
  blurIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      show: (i: number) => ({
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          delay: i * 0.1,
          duration: 0.3,
        },
      }),
      exit: {
        opacity: 0,
        filter: 'blur(10px)',
        transition: { duration: 0.3 },
      },
    },
  },
  blurInUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(20px)', y: 20 },
      show: (delay: number) => ({
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      }),
      exit: {
        opacity: 0,
        filter: 'blur(10px)',
        y: 20,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
    },
  },
  blurInDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(20px)', y: -20 },
      show: (delay: number) => ({
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      }),
    },
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0 },
      show: (delay: number) => ({
        y: 0,
        opacity: 1,
        transition: {
          delay,
          duration: 0.3,
        },
      }),
      exit: {
        y: -20,
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      },
    },
  },
  slideDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: -20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideLeft: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        x: -20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideRight: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: -20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        x: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  scaleUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 0.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.3,
          scale: {
            type: 'spring',
            damping: 15,
            stiffness: 300,
          },
        },
      },
      exit: {
        scale: 0.5,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  scaleDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 1.5, opacity: 0 },
      show: (delay: number) => ({
        scale: 1,
        opacity: 1,
        transition: {
          delay,
          duration: 0.3,
          scale: {
            type: 'spring',
            damping: 15,
            stiffness: 300,
          },
        },
      }),
      exit: {
        scale: 1.5,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
};

export function TextAnimate({
  children,
  delay = 0,
  duration = 300,
  variants,
  className,
  segmentClassName,
  as: Component = 'p',
  startOnView = true,
  once = false,
  by = 'word',
  animation = 'blurInDown',
  hoverAnimate = false, // Default is false
  ...props
}: TextAnimateProps) {
  const MotionComponent = motion.create(Component);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null); // Track the hovered segment

  // Use provided variants or defaults
  const finalVariants = animation
    ? {
        container: {
          ...defaultItemAnimationVariants[animation].container,
          show: {
            ...defaultItemAnimationVariants[animation].container.show,
            transition: {
              staggerChildren: staggerTimings[by],
            },
          },
          exit: {
            ...defaultItemAnimationVariants[animation].container.exit,
            transition: {
              staggerChildren: staggerTimings[by],
              staggerDirection: -1,
            },
          },
        },
        item: defaultItemAnimationVariants[animation].item,
      }
    : { container: defaultContainerVariants, item: defaultItemVariants };

  const parseSegments = (nodes: ReactNode): ReactNode[] => {
    if (typeof nodes === 'string') {
      switch (by) {
        case 'word':
          return nodes.split(/(\s+)/).filter(Boolean);
        case 'character':
          return nodes.split('');
        case 'line':
          return nodes.split('\n');
        default:
          return [nodes];
      }
    }
    if (Array.isArray(nodes)) {
      return nodes.flatMap(parseSegments);
    }
    return [nodes];
  };

  const segments = parseSegments(children);

  console.log(hoverIndex);

  return (
    <AnimatePresence mode="popLayout">
      <MotionComponent
        variants={finalVariants.container}
        initial="hidden"
        animate={startOnView ? 'show' : undefined}
        exit="exit"
        className={cn('whitespace-pre-wrap', className)}
        {...props}
      >
        {segments.map((segment, i) => {
          return (
            <motion.span
              key={`segment-${i}`}
              variants={finalVariants.item}
              custom={[i, duration / segments.length]}
              className={cn(
                by === 'line' ? 'block' : 'inline-block whitespace-pre',
                segmentClassName,
                hoverAnimate && hoverIndex !== null && hoverIndex !== i
                  ? 'opacity-50 blur-sm' // Blur and dim non-hovered segments
                  : hoverAnimate && hoverIndex === i
                  ? 'scale-110' // Focus effect on hovered segment
                  : ''
              )}
              onMouseEnter={() => hoverAnimate && setHoverIndex(i)}
              onMouseLeave={() => hoverAnimate && setHoverIndex(null)}
            >
              {segment}
            </motion.span>
          );
        })}
      </MotionComponent>
    </AnimatePresence>
  );
}
