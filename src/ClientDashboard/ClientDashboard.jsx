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
  Card as MuiCard,
  CardContent,
  Button,
  Avatar,
  LinearProgress,
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
  IconButton
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
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useThemeValues } from '../Theme/theme'; // Adjust path as needed
import Card from '../Components/Cards';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const theme = useThemeValues();
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

  // Dashboard stat cards with theme integration
  const statCards = [
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toString(),
      text: 'Total Customers',
      heading: stats.totalCustomers.toString(),
      image: '👥', // You'll need to replace with actual icons
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Active Products',
      value: stats.activeProducts.toString(),
      text: 'Active Products',
      heading: stats.activeProducts.toString(),
      image: '📦',
      change: '+5%',
      changeType: 'increase'
    },
    {
      title: 'Sold This Month',
      value: stats.soldThisMonth.toString(),
      text: 'Sold This Month',
      heading: stats.soldThisMonth.toString(),
      image: '🛒',
      change: '+23%',
      changeType: 'increase'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      text: 'Total Revenue',
      heading: `$${stats.totalRevenue.toLocaleString()}`,
      image: '💰',
      change: '+18%',
      changeType: 'increase'
    },
    {
      title: 'Pending Invoices',
      value: stats.pendingInvoices.toString(),
      text: 'Pending Invoices',
      heading: stats.pendingInvoices.toString(),
      image: '📄',
      change: '-3%',
      changeType: 'decrease'
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments.toString(),
      text: 'Pending Payments',
      heading: stats.pendingPayments.toString(),
      image: '💳',
      change: '+2',
      changeType: 'increase'
    }
  ];

  if (loading) {
    return (
      <Container sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        bgcolor: theme.palette.bg.body 
      }}>
        <LinearProgress sx={{ width: '50%' }} />
      </Container>
    );
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      bgcolor: theme.palette.bg.body, 
      minHeight: '100vh',
      transition: 'background-color 0.3s ease'
    }}>
      {/* Header */}
      <Paper sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: 2,
        background: theme.palette.bg.cardGradient,
        color: theme.palette.text.onCard,
        boxShadow: theme.palette.shadowLg
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold', 
              mb: 1,
              color: theme.palette.text.onCard
            }}>
              Welcome back, {userData?.first_name || userData?.username || 'Client'}!
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9, color: theme.palette.text.onCard }}>
              Manage your business efficiently from one dashboard
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Container maxWidth="xl">
        {/* Stats Cards Grid - Using your custom Card component */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Card
                text={card.text}
                heading={card.heading}
                image={card.image}
              />
            </Grid>
          ))}
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Left Column - Recent Activities & Top Products */}
          <Grid item xs={12} lg={8}>
            {/* Recent Activities */}
            <Paper sx={{ 
              p: 3, 
              borderRadius: 2, 
              mb: 3,
              bgcolor: theme.palette.bg.card,
              border: `1px solid ${theme.palette.border}`,
              boxShadow: theme.palette.shadow,
              '&:hover': {
                boxShadow: theme.palette.shadowLg
              }
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 'bold',
                  color: theme.palette.text.primary
                }}>
                  Recent Activities
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => navigate('/client/activities')}
                  sx={{ 
                    textTransform: 'none',
                    color: theme.palette.primary,
                    '&:hover': {
                      backgroundColor: theme.palette.primaryLight
                    }
                  }}
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
                      bgcolor: theme.mode === 'light' ? '#fafafa' : theme.palette.bg.body, 
                      borderRadius: 1,
                      border: `1px solid ${theme.palette.border}`,
                      '&:hover': { 
                        bgcolor: theme.mode === 'light' ? '#f0f0f0' : theme.palette.bg.header 
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        bgcolor: activity.type === 'sale' ? theme.palette.primary : 
                                 activity.type === 'payment' ? '#2e7d32' :
                                 activity.type === 'customer' ? '#9c27b0' : '#ed6c02',
                        color: 'white'
                      }}>
                        {activity.type === 'sale' ? <ShoppingCartIcon /> :
                         activity.type === 'payment' ? <PaymentIcon /> :
                         activity.type === 'customer' ? <PersonIcon /> : <InventoryIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ 
                            fontWeight: 'medium',
                            color: theme.palette.text.primary
                          }}>
                            {activity.type === 'sale' ? `Sale to ${activity.customer}` :
                             activity.type === 'payment' ? `Payment from ${activity.customer}` :
                             activity.type === 'customer' ? `New customer: ${activity.customer}` :
                             `Product ${activity.action}: ${activity.product}`}
                          </Typography>
                          {activity.amount && (
                            <Chip 
                              label={activity.amount} 
                              size="small" 
                              sx={{ 
                                bgcolor: theme.palette.primaryLight, 
                                color: theme.palette.primary,
                                fontWeight: 'medium'
                              }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color={theme.palette.text.muted}>
                          {activity.time}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Top Selling Products */}
            <Paper sx={{ 
              p: 3, 
              borderRadius: 2,
              bgcolor: theme.palette.bg.card,
              border: `1px solid ${theme.palette.border}`,
              boxShadow: theme.palette.shadow,
              '&:hover': {
                boxShadow: theme.palette.shadowLg
              }
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 'bold',
                  color: theme.palette.text.primary
                }}>
                  Top Selling Products
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => navigate('/client/products')}
                  sx={{ 
                    textTransform: 'none',
                    color: theme.palette.primary,
                    '&:hover': {
                      backgroundColor: theme.palette.primaryLight
                    }
                  }}
                >
                  View All Products
                </Button>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: theme.palette.bg.header }}>
                      <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                        Product Name
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                        Category
                      </TableCell>
                      <TableCell align="right" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                        Price
                      </TableCell>
                      <TableCell align="right" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                        Sold
                      </TableCell>
                      <TableCell align="right" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                        Revenue
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topProducts.map((product) => (
                      <TableRow 
                        key={product.id}
                        hover
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: theme.palette.bg.header
                          }
                        }}
                        onClick={() => navigate(`/client/products/${product.id}`)}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ 
                              bgcolor: theme.palette.primary, 
                              color: 'white',
                              width: 32, 
                              height: 32 
                            }}>
                              <InventoryIcon sx={{ fontSize: 16 }} />
                            </Avatar>
                            <Typography variant="body2" sx={{ 
                              fontWeight: 'medium',
                              color: theme.palette.text.primary
                            }}>
                              {product.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={product.category} 
                            size="small" 
                            variant="outlined"
                            sx={{ 
                              borderColor: theme.palette.primary,
                              color: theme.palette.text.primary
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ 
                            fontWeight: 'bold',
                            color: theme.palette.text.primary
                          }}>
                            {product.price}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                            {product.sold}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ 
                            fontWeight: 'bold', 
                            color: theme.palette.primary
                          }}>
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
            <Paper sx={{ 
              p: 3, 
              borderRadius: 2, 
              mb: 3,
              bgcolor: theme.palette.bg.card,
              border: `1px solid ${theme.palette.border}`,
              boxShadow: theme.palette.shadow,
              '&:hover': {
                boxShadow: theme.palette.shadowLg
              }
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 'bold',
                  color: theme.palette.text.primary
                }}>
                  Recent Customers
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => navigate('/client/customers')}
                  sx={{ 
                    textTransform: 'none',
                    color: theme.palette.primary,
                    '&:hover': {
                      backgroundColor: theme.palette.primaryLight
                    }
                  }}
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
                      bgcolor: theme.mode === 'light' ? '#fafafa' : theme.palette.bg.body,
                      borderRadius: 1,
                      border: `1px solid ${theme.palette.border}`,
                      cursor: 'pointer',
                      '&:hover': { 
                        bgcolor: theme.mode === 'light' ? '#f0f0f0' : theme.palette.bg.header 
                      }
                    }}
                    onClick={() => navigate(`/client/customers/${customer.id}`)}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        bgcolor: theme.palette.primary,
                        color: 'white'
                      }}>
                        {customer.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ 
                          fontWeight: 'medium',
                          color: theme.palette.text.primary
                        }}>
                          {customer.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color={theme.palette.text.muted}>
                            {customer.email}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                            <Typography variant="caption" color={theme.palette.text.muted}>
                              {customer.phone}
                            </Typography>
                            <Typography variant="caption" sx={{ 
                              fontWeight: 'bold', 
                              color: theme.palette.primary
                            }}>
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
            <Paper sx={{ 
              p: 3, 
              borderRadius: 2,
              bgcolor: theme.palette.bg.card,
              border: `1px solid ${theme.palette.border}`,
              boxShadow: theme.palette.shadow,
              '&:hover': {
                boxShadow: theme.palette.shadowLg
              }
            }}>
              <Typography variant="h6" sx={{ 
                mb: 3, 
                fontWeight: 'bold',
                color: theme.palette.text.primary
              }}>
                Business Summary
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    bgcolor: theme.palette.primary,
                    color: 'white',
                    fontSize: '2.5rem',
                    mb: 2
                  }}
                >
                  {userData?.first_name?.charAt(0) || userData?.username?.charAt(0) || 'C'}
                </Avatar>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 'bold',
                    color: theme.palette.text.primary
                  }}>
                    {userData?.first_name || userData?.username || 'Client User'}
                  </Typography>
                  <Chip 
                    label="BUSINESS CLIENT" 
                    size="small" 
                    sx={{ 
                      bgcolor: theme.palette.primary, 
                      color: 'white',
                      fontWeight: 'bold',
                      mt: 1
                    }} 
                  />
                </Box>

                <Divider sx={{ 
                  width: '100%', 
                  my: 2,
                  borderColor: theme.palette.border
                }} />

                {/* Summary Stats */}
                <Box sx={{ width: '100%' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        textAlign: 'center', 
                        p: 1.5, 
                        bgcolor: theme.palette.primaryLight, 
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.primary}`
                      }}>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 'bold', 
                          color: theme.palette.primary
                        }}>
                          {stats.activeProducts}
                        </Typography>
                        <Typography variant="caption" color={theme.palette.text.muted}>
                          Active Products
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        textAlign: 'center', 
                        p: 1.5, 
                        bgcolor: theme.palette.primaryLight, 
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.primary}`
                      }}>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 'bold', 
                          color: theme.palette.primary
                        }}>
                          {stats.totalCustomers}
                        </Typography>
                        <Typography variant="caption" color={theme.palette.text.muted}>
                          Total Customers
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ width: '100%', mt: 2 }}>
                  <Typography variant="body2" color={theme.palette.text.muted} gutterBottom>
                    Contact Information
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    mb: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    color: theme.palette.text.secondary
                  }}>
                    📧 {userData?.email || 'No email provided'}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    color: theme.palette.text.secondary
                  }}>
                    📱 {userData?.phone_number || 'No phone provided'}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<SettingsIcon />}
                  onClick={() => navigate('/client/settings')}
                  sx={{ 
                    mt: 2,
                    borderColor: theme.palette.primary,
                    color: theme.palette.primary,
                    '&:hover': {
                      borderColor: theme.palette.primary,
                      backgroundColor: theme.palette.primaryLight
                    }
                  }}
                >
                  Business Settings
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default ClientDashboard;