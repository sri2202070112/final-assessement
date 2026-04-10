import { Box, Typography, Container, Paper } from '@mui/material';
import { QuestionCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { COLORS } from '../../theme/color';

export default function HelpSupport() {
  return (
    <Box 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        p: 3 
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: '16px',
            border: '1px solid #f0f0f0',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
          }}
        >
          <Box 
            sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              backgroundColor: '#F9F1F3', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 24px',
              animation: 'pulse 2s infinite ease-in-out'
            }}
          >
            <QuestionCircleOutlined style={{ fontSize: '40px', color: COLORS.PRIMARY }} />
          </Box>
          
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#262626', mb: 1 }}>
            Coming Soon
          </Typography>
          
          <Typography variant="body1" sx={{ color: '#8c8c8c', mb: 4, maxWidth: '300px', margin: '0 auto 32px' }}>
            We are working hard to bring you a comprehensive Help & Support experience. Stay tuned!
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: 1.5,
              color: COLORS.PRIMARY,
              fontWeight: 500,
              fontSize: '0.9rem'
            }}
          >
            <ClockCircleOutlined />
            <span>Under Development</span>
          </Box>
        </Paper>
      </Container>
      
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(158, 23, 59, 0.2); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(158, 23, 59, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(158, 23, 59, 0); }
          }
        `}
      </style>
    </Box>
  );
}
