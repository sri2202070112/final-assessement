import { Box, Typography, Paper, TextField, MenuItem, Select, Button, Grid, Dialog, DialogContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { COLORS } from '../../theme/color';
import { ENCRYPTION_KEY, FETCH_ALL_LANGUAGE, FETCH_CURRENT_LANGUAGE, PASS_KEY } from '../../config/config';
import { useAuth } from 'react-oidc-context';
import { decryptRequest } from '../../utils/crypto';

export default function LanguageUpdate() {
  const [targetLanguage, setTargetLanguage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);

  const auth = useAuth()

  const handleUpdate = () => {
    setOpenSuccess(true);
  };

  const handleClose = () => {
    setOpenSuccess(false);
  };

const fetchCurrentLanguage=async()=>{
  try{
    const response=await fetch(`${FETCH_CURRENT_LANGUAGE}/dkdjk`,{
      method:'GET',headers:{
        'Content-Type':'application/json',
        'Pass_key':PASS_KEY,
        'Authorization':auth.user?.access_token || '',
      }
    })
    const jsonResponse=await response.json();
    if(jsonResponse.ResponseData){
      const decryptedData=decryptRequest(jsonResponse.ResponseData,ENCRYPTION_KEY);
      const parsedData=JSON.parse(decryptedData);
      console.log("Decrypted Language Data:", parsedData);
      if (parsedData.data) {
        setLanguages(parsedData.data);
      }
    }
  } catch (error) {
    console.log(error)
  }
}
      

  const fetchLanguage = async () => {
    try {
      const response = await fetch(FETCH_ALL_LANGUAGE, {
        method: 'GET', headers: {
          'Content-Type': 'application/json',
          'Pass_key': PASS_KEY,
          'Authorization': auth.user?.access_token || '',
        }
      })
      const jsonResponse = await response.json();

      if (jsonResponse.ResponseData) {
        const decryptedData = decryptRequest(jsonResponse.ResponseData, ENCRYPTION_KEY);
        const parsedData = JSON.parse(decryptedData);
        console.log("Decrypted Language Data:", parsedData);
        if (parsedData.data) {
          setLanguages(parsedData.data);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLanguage()
  }, [])


  return (
    <Box sx={{ p: '8px 24px', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#262626', mb: 1.5 }}>
        Language Update
      </Typography>

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
          {/* Main Row with 4 inputs */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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
                  borderRadius: '4px',
                  color: targetLanguage ? '#262626' : '#bfbfbf',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#d9d9d9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#d9d9d9 !important', borderWidth: '1px' },
                  '& .MuiSelect-select': { py: 0 }
                }}
                MenuProps={{
                  disableScrollLock: true,
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                  PaperProps: {
                    sx: {
                      mt: 1,
                      width: 350,
                      height: 300,
                      borderRadius: '4px',
                      background: '#FFFFFF',
                      boxShadow: '0px 9px 28px 8px #0000000D, 0px 6px 16px 0px #00000014, 0px 3px 6px -4px #0000001F',
                      overflow: 'auto',
                      '& .MuiList-root': {
                        py: '12px',
                      },
                      '& .MuiMenuItem-root': {
                        fontSize: '10px',
                        py: '4px',
                        px: '20px',
                        fontWeight: 400,
                        color: '#262626',
                        fontFamily: '"Inter", "Roboto", sans-serif',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: '#F9F1F3',
                        },
                        '&.Mui-selected': {
                          backgroundColor: '#F9F1F3',
                          color: '#262626',
                          '&:hover': { backgroundColor: '#F9F1F3' }
                        }
                      }
                    }
                  }
                }}
              >
                <MenuItem value="" disabled sx={{ display: 'none' }}>
                  Select Language Update
                </MenuItem>
                {languages.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>

          {/* Action Row - Left Aligned */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mt: 1 }}>
              <Button
                variant="text"
                sx={{
                  color: '#f5222d',
                  textTransform: 'none',
                  fontWeight: 400,
                  fontSize: '0.9rem',
                  '&:hover': { backgroundColor: 'transparent' }
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disableElevation
                onClick={handleUpdate}
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: '#fff',
                  textTransform: 'none',
                  px: 2,
                  py: 1.2,
                  fontSize: '0.9rem',
                  fontWeight: 400,
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

      {/* Success Dialog */}
      <Dialog
        open={openSuccess}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: '2px',
            maxWidth: '300px',
            width: 'calc(100% - 32px)',
            m: 2
          }
        }}
      >
        <DialogContent sx={{ p: '24px 20px', textAlign: 'center' }}>
          <Typography sx={{ fontWeight: 500, color: '#262626', mb: 0.5, fontSize: '1.2rem' }}>
            Language update request
          </Typography>
          <Typography sx={{ fontWeight: 500, color: '#262626', mb: 3, fontSize: '1.2rem' }}>
            Initiated Successfully
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              backgroundColor: '#d9f7be',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Box sx={{
                width: 75,
                height: 75,
                borderRadius: '50%',
                backgroundColor: '#52c41a',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <CheckCircle color="#fff" size={45} strokeWidth={3} />
              </Box>
            </Box>
          </Box>

          <Box sx={{ pt: 2, borderTop: '1px solid #f0f0f0', mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              onClick={handleClose}
              sx={{
                backgroundColor: COLORS.PRIMARY,
                color: '#fff',
                textTransform: 'none',
                py: 1.2,
                fontSize: '0.95rem',
                fontWeight: 500,
                borderRadius: '4px',
                '&:hover': { backgroundColor: '#8B1434' }
              }}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
