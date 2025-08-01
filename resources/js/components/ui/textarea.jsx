import { cn } from '@/lib/utils';
import { Textarea as HeadlessTextarea } from '@headlessui/react';

export default function Textarea({ className, rows = 3, ...props }) {
  return (
    <HeadlessTextarea
      rows={rows}
      className={cn(
        'border-input w-full rounded border bg-primary px-2 py-1.5 text-sm outline-none',
        'focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50',
        className,
      )}
      {...props}
    />
  );
}