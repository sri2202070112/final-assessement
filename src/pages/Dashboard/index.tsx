import { Box, Card, Typography, Grid, MenuItem, Menu, Radio, Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup, FormControlLabel, Skeleton } from '@mui/material';
import { ArrowLeftRight, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { COLORS } from '../../theme/color';
import { useAuth } from 'react-oidc-context';
import { decryptRequest, encryptResponse } from '../../utils/crypto';
import { ENCRYPTION_KEY, FETCH_USER_BY_ID, PASS_KEY, FETCH_REPORT } from '../../config/config';
import { store } from '../../utils/store';

// This is the main Dashboard page where the merchant sees their transactions
export default function Dashboard() {
  
  // These states help us manage the VPA selection menu (the dropdown top left)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [fullVpaData, setFullVpaData] = useState<any[]>([]); // The full data of all VPAs

  // Check if we have a saved VPA in the "notebook" immediately
  const initialUser = store.getUserDetails();
  // We ALWAYS show the shimmer initially for a consistent feel as requested
  const [isLoadingVpas, setIsLoadingVpas] = useState(true); 
  const [vpaOptions, setVpaOptions] = useState<string[]>(initialUser?.vpa_id ? [initialUser.vpa_id] : []);
  const [selectedVpaIndex, setSelectedVpaIndex] = useState<number | null>(initialUser?.vpa_id ? 0 : null);

  // Loading stats
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [showVpaModal, setShowVpaModal] = useState(false); // Should we show the 'Select VPA' popup?
  const [tempSelectedVpaIndex, setTempSelectedVpaIndex] = useState(0); // Temporary selection in the popup

  // These states handle the time filter (Choosing 'Today' or 'Yesterday')
  const [timeAnchorEl, setTimeAnchorEl] = useState<null | HTMLElement>(null);
  const isTimeMenuOpen = Boolean(timeAnchorEl);
  const [selectedTime, setSelectedTime] = useState('Today');

  // This stores the numbers we show in the white cards (Count and Amount)
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalAmount: 0
  });

  // This is used for login and security
  const auth = useAuth();

  // This function closes the VPA dropdown menu
  const handleMenuClose = (index?: number) => {
    setAnchorEl(null);
    if (index !== undefined) {
      setSelectedVpaIndex(index);
    }
  };

  // This function closes the Time filter menu
  const handleTimeMenuClose = (time?: string) => {
    setTimeAnchorEl(null);
    if (time) {
      setSelectedTime(time);
    }
  };

  // This function asks the server for the transaction numbers (how many and how much)
  const fetchDashboardStats = async () => {
    try {
      if (selectedVpaIndex === null) return;
      const vpa = vpaOptions[selectedVpaIndex];
      if (!vpa) return;

      setIsLoadingStats(true);

      const today = new Date();
      let startDateStr = '';
      let endDateStr = '';

      // Helper to turn a Date object into a string like "11/04/2026"
      const formatApiDate = (date: Date) => {
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
      };

      // Decide which dates to use based on 'Today' or 'Yesterday'
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

      // We send the request to the server
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
      // If we got data, we calculate the totals
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
        setStats({ totalTransactions: 0, totalAmount: 0 }); // Reset if no data
      }
      // Consistent shimmer timing
      setTimeout(() => setIsLoadingStats(false), 800);
    } catch (error) {
      console.error("Problem getting dashboard numbers:", error);
      setIsLoadingStats(false);
    }
  };

  // This function gets the list of VPAs that belong to this merchant
  const getvpaid = async () => {
    try {
      setIsLoadingVpas(true);
      const rawPayload = { mobile_number: auth.user?.profile?.user_name };
      // Encrypting for security
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
        // Decrypt the reply from the server
        const decryptedData = decryptRequest(jsonResponse.ResponseData, ENCRYPTION_KEY);
        const parsedData = JSON.parse(decryptedData);

        if (parsedData.data && parsedData.data.length > 0) {
          setFullVpaData(parsedData.data);
          const fetchedVpas = parsedData.data.map((item: any) => item.vpa_id).filter(Boolean);
          
          if (fetchedVpas.length > 0) {
            setVpaOptions(fetchedVpas);

            // Check if we already picked a VPA before (like before refreshing the page)
            const savedUser = store.getUserDetails();
            if (savedUser && savedUser.vpa_id) {
              const idx = fetchedVpas.indexOf(savedUser.vpa_id);
              if (idx !== -1) {
                setSelectedVpaIndex(idx); // Use the saved one
                setIsLoadingVpas(false);
                return;
              }
            }

            // If no VPA is picked yet, show the 'Select VPA' popup
            if (!store.isVpaModalShown()) {
              setShowVpaModal(true);
              store.setVpaModalShown(true);
            }
          }
        }
      }
      // Consistently resolve the VPA shimmer after 800ms
      setTimeout(() => setIsLoadingVpas(false), 800);
    } catch (error) {
      console.error("Problem getting VPA list:", error);
      setIsLoadingVpas(false);
    }
  };

  // Run this when the page first loads and the user is logged in
  useEffect(() => {
    if (auth.isAuthenticated) {
      getvpaid();
    }
  }, [auth.isAuthenticated]);

  // Save the selected VPA to the permanent store so other pages can see it
  useEffect(() => {
    if (selectedVpaIndex !== null && fullVpaData.length > 0) {
      store.setUserDetails(fullVpaData[selectedVpaIndex]);
      window.dispatchEvent(new Event('storage'));
    }
  }, [selectedVpaIndex, fullVpaData]);

  // Whenever the VPA or Time changes, we must refresh the numbers
  useEffect(() => {
    if (vpaOptions.length > 0 && selectedVpaIndex !== null) {
      fetchDashboardStats();
    }
  }, [vpaOptions, selectedVpaIndex, selectedTime]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8f9fa', pt: '2px', px: '24px', boxSizing: 'border-box' }}>
      
      {/* Top section with the 'Dashboard' title and filters */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 1.5 }}>
        <Box>
          <Typography sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '1.25rem', mb: 3.5 }}>Dashboard</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: '20px' }}>
            <Typography variant="body2" sx={{ color: '#666', fontWeight: 600 }}>VPA ID :</Typography>
            {isLoadingVpas ? (
              <Skeleton variant="rectangular" width={150} height={32} sx={{ borderRadius: '3px' }} />
            ) : (
              <Box
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 1.5,
                  border: '1px solid #d9d9d9', borderRadius: '3px', padding: '4px 12px',
                  cursor: 'pointer', backgroundColor: '#fff'
                }}
              >
                <Typography sx={{ color: '#333', fontSize: '0.9rem', fontWeight: 500 }}>
                  {selectedVpaIndex !== null ? vpaOptions[selectedVpaIndex] : 'N/A'}
                </Typography>
                <ChevronDown size={14} color="#666" />
              </Box>
            )}
          </Box>
        </Box>

        {/* The 'Today/Yesterday' selector */}
        <Box
          onClick={(e) => setTimeAnchorEl(e.currentTarget)}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            border: '1px solid #e0e0e0', borderRadius: '2px', backgroundColor: '#fff',
            px: 1.5, py: 0.5, cursor: 'pointer', height: '32px', mb: '2px'
          }}
        >
          <Typography sx={{ fontSize: '0.85rem', color: '#444' }}>{selectedTime}</Typography>
          <ChevronDown size={14} color="#666" />
        </Box>
      </Box>

      {/* The two big summary cards */}
      <Grid container spacing={2}>
        {/* Card for Total Transactions */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              width: '540px', maxWidth: '100%', height: '84px', borderRadius: '12px', border: '1px solid #f0f0f0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', px: 3, py: 1
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 40, height: 40, borderRadius: '10px', backgroundColor: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
                <ArrowLeftRight size={18} color="#9E173B" />
              </Box>
              <Typography sx={{ color: '#444', fontWeight: 500, fontSize: '0.9rem' }}>Total No Of Transaction</Typography>
            </Box>
            {isLoadingStats ? (
              <Skeleton variant="text" width={80} height={40} />
            ) : (
              <Typography sx={{ fontWeight: 500, color: '#1a1a1a', fontSize: '1.6rem' }}>
                {stats.totalTransactions.toLocaleString()}
              </Typography>
            )}
          </Card>
        </Grid>

        {/* Card for Total Amount */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Card
            elevation={0}
            sx={{
              width: '540px', maxWidth: '100%', height: '84px', borderRadius: '12px', border: '1px solid #f0f0f0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', px: 3, py: 1
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 40, height: 40, borderRadius: '10px', backgroundColor: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="5" width="20" height="14" rx="3" stroke="#9E173B" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" stroke="#9E173B" strokeWidth="2" />
                  <path d="M 6 5 C 6 7.209 4.209 9 2 9 M 18 5 C 18 7.209 19.791 9 22 9 M 6 19 C 6 16.791 4.209 15 2 15 M 18 19 C 18 16.791 19.791 15 22 15" stroke="#9E173B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Box>
              <Typography sx={{ color: '#444', fontWeight: 500, fontSize: '0.9rem' }}>Total Amount</Typography>
            </Box>
            {isLoadingStats ? (
              <Skeleton variant="text" width={120} height={40} />
            ) : (
              <Typography sx={{ fontWeight: 500, color: '#1a1a1a', fontSize: '1.6rem' }}>
                {stats.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>

      {/* The VPA selection dropdown items */}
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

      {/* The Time picker (Today/Yesterday) dropdown items */}
      <Menu
        anchorEl={timeAnchorEl}
        open={isTimeMenuOpen}
        onClose={() => handleTimeMenuClose()}
        PaperProps={{ elevation: 0, sx: { mt: 1.5, minWidth: 140, borderRadius: '4px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid #f0f0f0' } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {['Today', 'Yesterday'].map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleTimeMenuClose(option)}
            sx={{ py: 0.5, px: 1.5, fontSize: '0.9rem', color: '#333', backgroundColor: selectedTime === option ? '#eaf5fd' : 'transparent' }}
          >
            <Radio checked={selectedTime === option} size="small" sx={{ p: 0.5, mr: 1, color: '#444', '&.Mui-checked': { color: COLORS.PRIMARY } }} />
            {option}
          </MenuItem>
        ))}
      </Menu>

      {/* This is the popup that appears when you first login to pick a VPA */}
      <Dialog open={showVpaModal && vpaOptions.length > 0} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '4px', p: 1 } }}>
        <DialogTitle sx={{ pb: 1 }}><Typography variant="h6" sx={{ fontWeight: 700, color: '#262626' }}>Select VPA</Typography></DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          <Typography variant="body2" sx={{ color: '#595959', mb: 2, fontWeight: 500 }}>Select a VPA to Proceed</Typography>
          <RadioGroup value={tempSelectedVpaIndex} onChange={(e) => setTempSelectedVpaIndex(parseInt(e.target.value))}>
            {vpaOptions.map((vpa, index) => (
              <Box key={index} sx={{ border: '1px solid #f0f0f0', borderRadius: '4px', mb: 1.5, p: 1.5, display: 'flex', alignItems: 'center' }}>
                <FormControlLabel value={index} control={<Radio sx={{ color: '#d9d9d9', '&.Mui-checked': { color: COLORS.PRIMARY } }} />} label={<Typography sx={{ color: '#262626', fontSize: '0.95rem', fontWeight: 500, ml: 1 }}>{vpa}</Typography>} sx={{ width: '100%', m: 0 }} />
              </Box>
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setShowVpaModal(false)} sx={{ color: '#ff4d4f', textTransform: 'none', fontSize: '0.95rem', fontWeight: 500 }}>Cancel</Button>
          <Button variant="contained" disableElevation onClick={() => { setSelectedVpaIndex(tempSelectedVpaIndex); setShowVpaModal(false); }} sx={{ backgroundColor: COLORS.PRIMARY, color: '#fff', textTransform: 'none', px: 4, py: 1, borderRadius: '6px' }}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
