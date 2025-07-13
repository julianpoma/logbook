import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import Textarea from '@/components/ui/textarea';
import { Aircrafts } from '@/types/aircrafts';
import { Field, Fieldset, Label, Legend } from '@headlessui/react';
import { CopyCheck } from 'lucide-react';

type HeaderProps = {
  children: React.ReactElement;
};

function Header({ children }: HeaderProps) {
  return (
    <div data-slot="detail-header" className="sticky top-0 flex items-center border-b bg-sidebar px-3 text-sm font-medium">
      {children}
    </div>
  );
}

type Props = {
  aircrafts: Array<Aircrafts>;
};

export default function DetailView({ aircrafts }: Props) {
  return (
    <div className="grid h-full grid-rows-[41px_1fr] overflow-y-auto bg-sidebar">
      <Header>
        <span>Properties</span>
      </Header>

      <div data-slot="detail-content" className="px-3 py-1">
        <Fieldset className="mb-4 space-y-1">
          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Date</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input name="date" type="date" required />
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Departure airport</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input name="departure_airport" type="text" className="uppercase" required />
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Arrival airport</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input name="arrival_airport" type="text" className="uppercase" required />
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Aircraft</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Select name="aircraft_id" defaultValue="" aria-placeholder="asd" required>
                <option id=""></option>
                {aircrafts.map(({ id, ident, model }) => (
                  <option id={id.toString()}>{ident + ' (' + model + ')'}</option>
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
              <Input name="time_total" type="number" min={0.1} step={0.1} required />
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">PIC</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input name="time_pic" type="number" min={0.1} step={0.1} />
              <Button variant="ghost" size="icon">
                <CopyCheck />
              </Button>
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">SIC</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input name="time_sic" type="number" min={0.1} step={0.1} />
              <Button variant="ghost" size="icon">
                <CopyCheck />
              </Button>
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">XC</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input name="time_xc" type="number" min={0.1} step={0.1} />
              <Button variant="ghost" size="icon">
                <CopyCheck />
              </Button>
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Night</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input name="time_night" type="number" min={0.1} step={0.1} />
              <Button variant="ghost" size="icon">
                <CopyCheck />
              </Button>
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Solo</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input name="time_solo" type="number" min={0.1} step={0.1} />
              <Button variant="ghost" size="icon">
                <CopyCheck />
              </Button>
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Training</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input name="time_dual_received" type="number" min={0.1} step={0.1} />
              <Button variant="ghost" size="icon">
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
              <Input name="time_actual_instrument" type="number" min={0.1} step={0.1} />
              <Button variant="ghost" size="icon">
                <CopyCheck />
              </Button>
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Simulated</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input name="time_simulated_instrument" type="number" min={0.1} step={0.1} />
              <Button variant="ghost" size="icon">
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
              <Input name="landings_day" type="number" min={0} step={1} />
            </div>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Night</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Input name="landings_night" type="number" min={0} step={1} />
            </div>
          </Field>
        </Fieldset>

        <Fieldset className="mb-4 space-y-1">
          <Legend className="-mb-0.5 text-sm/6 text-muted uppercase">Miscellaneous</Legend>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Remarks</Label>
            <div className="grid grid-cols-[1fr_24px] gap-1">
              <Textarea name="remarks" />
            </div>
          </Field>
        </Fieldset>
      </div>
    </div>
  );
}
