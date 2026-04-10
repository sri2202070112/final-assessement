import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { COLORS } from '../../theme/color';
import logo from '../../assets/logo.png';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', 
        backgroundColor: '#F8F9FA',
        textAlign: 'center',
        p: 3
      }}
    >
      <Box 
        sx={{ 
          backgroundColor: '#fff', 
          p: 6, 
          borderRadius: '2px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
          maxWidth: '500px',
          width: '100%'
        }}
      >
        <img src={logo} alt="PNB Logo" style={{ height: 48, marginBottom: 32 }} />
        
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: '5rem', 
            fontWeight: 700, 
            color: COLORS.PRIMARY,
            lineHeight: 1,
            mb: 1
          }}
        >
          404
        </Typography>
        
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600, 
            color: '#1a1a1a', 
            mb: 1.5 
          }}
        >
          Page Not Found
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666', 
            mb: 4,
            fontSize: '0.9rem'
          }}
        >
          The page you are looking for might have been removed or is temporarily unavailable.
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<HomeOutlined />}
          onClick={() => navigate('/dashboard')}
          sx={{
            backgroundColor: COLORS.PRIMARY,
            textTransform: 'none',
            px: 4,
            py: 1,
            borderRadius: '2px',
            fontSize: '0.85rem',
            fontWeight: 500,
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
      </Box>
    </Box>
  );
}
