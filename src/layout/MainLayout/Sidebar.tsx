import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  DashboardOutlined, 
  UnorderedListOutlined, 
  QrcodeOutlined, 
  GlobalOutlined 
} from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';

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
    type: 'item',
    url: '/dashboard',
    icon: DashboardOutlined
  },
  {
    id: 'transactions',
    title: 'Transaction Report',
    type: 'item',
    url: '/transactions',
    icon: UnorderedListOutlined
  },
  {
    id: 'qr-details',
    title: 'QR Details',
    type: 'item',
    url: '/qr-details',
    icon: QrcodeOutlined
  },
  {
    id: 'language',
    title: 'Language Update',
    type: 'item',
    url: '/language',
    icon: GlobalOutlined
  }
];

export default function Sidebar({ open, handleDrawerToggle, window }: SidebarProps) {
  const theme = useTheme();
  const location = useLocation();

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawerContent = (
    <Box sx={{ mt: 2 }}>
      <List>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isSelected = location.pathname.includes(item.url);

          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.url}
                selected={isSelected}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    borderRight: `2px solid ${theme.palette.primary.main}`,
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                    '& .MuiListItemText-primary': {
                      color: 'primary.main',
                      fontWeight: 600
                    }
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon style={{ fontSize: '1.2rem' }} />
                </ListItemIcon>
                <ListItemText primary={item.title} />
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
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
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
        <Toolbar /> 
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none', boxShadow: '2px 0 14px 0 rgba(32, 40, 45, 0.08)' },
        }}
        open
      >
        <Toolbar /> 
        {drawerContent}
      </Drawer>
    </Box>
  );
}
