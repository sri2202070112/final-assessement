import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  DashboardOutlined, 
  FileTextOutlined, 
  QrcodeOutlined, 
  GlobalOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { COLORS } from '../../theme/color';

const drawerWidth = 260;

interface SidebarProps {
  open: boolean;
  handleDrawerToggle: () => void;
  window?: () => Window;
}

const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    url: '/dashboard',
    icon: DashboardOutlined
  },
  {
    id: 'transactions',
    title: 'Transaction Reports',
    url: '/transactions',
    icon: FileTextOutlined
  },
  {
    id: 'qr-details',
    title: 'QR Details',
    url: '/qr-details',
    icon: QrcodeOutlined
  },
  {
    id: 'language',
    title: 'Language Update',
    url: '/language',
    icon: GlobalOutlined
  },
  {
    id: 'help',
    title: 'Help & Support',
    url: '/help',
    icon: QuestionCircleOutlined
  }
];

export default function Sidebar({ open, handleDrawerToggle, window }: SidebarProps) {
  const location = useLocation();
  const container = window !== undefined ? () => window().document.body : undefined;

  const drawerContent = (
    <Box>
      {/* PNB Logo at the top of Sidebar */}
      <Box sx={{ pt: 1.5, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/src/assets/logo.png" alt="PNB Logo" style={{ height: 42, objectFit: 'contain' }} />
      </Box>

      <List sx={{ pt: 0, px: 0 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isSelected = location.pathname === item.url || (item.url !== '/dashboard' && location.pathname.includes(item.url));

          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.url}
                selected={isSelected}
                sx={{
                  py: 1.5,
                  px: 4,
                  position: 'relative',
                  '&.Mui-selected': {
                    backgroundColor: COLORS.PRIMARY,
                    '&:hover': {
                      backgroundColor: COLORS.PRIMARY,
                      opacity: 0.95
                    },
                    // The yellow accent line on the right edge (PNB branding)
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      width: '4px',
                      backgroundColor: '#FFD700', // PNB Gold/Yellow
                    },
                    '& .MuiListItemIcon-root': {
                      color: '#fff',
                    },
                    '& .MuiListItemText-primary': {
                      color: '#fff',
                      fontWeight: 500
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: isSelected ? '#fff' : '#333' }}>
                  <Icon style={{ fontSize: '1.2rem' }} />
                </ListItemIcon>
                <ListItemText 
                  primary={item.title} 
                  primaryTypographyProps={{ 
                    fontSize: '0.9rem', 
                    fontWeight: isSelected ? 500 : 400,
                    color: isSelected ? '#fff' : '#262626'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ 
        width: { sm: open ? drawerWidth : 60 }, 
        flexShrink: { sm: 0 },
        transition: (theme) => theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: open ? drawerWidth : 60, 
            borderRight: '1px solid #f0f0f0',
            backgroundColor: '#fff',
            boxShadow: 'none',
            overflowX: 'hidden',
            transition: (theme) => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        open={open}
      >
        <Box sx={{ p: open ? '12px 24px' : '12px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={open ? "/src/assets/logo.png" : "/src/assets/blurbg.png"} 
            alt="PNB Logo" 
            style={{ 
              height: open ? 42 : 32, 
              width: open ? 'auto' : 32,
              borderRadius: open ? 0 : '4px',
              objectFit: 'cover',
              transition: 'all 0.3s ease'
            }} 
          />
        </Box>

        <List sx={{ pt: 0, px: 0 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = location.pathname === item.url || (item.url !== '/dashboard' && location.pathname.includes(item.url));

            return (
              <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={NavLink}
                  to={item.url}
                  selected={isSelected}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    py: 1.5,
                    position: 'relative',
                    '&.Mui-selected': {
                      backgroundColor: COLORS.PRIMARY,
                      '&:hover': {
                        backgroundColor: COLORS.PRIMARY,
                        opacity: 0.95
                      },
                      '&::after': {
                        display: open ? 'block' : 'none',
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '4px',
                        backgroundColor: '#FFD700',
                      },
                      '& .MuiListItemIcon-root': {
                        color: '#fff',
                      },
                      '& .MuiListItemText-primary': {
                        color: '#fff',
                        fontWeight: 500
                      }
                    }
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: 0, 
                      mr: open ? 2 : 'auto', 
                      justifyContent: 'center',
                      color: isSelected ? '#fff' : '#333' 
                    }}
                  >
                    <Icon style={{ fontSize: '1.2rem' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.title} 
                    sx={{ 
                      opacity: open ? 1 : 0,
                      display: open ? 'block' : 'none'
                    }}
                    primaryTypographyProps={{ 
                      fontSize: '0.875rem', 
                      variant: 'body2'
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
