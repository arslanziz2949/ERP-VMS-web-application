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
  Badge,
  Alert,
  Snackbar,
  Divider
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
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as AttachMoneyIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageCustomers = () => {
  const navigate = useNavigate();
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
        return { bgcolor: '#f5f5f5', color: '#757575' };
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

  if (loading) {
    return (
      <Container>
        <Typography>Loading customers...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            Manage Customers
          </Typography>
          <Typography variant="body1" color="textSecondary">
            View, add, edit, and manage your customer database
          </Typography>
        </Box>

        {/* Search and Actions Bar */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
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
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                startIcon={<FilterIcon />}
                variant="outlined"
                sx={{ textTransform: 'none' }}
              >
                Filter
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddCustomer}
                sx={{ textTransform: 'none' }}
              >
                Add New Customer
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                {customers.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Customers
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                {customers.filter(c => c.status === 'active').length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Active Customers
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Orders
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
                {formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0))}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Revenue
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Customers Table */}
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell align="center">Orders</TableCell>
                  <TableCell align="right">Total Spent</TableCell>
                  <TableCell align="center">Last Order</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow 
                    key={customer.id}
                    hover
                    sx={{ '&:hover': { bgcolor: '#fafafa' } }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#1976d2' }}>
                          {customer.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                            {customer.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Customer since {formatDate(customer.customerSince)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EmailIcon sx={{ fontSize: 16, color: '#757575' }} />
                          {customer.email}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <PhoneIcon sx={{ fontSize: 16, color: '#757575' }} />
                          {customer.phone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={customer.totalOrders} 
                        size="small"
                        sx={{ bgcolor: '#e3f2fd', color: '#1976d2', fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                        {formatCurrency(customer.totalSpent)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" color="textSecondary">
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
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEditCustomer(customer)}
                        title="Edit"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, customer)}
                        title="More Actions"
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
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="textSecondary">
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
        >
          {selectedCustomer && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: '#1976d2', width: 48, height: 48 }}>
                    {selectedCustomer.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedCustomer.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Customer Details
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                      Contact Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon color="action" />
                        <Typography variant="body2">{selectedCustomer.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon color="action" />
                        <Typography variant="body2">{selectedCustomer.phone}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon color="action" />
                        <Typography variant="body2">{selectedCustomer.address}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                      Order Statistics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="h6" color="primary">
                            {selectedCustomer.totalOrders}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Total Orders
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="h6" color="success">
                            {formatCurrency(selectedCustomer.totalSpent)}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Total Spent
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom color="textSecondary">
                      Activity Timeline
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#e8f5e9' }}>
                          <CalendarIcon sx={{ fontSize: 16, color: '#2e7d32' }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2">
                            Last order placed on {formatDate(selectedCustomer.lastOrder)}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Most recent purchase
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#e3f2fd' }}>
                          <PersonIcon sx={{ fontSize: 16, color: '#1976d2' }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2">
                            Customer since {formatDate(selectedCustomer.customerSince)}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Registered date
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Close</Button>
                <Button 
                  variant="contained"
                  onClick={() => {
                    setOpenDialog(false);
                    handleEditCustomer(selectedCustomer);
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
        >
          <MenuItem onClick={() => handleAction('view')}>
            <ViewIcon fontSize="small" sx={{ mr: 1 }} />
            View Details
          </MenuItem>
          <MenuItem onClick={() => handleAction('edit')}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit Customer
          </MenuItem>
          <MenuItem onClick={() => handleAction('email')}>
            <EmailIcon fontSize="small" sx={{ mr: 1 }} />
            Send Email
          </MenuItem>
          <MenuItem onClick={() => handleAction('call')}>
            <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
            Make Call
          </MenuItem>
          <Divider />
          <MenuItem 
            onClick={() => handleAction('delete')}
            sx={{ color: '#d32f2f' }}
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
        >
          <Alert 
            severity={snackbar.severity} 
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ManageCustomers;