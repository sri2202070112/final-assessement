import {
  Box,
  Button,
  Typography,
  Paper,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import { COLORS } from '../../theme/color';

export default function Login() {
  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fc' // Light background
    }}>
      {/* Floating Blur Graphic on the Left */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: -200,
          bottom: 0,
          width: { xs: '100%', md: '45%' }, // Reserve the left half
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Center the blur graphic inside this half
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden' // Prevent any blur bleed outside the container
        }}
      >
        <img
          src="/src/assets/blurbg.png"
          alt="blur background"
          style={{
            width: '85%', // Reduce size relative to the container
            maxWidth: '600px',
            objectFit: 'contain',
            filter: 'blur(20px)', // Reduced from 40px to keep shapes recognizable
            opacity: 0.9,
          }}
        />
      </Box>

      {/* Main Content Area */}
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        p: 2
      }}>
        <Paper
          elevation={0}
          sx={{
            p: 3, // Uniform compact padding
            width: '100%',
            maxWidth: 400,
            borderRadius: 0, // Square corners
            boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #f0f0f0',
            transform: 'translateY(20px)' // Shifted slightly down
          }}
        >
          {/* Logo */}
          <Box sx={{ mb: 2 }}>
            <img src="/src/assets/logo.png" alt="PNB Logo" style={{ height: 40, objectFit: 'contain' }} />
          </Box>

          {/* Heading */}
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2.5, color: '#1a1a1a', fontSize: '1.1rem' }}>
            Login to your Account
          </Typography>

          {/* Username Field */}
          <Box sx={{ width: '100%', mb: 1.5 }}>
            <Typography variant="caption" sx={{ mb: 0.5, display: 'block', color: '#666', fontWeight: 600 }}>
              Username
            </Typography>
            <OutlinedInput
              fullWidth
              placeholder="Enter your Username"
              size="small"
              sx={{ 
                borderRadius: 0, // Square corners
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e4e4e4' } 
              }}
            />
          </Box>

          {/* Password Field */}
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
                borderRadius: 0, // Square corners
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

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            href="/dashboard"
            sx={{
              borderRadius: 0, // Square corners
              mt: 0.5,
              mb: 1.5,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.85rem'
            }}
          >
            Login
          </Button>

          {/* Remember Me & Forgot Password */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
            <FormControlLabel
              control={<Checkbox size="small" sx={{ color: '#eee', '&.Mui-checked': { color: COLORS.PRIMARY } }} />}
              label={<Typography variant="body2" sx={{ fontWeight: 400, color: '#555', fontSize: '0.7rem' }}>Remember Me</Typography>}
              sx={{ m: 0 }}
            />
            <Typography
              variant="body2"
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
        </Paper>
      </Box>

      {/* Footer */}
      <Box sx={{
        pb: 4,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        gap: { xs: 2, sm: 4 },
        flexWrap: 'wrap'
      }}>
        <Typography variant="caption" sx={{ color: '#999', cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#666' } }}>
          Terms and Conditions
        </Typography>
        <Typography variant="caption" sx={{ color: '#999', cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#666' } }}>
          Privacy Policy
        </Typography>
        <Typography variant="caption" sx={{ color: '#999', cursor: 'pointer', '&:hover': { color: '#666' } }}>
          CA Privacy Notice
        </Typography>
      </Box>
    </Box>
  );
}
