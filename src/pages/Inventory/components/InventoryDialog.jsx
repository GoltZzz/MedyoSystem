import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Typography,
} from '@mui/material';

const InventoryDialog = ({
  open,
  onClose,
  formData,
  onInputChange,
  onSubmit,
  categories,
  editItem,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          margin: { xs: 2, sm: 3 },
          width: { xs: 'calc(100% - 32px)', sm: 'auto' }
        },
      }}>
      <DialogTitle
        sx={{
          pb: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          "& .MuiTypography-root": {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#FF5722",
          },
        }}>
        {editItem ? "Edit Inventory Item" : "Add New Item"}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="name"
              value={formData.name}
              onChange={onInputChange}
              label="Item Name"
              fullWidth
              variant="outlined"
              required
              autoFocus
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#FF5722",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF5722",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              value={formData.description}
              onChange={onInputChange}
              label="Description"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#FF5722",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF5722",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="quantity"
              value={formData.quantity}
              onChange={onInputChange}
              label="Quantity"
              type="number"
              fullWidth
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography color="text.secondary">Qty</Typography>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#FF5722",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF5722",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="price"
              value={formData.price}
              onChange={onInputChange}
              label="Price"
              type="number"
              fullWidth
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₱</InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#FF5722",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF5722",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#FF5722",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF5722",
                  },
                },
              }}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={onInputChange}
                label="Category">
                {categories
                  .filter((category) => category !== "All")
                  .map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          gap: 1,
        }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "#FF5722",
            borderColor: "#FF5722",
            "&:hover": {
              borderColor: "#F4511E",
              bgcolor: "rgba(255, 87, 34, 0.04)",
            },
          }}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={
            !formData.name ||
            !formData.category ||
            !formData.quantity ||
            !formData.price
          }
          sx={{
            bgcolor: "#FF5722",
            "&:hover": { bgcolor: "#F4511E" },
            "&.Mui-disabled": {
              bgcolor: "rgba(255, 87, 34, 0.12)",
              color: "rgba(255, 87, 34, 0.26)",
            },
          }}>
          {editItem ? "Save Changes" : "Add Item"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InventoryDialog;
