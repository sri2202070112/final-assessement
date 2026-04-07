import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function MainLayout() {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Top Header */}
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />

      {/* Left Sidebar Navigation */}
      <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.default',
          overflow: 'hidden' // Main should not scroll, only the content box
        }}
      >
        <Toolbar /> {/* To provide spacing for the fixed Header */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            overflowY: 'auto',
            p: 3,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
