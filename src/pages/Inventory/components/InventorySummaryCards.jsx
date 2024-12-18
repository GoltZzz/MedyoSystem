import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { CheckCircle, Warning, Delete } from '@mui/icons-material';

const SummaryCard = ({ icon: Icon, title, count, color }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 3 },
        height: "100%",
        bgcolor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}>
      <Typography
        variant="h6"
        sx={{
          color: `${color}.main`,
          mb: { xs: 1, sm: 2 },
          display: "flex",
          alignItems: "center",
          fontSize: { xs: "1rem", sm: "1.25rem" },
        }}>
        <Icon sx={{ mr: 1, fontSize: { xs: "1.25rem", sm: "1.5rem" } }} />
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: "medium", fontSize: { xs: "1.5rem", sm: "2rem" } }}>
        {count}
      </Typography>
    </Paper>
  </Grid>
);

const InventorySummaryCards = ({ inStockCount, lowStockCount, outOfStockCount }) => {
  const summaryData = [
    { icon: CheckCircle, title: 'In Stock Items', count: inStockCount, color: 'success' },
    { icon: Warning, title: 'Low Stock Items', count: lowStockCount, color: 'warning' },
    { icon: Delete, title: 'Out of Stock Items', count: outOfStockCount, color: 'error' },
  ];

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 2, sm: 4 } }}>
      {summaryData.map((data, index) => (
        <SummaryCard key={index} {...data} />
      ))}
    </Grid>
  );
};

export default InventorySummaryCards;
