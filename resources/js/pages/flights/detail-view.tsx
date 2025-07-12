import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@headlessui/react';
import { CopyCheck } from 'lucide-react';

function Header({ children }) {
  return (
    <div data-slot="detail-header" className="sticky top-0 flex items-center border-b-[0.5px] bg-sidebar px-3 text-sm font-medium">
      {children}
    </div>
  );
}

export default function DetailView() {
  return (
    <div className="grid h-full grid-rows-[40.5px_1fr] overflow-y-auto bg-sidebar">
      <Header>
        <span>Properties</span>
      </Header>

      <div data-slot="detail-content" className="flex h-full flex-col gap-2 p-4">
        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">Date</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="date" />
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">Departure airport</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="text" className="uppercase" />
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">Arrival airport</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="text" className="uppercase" />
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">Aircraft</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="text" className="uppercase" />
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">Total time</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="number" min={0.1} step={0.1} className="uppercase" />
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">IMC (actual)</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="number" min={0.1} step={0.1} className="uppercase" />
            <Button variant="ghost" size="icon">
              <CopyCheck />
            </Button>
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">IMC (simulated)</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="number" min={0.1} step={0.1} className="uppercase" />
            <Button variant="ghost" size="icon">
              <CopyCheck />
            </Button>
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">PIC</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="number" min={0.1} step={0.1} className="uppercase" />
            <Button variant="ghost" size="icon">
              <CopyCheck />
            </Button>
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">SIC</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="number" min={0.1} step={0.1} className="uppercase" />
            <Button variant="ghost" size="icon">
              <CopyCheck />
            </Button>
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">XC</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="number" min={0.1} step={0.1} className="uppercase" />
            <Button variant="ghost" size="icon">
              <CopyCheck />
            </Button>
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">Night</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="number" min={0.1} step={0.1} className="uppercase" />
            <Button variant="ghost" size="icon">
              <CopyCheck />
            </Button>
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">Solo</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="number" min={0.1} step={0.1} className="uppercase" />
            <Button variant="ghost" size="icon">
              <CopyCheck />
            </Button>
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">Training</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="number" min={0.1} step={0.1} className="uppercase" />
            <Button variant="ghost" size="icon">
              <CopyCheck />
            </Button>
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">Landings (day)</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="number" min={0} step={1} className="uppercase" />
            <Button variant="ghost" size="icon">
              <CopyCheck />
            </Button>
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">Landings (night)</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Input type="number" min={0} step={1} className="uppercase" />
            <Button variant="ghost" size="icon">
              <CopyCheck />
            </Button>
          </div>
        </div>

        <div data-slot="form-group" className="flex flex-col gap-1">
          <Label className="text-xs">Landings (night)</Label>
          <div className="grid grid-cols-[1fr_24px] gap-1">
            <Textarea />
          </div>
        </div>
      </div>
    </div>
  );
}
