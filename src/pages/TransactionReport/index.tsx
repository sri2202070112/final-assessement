import { Box, Typography, Paper, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'Transaction ID', width: 220 },
  { field: 'date', headerName: 'Date', width: 180 },
  { field: 'customer', headerName: 'Customer', width: 200 },
  { 
    field: 'amount', 
    headerName: 'Amount', 
    width: 150,
    renderCell: (params) => (
      <Typography fontWeight="bold">
        ₹{params.value}
      </Typography>
    )
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 160,
    renderCell: (params) => {

      let bgColor = 'transparent';
      
      if (params.value === 'Success') {
        bgColor = '#e6f7ff'; // gentle blue/green assuming success is a light variant in colors.ts but we can use default if it's very light. The custom success color is very light #F6FFED 
      } else if (params.value === 'Failed') {
        bgColor = '#fff1f0';
      }

      return (
        <Chip 
          label={params.value} 
          size="small" 
          sx={{ 
            bgcolor: bgColor, 
            color: params.value === 'Success' ? '#52c41a' : params.value === 'Failed' ? '#f5222d' : undefined,
            fontWeight: 'bold',
            border: `1px solid ${params.value === 'Success' ? '#b7eb8f' : params.value === 'Failed' ? '#ffa39e' : '#d9d9d9'}`
          }} 
        />
      );
    },
  },
];

const rows = [
  { id: 'TXN100234123', date: '2023-10-25 14:30', customer: 'John Doe', amount: 1500, status: 'Success' },
  { id: 'TXN100234124', date: '2023-10-25 15:10', customer: 'Jane Smith', amount: 320, status: 'Success' },
  { id: 'TXN100234125', date: '2023-10-25 16:45', customer: 'Bob Johnson', amount: 5000, status: 'Failed' },
  { id: 'TXN100234126', date: '2023-10-26 09:20', customer: 'Alice Brown', amount: 890, status: 'Success' },
  { id: 'TXN100234127', date: '2023-10-26 11:05', customer: 'Chris Green', amount: 2100, status: 'Pending' },
];

export default function TransactionReport() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        Transaction Report
      </Typography>

      <Paper sx={{ height: 600, width: '100%', boxShadow: '0 2px 14px 0 rgba(32, 40, 45, 0.08)' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#fafafa',
              borderBottom: '1px solid #f0f0f0'
            }
          }}
        />
      </Paper>
    </Box>
  );
}
