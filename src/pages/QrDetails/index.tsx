import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
} from '@mui/material';
import { User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { COLORS } from '../../theme/color';
import logo from '../../assets/logo.png';

export default function QrDetails() {
  const [qrType, setQrType] = useState('static');
  const [amount, setAmount] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [validUntil, setValidUntil] = useState('');

  const handleGenerate = () => {
    if (!amount) return;
    const now = new Date();
    now.setMinutes(now.getMinutes() + 2);
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    setValidUntil(timeStr);
    setIsGenerated(true);
  };

  useEffect(() => {
    setIsGenerated(false);
  }, [qrType]);

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      backgroundColor: '#f8f9fa', // Grey original page background
      display: 'flex',
      flexDirection: 'column',
      p: '16px 24px',
      boxSizing: 'border-box',
      overflow: 'auto'
    }}>
      <Typography sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2, fontSize: '1.2rem' }}>
        QR Details
      </Typography>

      {/* Filter Section - White Paper on Grey BG */}
      <Paper elevation={0} sx={{ 
        p: 2.5, 
        mb: 2, 
        borderRadius: '4px', 
        border: '1px solid #f0f0f0', 
        backgroundColor: '#fff' 
      }}>
        <Typography variant="caption" sx={{ color: '#595959', mb: 0.5, fontWeight: 600, display: 'block', ml: 1.5 }}>
          Select The Type of QR
        </Typography>
        <RadioGroup 
          row 
          value={qrType} 
          onChange={(e) => setQrType(e.target.value)}
          sx={{ ml: 1.5, mb: qrType === 'dynamic' ? 2 : 0 }}
        >
          <FormControlLabel
            value="static"
            control={<Radio size="small" sx={{ p: 0.5, color: '#d9d9d9', '&.Mui-checked': { color: COLORS.PRIMARY } }} />}
            label={<Typography sx={{ fontSize: '0.85rem', color: '#1a1a1a', fontWeight: 500 }}>Static</Typography>}
          />
          <FormControlLabel
            value="dynamic"
            control={<Radio size="small" sx={{ p: 0.5, color: '#d9d9d9', '&.Mui-checked': { color: COLORS.PRIMARY } }} />}
            label={<Typography sx={{ fontSize: '0.85rem', color: '#1a1a1a', fontWeight: 500 }}>Dynamic</Typography>}
          />
        </RadioGroup>

        {qrType === 'dynamic' && (
          <Box sx={{ ml: 1.5, animation: 'fadeIn 0.3s ease-in-out' }}>
            <Typography variant="body2" sx={{ color: '#8c8c8c', mb: 2, fontWeight: 500 }}>
              Enter an amount to instantly generate your dynamic QR code
            </Typography>
            
            <Typography variant="caption" sx={{ color: '#595959', mb: 0.5, fontWeight: 600, display: 'block' }}>
              Amount to be collected
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                placeholder="Enter the amount to be collected"
                size="small"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ 
                  width: '300px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    height: '36px',
                    fontSize: '0.85rem',
                    '& fieldset': { borderColor: '#e4e4e4' },
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleGenerate}
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: '#fff',
                  textTransform: 'none',
                  px: 3,
                  height: '36px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  borderRadius: '4px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: COLORS.PRIMARY,
                    opacity: 0.9,
                    boxShadow: 'none'
                  }
                }}
              >
                Generate QR
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Main Content Area - White background block as per Image 9 */}
      <Box sx={{
        flexGrow: 1,
        backgroundColor: '#fff',
        border: '1px solid #f0f0f0',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Shifted to top
        pt: 2, // Added top padding
        p: 4
      }}>
        {qrType === 'static' ? (
          /* Static QR View (with the specific grey border style) */
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            backgroundColor: '#fff',
            width: '100%',
            maxWidth: '380px',
            border: '1px solid #f0f0f0', // Border around content
            p: 4,
            pb: 6
          }}>
            {/* PNB Branding Header */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <img src={logo} alt="PNB Logo" style={{ height: 48, objectFit: 'contain' }} />
              <Typography sx={{ color: '#595959', fontSize: '9px', fontWeight: 600, mt: 0.5 }}>
                UPI ID : 9952785870m@pnb
              </Typography>
            </Box>

            {/* User Info Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3.5 }}>
              <Box sx={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#d9d9d9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={20} color="#fff" />
              </Box>
              <Typography sx={{ color: '#1a1a1a', fontSize: '15px', fontWeight: 600, textTransform: 'uppercase' }}>
                MYMUBI FOOD COURT
              </Typography>
            </Box>

            {/* QR Code Placeholder */}
            <Box sx={{ 
              width: '260px', 
              height: '260px', 
              mb: 3,
              p: 1,
              backgroundColor: '#fff',
              backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }} />

            {/* UPI ID Again */}
            <Typography sx={{ color: '#1a1a1a', fontSize: '13px', fontWeight: 500, mb: 5 }}>
              UPI ID : 9952785870m@pnb
            </Typography>

            {/* Download Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: COLORS.PRIMARY,
                color: '#fff',
                textTransform: 'none',
                px: 4,
                py: 1,
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '4px',
                boxShadow: 'none',
                mb: 6,
                '&:hover': {
                  backgroundColor: COLORS.PRIMARY,
                  opacity: 0.9,
                  boxShadow: 'none'
                }
              }}
            >
              Download QR Code
            </Button>

            {/* POWERED BY UPI Branding */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '10px', color: '#8c8c8c', fontWeight: 700, mb: 0.5, letterSpacing: '0.5px' }}>
                POWERED BY
              </Typography>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" 
                alt="UPI Logo" 
                style={{ height: 32, objectFit: 'contain' }} 
              />
            </Box>
          </Box>
        ) : (
          /* Dynamic QR Flow */
          isGenerated && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              animation: 'fadeIn 0.4s ease-out',
              width: '100%',
              maxWidth: '380px',
              border: '1px solid #f0f0f0',
              p: 4,
              pb: 6
            }}>
              {/* Dynamic Amount Header */}
              <Box sx={{ textAlign: 'center', mb: 5 }}>
                <Typography sx={{ fontSize: '15px', color: '#595959', fontWeight: 500, mb: 0.5 }}>
                  Amount to be Collected
                </Typography>
                <Typography sx={{ fontSize: '26px', color: COLORS.PRIMARY, fontWeight: 700 }}>
                  ₹ {amount}
                </Typography>
              </Box>

              {/* User Info Row */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3.5 }}>
                <Box sx={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#d9d9d9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} color="#fff" />
                </Box>
                <Typography sx={{ color: '#1a1a1a', fontSize: '15px', fontWeight: 600, textTransform: 'uppercase' }}>
                  MYMUBI FOOD COURT
                </Typography>
              </Box>

              {/* QR Code Placeholder */}
              <Box sx={{ 
                width: '260px', 
                height: '260px', 
                mb: 3,
                p: 1,
                backgroundColor: '#fff',
                backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }} />

              {/* UPI ID */}
              <Typography sx={{ color: '#1a1a1a', fontSize: '13px', fontWeight: 500, mb: 5 }}>
                UPI ID : 9952785870m@pnb
              </Typography>

              {/* Footer Section */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: COLORS.PRIMARY, fontSize: '15px', fontWeight: 600, mb: 5 }}>
                  Valid till {validUntil}
                </Typography>

                {/* POWERED BY UPI Branding */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '10px', color: '#8c8c8c', fontWeight: 700, mb: 0.5, letterSpacing: '0.5px' }}>
                    POWERED BY
                  </Typography>
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" 
                    alt="UPI Logo" 
                    style={{ height: 32, objectFit: 'contain' }} 
                  />
                </Box>
              </Box>
            </Box>
          )
        )}
      </Box>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
}
