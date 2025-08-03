import { Button } from '@/components/ui/button';
import useAircraftPage from '@/state/aircraft-slice';
import { X } from 'lucide-react';

function Header({ children }) {
  return (
    <div data-slot="detail-header" className="sticky top-0 z-10 flex items-center border-b bg-sidebar px-3 text-sm font-medium">
      {children}
    </div>
  );
}

function Form({ aircraft }) {
  const { unselectEntity } = useAircraftPage();

  const mode = aircraft ? 'edit' : 'create';

  return (
    <div className="grid h-full grid-rows-[41px_1fr] overflow-y-auto bg-sidebar">
      <Header>
        <div className="flex w-full flex-row items-center justify-between">
          <span className="block">{mode === 'create' ? 'New aircraft' : 'Properties'}</span>

          <div className="flex flex-row-reverse items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={(event) => {
                event.preventDefault();
                unselectEntity();
              }}
            >
              <X />
            </Button>
          </div>
        </div>
      </Header>

      <div data-slot="detail-content" className="px-3 py-1">
        <div className="text-sm text-muted-foreground">
          Aircraft form implementation pending...
        </div>
      </div>
    </div>
  );
}

export default function DetailView({ aircrafts }) {
  const { entryId } = useAircraftPage();

  const entry = typeof entryId === 'number' ? aircrafts.find((aircraft) => aircraft.id === entryId) : null;

  return <Form key={entryId ?? 'new'} aircraft={entry ?? null} />;
}