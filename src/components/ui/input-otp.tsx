'use client';

import { cn } from '@/lib/utils';
import { OTPInput, SlotProps } from 'input-otp';
import { Separator } from './separator';

export const InputOTP = ({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="*:not-first:mt-2">
      <OTPInput
        containerClassName="flex items-center gap-3 has-disabled:opacity-50"
        maxLength={6}
        value={value}
        onChange={onChange}
        disabled={disabled}
        render={({ slots }) => (
          <div className="flex gap-x-4 items-center justify-center">
            {slots.slice(0, 3).map((slot, idx) => (
              <Slot
                key={idx}
                {...slot}
              />
            ))}

            <Separator className="w-2" />

            {slots.slice(3, 6).map((slot, idx) => (
              <Slot
                key={idx}
                {...slot}
              />
            ))}
          </div>
        )}
      />
    </div>
  );
};

const Slot = (props: SlotProps) => {
  return (
    <div
      className={cn(
        'border-border bg-background text-foreground flex size-12 text-lg items-center justify-center rounded-md border font-medium shadow-xs shadow-foreground/50 transition-[color,box-shadow]',
        { 'border-ring z-10 shadow-md': props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
};
