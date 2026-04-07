import { Box, Button, Typography } from '@mui/material';
import { COLORS } from '../../../theme/color';

interface VerificationSuccessProps {
  onLogin: () => void;
}

export default function VerificationSuccess({ onLogin }: VerificationSuccessProps) {
  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Typography variant="h5" fontWeight="700" sx={{ mb: 3, color: '#1a1a1a' }}>
        Verification Success!
      </Typography>

      <Typography variant="body2" sx={{ mb: 4, color: '#666', lineHeight: 1.6, px: 2 }}>
        Your username has been successfully verified. You'll receive your login credentials via registered Mobile Number.
        The login credentials will be shared with you in your mobile number.
      </Typography>

      <Button
        fullWidth
        variant="contained"
        onClick={onLogin}
        sx={{
          borderRadius: 0,
          py: 1.2,
          fontWeight: 600,
          textTransform: 'none',
          backgroundColor: COLORS.PRIMARY,
          '&:hover': { backgroundColor: COLORS.PRIMARY, opacity: 0.9 }
        }}
      >
        Login
      </Button>
    </Box>
  );
}
