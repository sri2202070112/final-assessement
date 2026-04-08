import { Box, Card, Typography, Grid, MenuItem, Select, FormControl, Menu, Radio } from '@mui/material';
import { ArrowLeftRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { COLORS } from '../../theme/color';

const VPA_OPTIONS = [
  'Pabitra.hota@pnb',
  '9283032322742bis@pnb',
  'Pabitra@pnb',
  'Pabitra.hota@pnb'
];

export default function Dashboard() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [selectedVpaIndex, setSelectedVpaIndex] = useState(0);

  const [timeAnchorEl, setTimeAnchorEl] = useState<null | HTMLElement>(null);
  const isTimeMenuOpen = Boolean(timeAnchorEl);
  const [selectedTime, setSelectedTime] = useState('Today');

  const handleMenuClose = (index?: number) => {
    setAnchorEl(null);
    if (index !== undefined) {
      setSelectedVpaIndex(index);
    }
  };

  const handleTimeMenuClose = (time?: string) => {
    setTimeAnchorEl(null);
    if (time) {
      setSelectedTime(time);
    }
  };

  return (
    <Box
      id="dashboard-isolation-layer"
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        isolation: 'isolate',
        pt: '2px',
        px: '32px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 1.5 }}>
        <Box>
          <Typography sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '1.25rem', mb: 3.5 }}>
            Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: '20px' }}>
            <Typography variant="body2" sx={{ color: '#666', fontWeight: 600 }}>
              VPA ID :
            </Typography>
            <Box
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                padding: '4px 12px',
                cursor: 'pointer',
                backgroundColor: '#fff',
                transition: 'all 0.2s',
                '&:hover': { backgroundColor: '#f9f9f9', borderColor: '#ccc' }
              }}
            >
              <Typography sx={{ color: '#333', fontSize: '0.9rem', fontWeight: 500 }}>
                {VPA_OPTIONS[selectedVpaIndex]}
              </Typography>
              <ChevronDown size={14} color="#666" />
            </Box>
          </Box>
        </Box>

        <Box
          onClick={(e) => setTimeAnchorEl(e.currentTarget)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            backgroundColor: '#fff',
            px: 1.5,
            py: 0.5,
            cursor: 'pointer',
            height: '32px',
            mb: '2px',
            transition: 'all 0.2s',
            '&:hover': { borderColor: '#ccc' }
          }}
        >
          <Typography sx={{ fontSize: '0.85rem', color: '#444' }}>
            {selectedTime}
          </Typography>
          <ChevronDown size={14} color="#666" />
        </Box>
      </Box>

      {/* Stats Cards Section */}
      <Grid container spacing={3}>
        {/* Total Transactions Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              width: '552px',
              maxWidth: '100%',
              height: '100px',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              p: 3,
              boxSizing: 'border-box'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{
                width: 44,
                height: 44,
                borderRadius: '10px',
                backgroundColor: '#f0f5ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2
              }}>
                <ArrowLeftRight size={18} color="#9E173B" />
              </Box>
              <Typography sx={{ color: '#444', fontWeight: 500, fontSize: '0.95rem' }}>
                Total No Of Transaction
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '1.75rem' }}>
              20.7K
            </Typography>
          </Card>
        </Grid>

        {/* Total Amount Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              width: '552px',
              maxWidth: '100%',
              height: '100px',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              p: 3,
              boxSizing: 'border-box'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{
                width: 44,
                height: 44,
                borderRadius: '10px',
                backgroundColor: '#f0f5ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="5" width="20" height="14" rx="3" stroke="#9E173B" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" stroke="#9E173B" strokeWidth="2" />
                  <path d="M 6 5 C 6 7.209 4.209 9 2 9 M 18 5 C 18 7.209 19.791 9 22 9 M 6 19 C 6 16.791 4.209 15 2 15 M 18 19 C 18 16.791 19.791 15 22 15" stroke="#9E173B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Box>
              <Typography sx={{ color: '#444', fontWeight: 500, fontSize: '0.95rem' }}>
                Total Amount
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '1.75rem' }}>
              76,000 cr
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={() => handleMenuClose()}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 0.5,
            minWidth: 260,
            borderRadius: '4px',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f0f0f0',
          }
        }}
      >
        {VPA_OPTIONS.map((vpa, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuClose(index)}
            sx={{
              py: 1,
              px: 2,
              fontSize: '0.9rem',
              color: '#333',
              backgroundColor: selectedVpaIndex === index ? '#e8f5fd' : 'transparent',
              '&:hover': {
                backgroundColor: '#e8f5fd',
              }
            }}
          >
            {vpa}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={timeAnchorEl}
        open={isTimeMenuOpen}
        onClose={() => handleTimeMenuClose()}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            minWidth: 140,
            borderRadius: '4px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #f0f0f0',
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {['Today', 'Yesterday'].map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleTimeMenuClose(option)}
            sx={{
              py: 0.5,
              px: 1.5,
              fontSize: '0.9rem',
              color: '#333',
              backgroundColor: selectedTime === option ? '#eaf5fd' : 'transparent',
              '&:hover': {
                backgroundColor: selectedTime === option ? '#eaf5fd' : '#f5f5f5',
              }
            }}
          >
            <Radio
              checked={selectedTime === option}
              size="small"
              sx={{
                p: 0.5,
                mr: 1,
                color: '#444',
                '&.Mui-checked': {
                  color: COLORS.PRIMARY,
                }
              }}
            />
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
