import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset as AppContent } from '@/components/ui/sidebar';

export default function AppLayout({ children }) {
  return (
    <AppShell>
      <AppSidebar />
      <AppContent className="overflow-x-hidden">{children}</AppContent>
    </AppShell>
  );
}
