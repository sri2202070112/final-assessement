import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  FileTextOutlined,
  QrcodeOutlined,
  TranslationOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { COLORS } from '../../theme/color';

const drawerWidth = 240;

interface SidebarProps {
  open: boolean;
  handleDrawerToggle: () => void;
  window?: () => Window;
}

const QRIcon = (props: any) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" {...props}>
    {/* Top Left Frame */}
    <path d="M2 2H10V10H2V2ZM4 4V8H8V4H4Z" />
    {/* Top Right Frame */}
    <path d="M14 2H22V10H14V2ZM16 4V8H20V4H16Z" />
    {/* Bottom Left Frame */}
    <path d="M2 14H10V22H2V14ZM4 16V20H8V16H4Z" />
    {/* Bottom Right 3x3 Pattern */}
    <rect x="14" y="14" width="2.5" height="2.5" />
    <rect x="19.5" y="14" width="2.5" height="2.5" />
    <rect x="16.75" y="16.75" width="2.5" height="2.5" />
    <rect x="14" y="19.5" width="2.5" height="2.5" />
    <rect x="19.5" y="19.5" width="2.5" height="2.5" />
  </svg>
);

/**
 * Definition of all the links shown in the sidebar.
 * Includes text, target URL, and the icon to display.
 */
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
    icon: QRIcon
  },
  {
    id: 'language',
    title: 'Language Update',
    url: '/language',
    icon: TranslationOutlined
  },
  {
    id: 'help',
    title: 'Help & Support',
    url: '/help',
    icon: QuestionCircleOutlined
  }
];

export default function Sidebar({ open, handleDrawerToggle, window }: SidebarProps) {
  const location = useLocation(); // Used to detect which page the user is currently on
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
          // Check if this menu item matches the current URL to highlight it
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
                <ListItemIcon sx={{ minWidth: 28, color: isSelected ? '#fff' : '#333' }}>
                   <Icon style={{ fontSize: '1.1rem' }} />
                 </ListItemIcon>
                 <ListItemText
                   primary={item.title}
                   primaryTypographyProps={{
                     fontSize: '0.85rem',
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
        {/* The PNB Logo at the top - switches based on whether sidebar is open or closed */}
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
                    py: 1.2,
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
                      mr: open ? 1.5 : 'auto',
                      justifyContent: 'center',
                      color: isSelected ? '#fff' : '#333'
                    }}
                  >
                    <Icon style={{ fontSize: item.id === 'qr-details' ? '1.2rem' : '1.1rem' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      display: open ? 'block' : 'none'
                    }}
                    primaryTypographyProps={{
                      fontSize: '0.8rem',
                      fontWeight: isSelected ? 500 : 400,
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
