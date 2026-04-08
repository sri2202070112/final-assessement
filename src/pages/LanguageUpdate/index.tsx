import { Box, Typography, Paper, TextField, MenuItem, Select, Button, Grid } from '@mui/material';
import { useState } from 'react';
import { COLORS } from '../../theme/color';

export default function LanguageUpdate() {
  const [targetLanguage, setTargetLanguage] = useState('');

  return (
    <Box sx={{ p: '24px 32px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#262626', mb: 3 }}>
        Language Update
      </Typography>

      <Paper 
        elevation={0} 
        sx={{ 
          p: '32px 24px', 
          borderRadius: '4px', 
          border: '1px solid #f0f0f0',
          backgroundColor: '#fff',
          maxWidth: '100%'
        }}
      >
        <Grid container spacing={2}>
          {/* Main Row with 4 inputs */}
          {/* <Grid item xs={12} sm={6} md={3}> */}
          <Grid size={{xs:12,sm:6,md:6}}>
            <Box>
              <Typography sx={{ color: '#8c8c8c', fontSize: '0.8rem', mb: 1, fontWeight: 500 }}>
                VPA ID
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="3456789pabaitra@pnb"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 44,
                    backgroundColor: '#fafafa',
                    borderRadius: '2px',
                    '& fieldset': { borderColor: '#d9d9d9' },
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#595959',
                    fontSize: '0.85rem'
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid size={{xs:12,sm:6,md:6}}>
            <Box>
              <Typography sx={{ color: '#8c8c8c', fontSize: '0.8rem', mb: 1, fontWeight: 500 }}>
                Device Serial Number
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="9003567823456"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 44,
                    backgroundColor: '#fafafa',
                    borderRadius: '2px',
                    '& fieldset': { borderColor: '#d9d9d9' },
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#595959',
                    fontSize: '0.85rem'
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid size={{xs:12,sm:6,md:6}}>
            <Box>
              <Typography sx={{ color: '#8c8c8c', fontSize: '0.8rem', mb: 1, fontWeight: 500 }}>
                Current Language
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="Odia"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 44,
                    backgroundColor: '#fafafa',
                    borderRadius: '2px',
                    '& fieldset': { borderColor: '#d9d9d9' },
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#595959',
                    fontSize: '0.85rem'
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid size={{xs:12,sm:6,md:6}}>
            <Box>
              <Typography sx={{ color: '#8c8c8c', fontSize: '0.8rem', mb: 1, fontWeight: 500 }}>
                Language Update
              </Typography>
              <Select
                fullWidth
                displayEmpty
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                sx={{
                  height: 44,
                  backgroundColor: '#fff',
                  fontSize: '0.85rem',
                  borderRadius: '2px',
                  color: targetLanguage ? '#262626' : '#bfbfbf',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d9d9d9' },
                  '& .MuiSelect-select': { py: 0 }
                }}
              >
                <MenuItem value="" disabled>
                  <Typography sx={{ color: '#bfbfbf', fontSize: '0.85rem' }}>Select Language Update</Typography>
                </MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Hindi">Hindi</MenuItem>
                <MenuItem value="Bengali">Bengali</MenuItem>
              </Select>
            </Box>
          </Grid>

          {/* Action Row - Left Aligned */}
          <Grid size={{xs:12}}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 4, mt: 3 }}>
              <Button 
                variant="text" 
                sx={{ 
                  color: '#f5222d', 
                  textTransform: 'none', 
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  '&:hover': { backgroundColor: 'transparent' }
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                disableElevation
                sx={{ 
                  backgroundColor: COLORS.PRIMARY, 
                  color: '#fff', 
                  textTransform: 'none',
                  px: 4,
                  py: 1.2,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderRadius: '4px',
                  '&:hover': { backgroundColor: '#8B1434' }
                }}
              >
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
