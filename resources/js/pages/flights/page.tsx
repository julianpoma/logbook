import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Flight } from '@/types/flights';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

type Props = {
  flights: Array<Flight>;
};

export default function Flights({ flights }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Flights" />
      <pre>{JSON.stringify(flights, undefined, 2)}</pre>
    </AppLayout>
  );
}
