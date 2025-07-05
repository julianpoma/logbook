import { Rows4 } from 'lucide-react';
import * as React from 'react';

import { Sidebar, SidebarContent } from '@/components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarContent>
        <a
          href="/flights"
          className="inline-flex h-7 flex-row items-center gap-1.5 rounded px-2 text-sm text-primary-foreground hover:bg-sidebar-link [&_svg]:pointer-events-none [&_svg]:size-3.5"
        >
          <Rows4 />
          <span>Flights</span>
        </a>
      </SidebarContent>

      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  );
}
