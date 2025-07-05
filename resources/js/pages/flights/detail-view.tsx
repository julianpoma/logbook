import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CopyCheck } from 'lucide-react';

function Header({ children }) {
  return (
    <div data-slot="detail-header" className="bg-table-header flex h-[40.5px] w-full items-center border-b-[0.5px] px-3 text-sm font-medium">
      {children}
    </div>
  );
}

export default function DetailView() {
  return (
    <div className="h-full bg-sidebar">
      <Header>
        <span>Properties</span>
      </Header>

      <div data-slot="detail-content" className="p-4">
        <div className="flex flex-col gap-1">
          <Label className="text-xs">Date</Label>
          <div className="flex flex-row gap-1">
            <Input type="number" className="bg-primary" />
            <Button variant="ghost" size="icon">
              <CopyCheck />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
