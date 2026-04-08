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

interface ViewProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ViewProfileModal({ open, onClose }: ViewProfileModalProps) {
  const profileData = {
    basic: [
      { label: 'Name', value: 'Stebin Ben' },
      { label: 'Phone', value: '+91 9398239231' },
    ],
    device: [
      { label: 'Device Serial Number', value: '456954659876857' },
      { label: 'Linked Account Number', value: 'XXXXXX6857' },
      { label: 'UPI ID', value: 'rudransh.panigrahi@pnb' },
      { label: 'IFSC Code', value: 'PUNB028386' },
      { label: 'Device Model Name', value: 'Morefun ET389' },
      { label: 'Device Mobile Number', value: '+91 9398239231' },
      { label: 'Network Type', value: 'BSNL' },
      { label: 'Device Status', value: 'Active' },
      { label: 'Battery Percentage', value: '60%' },
      { label: 'Network Strength', value: 'Strong' },
    ],
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, '&:last-child': { mb: 0 } }}>
      <Typography variant="body2" sx={{ color: '#888', flex: 1 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, flex: 1.2 }}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: '4px',
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: '1rem', color: '#1a1a1a', py: 2.5, px: 3 }}>
        View Profile Details
      </DialogTitle>
      <Divider sx={{ borderColor: '#f0f0f0' }} />
      <DialogContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>

        {/* Basic Information Section */}
        <Box
          sx={{
            border: '1px solid #f0f0f0',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ backgroundColor: '#fff', px: 2, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
              Basic Information
            </Typography>
          </Box>
          <Box sx={{ p: 2, backgroundColor: '#fff' }}>
            {profileData.basic.map((item, idx) => (
              <InfoRow key={idx} label={item.label} value={item.value} />
            ))}
          </Box>
        </Box>

        {/* Device Information Section */}
        <Box
          sx={{
            border: '1px solid #f0f0f0',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ backgroundColor: '#fff', px: 2, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
              Device Information
            </Typography>
          </Box>
          <Box sx={{ p: 2, backgroundColor: '#fff' }}>
            {profileData.device.map((item, idx) => (
              <InfoRow key={idx} label={item.label} value={item.value} />
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
