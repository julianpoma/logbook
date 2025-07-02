import { theme } from '@/lib/ag-grid-theme';
import { Flight } from '@/types/flights';
import { AllCommunityModule, ColGroupDef, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

ModuleRegistry.registerModules([AllCommunityModule]);

const columns: Array<ColDef | ColGroupDef> = [
  { field: 'date', headerName: 'Date', width: 120, pinned: true },

  {
    headerName: 'Route of flight',
    children: [
      { field: 'departure_airport', headerName: 'From', width: 75, pinned: true },
      { field: 'arrival_airport', headerName: 'To', width: 75, pinned: true },
    ],
  },

  {
    headerName: 'Aircraft',
    children: [
      { field: 'aircraft.model', headerName: 'Model', width: 100 },
      { field: 'aircraft.ident', headerName: 'Ident', width: 100 },
    ],
  },

  {
    field: 'time_total',
    headerName: 'Duration of flight',
    wrapHeaderText: true,
    width: 95,
  },

  {
    headerName: 'Instrument conditions',
    children: [
      { field: 'time_actual_instrument', headerName: 'Actual', width: 100 },
      { field: 'time_simulated_instrument', headerName: 'Simulated', width: 100 },
    ],
  },

  {
    headerName: 'Landings',
    children: [
      { field: 'landings_day', headerName: 'Day', width: 100 },
      { field: 'landings_night', headerName: 'Night', width: 100 },
    ],
  },

  {
    headerName: 'Type of pilot experience or training',
    children: [
      { field: 'time_pic', headerName: 'PIC', width: 100 },
      { field: 'time_sic', headerName: 'SIC', width: 100 },
      { field: 'time_xc', headerName: 'XC', width: 100 },
      { field: 'time_night', headerName: 'Night', width: 100 },
      { field: 'time_solo', headerName: 'Solo', width: 100 },
      { field: 'time_dual_received', headerName: 'Training', width: 100 },
    ],
  },

  { field: 'remarks', headerName: 'Remarks', width: 300 },
];

type Props = {
  data: Array<Flight>;
};

export default function DataTable({ data }: Props) {
  return (
    <div className="min-h-(--content-h) w-2/3">
      <AgGridReact theme={theme} rowData={data} columnDefs={columns} pagination={true} />
    </div>
  );
}
