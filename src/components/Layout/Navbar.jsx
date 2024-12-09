import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings,
  ExitToApp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
    navigate('/', { replace: true });
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(-45deg, #FF5722, #FF7043, #FF8A65, #FFAB91)',
        backgroundSize: '400% 400%',
        animation: `${gradientAnimation} 15s ease infinite`,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        color: '#FFF'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img 
            src="/medyoLogo.png" 
            alt="Medyo Logo" 
            style={{ 
              height: '40px',
              marginRight: '16px'
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: 'none', sm: 'block' },
              color: '#FFF',
              fontWeight: 'bold'
            }}
          >
            Medyo System
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="large"
            onClick={handleNotificationMenuOpen}
            sx={{ 
              color: '#FFF',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <Badge 
              badgeContent={4} 
              sx={{
                '& .MuiBadge-badge': {
                  background: '#FFF',
                  color: '#FF5722'
                }
              }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            onClick={handleProfileMenuOpen}
            sx={{ 
              color: '#FFF',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <AccountCircle />
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: { 
              mt: 1,
              background: '#FFF',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              '& .MuiMenuItem-root': {
                color: '#FF5722',
                '&:hover': {
                  background: 'rgba(255, 87, 34, 0.08)'
                }
              }
            }
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <AccountCircle sx={{ mr: 2, color: '#FF5722' }} /> Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Settings sx={{ mr: 2, color: '#FF5722' }} /> Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ExitToApp sx={{ mr: 2, color: '#FF5722' }} /> Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: { 
              mt: 1,
              background: '#FFF',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              '& .MuiMenuItem-root': {
                color: '#FF5722',
                '&:hover': {
                  background: 'rgba(255, 87, 34, 0.08)'
                }
              }
            }
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            New order received
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            Inventory update required
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            Daily sales report available
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;