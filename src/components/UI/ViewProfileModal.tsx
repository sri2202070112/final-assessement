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
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8, '&:last-child': { mb: 0 } }}>
      <Typography variant="body2" sx={{ color: '#9da5b1', flex: 1, fontSize: '0.75rem' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, flex: 1.2, fontSize: '0.75rem' }}>
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
          width: '400px',
          maxHeight: '90vh',
          position: 'fixed',
          top: '53%',
          left: '53.5%',
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
            overflow: 'hidden',
            backgroundColor: '#fff'
          }}
        >
          <Box sx={{ px: 2, py: 0.8, borderBottom: '1px solid #f5f5f5' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333', fontSize: '0.8rem' }}>
              Basic Information
            </Typography>
          </Box>
          <Box sx={{ p: 1.5 }}>
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
            overflow: 'hidden',
            backgroundColor: '#fff'
          }}
        >
          <Box sx={{ px: 2, py: 0.8, borderBottom: '1px solid #f5f5f5' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333', fontSize: '0.8rem' }}>
              Device Information
            </Typography>
          </Box>
          <Box sx={{ p: 1.5 }}>
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
