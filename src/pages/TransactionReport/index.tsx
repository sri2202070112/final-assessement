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
import { Search, Download, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useState } from 'react';
import { COLORS } from '../../theme/color';

const TRANSACTIONS = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  txnId: `${703118109860 + i}`,
  rrn: `${703118109860 + i}`,
  amount: (Math.floor(Math.random() * 20) * 1000 + 1000).toLocaleString(),
  date: '24/02/2026, 12:23 PM',
  status: 'Received'
}));

export default function TransactionReport() {
  const [filter, setFilter] = useState('Today');
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(TRANSACTIONS.length / rowsPerPage);
  
  // Calculate displayed transactions
  const startIndex = (page - 1) * rowsPerPage;
  const displayedTransactions = TRANSACTIONS.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1) {
      setPage(newPage);
    }
  };

  const handleRowsPerPageChange = (newValue: number) => {
    setRowsPerPage(newValue);
    setPage(1); // Reset to first page when rows per page changes
  };

  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fa',
      p: '1px 16px', // Reduced top padding from 16px to 8px
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Title */}
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 0.5, flexShrink: 0 }}>
        Transaction Reports
      </Typography>

      {/* Filter Card */}
      <Paper elevation={0} sx={{
        p: 2,
        mb: 2,
        borderRadius: '2px',
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

        {/* Conditional Monthly Filter Section */}
        {filter === 'Monthly' && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #f0f0f0' }}>
            <Typography variant="caption" sx={{ color: '#666', mb: 1, fontWeight: 500, display: 'block' }}>
              Monthly
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Select
                defaultValue="Last Month's Report"
                size="small"
                sx={{
                  width: 240,
                  height: 40,
                  fontSize: '0.85rem',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d9d9d9' }
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        fontSize: '0.85rem',
                        '&:hover': { backgroundColor: '#f5eef1' },
                        '&.Mui-selected': { backgroundColor: '#f5eef1', color: COLORS.PRIMARY, '&:hover': { backgroundColor: '#f5eef1' } }
                      }
                    }
                  }
                }}
              >
                <MenuItem value="Last Month's Report">Last Month's Report</MenuItem>
                <MenuItem value="Last 3 month's Report">Last 3 month's Report</MenuItem>
                <MenuItem value="Last 6 month's Report">Last 6 month's Report</MenuItem>
                <MenuItem value="Last 12 month's Report">Last 12 month's Report</MenuItem>
              </Select>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: '#fff',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  height: 40,
                  px: 3,
                  borderRadius: '6px',
                  '&:hover': { backgroundColor: '#8B1434' }
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}

        {/* Conditional Custom Range Filter Section */}
        {filter === 'Custom Range' && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #f0f0f0' }}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-end' }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#666', mb: 1, fontWeight: 500, display: 'block' }}>
                  Start Date
                </Typography>
                <TextField
                  type="date"
                  size="small"
                  sx={{
                    width: 220,
                    '& .MuiOutlinedInput-root': { 
                      height: 40, 
                      fontSize: '0.85rem',
                      '& input::-webkit-calendar-picker-indicator': {
                        cursor: 'pointer',
                        opacity: 0,
                        position: 'absolute',
                        right: 8,
                        width: '100%',
                        height: '100%'
                      }
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ pointerEvents: 'none' }}>
                        <Calendar size={18} color="#9ca3af" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#666', mb: 1, fontWeight: 500, display: 'block' }}>
                  End Date
                </Typography>
                <TextField
                  type="date"
                  size="small"
                  sx={{
                    width: 220,
                    '& .MuiOutlinedInput-root': { 
                      height: 40, 
                      fontSize: '0.85rem',
                      '& input::-webkit-calendar-picker-indicator': {
                        cursor: 'pointer',
                        opacity: 0,
                        position: 'absolute',
                        right: 8,
                        width: '100%',
                        height: '100%'
                      }
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ pointerEvents: 'none' }}>
                        <Calendar size={18} color="#9ca3af" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: '#fff',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  height: 40,
                  px: 4,
                  borderRadius: '6px',
                  '&:hover': { backgroundColor: '#8B1434' }
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Main Unified Table Card */}
      <Paper elevation={0} sx={{
        borderRadius: '2px',
        border: '1px solid #f0f0f0',
        backgroundColor: '#fff',
        overflow: 'hidden'
      }}>

        {/* Table Actions Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, borderBottom: '1px solid #f0f0f0' }}>
          <TextField
            placeholder="Search here..."
            size="small"
            sx={{
              width: 180,
              '& .MuiOutlinedInput-root': {
                height: 40,
                borderRadius: '2px',
                backgroundColor: '#fff',
                fontSize: '0.9rem',
                '& fieldset': { borderColor: '#E5E7EB' },
                '&:hover fieldset': { borderColor: '#D1D5DB' },
                '&.Mui-focused fieldset': { borderColor: '#9E173B', borderWidth: '1px' },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: '#9CA3AF',
                opacity: 1,
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#9CA3AF" strokeWidth={2} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            size="small"
            startIcon={<Download size={18} strokeWidth={2.5} />}
            disableElevation
            sx={{
              backgroundColor: COLORS.PRIMARY,
              color: '#fff',
              textTransform: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              height: 40,
              px: 2,
              borderRadius: '6px',
              '&:hover': {
                backgroundColor: '#8B1434'
              }
            }}
          >
            Download
          </Button>
        </Box>

        {/* Table Section */}
        <Box sx={{ maxHeight: 260, overflowY: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, color: '#000000', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    S. No.
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#000000', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Transaction ID
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#000000', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    RRN Number
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#000000', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Amount
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#000000', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Date
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#000000', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
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
              {displayedTransactions.map((row) => (
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
                        borderRadius: '999px',
                        fontSize: '0.7rem',
                        height: 22,
                        px: 1
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Custom Pagination Section */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: '8px 16px',
          backgroundColor: '#fff'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ color: '#8c8c8c', fontSize: '0.75rem' }}>Row per page</Typography>
            <Select
              value={rowsPerPage}
              size="small"
              onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
              sx={{
                height: 28,
                fontSize: '0.75rem',
                minWidth: 55,
                borderRadius: '2px',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d9d9d9' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#d9d9d9' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#d9d9d9' }
              }}
            >
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            <Typography sx={{ color: '#8c8c8c', fontSize: '0.75rem', ml: 1 }}>Go to</Typography>
            <TextField
              size="small"
              value={page}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (!isNaN(val)) handlePageChange(val);
              }}
              sx={{
                width: 36,
                '& .MuiOutlinedInput-root': {
                  height: 28,
                  fontSize: '0.75rem',
                  borderRadius: '2px',
                  backgroundColor: '#fff',
                  '& fieldset': { borderColor: '#d9d9d9' }
                },
                '& .MuiOutlinedInput-input': { padding: 0, textAlign: 'center' }
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton 
              size="small" 
              onClick={() => handlePageChange(page - 1)}
              sx={{ 
                width: 28, 
                height: 28, 
                borderRadius: '2px', 
                border: '1px solid #f0f0f0', 
                color: page === 1 ? '#d9d9d9' : '#262626'
              }}
            >
              <ChevronLeft size={14} />
            </IconButton>
            
            {(() => {
              const pages: (number | string)[] = [1, '...', 4, 5, 6, 7, 8, '...', 50];
              return pages.map((p, idx) => (
                typeof p === 'string' ? (
                  <Typography key={idx} sx={{ color: '#bfbfbf', px: 0.2, fontSize: '0.75rem' }}>{p}</Typography>
                ) : (
                  <Button
                    key={idx}
                    variant="outlined"
                    size="small"
                    onClick={() => handlePageChange(p)}
                    sx={{ 
                      minWidth: 28, 
                      height: 28, 
                      backgroundColor: '#fff',
                      borderColor: page === p ? '#9E173B' : '#f0f0f0', 
                      color: page === p ? '#9E173B' : '#262626', 
                      fontWeight: 400,
                      fontSize: '0.75rem', 
                      p: 0,
                      borderRadius: '2px',
                      '&:hover': { 
                        borderColor: '#9E173B',
                        backgroundColor: '#fff'
                      }
                    }}
                  >
                    {p}
                  </Button>
                )
              ));
            })()}

            <IconButton 
              size="small" 
              onClick={() => handlePageChange(page + 1)}
              sx={{ 
                width: 28, 
                height: 28, 
                borderRadius: '2px', 
                border: '1px solid #f0f0f0', 
                color: '#262626'
              }}
            >
              <ChevronRight size={14} />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
