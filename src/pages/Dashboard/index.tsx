import { Box, Card, Typography, Grid, MenuItem, Menu, Radio, Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup, FormControlLabel } from '@mui/material';
import { ArrowLeftRight, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { COLORS } from '../../theme/color';
import { useAuth } from 'react-oidc-context';
import { decryptRequest, encryptResponse } from '../../utils/crypto';
import { ENCRYPTION_KEY, FETCH_USER_BY_ID, PASS_KEY, FETCH_REPORT } from '../../config/config';
import { store } from '../../utils/store';

export default function Dashboard() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [selectedVpaIndex, setSelectedVpaIndex] = useState(0);
  const [vpaOptions, setVpaOptions] = useState<string[]>([]);
  const [showVpaModal, setShowVpaModal] = useState(false);
  const [tempSelectedVpaIndex, setTempSelectedVpaIndex] = useState(0);

  const [timeAnchorEl, setTimeAnchorEl] = useState<null | HTMLElement>(null);
  const isTimeMenuOpen = Boolean(timeAnchorEl);
  const [selectedTime, setSelectedTime] = useState('Today');

  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalAmount: 0
  });

  const auth = useAuth();

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

  const fetchDashboardStats = async () => {
    try {
      const vpa = vpaOptions[selectedVpaIndex];
      if (!vpa) return;

      const today = new Date();
      let startDateStr = '';
      let endDateStr = '';

      const formatApiDate = (date: Date) => {
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
      };

      if (selectedTime === 'Today') {
        startDateStr = formatApiDate(today);
        endDateStr = formatApiDate(today);
      } else if (selectedTime === 'Yesterday') {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        startDateStr = formatApiDate(yesterday);
        endDateStr = formatApiDate(yesterday);
      }

      const rawPayload = {
        "startDate": startDateStr,
        "endDate": endDateStr,
        "vpa_id": vpa,
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
      if (jsonResponse.data && Array.isArray(jsonResponse.data)) {
        const totalCount = jsonResponse.data.length;
        const totalAmt = jsonResponse.data.reduce((acc: number, curr: any) => {
          const val = parseFloat(curr.Transaction_Amount) || 0;
          return acc + val;
        }, 0);
        setStats({
          totalTransactions: totalCount,
          totalAmount: totalAmt
        });
      } else {
        setStats({ totalTransactions: 0, totalAmount: 0 });
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  const getvpaid = async () => {
    try {
      const rawPayload = { mobile_number: auth.user?.profile?.user_name };
      const encryptedData = encryptResponse(JSON.stringify(rawPayload), ENCRYPTION_KEY);

      const response = await fetch(FETCH_USER_BY_ID, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.user?.access_token || '',
          'Pass_key': PASS_KEY
        },
        body: JSON.stringify({ RequestData: encryptedData }),
      });

      const jsonResponse = await response.json();

      if (jsonResponse.ResponseData) {
        const decryptedData = decryptRequest(jsonResponse.ResponseData, ENCRYPTION_KEY);
        const parsedData = JSON.parse(decryptedData);
        
        if (parsedData.data && parsedData.data.length > 0) {
          store.setUserDetails(parsedData.data[0]);

          const fetchedVpas = parsedData.data.map((item: any) => item.vpa_id).filter(Boolean);
          if (fetchedVpas.length > 0) {
            setVpaOptions(fetchedVpas);
            setSelectedVpaIndex(0);
            setTempSelectedVpaIndex(0);
            
            if (!store.isVpaModalShown()) {
              setShowVpaModal(true);
              store.setVpaModalShown(true);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching VPA ID:", error);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      getvpaid();
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    if (vpaOptions.length > 0) {
      fetchDashboardStats();
    }
  }, [vpaOptions, selectedVpaIndex, selectedTime]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8f9fa', pt: '2px', px: '32px', boxSizing: 'border-box' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 1.5 }}>
        <Box>
          <Typography sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '1.25rem', mb: 3.5 }}>Dashboard</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: '20px' }}>
            <Typography variant="body2" sx={{ color: '#666', fontWeight: 600 }}>VPA ID :</Typography>
            <Box
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                border: '1px solid #d9d9d9',
                borderRadius: '3px',
                padding: '4px 12px',
                cursor: 'pointer',
                backgroundColor: '#fff',
                transition: 'all 0.2s',
                '&:hover': { backgroundColor: '#f9f9f9', borderColor: '#ccc' }
              }}
            >
              <Typography sx={{ color: '#333', fontSize: '0.9rem', fontWeight: 500 }}>
                {vpaOptions[selectedVpaIndex] || 'N/A'}
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
            borderRadius: '2px',
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
          <Typography sx={{ fontSize: '0.85rem', color: '#444' }}>{selectedTime}</Typography>
          <ChevronDown size={14} color="#666" />
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              width: '552px', maxWidth: '100%', height: '100px', borderRadius: '12px', border: '1px solid #f0f0f0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', p: 3, boxSizing: 'border-box'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '10px', backgroundColor: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
                <ArrowLeftRight size={18} color="#9E173B" />
              </Box>
              <Typography sx={{ color: '#444', fontWeight: 500, fontSize: '0.95rem' }}>Total No Of Transaction</Typography>
            </Box>
            <Typography sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '1.75rem' }}>
              {stats.totalTransactions.toLocaleString()}
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              width: '552px', maxWidth: '100%', height: '100px', borderRadius: '12px', border: '1px solid #f0f0f0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', p: 3, boxSizing: 'border-box'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '10px', backgroundColor: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="5" width="20" height="14" rx="3" stroke="#9E173B" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" stroke="#9E173B" strokeWidth="2" />
                  <path d="M 6 5 C 6 7.209 4.209 9 2 9 M 18 5 C 18 7.209 19.791 9 22 9 M 6 19 C 6 16.791 4.209 15 2 15 M 18 19 C 18 16.791 19.791 15 22 15" stroke="#9E173B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Box>
              <Typography sx={{ color: '#444', fontWeight: 500, fontSize: '0.95rem' }}>Total Amount</Typography>
            </Box>
            <Typography sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '1.75rem' }}>
              {stats.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={() => handleMenuClose()}
        PaperProps={{ elevation: 0, sx: { mt: 0.5, minWidth: 260, borderRadius: '4px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', border: '1px solid #f0f0f0' } }}
      >
        {vpaOptions.map((vpa, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuClose(index)}
            sx={{ py: 1, px: 2, fontSize: '0.9rem', color: '#333', backgroundColor: selectedVpaIndex === index ? '#e8f5fd' : 'transparent', '&:hover': { backgroundColor: '#e8f5fd' } }}
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
          elevation: 0, sx: { mt: 1.5, minWidth: 140, borderRadius: '4px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid #f0f0f0' }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {['Today', 'Yesterday'].map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleTimeMenuClose(option)}
            sx={{ py: 0.5, px: 1.5, fontSize: '0.9rem', color: '#333', backgroundColor: selectedTime === option ? '#eaf5fd' : 'transparent', '&:hover': { backgroundColor: selectedTime === option ? '#eaf5fd' : '#f5f5f5' } }}
          >
            <Radio checked={selectedTime === option} size="small" sx={{ p: 0.5, mr: 1, color: '#444', '&.Mui-checked': { color: COLORS.PRIMARY } }} />
            {option}
          </MenuItem>
        ))}
      </Menu>

      <Dialog open={showVpaModal && vpaOptions.length > 0} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '4px', p: 1 } }}>
        <DialogTitle sx={{ pb: 1 }}><Typography variant="h6" sx={{ fontWeight: 700, color: '#262626' }}>Select VPA</Typography></DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          <Typography variant="body2" sx={{ color: '#595959', mb: 2, fontWeight: 500 }}>Select a VPA to Proceed</Typography>
          <RadioGroup value={tempSelectedVpaIndex} onChange={(e) => setTempSelectedVpaIndex(parseInt(e.target.value))}>
            {vpaOptions.map((vpa, index) => (
              <Box key={index} sx={{ border: '1px solid #f0f0f0', borderRadius: '4px', mb: 1.5, p: 1.5, display: 'flex', alignItems: 'center', transition: 'all 0.2s', '&:hover': { backgroundColor: '#fafafa' } }}>
                <FormControlLabel value={index} control={<Radio sx={{ color: '#d9d9d9', '&.Mui-checked': { color: COLORS.PRIMARY } }} />} label={<Typography sx={{ color: '#262626', fontSize: '0.95rem', fontWeight: 500, ml: 1 }}>{vpa}</Typography>} sx={{ width: '100%', m: 0 }} />
              </Box>
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setShowVpaModal(false)} sx={{ color: '#ff4d4f', textTransform: 'none', fontSize: '0.95rem', fontWeight: 500, '&:hover': { backgroundColor: 'transparent' } }}>Cancel</Button>
          <Button variant="contained" disableElevation onClick={() => { setSelectedVpaIndex(tempSelectedVpaIndex); setShowVpaModal(false); }} sx={{ backgroundColor: COLORS.PRIMARY, color: '#fff', textTransform: 'none', px: 4, py: 1, fontSize: '0.95rem', fontWeight: 500, borderRadius: '6px', '&:hover': { backgroundColor: '#8B1434' } }}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
