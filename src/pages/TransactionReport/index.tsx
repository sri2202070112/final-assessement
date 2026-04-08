import { 
  Box, 
  Typography, 
  Paper, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  TextField, 
  InputAdornment, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Select,
  MenuItem,
  Chip,
  IconButton
} from '@mui/material';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { COLORS } from '../../theme/color';

const TRANSACTIONS = [
  { id: '1', txnId: '703118109867', rrn: '703118109867', amount: '10,000', date: '24/02/2026, 12:23 PM', status: 'Received' },
  { id: '2', txnId: '703118109862', rrn: '703118109862', amount: '10,000', date: '24/02/2026, 12:23 PM', status: 'Received' },
  { id: '3', txnId: '703118109865', rrn: '703118109865', amount: '10,000', date: '24/02/2026, 12:23 PM', status: 'Received' },
  { id: '4', txnId: '703118109860', rrn: '703118109860', amount: '10,000', date: '24/02/2026, 12:23 PM', status: 'Received' },
];

export default function TransactionReport() {
  const [filter, setFilter] = useState('Today');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(6); // As per screenshot

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fa', 
      p: 2,
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Title */}
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1.5, flexShrink: 0 }}>
        Transaction Reports
      </Typography>

      {/* Filter Card */}
      <Paper elevation={0} sx={{ 
        p: 1.5, 
        mb: 1.5, 
        borderRadius: '8px', 
        border: '1px solid #f0f0f0',
        backgroundColor: '#fff',
        flexShrink: 0
      }}>
        <Typography variant="caption" sx={{ color: '#666', mb: 0.5, fontWeight: 500, display: 'block' }}>
          Select a Report Filter
        </Typography>
        <RadioGroup
          row
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <FormControlLabel 
            value="Today" 
            control={<Radio size="small" sx={{ p: 0.5, color: '#d9d9d9', '&.Mui-checked': { color: COLORS.PRIMARY } }} />} 
            label={<Typography sx={{ fontSize: '0.8rem' }}>Today</Typography>} 
          />
          <FormControlLabel 
            value="Monthly" 
            control={<Radio size="small" sx={{ p: 0.5, color: '#d9d9d9', '&.Mui-checked': { color: COLORS.PRIMARY } }} />} 
            label={<Typography sx={{ fontSize: '0.8rem' }}>Monthly</Typography>} 
          />
          <FormControlLabel 
            value="Custom Range" 
            control={<Radio size="small" sx={{ p: 0.5, color: '#d9d9d9', '&.Mui-checked': { color: COLORS.PRIMARY } }} />} 
            label={<Typography sx={{ fontSize: '0.8rem' }}>Custom Range</Typography>} 
          />
        </RadioGroup>
      </Paper>

      {/* Table Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexShrink: 0 }}>
        <TextField
          placeholder="Search here..."
          size="small"
          sx={{ 
            width: 260,
            '& .MuiOutlinedInput-root': {
              height: 32,
              borderRadius: '4px',
              backgroundColor: '#fff',
              fontSize: '0.85rem',
              '& fieldset': { borderColor: '#d9d9d9' }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} color="#999" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          size="small"
          startIcon={<Download size={16} />}
          disableElevation
          sx={{
            backgroundColor: COLORS.PRIMARY,
            color: '#fff',
            textTransform: 'none',
            fontSize: '0.85rem',
            height: 32,
            px: 2,
            '&:hover': {
              backgroundColor: '#7A122E'
            }
          }}
        >
          Download
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper} elevation={0} sx={{ 
        borderRadius: '8px', 
        border: '1px solid #f0f0f0',
        backgroundColor: '#fff',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, color: '#8c8c8c', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    S. No.
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#8c8c8c', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Transaction ID
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#8c8c8c', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    RRN Number
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#8c8c8c', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Amount
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#8c8c8c', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Date
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#8c8c8c', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fff' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Status
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TRANSACTIONS.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ color: '#262626', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0' }}>{row.id}</TableCell>
                  <TableCell sx={{ color: '#262626', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0' }}>{row.txnId}</TableCell>
                  <TableCell sx={{ color: '#262626', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0' }}>{row.rrn}</TableCell>
                  <TableCell sx={{ color: '#262626', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0' }}>{row.amount}</TableCell>
                  <TableCell sx={{ color: '#262626', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0' }}>{row.date}</TableCell>
                  <TableCell sx={{ py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                    <Chip 
                      label={row.status} 
                      size="small"
                      sx={{ 
                        backgroundColor: '#F6FFED', 
                        color: '#52C41A',
                        fontWeight: 500,
                        borderRadius: '2px',
                        fontSize: '0.7rem',
                        height: 20
                      }} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Custom Pagination */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: '12px 16px', 
          borderTop: '1px solid #f0f0f0',
          backgroundColor: '#fff'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#8c8c8c', fontSize: '0.8rem' }}>Row per page</Typography>
            <Select
              value={rowsPerPage}
              size="small"
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              sx={{ 
                height: 28, 
                fontSize: '0.8rem',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d9d9d9' }
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            <Typography variant="body2" sx={{ color: '#8c8c8c', fontSize: '0.8rem', ml: 1 }}>Go to</Typography>
            <TextField 
              size="small"
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              sx={{ 
                width: 38,
                '& .MuiOutlinedInput-root': {
                  height: 28,
                  fontSize: '0.8rem',
                  padding: 0,
                  textAlign: 'center'
                },
                '& .MuiOutlinedInput-input': { padding: '0 4px', textAlign: 'center' }
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton size="small" sx={{ width: 28, height: 28, borderRadius: '4px', border: '1px solid #f0f0f0', color: '#d9d9d9' }}>
               <ChevronLeft size={14} />
            </IconButton>
            <Button variant="outlined" size="small" sx={{ minWidth: 28, height: 28, borderColor: '#f0f0f0', color: '#262626', fontSize: '0.8rem', p: 0 }}>1</Button>
            <Typography sx={{ color: '#d9d9d9', px: 0.5, fontSize: '0.8rem' }}>...</Typography>
            <Button variant="outlined" size="small" sx={{ minWidth: 28, height: 28, borderColor: '#f0f0f0', color: '#262626', fontSize: '0.8rem', p: 0 }}>4</Button>
            <Button variant="outlined" size="small" sx={{ minWidth: 28, height: 28, borderColor: '#f0f0f0', color: '#262626', fontSize: '0.8rem', p: 0 }}>5</Button>
            <Button disableElevation variant="contained" size="small" sx={{ minWidth: 28, height: 28, backgroundColor: '#fff', border: '1px solid #9E173B', color: '#9E173B', fontWeight: 600, fontSize: '0.8rem', p: 0 }}>6</Button>
            <Button variant="outlined" size="small" sx={{ minWidth: 28, height: 28, borderColor: '#f0f0f0', color: '#262626', fontSize: '0.8rem', p: 0 }}>7</Button>
            <Button variant="outlined" size="small" sx={{ minWidth: 28, height: 28, borderColor: '#f0f0f0', color: '#262626', fontSize: '0.8rem', p: 0 }}>8</Button>
            <Typography sx={{ color: '#d9d9d9', px: 0.5, fontSize: '0.8rem' }}>...</Typography>
            <Button variant="outlined" size="small" sx={{ minWidth: 28, height: 28, borderColor: '#f0f0f0', color: '#262626', fontSize: '0.8rem', p: 0 }}>50</Button>
            <IconButton size="small" sx={{ width: 28, height: 28, borderRadius: '4px', border: '1px solid #f0f0f0', color: '#262626' }}>
               <ChevronRight size={14} />
            </IconButton>
          </Box>
        </Box>
      </TableContainer>
    </Box>
  );
}
