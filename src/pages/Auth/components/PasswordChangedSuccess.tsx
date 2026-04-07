import { Box, Button, Typography } from '@mui/material';
import { COLORS } from '../../../theme/color';

interface PasswordChangedSuccessProps {
  onContinue: () => void;
}

export default function PasswordChangedSuccess({ onContinue }: PasswordChangedSuccessProps) {
  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Typography variant="h5" fontWeight="700" sx={{ mb: 3, color: '#1a1a1a' }}>
        Password Changed Successfully!
      </Typography>

      <Typography variant="body2" sx={{ mb: 4, color: '#666', lineHeight: 1.6, px: 2 }}>
        The password has been changed successfully, you can now login with the new password
      </Typography>

      <Button
        fullWidth
        variant="contained"
        onClick={onContinue}
        sx={{
          borderRadius: 0,
          py: 1.2,
          fontWeight: 600,
          textTransform: 'none',
          backgroundColor: COLORS.PRIMARY,
          '&:hover': { backgroundColor: COLORS.PRIMARY, opacity: 0.9 }
        }}
      >
        Continue to Login
      </Button>
    </Box>
  );
}
