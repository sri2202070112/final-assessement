import { Box, Typography, Paper, TextField, MenuItem, Select, Button, Grid, Dialog, DialogContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { COLORS } from '../../theme/color';
import { ENCRYPTION_KEY, FETCH_ALL_LANGUAGE, FETCH_CURRENT_LANGUAGE, PASS_KEY, UPDATE_LANGUAGE } from '../../config/config';
import { useAuth } from 'react-oidc-context';
import { decryptRequest, encryptResponse } from '../../utils/crypto';
import { store } from '../../utils/store';

// This function makes the first letter big and others small for language names (e.g. "HINDI" becomes "Hindi")
const formatLanguageName = (name: string) =>
  name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : '';

export default function LanguageUpdate() {
  // We keep the user's details like VPA and Serial number here
  const [userData, setUserData] = useState(store.getUserDetails());
  // This stores the language that the user wants to pick from the dropdown
  const [targetLanguage, setTargetLanguage] = useState('HINDI');
  // This tells us if the "Success" or "Result" popup should be visible or hidden
  const [openSuccess, setOpenSuccess] = useState(false);
  // This is the list of all languages we get from the server
  const [languages, setLanguages] = useState<string[]>([]);
  // This stores the language that is currently active on the device right now
  const [currentLanguage, setCurrentLanguage] = useState('');
  // This is the message we get back from the server after trying to update
  const [apiMessage, setApiMessage] = useState('');
  // This tells us if the update was actually successful or if it failed/is still going on
  const [isSuccess, setIsSuccess] = useState(true);
  // This helps us show a "Loading" state when we are waiting for the server
  const [isProcessing, setIsProcessing] = useState(false);

  // This part handles the login/security stuff
  const auth = useAuth();

  // This part watches for any changes in the user's data (like if they pick a different VPA on another page)
  useEffect(() => {
    const syncUser = () => setUserData(store.getUserDetails());
    window.addEventListener('storage', syncUser); // Look for storage changes
    return () => window.removeEventListener('storage', syncUser); // Clean up when leaving the page
  }, []);

  // Whenever the device serial number changes, we automatically fetch the language info for that device
  useEffect(() => {
    if (userData?.serial_number) {
      fetchLanguage(); // Get the list of languages
      fetchCurrentLanguage(); // Get the current active language
    }
  }, [userData?.serial_number]);

  // This function is called when the user clicks the "Update" button
  const handleUpdate = () => {
    updateLanguage();
  };

  // This function is called when the user clicks "Close" on the result popup
  const handleClose = () => {
    setOpenSuccess(false);
  };

  // This function talks to the server to find out what language the terminal is using right now
  const fetchCurrentLanguage = async () => {
    try {
      // We send a request to the server with the device's serial number
      const response = await fetch(`${FETCH_CURRENT_LANGUAGE}/${userData?.serial_number}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'Pass_key': PASS_KEY,
          'Authorization': auth.user?.access_token || '', // Needed for security
        }
      })
      const jsonResponse = await response.json();
      // If the server answered, we decrypt the secret data and update our page
      if (jsonResponse.ResponseData) {
        const decryptedData = decryptRequest(jsonResponse.ResponseData, ENCRYPTION_KEY);
        const parsedData = JSON.parse(decryptedData);
        if (parsedData.data) {
          const currentLang = Array.isArray(parsedData.data) ? parsedData.data[0] : parsedData.data;
          const formatted = formatLanguageName(String(currentLang));
          setCurrentLanguage(formatted); // Update the screen with the new name
        }
      }
    } catch (error) {
      console.log('Error getting current language:', error);
    }
  }

  // This function gets the full list of languages that the terminal can support
  const fetchLanguage = async () => {
    try {
      const response = await fetch(FETCH_ALL_LANGUAGE, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'Pass_key': PASS_KEY,
          'Authorization': auth.user?.access_token || '',
        }
      })
      const jsonResponse = await response.json();

      if (jsonResponse.ResponseData) {
        const decryptedData = decryptRequest(jsonResponse.ResponseData, ENCRYPTION_KEY);
        const parsedData = JSON.parse(decryptedData);
        if (Array.isArray(parsedData.data)) {
          setLanguages(parsedData.data); // Store the list of languages we found
        }
      }
    } catch (error) {
      console.log('Error getting language list:', error);
    }
  }

  // This function actually tells the server to change the language on the merchant's device
  const updateLanguage = async () => {
    try {
      setIsProcessing(true); // Show that we are working on it
      
      const rawPayload = {
        tid: userData?.serial_number, // Device serial number
        update_language: targetLanguage, // The language the user selected
      }
      
      // We encrypt the request for security
      const encryptedData = encryptResponse(JSON.stringify(rawPayload), ENCRYPTION_KEY);
      
      // Sending the update command to the server
      const response = await fetch(UPDATE_LANGUAGE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Pass_key': PASS_KEY,
          'Authorization': auth.user?.access_token || '',
        },
        body: JSON.stringify({
          RequestData: encryptedData
        }),
      });

      const jsonResponse = await response.json();

      setIsProcessing(false); // Done working

      if (jsonResponse.ResponseData) {
        const decryptedData = decryptRequest(jsonResponse.ResponseData, ENCRYPTION_KEY);
        const parsedData = JSON.parse(decryptedData);

        setApiMessage(parsedData.message || 'Processing Request');
        // Check if it was a success. We use this to decide which icon to show (Green/Red/Yellow).
        setIsSuccess(parsedData.result === 'success');
        setOpenSuccess(true); // Open the result popup

        // If it worked, refresh the "Current Language" after a second
        if (parsedData.result === 'success') {
          setTimeout(() => {
            fetchCurrentLanguage();
          }, 1000);
        }
      }
    } catch (error) {
      console.log('Error updating language:', error);
      setIsProcessing(false);
    }
  }

  return (
    <Box sx={{ p: '8px 24px', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Title of the page */}
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#262626', mb: 1.5 }}>
        Language Update
      </Typography>

      {/* This card contains all the input fields and buttons */}
      <Paper
        elevation={0}
        sx={{
          p: '10px 10px',
          borderRadius: '4px',
          border: '1px solid #f0f0f0',
          backgroundColor: '#fff',
          maxWidth: '100%'
        }}
      >
        <Grid container spacing={2}>
          {/* Field for VPA ID (Read-only, cannot be changed here) */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Box>
              <Typography sx={{ color: '#8c8c8c', fontSize: '0.8rem', mb: 1, fontWeight: 500 }}>
                VPA ID
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={userData?.vpa_id || ''}
                slotProps={{ input: { readOnly: true } }} // This makes it so we can only read, not type
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 44,
                    backgroundColor: '#fafafa',
                    borderRadius: '2px',
                    '& fieldset': { borderColor: '#d9d9d9' },
                  },
                  '& .MuiOutlinedInput-input': { color: '#595959', fontSize: '0.85rem' }
                }}
              />
            </Box>
          </Grid>

          {/* Field for Device Serial Number (Read-only) */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Box>
              <Typography sx={{ color: '#8c8c8c', fontSize: '0.8rem', mb: 1, fontWeight: 500 }}>
                Device Serial Number
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={userData?.serial_number || ''}
                slotProps={{ input: { readOnly: true } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 44,
                    backgroundColor: '#fafafa',
                    borderRadius: '2px',
                    '& fieldset': { borderColor: '#d9d9d9' },
                  },
                  '& .MuiOutlinedInput-input': { color: '#595959', fontSize: '0.85rem' }
                }}
              />
            </Box>
          </Grid>

          {/* Field for the Current Language being used (Read-only) */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Box>
              <Typography sx={{ color: '#8c8c8c', fontSize: '0.8rem', mb: 1, fontWeight: 500 }}>
                Current Language
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={currentLanguage || ''}
                slotProps={{ input: { readOnly: true } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 44,
                    backgroundColor: '#fafafa',
                    borderRadius: '2px',
                    '& fieldset': { borderColor: '#d9d9d9' },
                  },
                  '& .MuiOutlinedInput-input': { color: '#595959', fontSize: '0.85rem' }
                }}
              />
            </Box>
          </Grid>

          {/* Dropdown list to pick a new language for the update */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Box>
              <Typography sx={{ color: '#8c8c8c', fontSize: '0.8rem', mb: 1, fontWeight: 500 }}>
                Language Update
              </Typography>
              <Select
                fullWidth
                displayEmpty
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)} // When user picks a language, we remember it
                sx={{
                  height: 44,
                  backgroundColor: '#fff',
                  fontSize: '0.85rem',
                  borderRadius: '4px',
                  color: targetLanguage ? '#262626' : '#bfbfbf',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#d9d9d9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#d9d9d9 !important', borderWidth: '1px' },
                }}
                MenuProps={{
                  disableScrollLock: true,
                  PaperProps: {
                    sx: {
                      mt: 1,
                      width: 350,
                      height: 300,
                      boxShadow: '0px 9px 28px 8px #0000000D, 0px 6px 16px 0px #00000014, 0px 3px 6px -4px #0000001F',
                    }
                  }
                }}
              >
                <MenuItem value="" disabled sx={{ display: 'none' }}>Select Language Update</MenuItem>
                {/* Loop through all available languages and show them as options */}
                {Array.isArray(languages) && languages.map((lang) => (
                  <MenuItem key={lang} value={lang} disabled={lang.toUpperCase() === currentLanguage.toUpperCase()}>
                    {formatLanguageName(lang)}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>

          {/* Cancel and Update buttons */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mt: 1 }}>
              <Button
                variant="text"
                sx={{ color: '#f5222d', textTransform: 'none', fontWeight: 400, fontSize: '0.9rem' }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disableElevation
                onClick={handleUpdate}
                disabled={isProcessing} // Disable while we are waiting for the server
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: '#fff',
                  textTransform: 'none',
                  px: 2, py: 1.2,
                  fontSize: '0.9rem',
                  borderRadius: '4px',
                  '&:hover': { backgroundColor: '#8B1434' }
                }}
              >
                {/* If we are processing, show a loading text */}
                {isProcessing ? 'Updating...' : 'Update'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* This is the Result Popup (Dialog) that shows if the update worked or not */}
      <Dialog
        open={openSuccess}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.2)', // Dim the background
              backdropFilter: 'blur(4px)', // Add a blur effect to the background
            },
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: '2px', // Sharp rectangular corners
            maxWidth: '420px',
            width: '100%',
            m: 2,
            boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        <DialogContent sx={{ p: '24px 32px', textAlign: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: '#333', fontSize: '1.15rem', mb: 0.5 }}>
            Language update request
          </Typography>
          {/* Show the message we got from the server API */}
          <Typography sx={{ fontWeight: 700, color: '#333', fontSize: '1.15rem', mb: 4 }}>
            {apiMessage}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            {/* Decide the color (Green for success, Yellow for 'going on', Red for fail) */}
            <Box sx={{
              width: 80, height: 80, borderRadius: '50%',
              backgroundColor: isSuccess ? '#e6f9ed' : (apiMessage.toLowerCase().includes('going on') ? '#fff7e6' : '#fff1f0'),
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              border: `1px solid ${isSuccess ? '#c7f1d6' : (apiMessage.toLowerCase().includes('going on') ? '#ffe58f' : '#ffa39e')}`
            }}>
              <Box sx={{
                width: 60, height: 60, borderRadius: '50%',
                backgroundColor: isSuccess ? '#34c759' : (apiMessage.toLowerCase().includes('going on') ? '#faad14' : '#ff4d4f'),
                display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}>
                {/* Choose the icon based on the result */}
                {isSuccess ? <CheckCircle color="#fff" size={32} strokeWidth={3} /> : <XCircle color="#fff" size={32} strokeWidth={3} />}
              </Box>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            disableElevation
            onClick={handleClose}
            sx={{
              backgroundColor: COLORS.PRIMARY,
              color: '#fff',
              textTransform: 'none',
              height: '40px',
              fontSize: '0.9rem',
              fontWeight: 500,
              borderRadius: '2px',
              mt: 1,
              '&:hover': { backgroundColor: '#8B1434' }
            }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
