import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import { Box, Paper, Typography, CircularProgress, Button } from '@mui/material';
import { COLORS } from '../../theme/color';

function CallbackPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [auth.isAuthenticated, navigate]);

  const renderLayout = (content: React.ReactNode) => (
    <Box sx={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fc',
      overflow: 'hidden'
    }}>
      {/* Floating Blur Graphic on the Left - Restored to match Auth.tsx */}
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
          <Box sx={{ mb: 4 }}>
            <img src="/src/assets/logo.png" alt="PNB Logo" style={{ height: 42, objectFit: 'contain' }} />
          </Box>
          {content}
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

  if (auth.error) {
    return renderLayout(
      <>
        <Typography variant="h6" sx={{ color: '#f44336', mb: 2, fontWeight: 700, fontSize: '1.1rem', textAlign: 'center', width: '100%' }}>
          Authentication Error
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mb: 3, textAlign: 'center', fontSize: '0.85rem' }}>
          {auth.error.message}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{
            backgroundColor: COLORS.PRIMARY,
            borderRadius: 0,
            py: 1,
            textTransform: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            '&:hover': { backgroundColor: COLORS.PRIMARY, opacity: 0.9 }
          }}
        >
          Back to Login
        </Button>
      </>
    );
  }

  return renderLayout(
    <>
      <CircularProgress 
        size={32} 
        sx={{ 
          color: COLORS.PRIMARY,
          mb: 4 
        }} 
      />
      <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 700, mb: 1, fontSize: '1.1rem', textAlign: 'center', width: '100%' }}>
        Verifying Authentication
      </Typography>
      <Typography variant="body2" sx={{ color: '#8c8c8c', textAlign: 'center', fontSize: '0.85rem' }}>
        Please wait while we securely process your login...
      </Typography>
    </>
  );
}

export default CallbackPage;