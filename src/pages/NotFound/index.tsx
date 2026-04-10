import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../theme/color';
import logo from '../../assets/logo.png';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      textAlign: 'center'
    }}>
      <Container maxWidth="sm">
        {/* PNB Branding */}
        <Box sx={{ mb: 6 }}>
          <img src={logo} alt="PNB Logo" style={{ height: 48, objectFit: 'contain' }} />
        </Box>

        <Box sx={{ position: 'relative', mb: 2 }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '80px', md: '120px' }, 
              fontWeight: 800, 
              color: COLORS.PRIMARY, 
              opacity: 0.08, 
              lineHeight: 1,
              userSelect: 'none'
            }}
          >
            404
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              color: '#1a1a1a', 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -10%)',
              width: '100%',
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Oops! Page Not Found
          </Typography>
        </Box>
        
        <Typography sx={{ color: '#595959', mb: 5, maxWidth: '400px', mx: 'auto', fontSize: '1rem', lineHeight: 1.6 }}>
          The page you are looking for doesn't exist or has been moved. Check the URL or navigate back to safety.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          sx={{
            backgroundColor: COLORS.PRIMARY,
            color: '#fff',
            px: 5,
            py: 1.5,
            borderRadius: '4px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: COLORS.PRIMARY,
              opacity: 0.9,
              boxShadow: 'none'
            }
          }}
        >
          Back to Dashboard
        </Button>
      </Container>
    </Box>
  );
}
