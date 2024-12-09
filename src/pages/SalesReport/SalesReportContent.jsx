import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Chip,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  TrendingUp,
  AttachMoney,
  ShoppingCart,
  Person,
  Download,
  Print,
  FilterList,
  Refresh,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const SalesReportContent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reportType, setReportType] = useState('daily');
  const [currentTab, setCurrentTab] = useState(0);

  // Sample data
  const salesMetrics = [
    { title: 'Total Revenue', value: '₱145,678', icon: <AttachMoney />, increase: '+15%', subtext: 'vs last period' },
    { title: 'Total Orders', value: '1,234', icon: <ShoppingCart />, increase: '+8%', subtext: '156 orders today' },
    { title: 'Average Order Value', value: '₱118', icon: <TrendingUp />, increase: '+5%', subtext: '₱12 increase' },
    { title: 'Unique Customers', value: '892', icon: <Person />, increase: '+12%', subtext: '108 new customers' },
  ];

  const dailySales = [
    { date: 'Mon', sales: 4000, orders: 24 },
    { date: 'Tue', sales: 3000, orders: 18 },
    { date: 'Wed', sales: 5000, orders: 30 },
    { date: 'Thu', sales: 2780, orders: 16 },
    { date: 'Fri', sales: 4890, orders: 28 },
    { date: 'Sat', sales: 6390, orders: 38 },
    { date: 'Sun', sales: 3490, orders: 22 },
  ];

  const hourlySales = [
    { hour: '00:00', sales: 1200, orders: 8 },
    { hour: '03:00', sales: 800, orders: 5 },
    { hour: '06:00', sales: 2000, orders: 15 },
    { hour: '09:00', sales: 3500, orders: 25 },
    { hour: '12:00', sales: 4800, orders: 35 },
    { hour: '15:00', sales: 4200, orders: 30 },
    { hour: '18:00', sales: 3800, orders: 28 },
    { hour: '21:00', sales: 2500, orders: 18 },
  ];

  const topProducts = [
    { name: 'Product A', revenue: 12500, quantity: 250, growth: '+15%' },
    { name: 'Product B', revenue: 9800, quantity: 180, growth: '+8%' },
    { name: 'Product C', revenue: 7600, quantity: 150, growth: '+5%' },
    { name: 'Product D', revenue: 6400, quantity: 120, growth: '-3%' },
    { name: 'Product E', revenue: 5200, quantity: 90, growth: '+10%' },
  ];

  const salesByCategory = [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 25 },
    { name: 'Food', value: 20 },
    { name: 'Others', value: 20 },
  ];

  const paymentMethods = [
    { name: 'Cash', value: 45 },
    { name: 'Credit Card', value: 30 },
    { name: 'GCash', value: 15 },
    { name: 'Maya', value: 10 },
  ];

  const customerSegments = [
    { name: 'Regular', value: 40 },
    { name: 'New', value: 25 },
    { name: 'VIP', value: 20 },
    { name: 'One-time', value: 15 },
  ];

  const COLORS = ['#FF5722', '#FF7043', '#FF8A65', '#FFAB91'];

  const detailedSales = [
    {
      id: 'ORD001',
      date: '2024-02-20 14:30',
      customer: 'Juan Dela Cruz',
      items: [
        { name: 'Product A', quantity: 2, price: '₱450' },
        { name: 'Product B', quantity: 1, price: '₱350' },
      ],
      paymentMethod: 'Credit Card',
      subtotal: '₱1,250',
      tax: '₱150',
      total: '₱1,400',
      status: 'Completed'
    },
    {
      id: 'ORD002',
      date: '2024-02-20 14:30',
      customer: 'Maria Santos',
      items: [
        { name: 'Product C', quantity: 1, price: '₱250' },
        { name: 'Product D', quantity: 2, price: '₱400' },
      ],
      paymentMethod: 'Cash',
      subtotal: '₱650',
      tax: '₱78',
      total: '₱728',
      status: 'Completed'
    },
    {
      id: 'ORD003',
      date: '2024-02-20 14:30',
      customer: 'Pedro Garcia',
      items: [
        { name: 'Product E', quantity: 3, price: '₱750' },
      ],
      paymentMethod: 'GCash',
      subtotal: '₱2,250',
      tax: '₱270',
      total: '₱2,520',
      status: 'Pending'
    },
    {
      id: 'ORD004',
      date: '2024-02-19 14:30',
      customer: 'Ana Reyes',
      items: [
        { name: 'Product A', quantity: 1, price: '₱450' },
      ],
      paymentMethod: 'Maya',
      subtotal: '₱450',
      tax: '₱54',
      total: '₱504',
      status: 'Completed'
    },
    {
      id: 'ORD005',
      date: '2024-02-19 14:30',
      customer: 'Jose Cruz',
      items: [
        { name: 'Product B', quantity: 2, price: '₱700' },
        { name: 'Product C', quantity: 1, price: '₱250' },
      ],
      paymentMethod: 'Credit Card',
      subtotal: '₱1,950',
      tax: '₱234',
      total: '₱2,184',
      status: 'Completed'
    },
  ];

  const recentTransactions = [
    { id: 'ORD001', date: '2024-02-20', customer: 'Juan Dela Cruz', items: 3, total: '₱1,250', status: 'Completed' },
    { id: 'ORD002', date: '2024-02-20', customer: 'Maria Santos', items: 2, total: '₱890', status: 'Completed' },
    { id: 'ORD003', date: '2024-02-20', customer: 'Pedro Garcia', items: 4, total: '₱2,100', status: 'Pending' },
    { id: 'ORD004', date: '2024-02-19', customer: 'Ana Reyes', items: 1, total: '₱450', status: 'Completed' },
    { id: 'ORD005', date: '2024-02-19', customer: 'Jose Cruz', items: 5, total: '₱3,200', status: 'Completed' },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ 
      width: '100%',
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden',
      p: 3
    }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#FF5722', fontWeight: 'bold' }}>
        Sales Report
      </Typography>

      {/* Date Range Selector */}
      <Paper 
        elevation={2}
        sx={{ 
          width: '100%',
          p: { xs: 2, sm: 3 },
          mb: 3,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    sx: { bgcolor: 'white' }
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    sx: { bgcolor: 'white' }
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Refresh />}
              size="small"
              sx={{
                bgcolor: '#FF5722',
                '&:hover': { bgcolor: '#F4511E' },
                height: '40px'
              }}
            >
              Update Report
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Download />}
                  size="small"
                  sx={{
                    borderColor: '#FF5722',
                    color: '#FF5722',
                    height: '40px',
                    '&:hover': {
                      borderColor: '#F4511E',
                      bgcolor: 'rgba(244, 81, 30, 0.04)'
                    }
                  }}
                >
                  Export
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Print />}
                  size="small"
                  sx={{
                    borderColor: '#FF5722',
                    color: '#FF5722',
                    height: '40px',
                    '&:hover': {
                      borderColor: '#F4511E',
                      bgcolor: 'rgba(244, 81, 30, 0.04)'
                    }
                  }}
                >
                  Print
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Metrics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {salesMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: 500 }}>
                    {metric.title}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: 'rgba(255, 87, 34, 0.1)',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    color: '#FF5722'
                  }}>
                    {metric.icon}
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                  {metric.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={metric.increase}
                    size="small"
                    sx={{ 
                      bgcolor: metric.increase.startsWith('+') ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                      color: metric.increase.startsWith('+') ? '#4CAF50' : '#F44336',
                      fontWeight: 500
                    }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {metric.subtext}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Paper 
        elevation={2} 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              px: { xs: 2, sm: 3 },
              '& .MuiTab-root': { 
                minWidth: { xs: 'auto', sm: 160 },
                minHeight: '48px'
              }
            }}
          >
            <Tab 
              label="Overview" 
              icon={<TrendingUp />} 
              iconPosition="start"
            />
            <Tab 
              label="Top Products" 
              icon={<ShoppingCart />} 
              iconPosition="start"
            />
            <Tab 
              label="Transactions" 
              icon={<AttachMoney />} 
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <Box sx={{ flexGrow: 1, overflow: 'auto', p: { xs: 2, sm: 3 } }}>
          {/* Overview Tab */}
          {currentTab === 0 && (
            <Grid container spacing={3}>
              {/* Sales Chart */}
              <Grid item xs={12} lg={8}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 2,
                    height: '400px',
                    bgcolor: 'rgba(255, 255, 255, 0.5)'
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>Sales Overview</Typography>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailySales}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="#FF5722" name="Sales (₱)" />
                      <Bar dataKey="orders" fill="#F4511E" name="Orders" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* Distribution Charts */}
              <Grid item xs={12} lg={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 2,
                    height: '400px',
                    bgcolor: 'rgba(255, 255, 255, 0.5)'
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>Sales Distribution</Typography>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {salesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* Hourly Sales Chart */}
              <Grid item xs={12}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 2,
                    height: '300px',
                    bgcolor: 'rgba(255, 255, 255, 0.5)'
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>Hourly Sales</Typography>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlySales}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="#FF5722" name="Sales (₱)" />
                      <Line type="monotone" dataKey="orders" stroke="#F4511E" name="Orders" />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Top Products Tab */}
          {currentTab === 1 && (
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="right">Quantity Sold</TableCell>
                    <TableCell align="right">Growth</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topProducts.map((product) => (
                    <TableRow
                      key={product.name}
                      sx={{ '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
                    >
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell align="right">₱{product.revenue.toLocaleString()}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={product.growth}
                          size="small"
                          sx={{ 
                            bgcolor: product.growth.startsWith('+') ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                            color: product.growth.startsWith('+') ? '#4CAF50' : '#F44336'
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Transactions Tab */}
          {currentTab === 2 && (
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Items</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      sx={{ '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
                    >
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell align="right">{transaction.items}</TableCell>
                      <TableCell align="right">{transaction.total}</TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.status}
                          size="small"
                          color={transaction.status === 'Completed' ? 'success' : 'warning'}
                          sx={{ minWidth: 90 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default SalesReportContent;
