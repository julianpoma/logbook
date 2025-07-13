import { Input as HeadlessInput, type InputProps } from '@headlessui/react';

import { cn } from '@/lib/utils';

export default function Input({ className, ...props }: InputProps) {
  return (
    <HeadlessInput
      className={cn(
        'border-input h-6 w-full rounded border bg-primary px-2 text-sm outline-none',
        'focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50',
        className,
      )}
      {...props}
    />
  );
}
