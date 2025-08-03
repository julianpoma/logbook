import { theme } from '@/lib/ag-grid-theme';
import { AgGridReact } from 'ag-grid-react';

const rowSelection = {
  mode: 'singleRow',
  checkboxes: false,
  enableClickSelection: true,
};

const columns = [
  { field: 'ident', headerName: 'Ident', width: 120, pinned: true },
  { field: 'make', headerName: 'Manufacturer', width: 150 },
  { field: 'model', headerName: 'Model', width: 150 },
  { field: 'horsepower', headerName: 'HP', width: 100 },
  { field: 'class', headerName: 'Class', width: 100 },
  { field: 'flights_count', headerName: 'Flights', width: 110 },
  { field: 'flights_sum_time_total', headerName: 'Hours flown', width: 110 },
  { field: 'is_complex', headerName: 'Complex', width: 100 },
  { field: 'is_high_performance', headerName: 'High performance', width: 100 },
  { field: 'is_pressurized', headerName: 'Pressurized', width: 100 },
  { field: 'is_turbine', headerName: 'Jet engine', width: 100 },
  { field: 'is_tailwheel', headerName: 'Tailwheel', width: 100 },
  { field: 'notes', headerName: 'Notes' },
];

export default function DataTable({ aircrafts }) {
  return (
    <AgGridReact
      theme={theme}
      rowData={aircrafts}
      columnDefs={columns}
      rowSelection={rowSelection}
      getRowId={(row) => row.data.id}
      // onGridReady={(params) => setGridRef(params.api)}
      // onRowSelected={(event) => {
      //   if (event.node.isSelected()) selectEntry(event.data.id);
      // }}
      paginationPageSize={20}
      pagination
    />
  );
}
