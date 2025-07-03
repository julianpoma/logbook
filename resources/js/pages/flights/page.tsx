import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Flight } from '@/types/flights';
import { Head } from '@inertiajs/react';
import DataTable from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

type Props = {
  flights: Array<Flight>;
};

export default function Flights({ flights }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Flights" />

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={75}>
          <DataTable data={flights} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={25} minSize={25} maxSize={35}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </AppLayout>
  );
}
