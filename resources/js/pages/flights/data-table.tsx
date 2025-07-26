import { theme } from '@/lib/ag-grid-theme';
import useFlightPage from '@/state/flight-slice';
import { Flight } from '@/types/flights';
import { AllCommunityModule, type ColDef, type ColGroupDef, ModuleRegistry, type RowSelectionOptions } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection: RowSelectionOptions = {
  mode: 'singleRow',
  checkboxes: false,
  enableClickSelection: true,
};

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
  flights: Array<Flight>;
};

export default function DataTable({ flights }: Props) {
  const { selectEntry, setGridRef } = useFlightPage();

  return (
    <AgGridReact
      theme={theme}
      rowData={flights}
      columnDefs={columns}
      rowSelection={rowSelection}
      getRowId={(row) => row.data.id}
      onGridReady={(params) => setGridRef(params.api)}
      onRowSelected={(event) => {
        if (event.node.isSelected()) selectEntry(event.data.id);
      }}
      paginationPageSize={20}
      pagination
    />
  );
}
