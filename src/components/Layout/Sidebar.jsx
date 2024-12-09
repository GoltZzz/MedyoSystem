import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
  Divider,
  Toolbar,
  ListItemButton
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as POSIcon,
  Inventory as InventoryIcon,
  Assessment as ReportIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const gradientAnimation = `
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Sidebar = ({ user }) => {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'POS', icon: <POSIcon />, path: '/pos' },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
    { text: 'Sales Report', icon: <ReportIcon />, path: '/sales-report' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(-45deg, #FF5722, #FF7043, #FF8A65, #FFAB91)',
          backgroundSize: '400% 400%',
          animation: `${gradientAnimation} 15s ease infinite`,
          borderRight: 'none',
          boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Toolbar 
        sx={{ 
          minHeight: '64px',
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <img 
          src="/medyoLogo.png" 
          alt="Medyo Logo" 
          style={{ 
            height: '40px'
          }} 
        />
        <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 'bold' }}>
          Medyo System
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  m: 1,
                  borderRadius: '10px',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#FFF' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiTypography-root': { 
                      color: '#FFF',
                      fontWeight: 500
                    } 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;