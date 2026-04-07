import { AppBar, Toolbar, IconButton, Typography, Box, Avatar } from '@mui/material';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const drawerWidth = 260;

interface HeaderProps {
  open: boolean;
  handleDrawerToggle: () => void;
}

export default function Header({ open, handleDrawerToggle }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${open ? drawerWidth : 60}px)` },
        ml: { sm: `${open ? drawerWidth : 60}px` },
        backgroundColor: '#fff',
        color: 'text.primary',
        borderBottom: '1px solid #f0f0f0',
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) => theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: '#444' }}
          >
            {open ? <MenuFoldOutlined style={{ fontSize: '1.2rem' }} /> : <MenuUnfoldOutlined style={{ fontSize: '1.2rem' }} />}
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar 
            src="https://mui.com/static/images/avatar/1.jpg" 
            sx={{ width: 34, height: 34, border: '1px solid #f0f0f0' }} 
          />
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
            Stebin Ben
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
