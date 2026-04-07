import {
  Box,
  Button,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import { COLORS } from '../../../theme/color';

interface LoginInitialProps {
  onForgot: () => void;
}

export default function LoginInitial({ onForgot }: LoginInitialProps) {
  return (
    <>
      <Typography variant="h6" fontWeight="700" sx={{ mb: 2.5, color: '#1a1a1a', fontSize: '1.1rem' }}>
        Login to your Account
      </Typography>

      <Box sx={{ width: '100%', mb: 1.5 }}>
        <Typography variant="caption" sx={{ mb: 0.5, display: 'block', color: '#666', fontWeight: 600 }}>
          Username
        </Typography>
        <OutlinedInput
          fullWidth
          placeholder="Enter your Username"
          size="small"
          sx={{
            borderRadius: 0,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e4e4e4' }
          }}
        />
      </Box>

      <Box sx={{ width: '100%', mb: 2 }}>
        <Typography variant="caption" sx={{ mb: 0.5, display: 'block', color: '#666', fontWeight: 600 }}>
          Password
        </Typography>
        <OutlinedInput
          fullWidth
          placeholder="Enter your password"
          type="password"
          size="small"
          sx={{
            borderRadius: 0,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e4e4e4' }
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" size="small">
                <EyeInvisibleOutlined style={{ fontSize: '0.85rem', color: '#aaa' }} />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        href="/dashboard"
        sx={{
          borderRadius: 0,
          mt: 0.5,
          mb: 1.5,
          py: 1,
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '0.85rem',
          backgroundColor: COLORS.PRIMARY,
          '&:hover': { backgroundColor: COLORS.PRIMARY, opacity: 0.9 }
        }}
      >
        Login
      </Button>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
        <FormControlLabel
          control={<Checkbox size="small" sx={{ color: '#eee', '&.Mui-checked': { color: COLORS.PRIMARY } }} />}
          label={<Typography variant="body2" sx={{ fontWeight: 400, color: '#555', fontSize: '0.7rem' }}>Remember Me</Typography>}
          sx={{ m: 0 }}
        />
        <Typography
          variant="body2"
          onClick={onForgot}
          sx={{
            fontWeight: 400,
            color: COLORS.PRIMARY,
            cursor: 'pointer',
            fontSize: '0.7rem',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Forgot Password?
        </Typography>
      </Box>
    </>
  );
}
