import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import useFlightPage from '@/state/flight-slice';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';

type Props = {
  breadcrumbs?: BreadcrumbItemType[];
};

export function AppSidebarHeader({ breadcrumbs = [] }: Props) {
  const { createEntry } = useFlightPage();

  return (
    <header className="border-sidebar-border/50 flex h-10 shrink-0 items-center justify-between gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      <Button onClick={() => createEntry()}>
        <Plus />
        New flight
      </Button>
    </header>
  );
}
