import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
  Skeleton
} from '@mui/material';
import { User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { COLORS } from '../../theme/color';
import logo from '../../assets/logo.png';

// This is the page where merchants can create and see their payment QR codes
export default function QrDetails() {
  
  // States to keep track of what's happening on the page
  const [qrType, setQrType] = useState('static'); // 'Static' means the QR stays the same, 'Dynamic' means it has an amount
  const [amount, setAmount] = useState(''); // Stores the amount the user types in
  const [isGenerated, setIsGenerated] = useState(false); // Does the QR code exist yet?
  const [timeLeft, setTimeLeft] = useState(0); // Countdown for when the dynamic QR expires
  const [errorText, setErrorText] = useState(''); // Error messages like "Please enter a number"
  const [isPageLoading, setIsPageLoading] = useState(true); // Loading state for consistent shimmer

  // This part handles the countdown timer for the Dynamic QR (e.g. 5:00, 4:59...)
  useEffect(() => {
    let timer: any;
    // If the QR is generated and it's a dynamic one, we start counting down
    if (isGenerated && qrType === 'dynamic' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1); // Subtract 1 second every second
      }, 1000);
    } else if (timeLeft === 0 && isGenerated && qrType === 'dynamic') {
      setIsGenerated(false); // If time runs out, hide the QR code for safety
    }
    return () => clearInterval(timer); // Stop the timer if we leave the page
  }, [isGenerated, timeLeft, qrType]);

  // Turns seconds into a nice clock format like "2:30"
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Initial load shimmer
  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => setIsPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // This checks if the user typed a valid number for the amount
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setErrorText(''); // Clear old errors

    if (value === '') {
      setAmount('');
      return;
    }

    // Only allow actual numbers (0 to 9)
    if (!/^\d*$/.test(value)) {
      setErrorText('Only numbers allowed');
      return;
    }

    const numValue = parseInt(value, 10);

    // Limit the amount to ₹ 100,000 for security
    if (numValue > 100000) {
      setErrorText('Maximum amount allowed is ₹ 100,000');
      return;
    }

    setAmount(numValue.toString()); // If it's a good number, save it
  };

  // When 'Generate' is clicked, we start the process
  const handleGenerate = () => {
    if (!amount || parseInt(amount, 10) <= 0) return;
    setIsPageLoading(true); // Show shimmer while "generating"
    setTimeout(() => {
      setTimeLeft(300); // Give the customer 5 minutes to pay
      setIsGenerated(true); // Show the QR code on the screen
      setIsPageLoading(false);
    }, 800);
  };

  // This lets the merchant download the QR code so they can print it
  const handleDownload = async () => {
    try {
      // We fetch the QR image from the server
      const response = await fetch('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Name the file nicely so the merchant can find it later
      link.download = `PNB_QR_${qrType}_${new Date().getTime()}.svg`;
      document.body.appendChild(link);
      link.click(); // Trigger the actual download
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Oops! Download failed:', error);
    }
  };

  // If the user switches between Static/Dynamic, hide the old QR code
  useEffect(() => {
    setIsGenerated(false);
    if (qrType === 'static') {
      setIsPageLoading(true);
      setTimeout(() => setIsPageLoading(false), 800);
    }
  }, [qrType]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8f9fa', pt: '2px', px: '24px' }}>
      
      {/* Page Title */}
      <Typography sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3.5, fontSize: '1.25rem' }}>
        QR Details
      </Typography>

      {/* Selector card where user picks Static or Dynamic */}
      <Paper elevation={0} sx={{ p: '20px 24px', mb: 2.5, borderRadius: '8px', border: '1px solid #f0f0f0', backgroundColor: '#fff' }}>
        <Typography variant="caption" sx={{ color: '#8c8c8c', mb: 1.25, fontWeight: 600, display: 'block', fontSize: '0.85rem' }}>
          Select The Type of QR
        </Typography>
        <RadioGroup row value={qrType} onChange={(e) => setQrType(e.target.value)}>
          <FormControlLabel value="static" control={<Radio size="small" sx={{ p:0.5, '&.Mui-checked': { color: COLORS.PRIMARY } }} />} label="Static" />
          <FormControlLabel value="dynamic" control={<Radio size="small" sx={{ p:0.5, '&.Mui-checked': { color: COLORS.PRIMARY } }} />} label="Dynamic" />
        </RadioGroup>

        {/* If 'Dynamic' is picked, show the amount input field */}
        {qrType === 'dynamic' && (
          <Box sx={{ ml: 1.5, mt: 2 }}>
            <Typography variant="caption" sx={{ color: '#595959', mb: 0.5, fontWeight: 600, display: 'block' }}>
              Amount to be collected
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                placeholder="Enter amount"
                size="small"
                value={amount}
                onChange={handleAmountChange}
                error={!!errorText}
                helperText={errorText}
                sx={{ width: '300px' }}
              />
              <Button variant="contained" onClick={handleGenerate} sx={{ backgroundColor: COLORS.PRIMARY, height: '36px' }}>
                Generate QR
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Main area that shows the finished QR ticket */}
      <Box sx={{ flexGrow: 1, backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '4px', display: 'flex', justifyContent: 'center', p: 4, pt: 2 }}>
        
        {isPageLoading ? (
          /* Loading Skeleton for QR Ticket */
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', width: '380px', border: '1px solid #f0f0f0', p: 4, pb: 6 }}>
            <Skeleton variant="rectangular" width={120} height={48} sx={{ mb: 4 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3.5 }}>
              <Skeleton variant="circular" width={34} height={34} />
              <Skeleton variant="text" width={150} height={20} />
            </Box>
            <Skeleton variant="rectangular" width={260} height={260} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" width={160} height={36} sx={{ mb: 6 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Skeleton variant="text" width={80} sx={{ mx: 'auto' }} />
              <Skeleton variant="rectangular" width={100} height={32} sx={{ mx: 'auto', mt: 1 }} />
            </Box>
          </Box>
        ) : qrType === 'static' ? (
          /* Static QR Ticket View */
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', width: '380px', border: '1px solid #f0f0f0', p: 4, pb: 6 }}>
            {/* Branding */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <img src={logo} alt="PNB Logo" style={{ height: 48 }} />
              <Typography sx={{ color: '#595959', fontSize: '9px', fontWeight: 600 }}>UPI ID : 9952785870m@pnb</Typography>
            </Box>

            {/* Merchant Name */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3.5 }}>
              <Box sx={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#d9d9d9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={20} color="#fff" />
              </Box>
              <Typography sx={{ color: '#1a1a1a', fontSize: '15px', fontWeight: 600 }}>MYMUBI FOOD COURT</Typography>
            </Box>

            {/* The QR Code image */}
            <Box sx={{ width: '260px', height: '260px', mb: 3, backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg)', backgroundSize: 'contain' }} />

            <Button variant="contained" onClick={handleDownload} sx={{ backgroundColor: COLORS.PRIMARY, mb: 6 }}>
              Download QR Code
            </Button>
            
            {/* Payment brandings */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '10px', color: '#8c8c8c', fontWeight: 700 }}>POWERED BY</Typography>
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" style={{ height: 32 }} />
            </Box>
          </Box>
        ) : (
          /* Dynamic QR Ticket View */
          isGenerated && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', width: '380px', border: '1px solid #f0f0f0', p: 4, pb: 6 }}>
              {/* Show the specific amount requested by the merchant */}
              <Box sx={{ textAlign: 'center', mb: 5 }}>
                <Typography sx={{ fontSize: '15px', color: '#595959' }}>Amount to be Collected</Typography>
                <Typography sx={{ fontSize: '26px', color: COLORS.PRIMARY, fontWeight: 700 }}>₹ {amount}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3.5 }}>
                <Box sx={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#d9d9d9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={20} color="#fff" /></Box>
                <Typography sx={{ color: '#1a1a1a', fontSize: '15px', fontWeight: 600 }}>MYMUBI FOOD COURT</Typography>
              </Box>

              {/* The QR code for this specific amount */}
              <Box sx={{ width: '260px', height: '260px', mb: 3, backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg)', backgroundSize: 'contain' }} />

              <Box sx={{ textAlign: 'center' }}>
                {/* Real-time countdown clock */}
                <Typography sx={{ color: COLORS.PRIMARY, fontSize: '15px', fontWeight: 600, mb: 3 }}>
                  Expires in {formatTime(timeLeft)}
                </Typography>
                <Button variant="contained" onClick={handleDownload} sx={{ backgroundColor: COLORS.PRIMARY, mb: 4 }}>
                  Download QR Code
                </Button>
              </Box>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
}
