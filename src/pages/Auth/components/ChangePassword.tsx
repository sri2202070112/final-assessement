import { Box, Button, Typography, OutlinedInput, InputAdornment, IconButton, Stack } from '@mui/material';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import { COLORS } from '../../../theme/color';

interface ChangePasswordProps {
  onUpdate: () => void;
}

export default function ChangePassword({ onUpdate }: ChangePasswordProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" fontWeight="700" textAlign="center" sx={{ mb: 4, color: '#1a1a1a' }}>
        Password Change Required
      </Typography>

      <Box sx={{ width: '100%', mb: 3 }}>
        <Typography variant="caption" sx={{ mb: 0.5, display: 'block', color: '#888', fontWeight: 600 }}>
          Current Password
        </Typography>
        <OutlinedInput
          fullWidth
          type="password"
          placeholder="********"
          size="small"
          sx={{ borderRadius: 0 }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" size="small"><EyeInvisibleOutlined style={{ fontSize: '0.85rem', color: '#aaa' }} /></IconButton>
            </InputAdornment>
          }
        />
      </Box>

      <Box sx={{ width: '100%', mb: 1 }}>
        <Typography variant="caption" sx={{ mb: 0.5, display: 'block', color: '#888', fontWeight: 600 }}>
          New Password
        </Typography>
        <OutlinedInput
          fullWidth
          type="password"
          placeholder="********"
          size="small"
          sx={{ borderRadius: 0 }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" size="small"><EyeInvisibleOutlined style={{ fontSize: '0.85rem', color: '#aaa' }} /></IconButton>
            </InputAdornment>
          }
        />
      </Box>

      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 3 }}>
        <Box sx={{ height: 6, width: 30, backgroundColor: COLORS.ERROR, borderRadius: 0 }} />
        <Box sx={{ height: 6, width: 30, backgroundColor: '#f0f0f0', borderRadius: 0 }} />
        <Box sx={{ height: 6, width: 30, backgroundColor: '#f0f0f0', borderRadius: 0 }} />
        <Typography variant="caption" sx={{ ml: 1, color: '#888', fontWeight: 600 }}>Poor</Typography>
      </Stack>

      <Box sx={{ width: '100%', mb: 4 }}>
        <Typography variant="caption" sx={{ mb: 0.5, display: 'block', color: '#888', fontWeight: 600 }}>
          Re-Enter Password
        </Typography>
        <OutlinedInput
          fullWidth
          type="password"
          placeholder="Re-e nter your password"
          size="small"
          sx={{ borderRadius: 0 }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" size="small"><EyeInvisibleOutlined style={{ fontSize: '0.85rem', color: '#aaa' }} /></IconButton>
            </InputAdornment>
          }
        />
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={onUpdate}
        sx={{
          borderRadius: 0,
          py: 1.2,
          fontWeight: 600,
          textTransform: 'none',
          backgroundColor: COLORS.PRIMARY,
          '&:hover': { backgroundColor: COLORS.PRIMARY, opacity: 0.9 }
        }}
      >
        Update Password
      </Button>
    </Box>
  );
}
