import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { COLORS } from '../../theme/color';
import { store } from '../../utils/store';

// This is the component for the popup that shows the merchant's profile details
interface ViewProfileModalProps {
  open: boolean; // This tells the modal if it should be open or closed
  onClose: () => void; // This is the function that runs when the user clicks 'Close'
}

export default function ViewProfileModal({ open, onClose }: ViewProfileModalProps) {
  // We get the merchant's details from our global store
  const user = store.getUserDetails();

  // This is a list of all the information we want to show in the popup
  const profileData = {
    // Basic stuff like Name and Phone
    basic: [
      { label: 'Name', value: user?.beneficiary_name || user?.merchant_name || 'N/A' },
      { label: 'Phone', value: user?.mobile_number || 'N/A' },
    ],
    // Technical stuff about the merchant's payment device
    device: [
      { label: 'Device Serial Number', value: user?.serial_number || user?.terminal_serial_number || 'N/A' },
      { label: 'Linked Account Number', value: user?.account_number ? `XXXXXX${user.account_number.slice(-4)}` : 'N/A' },
      { label: 'UPI ID', value: user?.vpa_id || 'N/A' },
      { label: 'IFSC Code', value: user?.ifsc || user?.ifsc_code || 'N/A' },
      { label: 'Device Model Name', value: user?.model_name || 'Morefun ET389' },
      { label: 'Device Mobile Number', value: user?.mobile_number || 'N/A' },
      { label: 'Network Type', value: user?.network_type || 'N/A' },
      { label: 'Device Status', value: user?.status || 'Active' },
      { label: 'Battery Percentage', value: user?.battery_percentage || 'N/A' },
      { label: 'Network Strength', value: user?.network_strength || 'N/A' },
    ],
  };

  // This internal helper component draws a single row of information (Label on left, Value on right)
  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2, '&:last-child': { mb: 0 } }}>
      <Typography variant="body2" sx={{ color: '#9da5b1', flex: 1.5, fontSize: '0.75rem' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, flex: 2, fontSize: '0.75rem', textAlign: 'right' }}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      PaperProps={{
        sx: {
          width: '320px', // We make the box slim and vertical
          maxHeight: '92vh', // Don't let it be taller than the screen
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', // This keeps it perfectly centered
          borderRadius: '4px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 9px 28px 8px rgba(0, 0, 0, 0.05)', // Adds a soft shadow around the box
        }
      }}
    >
      {/* The Title at the top of the popup */}
      <DialogTitle sx={{ 
        fontWeight: 700, 
        fontSize: '0.9rem', 
        color: '#1a1a1a', 
        px: 2.5,
        py: 1.2,
      }}>
        View Profile Details
      </DialogTitle>
      
      {/* A thin line separator */}
      <Divider sx={{ borderColor: '#f5f5f5' }} />

      <DialogContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>

        {/* This white box contains "Basic Information" */}
        <Box sx={{ border: '1px solid #f0f0f0', borderRadius: '4px', backgroundColor: '#fff' }}>
          <Box sx={{ px: 2, py: 0.8, borderBottom: '1px solid #f5f5f5' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333', fontSize: '0.8rem' }}>
              Basic Information
            </Typography>
          </Box>
          <Box sx={{ p: '12px 16px 20px 16px' }}>
            {/* Show each basic info row one by one */}
            {profileData.basic.map((item) => (
              <InfoRow key={item.label} label={item.label} value={item.value} />
            ))}
          </Box>
        </Box>

        {/* This white box contains "Device Information" */}
        <Box sx={{ border: '1px solid #f0f0f0', borderRadius: '4px', backgroundColor: '#fff' }}>
          <Box sx={{ px: 2, py: 0.8, borderBottom: '1px solid #f5f5f5' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333', fontSize: '0.8rem' }}>
              Device Information
            </Typography>
          </Box>
          <Box sx={{ p: '12px 16px 20px 16px' }}>
            {/* Show each device info row one by one */}
            {profileData.device.map((item) => (
              <InfoRow key={item.label} label={item.label} value={item.value} />
            ))}
          </Box>
        </Box>

      </DialogContent>

      <Divider sx={{ borderColor: '#f0f0f0' }} />

      {/* The 'Close' button at the very bottom */}
      <DialogActions sx={{ p: 3 }}>
        <Button
          variant="contained"
          onClick={onClose}
          disableElevation
          sx={{
            backgroundColor: COLORS.PRIMARY,
            color: '#fff',
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
            borderRadius: '4px',
            px: 3,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
