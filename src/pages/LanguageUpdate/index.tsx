import { Box, Typography, Paper, FormControl, Select, MenuItem, InputLabel, Button } from '@mui/material';
import { useState } from 'react';
import { SaveOutlined } from '@ant-design/icons';

export default function LanguageUpdate() {
  const [language, setLanguage] = useState('en');

  const handleChange = (event: any) => {
    setLanguage(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        Language Update
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 600, boxShadow: '0 2px 14px 0 rgba(32, 40, 45, 0.08)' }}>
        <Typography variant="h6" gutterBottom>
          Select System Language
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
          Choose your preferred language for the merchant portal interface. This will update immediately upon saving.
        </Typography>

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            label="Language"
            onChange={handleChange}
          >
            <MenuItem value="en">English (US)</MenuItem>
            <MenuItem value="hi">हिंदी (Hindi)</MenuItem>
            <MenuItem value="bn">বাংলা (Bengali)</MenuItem>
            <MenuItem value="te">తెలుగు (Telugu)</MenuItem>
            <MenuItem value="mr">मराठी (Marathi)</MenuItem>
            <MenuItem value="ta">தமிழ் (Tamil)</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<SaveOutlined />}
            size="large"
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
