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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Search, Download, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { COLORS } from '../../theme/color';
import { ENCRYPTION_KEY, FETCH_REPORT, PASS_KEY } from '../../config/config';
import { useAuth } from 'react-oidc-context';
import { store } from '../../utils/store';
import { decryptRequest, encryptResponse } from '../../utils/crypto';

// Helper to format Date object to YYYY-MM-DD in local time
const formatToLocalISO = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper to get today's date in YYYY-MM-DD for input fields
const getTodayDate = () => {
  return formatToLocalISO(new Date());
};

// Helper to format YYYY-MM-DD to DD/MM/YYYY for API
const formatDateForApi = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

export default function TransactionReport() {
  const [filter, setFilter] = useState('Today');
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(getTodayDate());
  const [endDate, setEndDate] = useState(getTodayDate());
  const [monthlyRange, setMonthlyRange] = useState('1');
  const auth = useAuth()

  const totalPages = Math.max(1, Math.ceil(transactions.length / rowsPerPage));
  
  // Calculate displayed transactions
  const startIndex = (page - 1) * rowsPerPage;
  const displayedTransactions = transactions.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1) {
      setPage(newPage);
    }
  };

  const handleRowsPerPageChange = (newValue: number) => {
    setRowsPerPage(newValue);
    setPage(1); // Reset to first page when rows per page changes
  };

  const handleMonthlySubmit = () => {
    const now = new Date();
    
    // End date is the last day of the PREVIOUS month
    const end = new Date(now.getFullYear(), now.getMonth(), 0); // 0th day of current month is last day of previous month
    
    // Start date is the 1st day of X months ago
    const start = new Date(now.getFullYear(), now.getMonth() - parseInt(monthlyRange), 1);

    const startDateStr = formatToLocalISO(start);
    const endDateStr = formatToLocalISO(end);

    setStartDate(startDateStr);
    setEndDate(endDateStr);
    setPage(1);
    
    // Call fetchReport with explicit dates to avoid stale state issues
    fetchReport(startDateStr, endDateStr);
  };

  const userDetails = store.getUserDetails();

  const fetchReport = async (sDate?: string, eDate?: string) => {
    try {
      const start = sDate || startDate;
      const end = eDate || endDate;

      const rawPayload = {
        "startDate": formatDateForApi(start),
        "endDate": formatDateForApi(end),
        "vpa_id": userDetails?.vpa_id || '',
        "mode": "both"
      }

      const response = await fetch(FETCH_REPORT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Pass_key': PASS_KEY,
          'Authorization': auth.user?.access_token || '',
        },
        body: JSON.stringify(rawPayload),
      });

      const jsonResponse = await response.json();
      console.log("Report Response:", jsonResponse);

      if (jsonResponse.data) {
        setTransactions(jsonResponse.data);
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchReport()
  },[])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fa',
      p: '1px 16px',
      boxSizing: 'border-box',
      overflowY: 'auto'
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
          onChange={(e) => {
            const val = e.target.value;
            setFilter(val);
            if (val === 'Today') {
              const today = getTodayDate();
              setStartDate(today);
              setEndDate(today);
              setPage(1);
              fetchReport(today, today);
            }
          }}
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
                value={monthlyRange}
                onChange={(e) => setMonthlyRange(e.target.value)}
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
                <MenuItem value="1">Last Month's Report</MenuItem>
                <MenuItem value="3">Last 3 month's Report</MenuItem>
                <MenuItem value="6">Last 6 month's Report</MenuItem>
                <MenuItem value="12">Last 12 month's Report</MenuItem>
              </Select>
              <Button
                variant="contained"
                disableElevation
                onClick={handleMonthlySubmit}
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
                    <DatePicker
                      value={dayjs(startDate)}
                      onChange={(newValue) => setStartDate(newValue ? newValue.format('YYYY-MM-DD') : '')}
                      disableFuture
                      maxDate={dayjs(endDate)}
                      slotProps={{
                        textField: {
                          size: 'small',
                          sx: {
                            width: 220,
                            '& .MuiOutlinedInput-root': {
                              height: 40,
                              fontSize: '0.85rem',
                            }
                          }
                        }
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#666', mb: 1, fontWeight: 500, display: 'block' }}>
                      End Date
                    </Typography>
                    <DatePicker
                      value={dayjs(endDate)}
                      onChange={(newValue) => setEndDate(newValue ? newValue.format('YYYY-MM-DD') : '')}
                      disableFuture
                      minDate={dayjs(startDate)}
                      slotProps={{
                        textField: {
                          size: 'small',
                          sx: {
                            width: 220,
                            '& .MuiOutlinedInput-root': {
                              height: 40,
                              fontSize: '0.85rem',
                            }
                          }
                        }
                      }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={() => {
                      setPage(1);
                      fetchReport();
                    }}
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
        <Box sx={{ overflowX: 'auto' }}>
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
              {displayedTransactions.length > 0 ? (
                displayedTransactions.map((row, index) => (
                  <TableRow key={row.Transaction_Id || index}>
                    <TableCell sx={{ color: '#262626', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell sx={{ color: '#262626', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                      {row.Transaction_Id}
                    </TableCell>
                    <TableCell sx={{ color: '#262626', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                      {row.rrn || ''}
                    </TableCell>
                    <TableCell sx={{ color: '#262626', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                      {row.Transaction_Amount}
                    </TableCell>
                    <TableCell sx={{ color: '#262626', fontSize: '0.8rem', py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                      {row["Date_&_Time"]}
                    </TableCell>
                    <TableCell sx={{ py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                      <Chip
                        label="Success"
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                    <Typography sx={{ color: '#8c8c8c', fontSize: '0.9rem' }}>
                      No transaction
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
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
              const pages: (number | string)[] = [];
              const range = 2; // Number of pages before and after current page

              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1);
                
                if (page > range + 2) {
                  pages.push('...');
                }

                const start = Math.max(2, page - range);
                const end = Math.min(totalPages - 1, page + range);

                for (let i = start; i <= end; i++) {
                  pages.push(i);
                }

                if (page < totalPages - range - 1) {
                  pages.push('...');
                }

                pages.push(totalPages);
              }

              return pages.map((p, idx) => (
                typeof p === 'string' ? (
                  <Typography key={idx} sx={{ color: '#bfbfbf', px: 0.5, fontSize: '0.75rem', display: 'flex', alignItems: 'center' }}>{p}</Typography>
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
    </LocalizationProvider>
  );
}
