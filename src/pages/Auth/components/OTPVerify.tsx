import { Box, Button, Typography, OutlinedInput, Stack } from '@mui/material';
import { COLORS } from '../../../theme/color';

interface OTPVerifyProps {
  title: string;
  description: string;
  onContinue: () => void;
}

export default function OTPVerify({ title, description, onContinue }: OTPVerifyProps) {
  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Typography variant="h5" fontWeight="700" sx={{ mb: 2, color: '#1a1a1a' }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#666', lineHeight: 1.5 }}>
        {description}
      </Typography>

      <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mb: 3.5 }}>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <OutlinedInput
            key={index}
            size="small"
            placeholder="9"
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center', fontWeight: 'bold', padding: '8px 0' }
            }}
            sx={{
              width: 45,
              height: 45,
              borderRadius: '4px',
              borderColor: '#e4e4e4',
              '& .MuiOutlinedInput-input': { color: '#ccc' }
            }}
          />
        ))}
      </Stack>

      <Button
        fullWidth
        variant="contained"
        onClick={onContinue}
        sx={{
          borderRadius: 0,
          mb: 2.5,
          py: 1.2,
          fontWeight: 600,
          textTransform: 'none',
          backgroundColor: COLORS.PRIMARY,
          '&:hover': { backgroundColor: COLORS.PRIMARY, opacity: 0.9 }
        }}
      >
        Continue
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
        <Typography variant="body2" sx={{ color: '#333', fontSize: '0.75rem' }}>
          Didn't receive the Code ?
        </Typography>
        <Typography
          sx={{ color: '#1890ff', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}
        >
          Resend code
        </Typography>
      </Box>
    </Box>
  );
}
