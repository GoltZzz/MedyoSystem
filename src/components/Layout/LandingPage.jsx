import React, { useState } from 'react';
import { Box, Typography, Button, Container, IconButton, InputAdornment, useTheme, useMediaQuery } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';
import LoginForm from '../Forms/LoginForm';
import RegisterForm from '../Forms/RegisterForm';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const gradientAnimation = keyframes`
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

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(-45deg, #FFE0D1, #FFD4BC, #FFC4A6, #FFB088)',
        backgroundSize: '400% 400%',
        animation: `${gradientAnimation} 15s ease infinite`,
        display: 'flex',
        alignItems: 'center',
        padding: { 
          xs: '1rem',
          sm: '1.5rem',
          md: '2rem', 
          lg: '4rem' 
        },
        overflow: { xs: 'auto', md: 'hidden' },
        minHeight: '100vh'
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          height: { xs: 'auto', md: '100%' },
          my: { xs: 4, md: 0 }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'stretch' },
            gap: { xs: 4, sm: 6, md: 8, lg: 12 },
            height: { xs: 'auto', md: '100%' },
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Box 
            sx={{ 
              flex: 1,
              animation: `${fadeIn} 1s ease-out`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: { xs: 'center', md: 'center' },
              alignItems: { xs: 'center', md: 'flex-start' },
              '& > *:not(:last-child)': {
                animation: `${fadeIn} 1s ease-out`,
                animationFillMode: 'both'
              }
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { 
                  xs: '2rem',
                  sm: '2.5rem',
                  md: '3.5rem',
                  lg: '4.5rem' 
                },
                fontWeight: 900,
                color: '#FF5722',
                lineHeight: { xs: 1.2, md: 1.1 },
                marginBottom: { xs: '0.5rem', md: '1rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                animationDelay: '0.2s',
                fontFamily: '"Poppins", sans-serif',
                letterSpacing: '-0.02em',
                transition: 'all 0.3s ease',
                maxWidth: { xs: '100%', md: '90%' }
              }}
            >
              MEDYO MONKEY BUSINESS
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                fontSize: { 
                  xs: '1.25rem',
                  sm: '1.5rem',
                  md: '2rem',
                  lg: '2.25rem'
                },
                color: '#333333',
                marginBottom: { xs: '1rem', md: '2rem' },
                fontWeight: 600,
                animationDelay: '0.4s',
                fontFamily: '"Poppins", sans-serif',
                letterSpacing: '0.02em',
                transition: 'all 0.3s ease',
                maxWidth: { xs: '100%', md: '80%' }
              }}
            >
              Happiness is ...Expensive
            </Typography>
            
            <Typography
              sx={{
                color: '#666666',
                marginBottom: { xs: '2rem', md: '3rem' },
                fontSize: { 
                  xs: '1rem',
                  sm: '1.1rem',
                  md: '1.25rem' 
                },
                maxWidth: { xs: '100%', sm: '80%', md: '600px' },
                lineHeight: 1.6,
                animationDelay: '0.6s',
                transition: 'all 0.3s ease',
                px: { xs: 2, md: 0 }
              }}
            >
              Your one-stop solution for modern point-of-sale and inventory management.
            </Typography>

            <Box
              sx={{
                animation: `${float} 6s ease-in-out infinite`,
                transform: 'translateZ(0)',
                transition: 'all 0.3s ease',
                width: { xs: '200px', sm: '250px', md: '300px' },
                display: { xs: isMobile ? 'none' : 'block', md: 'block' }
              }}
            >
              <img 
                src="/medyoLogo.png" 
                alt="Medyo Monkey Business"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))',
                }}
              />
            </Box>
          </Box>
          
          <Box 
            sx={{ 
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: {
                xs: '1.5rem',
                sm: '2rem',
                md: '3rem'
              },
              height: { xs: 'auto', md: '100%' },
              minHeight: { xs: 'auto', md: '500px' },
              position: 'relative',
              animation: `${fadeIn} 1s ease-out 0.3s both`,
              width: '100%',
              maxWidth: { xs: '400px', md: '100%' },
              mx: 'auto',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: { xs: '12px', md: '16px' },
                zIndex: 0,
                transition: 'all 0.3s ease'
              }
            }}
          >
            <Box 
              sx={{ 
                position: 'relative', 
                zIndex: 1, 
                width: '100%', 
                maxWidth: '400px',
                transition: 'all 0.3s ease'
              }}
            >
              {isLogin ? (
                <LoginForm onToggleForm={() => setIsLogin(false)} />
              ) : (
                <RegisterForm onToggleForm={() => setIsLogin(true)} />
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;