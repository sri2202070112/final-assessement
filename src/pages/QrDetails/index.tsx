import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { DownloadOutlined, PrinterOutlined, QrcodeOutlined } from '@ant-design/icons';

export default function QrDetails() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        QR Details
      </Typography>

      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 5, textAlign: 'center', boxShadow: '0 2px 14px 0 rgba(32, 40, 45, 0.08)', borderRadius: 4 }}>
            <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
              Your Merchant QR Code
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
              Scan to make seamless payments directly to your account.
            </Typography>

            <Box 
              sx={{ 
                border: '4px solid #f0f0f0', 
                borderRadius: 2, 
                display: 'inline-flex', 
                p: 3, 
                mb: 4,
                backgroundColor: 'white'
              }}
            >
              {/* Using a massive icon as a placeholder for an actual QR code image component */}
              <QrcodeOutlined style={{ fontSize: '200px', color: '#1f1f1f' }} />
            </Box>

            <Typography variant="h6" fontWeight="bold">
              Terminal ID: TRM-89234
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
              PNB Merchant Services
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button 
                variant="outlined" 
                startIcon={<PrinterOutlined />} 
                size="large"
                sx={{ px: 4 }}
              >
                Print
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<DownloadOutlined />} 
                size="large"
                sx={{ px: 4 }}
              >
                Download
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
