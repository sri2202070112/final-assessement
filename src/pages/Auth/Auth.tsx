import { useState } from 'react';
import { useAuth } from "react-oidc-context";
import { Navigate } from "react-router";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress
} from '@mui/material';
import { COLORS } from '../../theme/color';

export default function LoginPage() {
  const auth = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAuthentikLogin = async () => {
    setIsRedirecting(true);
    try {
      await auth.signinRedirect();
    } catch (error) {
      console.error("Authentik login failed:", error);
      setIsRedirecting(false);
    }
  };

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fc',
      overflow: 'hidden'
    }}>
      {/* Floating Blur Graphic on the Left */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: -200,
          bottom: 0,
          width: { xs: '100%', md: '45%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        <img
          src="/src/assets/blurbg.png"
          alt="blur background"
          style={{
            width: '85%',
            maxWidth: '600px',
            objectFit: 'contain',
            filter: 'blur(20px)',
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
            p: 4,
            width: '100%',
            maxWidth: 420,
            borderRadius: 0,
            boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #f0f0f0',
            backgroundColor: '#fff'
          }}
        >
          {/* Logo */}
          <Box sx={{ mb: 6 }}>
            <img src="/src/assets/logo.png" alt="PNB Logo" style={{ height: 42, objectFit: 'contain' }} />
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleAuthentikLogin}
            disabled={isRedirecting}
            sx={{
              borderRadius: 0,
              py: 1.5,
              mt: 2, // Added some top margin since the heading is gone
              mb: 2,
              textTransform: 'none',
              fontWeight: 600,
              backgroundColor: COLORS.PRIMARY,
              fontSize: '0.85rem',
              '&:hover': {
                backgroundColor: COLORS.PRIMARY,
                opacity: 0.9
              },
              '&.Mui-disabled': {
                backgroundColor: '#d9d9d9',
                color: '#8c8c8c'
              }
            }}
          >
            {isRedirecting ? <CircularProgress size={20} color="inherit" /> : 'Login Authentik'}
          </Button>

          {isRedirecting && (
            <Typography variant="caption" sx={{ color: '#8c8c8c', mt: 1 }}>
              Redirecting...
            </Typography>
          )}
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