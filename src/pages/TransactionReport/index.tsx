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
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
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
              width: 280,
              '& .MuiOutlinedInput-root': {
                height: 40,
                borderRadius: '6px',
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
              px: 2.5,
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
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, color: '#595959', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    S. No.
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#595959', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Transaction ID
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#595959', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    RRN Number
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 500, color: '#595959', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                    Amount
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#595959', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Date
                    <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0.5 }}>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▲</Typography>
                      <Typography sx={{ fontSize: '7px', color: '#bfbfbf' }}>▼</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#595959', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
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
                  <TableCell align="right" sx={{ color: '#262626', fontSize: '0.8rem', fontWeight: 600, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>{row.amount}</TableCell>
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
      </Paper>
    </Box>
  );
}
