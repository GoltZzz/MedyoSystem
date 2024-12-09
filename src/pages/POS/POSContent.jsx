import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  Search,
  ShoppingCart,
  LocalAtm,
} from '@mui/icons-material';

const POSContent = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product A', price: 150, quantity: 2 },
    { id: 2, name: 'Product B', price: 200, quantity: 1 },
    { id: 3, name: 'Product C', price: 300, quantity: 3 },
  ]);

  const products = [
    { id: 1, name: 'Product A', price: 150, stock: 50 },
    { id: 2, name: 'Product B', price: 200, stock: 30 },
    { id: 3, name: 'Product C', price: 300, stock: 25 },
    { id: 4, name: 'Product D', price: 180, stock: 40 },
    { id: 5, name: 'Product E', price: 250, stock: 20 },
    { id: 6, name: 'Product F', price: 120, stock: 60 },
  ];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: '24px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#FF5722', fontWeight: 'bold' }}>
        Point of Sale
      </Typography>

      <Grid container spacing={3} sx={{ flexGrow: 1, height: 'calc(100% - 100px)' }}>
        {/* Products Section */}
        <Grid item xs={12} md={8} sx={{ height: '100%' }}>
          <Paper 
            sx={{ 
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Search products..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                sx={{ 
                  borderColor: '#FF5722',
                  color: '#FF5722',
                  minWidth: '120px',
                  '&:hover': {
                    borderColor: '#F4511E',
                    bgcolor: 'rgba(244, 81, 30, 0.04)'
                  }
                }}
              >
                Filter
              </Button>
            </Box>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <Grid container spacing={2}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': { 
                          transform: 'translateY(-4px)',
                          transition: 'transform 0.2s ease-in-out',
                          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                          {product.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            bgcolor: product.stock > 20 ? 'success.main' : product.stock > 10 ? 'warning.main' : 'error.main',
                            color: 'white',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            alignSelf: 'flex-start'
                          }}
                        >
                          Stock: {product.stock}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#FF5722', fontWeight: 'bold', mt: 'auto', pt: 1 }}>
                          ₱{product.price.toFixed(2)}
                        </Typography>
                        <Button 
                          variant="contained" 
                          fullWidth 
                          sx={{ 
                            mt: 2,
                            bgcolor: '#FF5722',
                            '&:hover': { bgcolor: '#F4511E' }
                          }}
                        >
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Cart Section */}
        <Grid item xs={12} md={4} sx={{ height: '100%' }}>
          <Paper 
            sx={{ 
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ShoppingCart sx={{ color: '#FF5722', mr: 1 }} />
              <Typography variant="h6">
                Cart
              </Typography>
              <Typography variant="body2" sx={{ ml: 'auto', color: 'text.secondary' }}>
                {cartItems.length} items
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <List>
                {cartItems.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{
                      bgcolor: 'rgba(0, 0, 0, 0.02)',
                      mb: 1,
                      borderRadius: 1,
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" sx={{ color: 'error.main' }}>
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <Typography variant="body2" sx={{ color: '#FF5722' }}>
                          ₱{item.price.toFixed(2)}
                        </Typography>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                      <IconButton 
                        size="small" 
                        sx={{ 
                          color: '#FF5722',
                          bgcolor: 'rgba(255, 87, 34, 0.1)',
                          '&:hover': {
                            bgcolor: 'rgba(255, 87, 34, 0.2)'
                          }
                        }}
                      >
                        <Remove />
                      </IconButton>
                      <Typography sx={{ minWidth: '30px', textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        size="small" 
                        sx={{ 
                          color: '#FF5722',
                          bgcolor: 'rgba(255, 87, 34, 0.1)',
                          '&:hover': {
                            bgcolor: 'rgba(255, 87, 34, 0.2)'
                          }
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Subtotal:</Typography>
                <Typography>₱{calculateTotal().toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Tax (12%):</Typography>
                <Typography>₱{(calculateTotal() * 0.12).toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" sx={{ color: '#FF5722' }}>
                  ₱{(calculateTotal() * 1.12).toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<LocalAtm />}
              sx={{ 
                bgcolor: '#FF5722',
                '&:hover': { bgcolor: '#F4511E' }
              }}
            >
              Process Payment
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default POSContent;
