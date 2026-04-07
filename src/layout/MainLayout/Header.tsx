import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { MenuOutlined } from '@ant-design/icons';

interface HeaderProps {
  open: boolean;
  handleDrawerToggle: () => void;
}

export default function Header({ handleDrawerToggle }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 2px 14px 0 rgba(32, 40, 45, 0.08)'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuOutlined />
        </IconButton>
        
        {/* Placeholder Logo area */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src="/src/assets/logo.png" alt="PNB Logo" style={{ height: 40 }} />
        </Box>

        <Typography variant="subtitle1" fontWeight="bold">
          Merchant Portal
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
