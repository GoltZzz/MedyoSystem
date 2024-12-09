import React, { useState, useRef } from 'react';
import { Box, TextField, Button, Typography, IconButton, InputAdornment, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { register } from '../../services/auth';
import ValidationAlert from '../Notification/ValidationAlert';

const RegisterForm = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const fileInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password = 'Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character (@$!%*?&)';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setError('Avatar image must be less than 5MB');
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload a valid image file (JPEG, PNG, or GIF)');
        return;
      }

      // Create a new File instance with a proper filename
      const newFile = new File([file], file.name, {
        type: file.type,
        lastModified: file.lastModified,
      });

      setAvatar(newFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setErrors({});

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Create FormData object
      const formDataObj = new FormData();
      
      // Append text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'confirmPassword') {
          formDataObj.append(key, formData[key]);
        }
      });
      
      // Append avatar if exists
      if (avatar) {
        formDataObj.append('avatar', avatar, avatar.name);
      }

      // Log form data for debugging
      console.log('Form data contents:');
      for (let [key, value] of formDataObj.entries()) {
        if (key !== 'password') {
          if (value instanceof File) {
            console.log(`${key}:`, {
              name: value.name,
              type: value.type,
              size: value.size
            });
          } else {
            console.log(`${key}:`, value);
          }
        }
      }

      const response = await register(formDataObj);
      
      if (response.success) {
        setError('');
        setSuccessMessage('✅ Registration successful! Redirecting to login...');
        setTimeout(() => {
          onToggleForm();
        }, 2000);
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
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

      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Typography 
            sx={{ 
              color: '#4CAF50',
              mb: 2,
              textAlign: 'center',
              fontWeight: 500
            }}
          >
            {successMessage}
          </Typography>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <Typography variant="h4" sx={{ mb: 4, color: '#333333', fontWeight: 600 }}>
          Register
        </Typography>
      </motion.div>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 3
        }}
      >
        <Avatar
          src={avatarPreview}
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            cursor: 'pointer',
            backgroundColor: '#FF5722',
            border: '3px solid #FF5722',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 4px 20px rgba(255, 87, 34, 0.3)',
              backgroundColor: '#FF7043',
              border: '3px solid #FF7043',
            }
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          {!avatarPreview && <AddAPhotoIcon sx={{ 
            fontSize: 40,
            color: 'white',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)'
            }
          }} />}
        </Avatar>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#FF5722',
            fontWeight: 500,
            '&:hover': {
              color: '#FF7043'
            },
            transition: 'color 0.3s ease'
          }}
        >
          Click to upload avatar
        </Typography>
      </Box>

      <motion.div variants={itemVariants}>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          variant="outlined"
          value={formData.fullName}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
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
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
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
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
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
          {loading ? 'Creating account...' : 'Register'}
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Already have an account?{' '}
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
              Login here
            </Button>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default RegisterForm;
