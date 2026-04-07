import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import {
  LoginInitial,
  ForgotPass,
  OTPVerify,
  VerificationSuccess,
  ChangePassword,
  PasswordChangedSuccess
} from './components';

type Step = 'login' | 'forgot' | 'otp' | 'success' | 'change-password' | 'verification-final' | 'success-final';

export default function Login() {
  const [step, setStep] = useState<Step>('login');

  const renderContent = () => {
    switch (step) {
      case 'login':
        return <LoginInitial onForgot={() => setStep('forgot')} />;
      case 'forgot':
        return <ForgotPass onBackToLogin={() => setStep('login')} onContinue={() => setStep('otp')} />;
      case 'otp':
        return <OTPVerify title="Verification Code" description="Verification code sent to your registered mobile number" onContinue={() => setStep('success')} />;
      case 'success':
        return <VerificationSuccess onLogin={() => setStep('change-password')} />;
      case 'change-password':
        return <ChangePassword onUpdate={() => setStep('verification-final')} />;
      case 'verification-final':
        return <OTPVerify title="Verification Code" description="Verification code sent to your registered mobile number" onContinue={() => setStep('success-final')} />;
      case 'success-final':
        return <PasswordChangedSuccess onContinue={() => setStep('login')} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fc'
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
          <Box sx={{ mb: 4 }}>
            <img src="/src/assets/logo.png" alt="PNB Logo" style={{ height: 42, objectFit: 'contain' }} />
          </Box>

          {renderContent()}
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



