import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Aircraft } from '@/types/aircrafts';
import type { Flight } from '@/types/flights';
import { Head } from '@inertiajs/react';
import DataTable from './data-table';
import DetailView from './detail-view';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

type Props = {
  aircrafts: Array<Aircraft>;
  flights: Array<Flight>;
};

export default function Flights({ aircrafts, flights }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Flights" />

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={80}>
          <DataTable flights={flights} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={20} minSize={20} maxSize={25}>
          <DetailView flights={flights} aircrafts={aircrafts} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </AppLayout>
  );
}
