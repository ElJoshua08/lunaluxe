// Path: TextAnimate.tsx
'use client';

import { animationVariants, defaultContainerVariants } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ElementType, ReactNode } from 'react';

type AnimationType = 'text' | 'word' | 'character' | 'line';

interface TextAnimateProps {
  children: ReactNode;
  className?: string;
  segmentClassName?: string;
  delay?: number;
  duration?: number;
  as?: ElementType;
  by?: AnimationType;
  startOnView?: boolean;
  once?: boolean;
  animation?: keyof typeof animationVariants;
}

const staggerTimings: Record<AnimationType, number> = {
  text: 0.1,
  word: 0.05,
  character: 0.03,
  line: 0.08,
};

export function TextAnimate({
  children,
  delay = 0,
  duration = 0.3,
  className,
  segmentClassName,
  as: Component = 'p',
  startOnView = true,
  once = false,
  by = 'word',
  animation = 'fadeIn',
}: TextAnimateProps) {
  const MotionComponent = motion(Component);
  const variants = animationVariants[animation] || defaultContainerVariants;

  const renderSegments = (content: ReactNode): ReactNode[] => {
    if (typeof content === 'string') {
      const segments =
        by === 'word'
          ? content.split(/(\s+)/)
          : by === 'character'
          ? content.split('')
          : by === 'line'
          ? content.split('\n')
          : [content];

      return segments.map((segment, index) => (
        <motion.span
          key={`${by}-${index}`}
          variants={variants}
          custom={{ delay: delay + index * staggerTimings[by], duration }}
          className={cn(
            by === 'line' ? 'block' : 'inline-block whitespace-pre',
            segmentClassName
          )}
        >
          {segment}
        </motion.span>
      ));
    }
    return [content];
  };

  return (
    <AnimatePresence>
      <MotionComponent
        variants={defaultContainerVariants}
        initial="hidden"
        whileInView={startOnView ? 'show' : undefined}
        animate={startOnView ? undefined : 'show'}
        exit="exit"
        className={cn('whitespace-pre-wrap', className)}
      >
        {renderSegments(children)}
      </MotionComponent>
    </AnimatePresence>
  );
}
