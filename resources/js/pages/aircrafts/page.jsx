import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import DataTable from './data-table';

const breadcrumbs = [
  {
    title: 'Aircrafts',
    href: '/aircrafts',
  },
];

export default function Aircrafts({ aircrafts }) {
  const entryId = null;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Aircrafts" />

      <AppSidebarHeader breadcrumbs={breadcrumbs}></AppSidebarHeader>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={80}>
          <DataTable aircrafts={aircrafts} />
        </ResizablePanel>

        <ResizableHandle withHandle hidden={entryId === null} />

        <ResizablePanel defaultSize={20} minSize={20} maxSize={25} hidden={entryId === null}>
          {/* <DetailView aircrafts={aircrafts} />*/}
        </ResizablePanel>
      </ResizablePanelGroup>
    </AppLayout>
  );
}
