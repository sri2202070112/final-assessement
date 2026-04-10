import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Chip,
  IconButton
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { COLORS } from '../../theme/color';
import { FETCH_REPORT, PASS_KEY } from '../../config/config';
import { useAuth } from 'react-oidc-context';
import { store } from '../../utils/store';

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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [goToPage, setGoToPage] = useState('1');
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
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      setGoToPage(newPage.toString());
    }
  };

  const handleRowsPerPageChange = (newValue: number) => {
    setRowsPerPage(newValue);
    setPage(1);
    setGoToPage('1');
  };

  const handleGoToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setGoToPage(val);
    const num = parseInt(val);
    if (!isNaN(num) && num >= 1 && num <= totalPages) {
      setPage(num);
    }
  };

  const handleMonthlySubmit = () => {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth(), 0);
    const start = new Date(now.getFullYear(), now.getMonth() - parseInt(monthlyRange), 1);
    const startDateStr = formatToLocalISO(start);
    const endDateStr = formatToLocalISO(end);
    setStartDate(startDateStr);
    setEndDate(endDateStr);
    setPage(1);
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
      if (jsonResponse.data) {
        setTransactions(jsonResponse.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDownload = () => {
    // Headers matching the table columns
    const headers = ['S.No.', 'Transaction ID', 'RRN Number', 'Amount', 'Date', 'Status'];
    
    // Map transactions to CSV rows
    const csvRows = [
      headers.join(','),
      ...transactions.map((row, index) => [
        index + 1,
        `"${row.Transaction_Id || ''}"`,
        `"${row.rrn || ''}"`,
        `"${row.Transaction_Amount || ''}"`,
        `"${row["Date_&_Time"] || ''}"`,
        '"Success"'
      ].join(','))
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `PNB_Transaction_Report_${startDate}_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(()=>{
    fetchReport()
  },[])

  // Pagination Logic to match image
  const getPaginationItems = () => {
    const items: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      items.push(1);
      if (page > 4) items.push('...');
      
      const start = Math.max(2, page - 2);
      const end = Math.min(totalPages - 1, page + 2);
      
      for (let i = start; i <= end; i++) {
        if (!items.includes(i)) items.push(i);
      }
      
      if (page < totalPages - 3) items.push('...');
      if (!items.includes(totalPages)) items.push(totalPages);
    }
    return items;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
        p: '1px 16px',
        boxSizing: 'border-box'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 0.5 }}>
          Transaction Reports
        </Typography>

        <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: '2px', border: '1px solid #f0f0f0', backgroundColor: '#fff' }}>
          <Typography variant="caption" sx={{ color: '#666', mb: 0.5, fontWeight: 500, display: 'block' }}>Select a Report Filter</Typography>
          <RadioGroup row value={filter} onChange={(e) => {
            const val = e.target.value;
            setFilter(val);
            if (val === 'Today') {
              const today = getTodayDate();
              setStartDate(today); setEndDate(today); setPage(1); fetchReport(today, today);
            }
          }}>
            <FormControlLabel value="Today" control={<Radio size="small" sx={{ color: '#d9d9d9', '&.Mui-checked': { color: COLORS.PRIMARY } }} />} label={<Typography sx={{ fontSize: '0.8rem' }}>Today</Typography>} />
            <FormControlLabel value="Monthly" control={<Radio size="small" sx={{ color: '#d9d9d9', '&.Mui-checked': { color: COLORS.PRIMARY } }} />} label={<Typography sx={{ fontSize: '0.8rem' }}>Monthly</Typography>} />
            <FormControlLabel value="Custom Range" control={<Radio size="small" sx={{ color: '#d9d9d9', '&.Mui-checked': { color: COLORS.PRIMARY } }} />} label={<Typography sx={{ fontSize: '0.8rem' }}>Custom Range</Typography>} />
          </RadioGroup>

          {filter === 'Monthly' && (
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #f0f0f0' }}>
              <Typography variant="caption" sx={{ color: '#666', mb: 1, fontWeight: 500, display: 'block' }}>Monthly</Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Select value={monthlyRange} onChange={(e) => setMonthlyRange(e.target.value)} size="small" sx={{ width: 240, height: 40, fontSize: '0.85rem' }}>
                  <MenuItem value="1">Last Month's Report</MenuItem>
                  <MenuItem value="3">Last 3 month's Report</MenuItem>
                  <MenuItem value="6">Last 6 month's Report</MenuItem>
                  <MenuItem value="12">Last 12 month's Report</MenuItem>
                </Select>
                <Button variant="contained" disableElevation onClick={handleMonthlySubmit} sx={{ backgroundColor: COLORS.PRIMARY, height: 40, borderRadius: '6px' }}>Submit</Button>
              </Box>
            </Box>
          )}

          {filter === 'Custom Range' && (
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #f0f0f0' }}>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-end' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#666', mb: 1, fontWeight: 500, display: 'block' }}>Start Date</Typography>
                  <DatePicker value={dayjs(startDate)} onChange={(newValue) => setStartDate(newValue ? newValue.format('YYYY-MM-DD') : '')} slotProps={{ textField: { size: 'small', sx: { width: 220 } } }} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#666', mb: 1, fontWeight: 500, display: 'block' }}>End Date</Typography>
                  <DatePicker value={dayjs(endDate)} onChange={(newValue) => setEndDate(newValue ? newValue.format('YYYY-MM-DD') : '')} slotProps={{ textField: { size: 'small', sx: { width: 220 } } }} />
                </Box>
                <Button variant="contained" disableElevation onClick={() => { setPage(1); fetchReport(); }} sx={{ backgroundColor: COLORS.PRIMARY, height: 40, borderRadius: '6px' }}>Submit</Button>
              </Box>
            </Box>
          )}
        </Paper>

        <Paper elevation={0} sx={{ borderRadius: '2px', border: '1px solid #f0f0f0', backgroundColor: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, borderBottom: '1px solid #f0f0f0' }}>
            <TextField placeholder="Search here..." size="small" sx={{ width: 180 }} InputProps={{ startAdornment: <InputAdornment position="start"><Search size={18} color="#9CA3AF" /></InputAdornment> }} />
            <Button 
              variant="contained" 
              size="small" 
              startIcon={<Download size={18} />} 
              onClick={handleDownload}
              sx={{ backgroundColor: COLORS.PRIMARY, height: 40, borderRadius: '6px' }}
            >
              Download
            </Button>
          </Box>

          {/* Conditional Table Scroll Container */}
          <Box sx={{ 
            overflowX: 'auto', 
            overflowY: rowsPerPage > 4 ? 'auto' : 'visible',
            maxHeight: rowsPerPage > 4 ? '400px' : 'none'
          }}>
            <Table stickyHeader sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  {[
                    'S. No.', 
                    'Transaction ID', 
                    'RRN Number', 
                    'Amount', 
                    'Date', 
                    'Status'
                  ].map((head, index) => (
                    <TableCell 
                      key={head} 
                      sx={{ 
                        fontWeight: 500, 
                        fontSize: '13px', 
                        color: '#595959',
                        backgroundColor: '#fafafa', 
                        borderBottom: '1px solid #f0f0f0',
                        py: 1.5,
                        px: 2,
                        position: 'relative',
                        '&:not(:last-child)::after': {
                          content: '""',
                          position: 'absolute',
                          right: 0,
                          top: '25%',
                          height: '50%',
                          width: '1px',
                          backgroundColor: '#e0e0e0'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {head}
                        <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0, opacity: 0.25, mt: 0.2 }}>
                          <span style={{ fontSize: '7px', marginBottom: '-2px' }}>▲</span>
                          <span style={{ fontSize: '7px' }}>▼</span>
                        </Box>
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedTransactions.length > 0 ? (
                  displayedTransactions.map((row, index) => (
                    <TableRow key={row.Transaction_Id || index}>
                      <TableCell sx={{ fontSize: '0.8rem' }}>{startIndex + index + 1}</TableCell>
                      <TableCell sx={{ fontSize: '0.8rem' }}>{row.Transaction_Id}</TableCell>
                      <TableCell sx={{ fontSize: '0.8rem' }}>{row.rrn || ''}</TableCell>
                      <TableCell sx={{ fontSize: '0.8rem' }}>{row.Transaction_Amount}</TableCell>
                      <TableCell sx={{ fontSize: '0.8rem' }}>{row["Date_&_Time"]}</TableCell>
                      <TableCell><Chip label="Success" size="small" sx={{ backgroundColor: '#F6FFED', color: '#52C41A' }} /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={6} align="center" sx={{ py: 10 }}>No transaction</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </Box>

          {/* Functional Pagination Footer matching image */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            p: '16px 24px', 
            borderTop: '1px solid #f0f0f0',
            backgroundColor: '#fff',
            flexShrink: 0
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography sx={{ color: '#8c8c8c', fontSize: '13px', letterSpacing: '0.02em' }}>Row per page</Typography>
              <Select 
                value={rowsPerPage} 
                size="small" 
                onChange={(e) => handleRowsPerPageChange(Number(e.target.value))} 
                sx={{ 
                  height: 36, 
                  minWidth: 64, 
                  fontSize: '13px',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#d9d9d9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#d9d9d9', borderWidth: '1px' }
                }}
              >
                {[4, 10, 25, 50].map(val => (
                  <MenuItem key={val} value={val} sx={{ fontSize: '13px' }}>{val}</MenuItem>
                ))}
              </Select>
              <Typography sx={{ color: '#8c8c8c', fontSize: '13px', ml: 1, letterSpacing: '0.02em' }}>Go to</Typography>
              <TextField 
                size="small" 
                value={goToPage} 
                onChange={handleGoToChange}
                inputProps={{ 
                  style: { 
                    textAlign: 'center', 
                    padding: '0 8px',
                    fontSize: '13px' 
                  } 
                }}
                sx={{ 
                  width: 44, 
                  '& .MuiOutlinedInput-root': { 
                    height: 36, 
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    '& fieldset': { borderColor: '#e0e0e0' },
                    '&:hover fieldset': { borderColor: '#d9d9d9' },
                    '&.Mui-focused fieldset': { borderColor: '#d9d9d9', borderWidth: '1px' }
                  }
                }} 
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <IconButton 
                onClick={() => handlePageChange(page - 1)} 
                disabled={page === 1}
                sx={{ 
                  width: 36, height: 36, borderRadius: '4px', border: '1px solid #e0e0e0',
                  color: page === 1 ? '#d9d9d9' : '#8c8c8c',
                  backgroundColor: '#fff',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                <ChevronLeft size={18} />
              </IconButton>
              
              {getPaginationItems().map((p, idx) => (
                typeof p === 'string' ? (
                  <Typography key={idx} sx={{ color: '#bfbfbf', px: 0.5, fontSize: '14px' }}>...</Typography>
                ) : (
                  <Button
                    key={idx}
                    variant="outlined"
                    onClick={() => handlePageChange(p)}
                    sx={{
                      minWidth: 36, height: 36, p: 0, borderRadius: '4px',
                      fontSize: '13px',
                      border: p === page ? `1px solid ${COLORS.PRIMARY}` : '1px solid #e0e0e0',
                      color: p === page ? COLORS.PRIMARY : '#595959',
                      fontWeight: p === page ? 600 : 400,
                      backgroundColor: '#fff',
                      '&:hover': {
                        backgroundColor: '#fff',
                        borderColor: p === page ? COLORS.PRIMARY : '#d9d9d9'
                      }
                    }}
                  >
                    {p}
                  </Button>
                )
              ))}

              <IconButton 
                onClick={() => handlePageChange(page + 1)} 
                disabled={page === totalPages}
                sx={{ 
                  width: 36, height: 36, borderRadius: '4px', border: '1px solid #e0e0e0',
                  color: page === totalPages ? '#d9d9d9' : '#8c8c8c',
                  backgroundColor: '#fff',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                <ChevronRight size={18} />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}
