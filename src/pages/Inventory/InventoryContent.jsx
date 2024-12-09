import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Warning,
  CheckCircle,
} from '@mui/icons-material';

const InventoryContent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const inventoryItems = [
    { id: 1, name: 'Product A', category: 'Electronics', stock: 50, price: 150, status: 'In Stock' },
    { id: 2, name: 'Product B', category: 'Clothing', stock: 5, price: 200, status: 'Low Stock' },
    { id: 3, name: 'Product C', category: 'Food', stock: 0, price: 300, status: 'Out of Stock' },
    { id: 4, name: 'Product D', category: 'Electronics', stock: 30, price: 180, status: 'In Stock' },
    { id: 5, name: 'Product E', category: 'Clothing', stock: 8, price: 250, status: 'Low Stock' },
  ];

  const categories = ['All', 'Electronics', 'Clothing', 'Food'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: '24px' }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#FF5722', fontWeight: 'bold' }}>
        Inventory Management
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 3,
              height: '100%',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)'
              }
            }}
          >
            <Typography variant="h6" sx={{ color: 'success.main', mb: 2, display: 'flex', alignItems: 'center' }}>
              <CheckCircle sx={{ mr: 1 }} />
              In Stock Items
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'medium' }}>42</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 3,
              height: '100%',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)'
              }
            }}
          >
            <Typography variant="h6" sx={{ color: 'warning.main', mb: 2, display: 'flex', alignItems: 'center' }}>
              <Warning sx={{ mr: 1 }} />
              Low Stock Items
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'medium' }}>13</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 3,
              height: '100%',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)'
              }
            }}
          >
            <Typography variant="h6" sx={{ color: 'error.main', mb: 2, display: 'flex', alignItems: 'center' }}>
              <Warning sx={{ mr: 1 }} />
              Out of Stock
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'medium' }}>5</Typography>
          </Paper>
        </Grid>

        {/* Inventory Table */}
        <Grid item xs={12}>
          <Paper 
            elevation={3}
            sx={{ 
              p: { xs: 2, md: 3 },
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              gap: 2, 
              mb: 3,
              alignItems: { xs: 'stretch', md: 'center' }
            }}>
              <TextField
                placeholder="Search inventory..."
                variant="outlined"
                size="small"
                sx={{ flexGrow: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 200 } }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category.toLowerCase()}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpenDialog}
                sx={{ 
                  bgcolor: '#FF5722',
                  '&:hover': { bgcolor: '#F4511E' },
                  minWidth: { xs: '100%', md: 'auto' }
                }}
              >
                Add Item
              </Button>
            </Box>

            <TableContainer sx={{ maxHeight: 440, overflow: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Stock</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventoryItems.map((item) => (
                    <TableRow 
                      key={item.id}
                      sx={{ '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell align="right">{item.stock}</TableCell>
                      <TableCell align="right">₱{item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={item.status} 
                          color={getStatusColor(item.status)}
                          size="small"
                          sx={{ minWidth: 100 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: '#FF5722',
                            mr: 1
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          sx={{ 
                            '&:hover': { 
                              bgcolor: 'error.light',
                              color: 'white'
                            }
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Item Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}>
          Add New Item
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField 
              label="Item Name" 
              fullWidth 
              size="small"
            />
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select label="Category">
                {categories.slice(1).map((category) => (
                  <MenuItem key={category} value={category.toLowerCase()}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField 
              label="Stock" 
              type="number" 
              fullWidth 
              size="small"
            />
            <TextField 
              label="Price" 
              type="number" 
              fullWidth 
              size="small"
              InputProps={{
                startAdornment: <InputAdornment position="start">₱</InputAdornment>,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button 
            onClick={handleCloseDialog}
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            sx={{ 
              bgcolor: '#FF5722',
              '&:hover': { bgcolor: '#F4511E' }
            }}
          >
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryContent;
