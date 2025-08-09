import { Button } from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import Textarea from '@/components/ui/textarea';
import useCmdSSubmit from '@/hooks/useCmdSSubmit';
import { AIRCRAFT_CLASSES } from '@/lib/constants';
import useAircraftPage from '@/state/aircraft-slice';
import { Field, Fieldset, Label, Legend } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { route } from 'ziggy-js';

function Header({ children }) {
  return (
    <div data-slot="detail-header" className="sticky top-0 z-10 flex items-center border-b bg-sidebar px-3 text-sm font-medium">
      {children}
    </div>
  );
}

function Form({ aircraft }) {
  const formRef = useRef(null);

  const { unselectEntity } = useAircraftPage();

  const mode = aircraft ? 'edit' : 'create';

  const { data, setData, isDirty, setDefaults, post, put } = useForm({
    make: aircraft?.make ?? '',
    model: aircraft?.model ?? '',
    ident: aircraft?.ident ?? '',
    horsepower: aircraft?.horsepower ?? '',
    class: aircraft?.class ?? '',
    is_complex: aircraft?.is_complex ?? false,
    is_high_performance: aircraft?.is_high_performance ?? false,
    is_pressurized: aircraft?.is_pressurized ?? false,
    is_turbine: aircraft?.is_turbine ?? false,
    is_tailwheel: aircraft?.is_tailwheel ?? false,
    notes: aircraft?.notes ?? '',
  });

  const handleSubmit = useCallback(
    (event) => {
      event?.preventDefault();

      if (mode === 'create') {
        post(route('aircrafts.store'), {
          onSuccess: () => unselectEntity(),
        });
      } else {
        put(route('aircrafts.update', aircraft.id), {
          onSuccess: () => setDefaults(),
        });
      }
    },
    [mode, post, put, aircraft, setDefaults, unselectEntity],
  );

  useCmdSSubmit(formRef, isDirty);

  return (
    <form ref={formRef} className="grid h-full grid-rows-[41px_1fr] overflow-y-auto bg-sidebar" onSubmit={handleSubmit}>
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

            {isDirty && (
              <Button type="submit" variant="ghost" size="icon">
                <Save />
              </Button>
            )}
          </div>
        </div>
      </Header>

      <div data-slot="detail-content" className="px-3 py-1">
        <Fieldset className="mb-4 space-y-1">
          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Make</Label>
            <Input name="make" type="text" defaultValue={data.make} onChange={(event) => setData('make', event.target.value)} required />
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Model</Label>
            <Input name="model" type="text" defaultValue={data.model} onChange={(event) => setData('model', event.target.value)} required />
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Ident</Label>
            <Input
              name="ident"
              type="text"
              className="uppercase"
              defaultValue={data.ident}
              onChange={(event) => setData('ident', event.target.value)}
              required
            />
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Class</Label>
            <Select name="class" defaultValue={data.class} onChange={(event) => setData('class', event.target.value)} required>
              <option key="" value=""></option>
              {Object.entries(AIRCRAFT_CLASSES).map(([code, description]) => (
                <option key={code} value={code}>
                  {description}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Horsepower</Label>
            <Input
              name="horsepower"
              type="number"
              min={0}
              step={1}
              value={data.horsepower}
              onChange={(event) => setData('horsepower', event.target.value != '' ? event.target.valueAsNumber : '')}
            />
          </Field>
        </Fieldset>

        <Fieldset className="mb-4 space-y-2">
          <Legend className="text-sm/6 text-muted uppercase">Endorsements</Legend>

          <Field>
            <Label className="flex items-center space-x-2">
              <Checkbox name="is_complex" checked={data.is_complex} onChange={(checked) => setData('is_complex', checked)} />
              <span className="text-sm/6 leading-none select-none">Complex</span>
            </Label>
          </Field>

          <Field>
            <Label className="flex items-center space-x-2">
              <Checkbox
                name="is_high_performance"
                checked={data.is_high_performance}
                onChange={(checked) => setData('is_high_performance', checked)}
              />
              <span className="text-sm/6 leading-none select-none">High Performance</span>
            </Label>
          </Field>

          <Field>
            <Label className="flex items-center space-x-2">
              <Checkbox name="is_pressurized" checked={data.is_pressurized} onChange={(checked) => setData('is_pressurized', checked)} />
              <span className="text-sm/6 leading-none select-none">Pressurized</span>
            </Label>
          </Field>

          <Field>
            <Label className="flex items-center space-x-2">
              <Checkbox name="is_turbine" checked={data.is_turbine} onChange={(checked) => setData('is_turbine', checked)} />
              <span className="text-sm/6 leading-none select-none">Turbine</span>
            </Label>
          </Field>

          <Field>
            <Label className="flex items-center space-x-2">
              <Checkbox name="is_tailwheel" checked={data.is_tailwheel} onChange={(checked) => setData('is_tailwheel', checked)} />
              <span className="text-sm/6 leading-none select-none">Tailwheel</span>
            </Label>
          </Field>
        </Fieldset>

        <Fieldset className="mb-4 space-y-1">
          <Legend className="-mb-0.5 text-sm/6 text-muted uppercase">Miscellaneous</Legend>

          <Field>
            <Label className="text-xs/6 leading-none font-medium select-none">Notes</Label>
            <Textarea name="notes" value={data.notes} onChange={(event) => setData('notes', event.target.value)} />
          </Field>
        </Fieldset>
      </div>
    </form>
  );
}

export default function DetailView({ aircrafts }) {
  const { entryId } = useAircraftPage();

  const entry = typeof entryId === 'number' ? aircrafts.find((aircraft) => aircraft.id === entryId) : null;

  return <Form key={entryId ?? 'new'} aircraft={entry ?? null} />;
}
