import { cn } from '@/lib/utils';
import { Checkbox as HeadlessCheckbox } from '@headlessui/react';
import { CheckIcon } from 'lucide-react';

export default function Checkbox({ checked, onChange, className }) {
  return (
    <HeadlessCheckbox
      data-slot="checkbox"
      checked={checked}
      onChange={onChange}
      className={cn(
        'group flex size-4.5 shrink-0 items-center justify-center rounded border bg-white data-checked:border-ring data-checked:bg-ring',
        'outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50',
        className,
      )}
    >
      <CheckIcon stroke="white" className="size-3.5 opacity-0 group-data-checked:opacity-100" />
    </HeadlessCheckbox>
  );
}
