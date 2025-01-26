/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  defaultContainerVariants,
  animationVariants as defaultItemAnimationVariants,
} from '@/lib/animations';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ElementType, ReactElement, ReactNode } from 'react';

type AnimationType = 'text' | 'word' | 'character' | 'line';
type AnimationVariant = keyof typeof defaultItemAnimationVariants;

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

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
  animation?: AnimationVariant;
}

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
  ...props
}: TextAnimateProps) {
  const MotionComponent = motion(Component);

  const animationVariants = defaultItemAnimationVariants[animation];
  const containerVariants = defaultContainerVariants;
  const itemVariants = animationVariants;

  const renderSegments = (content: ReactNode, parentIndex = 0): ReactNode[] => {
    if (typeof content === 'string') {
      let segments: string[] = [];
      switch (by) {
        case 'word':
          segments = content.split(/(\s+)/); // Split by spaces, keeping spaces
          break;
        case 'character':
          segments = content.split(''); // Split into characters
          break;
        case 'line':
          segments = content.split('\n'); // Split by new lines
          break;
        case 'text':
        default:
          segments = [content];
          break;
      }

      return segments.map((segment, i) => (
        <motion.span
          key={`${parentIndex}-${by}-${i}`}
          variants={itemVariants}
          custom={{ delay: delay + i * staggerTimings[by], duration }}
          className={cn(
            by === 'line' ? 'block' : 'inline-block whitespace-pre',
            segmentClassName
          )}
        >
          {segment}
        </motion.span>
      ));
    }

    if (Array.isArray(content)) {
      return content.flatMap((child, i) =>
        renderSegments(child, parentIndex + i)
      );
    }

    if (typeof content === 'object' && content !== null && 'type' in content) {
      const element = content as ReactElement<any>;
      const existingClassName = element.props?.className;

      return [
        <motion.span
          key={`${parentIndex}-${by}`}
          variants={itemVariants}
          custom={{ delay: delay + parentIndex * staggerTimings[by], duration }}
          className={cn(existingClassName, segmentClassName)}
        >
          {renderSegments(element.props?.children || content, parentIndex)}
        </motion.span>,
      ];
    }

    return [];
  };

  return (
    <AnimatePresence>
      <MotionComponent
        variants={containerVariants}
        initial="hidden"
        whileInView={startOnView ? 'show' : undefined}
        animate={startOnView ? undefined : 'show'}
        viewport={{ once: once }}
        exit="exit"
        className={cn('whitespace-pre-wrap', className)}
        {...props}
      >
        {renderSegments(children)}
      </MotionComponent>
    </AnimatePresence>
  );
}
