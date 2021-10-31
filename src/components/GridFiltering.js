
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columnWidth = 120;
const columns: GridColDef[] = [
    { field: 'date', headerName: 'date', width: columnWidth, type: 'date' },
    { field: '1. open', headerName: 'open', width: columnWidth, type: 'number' },
    { field: '2. high', headerName: 'high', width: columnWidth, type: 'number' },
    { field: '3. low', headerName: 'low', width: columnWidth, type: 'number' },
    { field: '4. close', headerName: 'close', width: columnWidth, type: 'number' },
    { field: '7. dividend amount', headerName: 'dividend amount', width: columnWidth, type: 'number' },
];

export default function App(props) {
    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={props.data}
                columns={columns}
                pageSize={20}
            />
        </div>
    );
}