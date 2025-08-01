import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import AppLayout from '@/layouts/app-layout';
import useFlightPage from '@/state/flight-slice';
import { Head } from '@inertiajs/react';
import DataTable from './data-table';
import DetailView from './detail-view';

const breadcrumbs = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Flights({ aircrafts, flights }) {
  const { entryId } = useFlightPage();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Flights" />

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={80}>
          <DataTable flights={flights} />
        </ResizablePanel>

        <ResizableHandle withHandle hidden={entryId === null} />

        <ResizablePanel defaultSize={20} minSize={20} maxSize={25} hidden={entryId === null}>
          <DetailView flights={flights} aircrafts={aircrafts} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </AppLayout>
  );
}
