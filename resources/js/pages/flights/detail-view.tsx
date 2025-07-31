import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import Textarea from '@/components/ui/textarea';
import useFlightPage from '@/state/flight-slice';
import { Aircraft } from '@/types/aircrafts';
import { Flight } from '@/types/flights';
import { Field, Fieldset, Label, Legend } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { CopyCheck, Save, Trash, X } from 'lucide-react';
import { useCallback, useEffect } from 'react';

type HeaderProps = {
  children: React.ReactNode;
};

function Header({ children }: HeaderProps) {
  return (
    <div data-slot="detail-header" className="sticky top-0 z-10 flex items-center border-b bg-sidebar px-3 text-sm font-medium">
      {children}
    </div>
  );
}

type FormProps = {
  aircrafts: Array<Aircraft>;
  flight: Flight | null;
};

function Form({ flight, aircrafts }: FormProps) {
  const { unselectEntity } = useFlightPage();

  const mode = flight ? 'edit' : 'create';

  const { data, setData, isDirty, setDefaults, post, put } = useForm({
    date: flight?.date,
    departure_airport: flight?.departure_airport,
    arrival_airport: flight?.arrival_airport,
    aircraft_id: flight?.aircraft_id,
    time_total: flight?.time_total ?? '',
    time_pic: flight?.time_pic ?? '',
    time_sic: flight?.time_sic ?? '',
    time_xc: flight?.time_xc ?? '',
    time_night: flight?.time_night ?? '',
    time_solo: flight?.time_solo ?? '',
    time_dual_received: flight?.time_dual_received ?? '',
    time_actual_instrument: flight?.time_actual_instrument ?? '',
    time_simulated_instrument: flight?.time_simulated_instrument ?? '',
    landings_day: flight?.landings_day ?? '',
    landings_night: flight?.landings_night ?? '',
    remarks: flight?.remarks ?? '',
  });

  const handleSubmit = useCallback(
    (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      console.log('re-render');

      if (mode === 'create') {
        post('/flights');
      } else {
        put('/flights/' + flight!.id, {
          onSuccess() {
            setDefaults();
          },
        });
      }
    },
    [mode, post, put, flight, setDefaults],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        if (isDirty) handleSubmit();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDirty, handleSubmit]);

  return (
    <form className="grid h-full grid-rows-[41px_1fr] overflow-y-auto bg-sidebar" onSubmit={handleSubmit}>
      <Header>
        <div className="flex w-full flex-row items-center justify-between">
          <span className="block">Properties</span>

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

            {mode === 'edit' && (
              <Button variant="tertiary" size="icon" onClick={(event) => event.preventDefault()}>
                <Trash />
              </Button>
            )}

            {isDirty && (
              <Button type="submit" variant="tertiary" size="icon">
                <Save />
              </Button>
            )}
          </div>
        </div>
      </Header>

      <div data-slot="detail-content" className="px-3 py-1">
        <Fieldset className="mb-4 space-y-1">
          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Date</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input name="date" type="date" defaultValue={data.date} onChange={(event) => setData('date', event.target.value)} required />
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Departure airport</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input
                name="departure_airport"
                type="text"
                className="uppercase"
                maxLength={4}
                defaultValue={data.departure_airport}
                onChange={(event) => setData('departure_airport', event.target.value)}
                required
              />
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Arrival airport</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input
                name="arrival_airport"
                type="text"
                className="uppercase"
                maxLength={4}
                defaultValue={data.arrival_airport}
                onChange={(event) => setData('arrival_airport', event.target.value)}
                required
              />
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Aircraft</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Select
                name="aircraft_id"
                defaultValue={data.aircraft_id?.toString()}
                onChange={(event) => setData('aircraft_id', +event.target.value)}
                required
              >
                <option key="" value=""></option>
                {aircrafts.map(({ id, ident, model }) => (
                  <option key={id.toString()} value={id.toString()}>
                    {ident + ' (' + model + ')'}
                  </option>
                ))}
              </Select>
            </div>
          </Field>
        </Fieldset>

        <Fieldset className="mb-4 space-y-1">
          <Legend className="-mb-0.5 text-sm/6 text-muted uppercase">Times</Legend>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Total</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input
                name="time_total"
                type="number"
                min={0.1}
                step={0.1}
                defaultValue={data.time_total}
                onChange={(event) => setData('time_total', event.target.value != '' ? event.target.valueAsNumber : '')}
                required
              />
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">PIC</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input
                name="time_pic"
                type="number"
                min={0.1}
                step={0.1}
                value={data.time_pic}
                onChange={(event) => setData('time_pic', event.target.value != '' ? event.target.valueAsNumber : '')}
              />
              <Button
                id="hello"
                variant="ghost"
                size="icon"
                onClick={(event) => {
                  event.preventDefault();
                  setData('time_pic', data.time_total);
                }}
              >
                <CopyCheck />
              </Button>
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">SIC</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input
                name="time_sic"
                type="number"
                min={0.1}
                step={0.1}
                value={data.time_sic}
                onChange={(event) => setData('time_sic', event.target.value != '' ? event.target.valueAsNumber : '')}
              />
              <Button
                id="hello"
                variant="ghost"
                size="icon"
                onClick={(event) => {
                  event.preventDefault();
                  setData('time_sic', data.time_total);
                }}
              >
                <CopyCheck />
              </Button>
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">XC</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input
                name="time_xc"
                type="number"
                min={0.1}
                step={0.1}
                value={data.time_xc}
                onChange={(event) => setData('time_xc', event.target.value != '' ? event.target.valueAsNumber : '')}
              />
              <Button
                id="hello"
                variant="ghost"
                size="icon"
                onClick={(event) => {
                  event.preventDefault();
                  setData('time_xc', data.time_total);
                }}
              >
                <CopyCheck />
              </Button>
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Night</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input
                name="time_night"
                type="number"
                min={0.1}
                step={0.1}
                value={data.time_night}
                onChange={(event) => setData('time_night', event.target.value != '' ? event.target.valueAsNumber : '')}
              />
              <Button
                id="hello"
                variant="ghost"
                size="icon"
                onClick={(event) => {
                  event.preventDefault();
                  setData('time_night', data.time_total);
                }}
              >
                <CopyCheck />
              </Button>
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Solo</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input
                name="time_solo"
                type="number"
                min={0.1}
                step={0.1}
                value={data.time_solo}
                onChange={(event) => setData('time_solo', event.target.value != '' ? event.target.valueAsNumber : '')}
              />
              <Button
                id="hello"
                variant="ghost"
                size="icon"
                onClick={(event) => {
                  event.preventDefault();
                  setData('time_solo', data.time_total);
                }}
              >
                <CopyCheck />
              </Button>
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Training</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input
                name="time_dual_received"
                type="number"
                min={0.1}
                step={0.1}
                value={data.time_dual_received}
                onChange={(event) => setData('time_dual_received', event.target.value != '' ? event.target.valueAsNumber : '')}
              />
              <Button
                id="hello"
                variant="ghost"
                size="icon"
                onClick={(event) => {
                  event.preventDefault();
                  setData('time_dual_received', data.time_total);
                }}
              >
                <CopyCheck />
              </Button>
            </div>
          </Field>
        </Fieldset>

        <Fieldset className="mb-4 space-y-1">
          <Legend className="-mb-0.5 text-sm/6 text-muted uppercase">Instrument conditions</Legend>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Actual</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input
                name="time_actual_instrument"
                type="number"
                min={0.1}
                step={0.1}
                value={data.time_actual_instrument}
                onChange={(event) => setData('time_actual_instrument', event.target.value != '' ? event.target.valueAsNumber : '')}
              />
              <Button
                id="hello"
                variant="ghost"
                size="icon"
                onClick={(event) => {
                  event.preventDefault();
                  setData('time_actual_instrument', data.time_total);
                }}
              >
                <CopyCheck />
              </Button>
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Simulated</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input
                name="time_simulated_instrument"
                type="number"
                min={0.1}
                step={0.1}
                value={data.time_simulated_instrument}
                onChange={(event) => setData('time_simulated_instrument', event.target.value != '' ? event.target.valueAsNumber : '')}
              />
              <Button
                id="hello"
                variant="ghost"
                size="icon"
                onClick={(event) => {
                  event.preventDefault();
                  setData('time_simulated_instrument', data.time_total);
                }}
              >
                <CopyCheck />
              </Button>
            </div>
          </Field>
        </Fieldset>

        <Fieldset className="mb-4 space-y-1">
          <Legend className="-mb-0.5 text-sm/6 text-muted uppercase">Landings</Legend>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Day</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input
                name="landings_day"
                type="number"
                min={1}
                step={1}
                value={data.landings_day}
                onChange={(event) => setData('landings_day', event.target.value != '' ? event.target.valueAsNumber : '')}
              />
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Night</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input
                name="landings_night"
                type="number"
                min={1}
                step={1}
                value={data.landings_night}
                onChange={(event) => setData('landings_night', event.target.value != '' ? event.target.valueAsNumber : '')}
              />
            </div>
          </Field>
        </Fieldset>

        <Fieldset className="mb-4 space-y-1">
          <Legend className="-mb-0.5 text-sm/6 text-muted uppercase">Miscellaneous</Legend>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Remarks</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Textarea name="remarks" value={data.remarks} onChange={(event) => setData('remarks', event.target.value)} />
            </div>
          </Field>
        </Fieldset>
      </div>
    </form>
  );
}

type Props = {
  aircrafts: Array<Aircraft>;
  flights: Array<Flight>;
};

export default function DetailView({ flights, aircrafts }: Props) {
  const { entryId } = useFlightPage();

  const entry = entryId ? flights.find((flight) => flight.id === entryId) : null;

  return <Form key={entryId ?? 'new'} flight={entry ?? null} aircrafts={aircrafts} />;
}
