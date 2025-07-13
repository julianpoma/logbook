import { cn } from '@/lib/utils';
import { Select as HeadlessSelect, type SelectProps } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

export default function Select({ className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <HeadlessSelect
        className={cn('border-input block h-6 w-full appearance-none rounded border bg-primary px-2 text-sm outline-none', className)}
        {...props}
      />
      <ChevronDownIcon className="group pointer-events-none absolute top-1 right-1.5 size-4" aria-hidden="true" strokeWidth={1.5} />
    </div>
  );
}
