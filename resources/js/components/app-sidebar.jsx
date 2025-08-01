import { Plane, Rows4 } from 'lucide-react';
import * as React from 'react';

import { Sidebar, SidebarContent } from '@/components/ui/sidebar';

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <a
          href="/flights"
          className="text inline-flex h-7 flex-row items-center gap-2 rounded px-2 text-sm text-fg-secondary hover:bg-secondary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:text-muted hover:[&_svg]:text-fg-primary"
        >
          <Rows4 />
          <span>Logbook</span>
        </a>

        <a
          href="/aircrafts"
          className="text inline-flex h-7 flex-row items-center gap-2 rounded px-2 text-sm text-fg-secondary hover:bg-secondary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:text-muted hover:[&_svg]:text-fg-primary"
        >
          <Plane />
          <span>Aircrafts</span>
        </a>
      </SidebarContent>
    </Sidebar>
  );
}