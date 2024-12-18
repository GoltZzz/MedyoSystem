import React from 'react';
import { Typography } from '@mui/material';

const InventoryHeader = () => {
  return (
    <Typography
      variant="h4"
      sx={{
        mb: { xs: 2, sm: 4 },
        color: "#FF5722",
        fontWeight: "bold",
        fontSize: { xs: '1.75rem', sm: '2.125rem' }
      }}>
      Inventory Management
    </Typography>
  );
};

export default InventoryHeader;
