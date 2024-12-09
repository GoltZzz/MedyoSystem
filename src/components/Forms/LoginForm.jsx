import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import ValidationAlert from '../Notification/ValidationAlert';

const LoginForm = ({ onToggleForm }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await login(formData.email, formData.password);
      if (response.token) {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <Box
      component={motion.form}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
        },
        '& .MuiTextField-root': { 
          mb: 3,
          '& .MuiOutlinedInput-root': {
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }
        }
      }}
    >
      <ValidationAlert 
        message={error} 
        onClose={() => setError('')}
      />

      <motion.div variants={itemVariants}>
        <Typography variant="h4" sx={{ mb: 4, color: '#333333', fontWeight: 600 }}>
          Login
        </Typography>
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          disabled={loading}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '12px',
              '&:hover fieldset': {
                borderColor: '#FF5722',
                borderWidth: '2px',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FF5722',
                borderWidth: '2px',
              }
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#FF5722',
              fontWeight: 500
            },
            '& .MuiInputLabel-root': {
              color: '#666',
              fontWeight: 500
            }
          }}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{ color: '#FF5722' }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '12px',
              '&:hover fieldset': {
                borderColor: '#FF5722',
                borderWidth: '2px',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FF5722',
                borderWidth: '2px',
              }
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#FF5722',
              fontWeight: 500
            },
            '& .MuiInputLabel-root': {
              color: '#666',
              fontWeight: 500
            }
          }}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            mt: 2,
            py: 1.5,
            backgroundColor: '#FF5722',
            '&:hover': {
              backgroundColor: '#D84315'
            },
            '&:disabled': {
              backgroundColor: 'rgba(255, 87, 34, 0.5)'
            }
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Don't have an account?{' '}
            <Button
              onClick={onToggleForm}
              sx={{
                textTransform: 'none',
                color: '#FF5722',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline'
                }
              }}
            >
              Register here
            </Button>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default LoginForm;
