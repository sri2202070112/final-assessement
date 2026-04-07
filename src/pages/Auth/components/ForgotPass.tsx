import { Box, Button, Typography, OutlinedInput } from '@mui/material';
import { COLORS } from '../../../theme/color';

interface ForgotPassProps {
  onBackToLogin: () => void;
  onContinue: () => void;
}

export default function ForgotPass({ onBackToLogin, onContinue }: ForgotPassProps) {
  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Typography variant="h5" fontWeight="700" sx={{ mb: 2, color: '#1a1a1a' }}>
        Forgot Password
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#666', lineHeight: 1.5, px: 2 }}>
        Lost your password? No problem, Enter your User Name, and we'll help you reset it.
      </Typography>

      <Box sx={{ width: '100%', mb: 3, textAlign: 'left' }}>
        <Typography variant="caption" sx={{ mb: 0.5, display: 'block', color: '#666', fontWeight: 600 }}>
          User Name
        </Typography>
        <OutlinedInput
          fullWidth
          placeholder="Please enter your User Name"
          size="small"
          sx={{
            borderRadius: 0,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e4e4e4' }
          }}
        />
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={onContinue}
        sx={{
          borderRadius: 0,
          mb: 2,
          py: 1.2,
          fontWeight: 600,
          textTransform: 'none',
          backgroundColor: COLORS.PRIMARY,
          '&:hover': { backgroundColor: COLORS.PRIMARY, opacity: 0.9 }
        }}
      >
        Continue
      </Button>

      <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
        Remember Password?{' '}
        <Typography
          component="span"
          onClick={onBackToLogin}
          sx={{ color: COLORS.PRIMARY, cursor: 'pointer', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
        >
          Log In
        </Typography>
      </Typography>
    </Box>
  );
}
