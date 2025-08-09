import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import AppLayout from '@/layouts/app-layout';
import useAircraftPage from '@/state/aircraft-slice';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import DataTable from './data-table';
import DetailView from './detail-view';

const breadcrumbs = [
  {
    title: 'Aircrafts',
    href: '/aircrafts',
  },
];

export default function Aircrafts({ aircrafts }) {
  const { entryId, createEntry } = useAircraftPage();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Aircrafts" />

      <AppSidebarHeader breadcrumbs={breadcrumbs}>
        <Button onClick={() => createEntry()}>
          <Plus />
          New aircraft
        </Button>
      </AppSidebarHeader>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={80}>
          <DataTable aircrafts={aircrafts} />
        </ResizablePanel>

        <ResizableHandle withHandle hidden={entryId === null} />

        <ResizablePanel defaultSize={20} minSize={20} maxSize={25} hidden={entryId === null}>
          <DetailView aircrafts={aircrafts} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </AppLayout>
  );
}
