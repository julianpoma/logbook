import { SidebarProvider } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';

export function AppShell({ children }) {
  const isOpen = usePage().props.sidebarOpen;

  return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}