import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
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
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  Alert,
  Snackbar,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  MoreVert as MoreVertIcon,
  CalendarToday as CalendarIcon,
  ArrowUpward as ArrowUpwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useThemeValues } from '../Theme/theme'; // Adjust path as needed
import Card from '../Components/Cards';

const ManageCustomers = () => {
  const navigate = useNavigate();
  const theme = useThemeValues();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Sample data - Replace with API call
  const sampleCustomers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      address: '123 Main St, New York',
      totalOrders: 15,
      totalSpent: 1250,
      lastOrder: '2024-01-15',
      status: 'active',
      customerSince: '2023-05-10'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 891',
      address: '456 Oak Ave, Los Angeles',
      totalOrders: 8,
      totalSpent: 850,
      lastOrder: '2024-01-10',
      status: 'active',
      customerSince: '2023-08-22'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+1 234 567 892',
      address: '789 Pine Rd, Chicago',
      totalOrders: 22,
      totalSpent: 3200,
      lastOrder: '2024-01-12',
      status: 'inactive',
      customerSince: '2022-11-05'
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice@example.com',
      phone: '+1 234 567 893',
      address: '321 Elm St, Houston',
      totalOrders: 5,
      totalSpent: 420,
      lastOrder: '2024-01-08',
      status: 'active',
      customerSince: '2023-12-01'
    },
    {
      id: 5,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      phone: '+1 234 567 894',
      address: '654 Maple Dr, Phoenix',
      totalOrders: 12,
      totalSpent: 1800,
      lastOrder: '2024-01-14',
      status: 'active',
      customerSince: '2023-06-15'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCustomers(sampleCustomers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleAddCustomer = () => {
    navigate('/client/customers/add');
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setOpenDialog(true);
  };

  const handleEditCustomer = (customer) => {
    navigate(`/client/customers/edit/${customer.id}`);
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== customerId));
      setSnackbar({
        open: true,
        message: 'Customer deleted successfully',
        severity: 'success'
      });
    }
  };

  const handleMenuOpen = (event, customer) => {
    setAnchorEl(event.currentTarget);
    setSelectedAction(customer);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAction(null);
  };

  const handleAction = (action) => {
    if (selectedAction) {
      switch (action) {
        case 'view':
          handleViewCustomer(selectedAction);
          break;
        case 'edit':
          handleEditCustomer(selectedAction);
          break;
        case 'delete':
          handleDeleteCustomer(selectedAction.id);
          break;
        case 'email':
          window.location.href = `mailto:${selectedAction.email}`;
          break;
        case 'call':
          window.location.href = `tel:${selectedAction.phone}`;
          break;
        default:
          break;
      }
    }
    handleMenuClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return { bgcolor: '#e8f5e9', color: '#2e7d32' };
      case 'inactive':
        return { bgcolor: '#ffebee', color: '#d32f2f' };
      default:
        return { bgcolor: theme.palette.bg.header, color: theme.palette.text.secondary };
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Stats cards data
  const statsCards = [
    {
      text: 'Total Customers',
      heading: customers.length.toString(),
      image: '👥', // Replace with actual icon
      change: '+12%',
      changeType: 'increase'
    },
    {
      text: 'Active Customers',
      heading: customers.filter(c => c.status === 'active').length.toString(),
      image: '✅',
      change: '+8%',
      changeType: 'increase'
    },
    {
      text: 'Total Orders',
      heading: customers.reduce((sum, c) => sum + c.totalOrders, 0).toString(),
      image: '📦',
      change: '+23%',
      changeType: 'increase'
    },
    {
      text: 'Total Revenue',
      heading: formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0)),
      image: '💰',
      change: '+18%',
      changeType: 'increase'
    }
  ];

  if (loading) {
    return (
      <Box sx={{
        flexGrow: 1,
        bgcolor: theme.palette.bg.body,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Container sx={{ textAlign: 'center' }}>
          <LinearProgress sx={{ width: '50%', mx: 'auto', mb: 2 }} />
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            Loading customers...
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{
      flexGrow: 1,
      bgcolor: theme.palette.bg.body,
      minHeight: '100vh',
      p: 3,
      transition: 'background-color 0.3s ease'
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{
            fontWeight: 'bold',
            mb: 1,
            color: theme.palette.text.primary
          }}>
            Manage Customers
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            View, add, edit, and manage your customer database
          </Typography>
        </Box>

        {/* Search and Actions Bar */}
        <Paper sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          bgcolor: theme.palette.bg.card,
          border: `1px solid ${theme.palette.border}`,
          boxShadow: theme.palette.shadow,
          '&:hover': {
            boxShadow: theme.palette.shadowLg
          }
        }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.palette.text.muted }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: theme.palette.bg.header,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.border
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary
                    }
                  }
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                startIcon={<FilterIcon />}
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  borderColor: theme.palette.primary,
                  color: theme.palette.primary,
                  '&:hover': {
                    borderColor: theme.palette.primary,
                    backgroundColor: theme.palette.primaryLight
                  }
                }}
              >
                Filter
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddCustomer}
                sx={{
                  textTransform: 'none',
                  background: theme.palette.bg.cardGradient,
                  color: theme.palette.text.onCard,
                  '&:hover': {
                    opacity: 0.9
                  }
                }}
              >
                Add New Customer
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Stats Cards - Using your custom Card component */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                text={card.text}
                heading={card.heading}
                image={card.image}
              />
            </Grid>
          ))}
        </Grid>

        {/* Customers Table */}
        <Paper sx={{
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: theme.palette.bg.card,
          border: `1px solid ${theme.palette.border}`,
          boxShadow: theme.palette.shadow,
          '&:hover': {
            boxShadow: theme.palette.shadowLg
          }
        }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: theme.palette.bg.header }}>
                <TableRow>
                  <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                    Customer
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                    Contact
                  </TableCell>
                  <TableCell align="center" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                    Orders
                  </TableCell>
                  <TableCell align="right" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                    Total Spent
                  </TableCell>
                  <TableCell align="center" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                    Last Order
                  </TableCell>
                  <TableCell align="center" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    hover
                    sx={{
                      '&:hover': {
                        bgcolor: theme.mode === 'light' ? '#fafafa' : theme.palette.bg.header
                      }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{
                          bgcolor: theme.palette.primary,
                          color: 'white'
                        }}>
                          {customer.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{
                            fontWeight: 'medium',
                            color: theme.palette.text.primary
                          }}>
                            {customer.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: theme.palette.text.muted }}>
                            Customer since {formatDate(customer.customerSince)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: theme.palette.text.secondary
                        }}>
                          <EmailIcon sx={{ fontSize: 16, color: theme.palette.text.muted }} />
                          {customer.email}
                        </Typography>
                        <Typography variant="body2" sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mt: 0.5,
                          color: theme.palette.text.secondary
                        }}>
                          <PhoneIcon sx={{ fontSize: 16, color: theme.palette.text.muted }} />
                          {customer.phone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={customer.totalOrders}
                        size="small"
                        sx={{
                          bgcolor: theme.palette.primaryLight,
                          color: theme.palette.primary,
                          fontWeight: 'bold'
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2" sx={{
                        fontWeight: 'bold',
                        color: theme.palette.primary
                      }}>
                        {formatCurrency(customer.totalSpent)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {formatDate(customer.lastOrder)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={customer.status.toUpperCase()}
                        size="small"
                        sx={{
                          ...getStatusColor(customer.status),
                          fontWeight: 'bold'
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleViewCustomer(customer)}
                        title="View Details"
                        sx={{
                          color: theme.palette.primary,
                          '&:hover': {
                            backgroundColor: theme.palette.primaryLight
                          }
                        }}
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEditCustomer(customer)}
                        title="Edit"
                        sx={{
                          color: theme.palette.primary,
                          '&:hover': {
                            backgroundColor: theme.palette.primaryLight
                          }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, customer)}
                        title="More Actions"
                        sx={{
                          color: theme.palette.text.secondary,
                          '&:hover': {
                            backgroundColor: theme.palette.bg.header
                          }
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredCustomers.length === 0 && (
            <Box sx={{
              p: 4,
              textAlign: 'center',
              bgcolor: theme.palette.bg.card
            }}>
              <Typography variant="body1" sx={{ color: theme.palette.text.muted }}>
                No customers found matching your search
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Customer Details Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: theme.palette.bg.card,
              border: `1px solid ${theme.palette.border}`,
              boxShadow: theme.palette.shadowLg
            }
          }}
        >
          {selectedCustomer && (
            <>
              <DialogTitle sx={{
                bgcolor: theme.palette.bg.header,
                borderBottom: `1px solid ${theme.palette.border}`
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{
                    bgcolor: theme.palette.primary,
                    color: 'white',
                    width: 48,
                    height: 48
                  }}>
                    {selectedCustomer.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                      {selectedCustomer.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      Customer Details
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent dividers sx={{ bgcolor: theme.palette.bg.card }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: theme.palette.text.muted }}>
                      Contact Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon sx={{ color: theme.palette.text.muted }} />
                        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                          {selectedCustomer.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon sx={{ color: theme.palette.text.muted }} />
                        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                          {selectedCustomer.phone}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon sx={{ color: theme.palette.text.muted }} />
                        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                          {selectedCustomer.address}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: theme.palette.text.muted }}>
                      Order Statistics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Paper sx={{
                          p: 2,
                          textAlign: 'center',
                          bgcolor: theme.palette.bg.header,
                          border: `1px solid ${theme.palette.border}`
                        }}>
                          <Typography variant="h6" sx={{ color: theme.palette.primary }}>
                            {selectedCustomer.totalOrders}
                          </Typography>
                          <Typography variant="caption" sx={{ color: theme.palette.text.muted }}>
                            Total Orders
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper sx={{
                          p: 2,
                          textAlign: 'center',
                          bgcolor: theme.palette.bg.header,
                          border: `1px solid ${theme.palette.border}`
                        }}>
                          <Typography variant="h6" sx={{ color: '#2e7d32' }}>
                            {formatCurrency(selectedCustomer.totalSpent)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: theme.palette.text.muted }}>
                            Total Spent
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: theme.palette.text.muted }}>
                      Activity Timeline
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{
                          width: 32,
                          height: 32,
                          bgcolor: theme.palette.primaryLight
                        }}>
                          <CalendarIcon sx={{ fontSize: 16, color: theme.palette.primary }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                            Last order placed on {formatDate(selectedCustomer.lastOrder)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: theme.palette.text.muted }}>
                            Most recent purchase
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{
                          width: 32,
                          height: 32,
                          bgcolor: theme.palette.primaryLight
                        }}>
                          <PersonIcon sx={{ fontSize: 16, color: theme.palette.primary }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                            Customer since {formatDate(selectedCustomer.customerSince)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: theme.palette.text.muted }}>
                            Registered date
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{
                bgcolor: theme.palette.bg.header,
                borderTop: `1px solid ${theme.palette.border}`,
                p: 2
              }}>
                <Button
                  onClick={() => setOpenDialog(false)}
                  sx={{
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      backgroundColor: theme.palette.bg.card
                    }
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenDialog(false);
                    handleEditCustomer(selectedCustomer);
                  }}
                  sx={{
                    background: theme.palette.bg.cardGradient,
                    color: theme.palette.text.onCard,
                    '&:hover': {
                      opacity: 0.9
                    }
                  }}
                >
                  Edit Customer
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              bgcolor: theme.palette.bg.card,
              border: `1px solid ${theme.palette.border}`,
              boxShadow: theme.palette.shadowLg,
              minWidth: 180
            }
          }}
        >
          <MenuItem
            onClick={() => handleAction('view')}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': { bgcolor: theme.palette.bg.header }
            }}
          >
            <ViewIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary }} />
            View Details
          </MenuItem>
          <MenuItem
            onClick={() => handleAction('edit')}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': { bgcolor: theme.palette.bg.header }
            }}
          >
            <EditIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary }} />
            Edit Customer
          </MenuItem>
          <MenuItem
            onClick={() => handleAction('email')}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': { bgcolor: theme.palette.bg.header }
            }}
          >
            <EmailIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary }} />
            Send Email
          </MenuItem>
          <MenuItem
            onClick={() => handleAction('call')}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': { bgcolor: theme.palette.bg.header }
            }}
          >
            <PhoneIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary }} />
            Make Call
          </MenuItem>
          <Divider sx={{ borderColor: theme.palette.border }} />
          <MenuItem
            onClick={() => handleAction('delete')}
            sx={{
              color: '#d32f2f',
              '&:hover': {
                bgcolor: theme.mode === 'light' ? '#ffebee' : '#450a0a'
              }
            }}
          >
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete Customer
          </MenuItem>
        </Menu>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            sx={{
              boxShadow: theme.palette.shadowLg,
              bgcolor: theme.palette.bg.card,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.border}`
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ManageCustomers;