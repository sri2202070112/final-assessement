import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem } from '@mui/material';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useAuth } from "react-oidc-context";
import { COLORS } from '../../theme/color';
import ViewProfileModal from '../../components/UI/ViewProfileModal';

const drawerWidth = 260;

interface HeaderProps {
  open: boolean;
  handleDrawerToggle: () => void;
}

export default function Header({ open, handleDrawerToggle }: HeaderProps) {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    handleMenuClose();
    setIsProfileModalOpen(true);
  };

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
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '48px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: '#444' }}
          >
            {open ? (
              <MenuFoldOutlined style={{ fontSize: '20px' }} />
            ) : (
              <MenuUnfoldOutlined style={{ fontSize: '20px' }} />
            )}
          </IconButton>
        </Box>

        <Box
          onClick={handleProfileClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '4px',
            '&:hover': { backgroundColor: '#f9f9f9' }
          }}
        >
          <Avatar
            src="https://mui.com/static/images/avatar/1.jpg"
            sx={{ width: 34, height: 34, border: '1px solid #f0f0f0' }}
          />
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
            Stebin Ben
          </Typography>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: '3px',
              ml: -3.5, // Maintain latest user-defined position
              width: 140,
              height: 98,
              borderRadius: '6px',
              padding: '16px',
              boxSizing: 'border-box',
              paddingRight: '130px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #f0f0f0',
              '& .MuiList-root': {
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            onClick={handleViewProfile}
            sx={{
              p: 0,
              minHeight: 'auto',
              color: '#333',
              fontSize: '0.85rem',
              fontWeight: 500,
              display: 'flex',
              justifyContent: 'flex-start',
              '&:hover': { backgroundColor: 'transparent', opacity: 0.7 }
            }}
          >
            View Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              auth.signoutRedirect();
            }}
            sx={{
              p: 0,
              minHeight: 'auto',
              color: COLORS.ERROR,
              fontSize: '0.85rem',
              fontWeight: 500,
              display: 'flex',
              justifyContent: 'flex-start',
              '&:hover': { backgroundColor: 'transparent', opacity: 0.7 }
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>

      <ViewProfileModal
        open={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </AppBar>
  );
}
