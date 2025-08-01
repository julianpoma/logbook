import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SidebarInset as AppContent } from '@/components/ui/sidebar';

export default function AppSidebarLayout({ children, breadcrumbs = [] }) {
  return (
    <AppShell>
      <AppSidebar />

      <AppContent className="overflow-x-hidden">
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
      </AppContent>
    </AppShell>
  );
}
