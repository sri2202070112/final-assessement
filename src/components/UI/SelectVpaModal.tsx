import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { COLORS } from '../../theme/color';

interface SelectVpaModalProps {
  open: boolean;
  onClose: () => void;
  onProceed: (vpa: string) => void;
  vpas: string[];
  initialVpa?: string;
}

export default function SelectVpaModal({ open, onClose, onProceed, vpas, initialVpa }: SelectVpaModalProps) {
  const [selectedVpa, setSelectedVpa] = useState<string>(initialVpa || vpas[0] || '');

  useEffect(() => {
    if (initialVpa) {
      setSelectedVpa(initialVpa);
    }
  }, [initialVpa, open]);

  const handleProceed = () => {
    onProceed(selectedVpa);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: '4px',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: '1rem', color: '#1a1a1a', py: 2.5, px: 3 }}>
        Select VPA
      </DialogTitle>
      <Divider sx={{ borderColor: '#f0f0f0' }} />
      <DialogContent sx={{ p: 3 }}>
        <Typography variant="body2" sx={{ color: '#444', mb: 2 }}>
          Select a VPA to Proceed
        </Typography>
        <RadioGroup
          value={selectedVpa}
          onChange={(e) => setSelectedVpa(e.target.value)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
        >
          {vpas.map((vpa, index) => (
            <Box
              key={index}
              sx={{
                border: '1px solid #e8e8e8',
                borderRadius: '4px',
                px: 2,
                py: 0.5,
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s',
                backgroundColor: '#fff'
              }}
            >
              <FormControlLabel
                value={vpa}
                control={
                  <Radio 
                    size="medium"
                    sx={{
                      color: '#444',
                      '&.Mui-checked': {
                        color: COLORS.PRIMARY,
                      },
                      '& .MuiSvgIcon-root': {
                        fontSize: 24,
                      }
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#333', fontSize: '0.95rem' }}>
                    {vpa}
                  </Typography>
                }
                sx={{ m: 0, width: '100%' }}
              />
            </Box>
          ))}
        </RadioGroup>
      </DialogContent>
      <Divider sx={{ borderColor: '#f0f0f0' }} />
      <DialogActions sx={{ p: 3, pt: 2, pb: 2, pr: 3, pl: 3, justifyContent: 'flex-end', gap: 1 }}>
        <Button 
          onClick={onClose} 
          disableElevation
          sx={{ 
            color: '#ff6262', 
            textTransform: 'none', 
            fontWeight: 500,
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: 'transparent',
              color: COLORS.ERROR,
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleProceed}
          disableElevation
          sx={{ 
            backgroundColor: COLORS.PRIMARY,
            color: '#fff',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            borderRadius: '4px',
            px: 3,
            py: 1,
            '&:hover': {
              backgroundColor: '#7A122E'
            }
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}
