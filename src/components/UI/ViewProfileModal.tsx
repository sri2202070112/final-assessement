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
  Grid,
} from '@mui/material';
import { COLORS } from '../../theme/color';
import { store } from '../../utils/store';

interface ViewProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ViewProfileModal({ open, onClose }: ViewProfileModalProps) {
  const user = store.getUserDetails();

  const profileData = {
    basic: [
      { label: 'Name', value: user?.beneficiary_name || user?.merchant_name || 'N/A' },
      { label: 'Phone', value: user?.mobile_number || 'N/A' },
    ],
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
          width: '320px',
          maxHeight: '92vh',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '4px',
          backgroundColor: '#FFFFFF',
          boxShadow: `
            0px 9px 28px 8px rgba(0, 0, 0, 0.05),
            0px 6px 16px 0px rgba(0, 0, 0, 0.12),
            0px 3px 6px -4px rgba(0, 0, 0, 0.16)
          `,
          m: 0
        }
      }}
    >
      <DialogTitle sx={{ 
        fontWeight: 700, 
        fontSize: '0.9rem', 
        color: '#1a1a1a', 
        px: 2.5,
        py: 1.2,
        backgroundColor: '#fff',
        flexShrink: 0
      }}>
        View Profile Details
      </DialogTitle>
      <Divider sx={{ borderColor: '#f5f5f5' }} />
      <DialogContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>

        {/* Basic Information Section */}
        <Box
          sx={{
            border: '1px solid #f0f0f0',
            borderRadius: '4px',
            backgroundColor: '#fff'
          }}
        >
          <Box sx={{ px: 2, py: 0.8, borderBottom: '1px solid #f5f5f5' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333', fontSize: '0.8rem' }}>
              Basic Information
            </Typography>
          </Box>
          <Box sx={{ p: '12px 16px 20px 16px' }}>
            {profileData.basic.map((item) => (
              <InfoRow key={item.label} label={item.label} value={item.value} />
            ))}
          </Box>
        </Box>

        {/* Device Information Section */}
        <Box
          sx={{
            border: '1px solid #f0f0f0',
            borderRadius: '4px',
            backgroundColor: '#fff'
          }}
        >
          <Box sx={{ px: 2, py: 0.8, borderBottom: '1px solid #f5f5f5' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333', fontSize: '0.8rem' }}>
              Device Information
            </Typography>
          </Box>
          <Box sx={{ p: '12px 16px 20px 16px' }}>
            {profileData.device.map((item) => (
              <InfoRow key={item.label} label={item.label} value={item.value} />
            ))}
          </Box>
        </Box>

      </DialogContent>
      <Divider sx={{ borderColor: '#f0f0f0' }} />
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
            '&:hover': {
              backgroundColor: '#7A122E'
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
