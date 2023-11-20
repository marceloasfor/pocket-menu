"use client"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'table', headerName: 'Table number', width: 130 },
  { field: 'user', headerName: 'User name', width: 130 },
  { field: 'age', headerName: 'Age', width: 100, },
];

const rows = [
  { id: 1, table: 12, user: 'Jon', age: 35 },
  { id: 2, table: 12, user: 'Cersei', age: 42 },
  { id: 3, table: 12, user: 'Jaime', age: 45 },
  { id: 4, table: 123, user: 'Arya', age: 16 },
  { id: 5, table: 12, user: 'Daenerys', age: null },
  { id: 6, table: 12, user: null, age: 150 },
  { id: 7, table: 123, user: 'Ferrara', age: 44 },
  { id: 8, table: 123, user: 'Rossini', age: 36 },
  { id: 9, table: 12, user: 'Harvey', age: 65 },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '60%' }}>
      <DataGrid
        className='shadow-lg bg-white'
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}