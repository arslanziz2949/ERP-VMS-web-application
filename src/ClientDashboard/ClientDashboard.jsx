import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  LinearProgress,
  IconButton,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge
} from '@mui/material';
import {
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as AttachMoneyIcon,
  Inventory as InventoryIcon,
  Receipt as ReceiptIcon,
  Payment as PaymentIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Add as AddIcon
} from '@mui/icons-material';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeProducts: 0,
    soldThisMonth: 0,
    totalRevenue: 0,
    pendingInvoices: 0,
    pendingPayments: 0
  });

  // Sample data for recent activities
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'sale', customer: 'John Doe', product: 'Product A', amount: '$250', time: '2 hours ago' },
    { id: 2, type: 'payment', customer: 'Jane Smith', invoice: '#INV-001', amount: '$150', time: '4 hours ago' },
    { id: 3, type: 'customer', customer: 'New Customer', action: 'registered', time: '1 day ago' },
    { id: 4, type: 'product', product: 'Product B', action: 'added', time: '2 days ago' },
  ]);

  // Sample data for recent customers
  const [recentCustomers, setRecentCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', totalSpent: '$1250' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 891', totalSpent: '$850' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 234 567 892', totalSpent: '$420' },
  ]);

  // Sample data for top selling products
  const [topProducts, setTopProducts] = useState([
    { id: 1, name: 'Product A', category: 'Electronics', price: '$250', sold: 45, revenue: '$11,250' },
    { id: 2, name: 'Product B', category: 'Clothing', price: '$80', sold: 78, revenue: '$6,240' },
    { id: 3, name: 'Product C', category: 'Books', price: '$35', sold: 120, revenue: '$4,200' },
  ]);

  useEffect(() => {
    // Check if user is logged in and is a client
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      const user = localStorage.getItem('user');

      if (!token || !user) {
        toast.error('Please login first');
        navigate('/login');
        return;
      }

      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser.role !== 'client') {
          toast.error('Access denied. Client access only.');
          navigate('/login');
          return;
        }

        setUserData(parsedUser);
        
        // Mock stats data
        setStats({
          totalCustomers: 245,
          activeProducts: 78,
          soldThisMonth: 156,
          totalRevenue: 45250,
          pendingInvoices: 12,
          pendingPayments: 5
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  // Dashboard stat cards
  const statCards = [
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      color: '#1976d2',
      bgColor: '#e3f2fd',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Active Products',
      value: stats.activeProducts,
      icon: <InventoryIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
      color: '#2e7d32',
      bgColor: '#e8f5e9',
      change: '+5%',
      changeType: 'increase'
    },
    {
      title: 'Sold This Month',
      value: stats.soldThisMonth,
      icon: <ShoppingCartIcon sx={{ fontSize: 40, color: '#ed6c02' }} />,
      color: '#ed6c02',
      bgColor: '#fff3e0',
      change: '+23%',
      changeType: 'increase'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: <AttachMoneyIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
      color: '#9c27b0',
      bgColor: '#f3e5f5',
      change: '+18%',
      changeType: 'increase'
    },
    {
      title: 'Pending Invoices',
      value: stats.pendingInvoices,
      icon: <ReceiptIcon sx={{ fontSize: 40, color: '#d32f2f' }} />,
      color: '#d32f2f',
      bgColor: '#ffebee',
      change: '-3%',
      changeType: 'decrease'
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments,
      icon: <PaymentIcon sx={{ fontSize: 40, color: '#7b1fa2' }} />,
      color: '#7b1fa2',
      bgColor: '#f3e5f5',
      change: '+2',
      changeType: 'increase'
    }
  ];

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LinearProgress sx={{ width: '50%' }} />
      </Container>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Paper sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: 2,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              Welcome back, {userData?.first_name || userData?.username || 'Client'}!
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Manage your business efficiently from one dashboard
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Container maxWidth="xl">
        {/* Stats Cards Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Card sx={{ 
                borderRadius: 2, 
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        {card.title}
                      </Typography>
                      <Typography variant="h5" sx={{ color: card.color, fontWeight: 'bold' }}>
                        {card.value}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: '50%', 
                      bgcolor: card.bgColor 
                    }}>
                      {card.icon}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {card.changeType === 'increase' ? (
                      <ArrowUpwardIcon sx={{ color: '#2e7d32', fontSize: 16 }} />
                    ) : (
                      <ArrowDownwardIcon sx={{ color: '#d32f2f', fontSize: 16 }} />
                    )}
                    <Typography variant="caption" sx={{ 
                      color: card.changeType === 'increase' ? '#2e7d32' : '#d32f2f',
                      fontWeight: 'medium'
                    }}>
                      {card.change} this month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Left Column - Recent Activities & Top Products */}
          <Grid item xs={12} lg={8}>
            {/* Recent Activities */}
            <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Recent Activities
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => navigate('/client/activities')}
                  sx={{ textTransform: 'none' }}
                >
                  View All
                </Button>
              </Box>
              
              <List>
                {recentActivities.map((activity) => (
                  <ListItem 
                    key={activity.id}
                    sx={{ 
                      mb: 1, 
                      p: 2, 
                      bgcolor: '#fafafa', 
                      borderRadius: 1,
                      '&:hover': { bgcolor: '#f0f0f0' }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        bgcolor: activity.type === 'sale' ? '#1976d2' : 
                                 activity.type === 'payment' ? '#2e7d32' :
                                 activity.type === 'customer' ? '#9c27b0' : '#ed6c02'
                      }}>
                        {activity.type === 'sale' ? <ShoppingCartIcon /> :
                         activity.type === 'payment' ? <PaymentIcon /> :
                         activity.type === 'customer' ? <PersonIcon /> : <InventoryIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {activity.type === 'sale' ? `Sale to ${activity.customer}` :
                             activity.type === 'payment' ? `Payment from ${activity.customer}` :
                             activity.type === 'customer' ? `New customer: ${activity.customer}` :
                             `Product ${activity.action}: ${activity.product}`}
                          </Typography>
                          {activity.amount && (
                            <Chip 
                              label={activity.amount} 
                              size="small" 
                              sx={{ bgcolor: '#e8f5e9', color: '#2e7d32' }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color="textSecondary">
                          {activity.time}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Top Selling Products */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Top Selling Products
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => navigate('/client/products')}
                  sx={{ textTransform: 'none' }}
                >
                  View All Products
                </Button>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Sold</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topProducts.map((product) => (
                      <TableRow 
                        key={product.id}
                        hover
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/client/products/${product.id}`)}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>
                              <InventoryIcon sx={{ fontSize: 16 }} />
                            </Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                              {product.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={product.category} 
                            size="small" 
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {product.price}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            {product.sold}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                            {product.revenue}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Right Column - Recent Customers & Summary */}
          <Grid item xs={12} lg={4}>
            {/* Recent Customers */}
            <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Recent Customers
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => navigate('/client/customers')}
                  sx={{ textTransform: 'none' }}
                >
                  View All
                </Button>
              </Box>
              
              <List>
                {recentCustomers.map((customer) => (
                  <ListItem 
                    key={customer.id}
                    sx={{ 
                      mb: 1, 
                      p: 2, 
                      bgcolor: '#fafafa', 
                      borderRadius: 1,
                      '&:hover': { bgcolor: '#f0f0f0' }
                    }}
                    onClick={() => navigate(`/client/customers/${customer.id}`)}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#9c27b0' }}>
                        {customer.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                          {customer.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="textSecondary">
                            {customer.email}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                            <Typography variant="caption" color="textSecondary">
                              {customer.phone}
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                              {customer.totalSpent} spent
                            </Typography>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Profile & Business Summary */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Business Summary
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    bgcolor: '#1976d2',
                    fontSize: '2.5rem',
                    mb: 2
                  }}
                >
                  {userData?.first_name?.charAt(0) || userData?.username?.charAt(0) || 'C'}
                </Avatar>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {userData?.first_name || userData?.username || 'Client User'}
                  </Typography>
                  <Chip 
                    label="BUSINESS CLIENT" 
                    size="small" 
                    sx={{ 
                      bgcolor: '#1976d2', 
                      color: 'white',
                      fontWeight: 'bold',
                      mt: 1
                    }} 
                  />
                </Box>

                <Divider sx={{ width: '100%', my: 2 }} />

                {/* Summary Stats */}
                <Box sx={{ width: '100%' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: '#e8f5e9', borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                          {stats.activeProducts}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Active Products
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                          {stats.totalCustomers}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Total Customers
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ width: '100%', mt: 2 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Contact Information
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    📧 {userData?.email || 'No email provided'}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    📱 {userData?.phone_number || 'No phone provided'}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<SettingsIcon />}
                  onClick={() => navigate('/client/settings')}
                  sx={{ mt: 2 }}
                >
                  Business Settings
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <ToastContainer />
    </Box>
  );
};

export default ClientDashboard;