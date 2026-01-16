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
  Tabs,
  Tab,
  Select,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Visibility as ViewIcon,
  Receipt as ReceiptIcon,
  AttachMoney as AttachMoneyIcon,
  ShoppingCart as ShoppingCartIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Inventory as InventoryIcon,
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SoldProducts = () => {
  const navigate = useNavigate();
  const [soldProducts, setSoldProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [tabValue, setTabValue] = useState(0);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample data - Replace with API call
  const sampleSoldProducts = [
    {
      id: 1,
      invoiceNo: 'INV-001',
      productName: 'iPhone 14 Pro',
      productCode: 'PROD-001',
      customerName: 'John Doe',
      saleDate: '2024-01-15',
      quantity: 1,
      unitPrice: 999,
      totalAmount: 999,
      paymentStatus: 'paid',
      deliveryStatus: 'delivered',
      paymentMethod: 'Credit Card',
      category: 'Electronics',
      commission: 50
    },
    {
      id: 2,
      invoiceNo: 'INV-002',
      productName: 'MacBook Pro',
      productCode: 'PROD-002',
      customerName: 'Jane Smith',
      saleDate: '2024-01-14',
      quantity: 1,
      unitPrice: 1299,
      totalAmount: 1299,
      paymentStatus: 'paid',
      deliveryStatus: 'shipped',
      paymentMethod: 'PayPal',
      category: 'Electronics',
      commission: 65
    },
    {
      id: 3,
      invoiceNo: 'INV-003',
      productName: 'Wireless Headphones',
      productCode: 'PROD-003',
      customerName: 'Bob Johnson',
      saleDate: '2024-01-13',
      quantity: 2,
      unitPrice: 199,
      totalAmount: 398,
      paymentStatus: 'pending',
      deliveryStatus: 'processing',
      paymentMethod: 'Cash',
      category: 'Accessories',
      commission: 20
    },
    {
      id: 4,
      invoiceNo: 'INV-004',
      productName: 'Smart Watch',
      productCode: 'PROD-004',
      customerName: 'Alice Williams',
      saleDate: '2024-01-12',
      quantity: 1,
      unitPrice: 299,
      totalAmount: 299,
      paymentStatus: 'paid',
      deliveryStatus: 'delivered',
      paymentMethod: 'Credit Card',
      category: 'Wearables',
      commission: 30
    },
    {
      id: 5,
      invoiceNo: 'INV-005',
      productName: 'Gaming Console',
      productCode: 'PROD-005',
      customerName: 'Charlie Brown',
      saleDate: '2024-01-10',
      quantity: 1,
      unitPrice: 499,
      totalAmount: 499,
      paymentStatus: 'partial',
      deliveryStatus: 'shipped',
      paymentMethod: 'Bank Transfer',
      category: 'Gaming',
      commission: 40
    },
    {
      id: 6,
      invoiceNo: 'INV-006',
      productName: 'Bluetooth Speaker',
      productCode: 'PROD-006',
      customerName: 'David Wilson',
      saleDate: '2024-01-08',
      quantity: 3,
      unitPrice: 89,
      totalAmount: 267,
      paymentStatus: 'paid',
      deliveryStatus: 'delivered',
      paymentMethod: 'Credit Card',
      category: 'Audio',
      commission: 13
    },
    {
      id: 7,
      invoiceNo: 'INV-007',
      productName: '4K Monitor',
      productCode: 'PROD-007',
      customerName: 'Emma Davis',
      saleDate: '2024-01-05',
      quantity: 1,
      unitPrice: 399,
      totalAmount: 399,
      paymentStatus: 'paid',
      deliveryStatus: 'delivered',
      paymentMethod: 'PayPal',
      category: 'Computer',
      commission: 35
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSoldProducts(sampleSoldProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getFilteredProducts = () => {
    let filtered = soldProducts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tab value
    if (tabValue === 1) {
      filtered = filtered.filter(product => product.paymentStatus === 'paid');
    } else if (tabValue === 2) {
      filtered = filtered.filter(product => product.paymentStatus === 'pending');
    } else if (tabValue === 3) {
      filtered = filtered.filter(product => product.paymentStatus === 'partial');
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(product => product.deliveryStatus === statusFilter);
    }

    // Filter by date range
    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter(product => {
        const saleDate = new Date(product.saleDate);
        return saleDate >= dateRange.startDate && saleDate <= dateRange.endDate;
      });
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleGenerateInvoice = (product) => {
    toast.success(`Invoice ${product.invoiceNo} generated successfully`);
    // Generate PDF or open invoice view
  };

  const handleSendInvoice = (product) => {
    toast.info(`Invoice ${product.invoiceNo} sent to ${product.customerName}`);
    // Email sending logic
  };

  const handleMenuOpen = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedAction(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAction(null);
  };

  const handleAction = (action) => {
    if (selectedAction) {
      switch (action) {
        case 'view':
          handleViewDetails(selectedAction);
          break;
        case 'invoice':
          handleGenerateInvoice(selectedAction);
          break;
        case 'email':
          handleSendInvoice(selectedAction);
          break;
        case 'print':
          window.print();
          break;
        default:
          break;
      }
    }
    handleMenuClose();
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return { bgcolor: '#e8f5e9', color: '#2e7d32' };
      case 'pending':
        return { bgcolor: '#fff3e0', color: '#ed6c02' };
      case 'partial':
        return { bgcolor: '#e3f2fd', color: '#1976d2' };
      default:
        return { bgcolor: '#f5f5f5', color: '#757575' };
    }
  };

  const getDeliveryStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return { bgcolor: '#e8f5e9', color: '#2e7d32' };
      case 'shipped':
        return { bgcolor: '#e3f2fd', color: '#1976d2' };
      case 'processing':
        return { bgcolor: '#fff3e0', color: '#ed6c02' };
      case 'cancelled':
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

  const calculateStats = () => {
    const totalSales = filteredProducts.reduce((sum, p) => sum + p.totalAmount, 0);
    const totalCommission = filteredProducts.reduce((sum, p) => sum + p.commission, 0);
    const totalItems = filteredProducts.reduce((sum, p) => sum + p.quantity, 0);
    const paidSales = filteredProducts.filter(p => p.paymentStatus === 'paid').length;

    return {
      totalSales,
      totalCommission,
      totalItems,
      paidSales,
      totalOrders: filteredProducts.length
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <Container>
        <Typography>Loading sold products...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              Sold Products
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Track and manage all your product sales and transactions
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {stats.totalOrders}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Orders
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                  {formatCurrency(stats.totalSales)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Sales
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
                  {formatCurrency(stats.totalCommission)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Commission
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                  {stats.totalItems}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Items Sold
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                  {stats.paidSales}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Paid Orders
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                  {stats.totalOrders - stats.paidSales}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Pending Orders
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Filters and Tabs */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="All Sales" />
                  <Tab label="Paid" />
                  <Tab label="Pending" />
                  <Tab label="Partial" />
                </Tabs>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search by product, invoice, or customer..."
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
              
              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Delivery Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Delivery Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={2}>
                <DatePicker
                  label="Start Date"
                  value={dateRange.startDate}
                  onChange={(date) => setDateRange({ ...dateRange, startDate: date })}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
              </Grid>
              
              <Grid item xs={12} md={2}>
                <DatePicker
                  label="End Date"
                  value={dateRange.endDate}
                  onChange={(date) => setDateRange({ ...dateRange, endDate: date })}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
              </Grid>
              
              <Grid item xs={12} md={2} sx={{ display: 'flex', gap: 1 }}>
                <Button
                  startIcon={<DownloadIcon />}
                  variant="outlined"
                  sx={{ textTransform: 'none' }}
                  onClick={() => toast.success('Export started')}
                >
                  Export
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Sold Products Table */}
          <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell>Invoice #</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="center">Sale Date</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total Amount</TableCell>
                    <TableCell align="center">Payment</TableCell>
                    <TableCell align="center">Delivery</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow 
                      key={product.id}
                      hover
                      sx={{ '&:hover': { bgcolor: '#fafafa' } }}
                    >
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                          {product.invoiceNo}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {product.productCode}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: '#9c27b0' }}>
                            <InventoryIcon fontSize="small" />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                              {product.productName}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {product.category}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon sx={{ fontSize: 16, color: '#757575' }} />
                          <Typography variant="body2">
                            {product.customerName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {formatDate(product.saleDate)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={product.quantity} 
                          size="small"
                          sx={{ bgcolor: '#e3f2fd', color: '#1976d2', fontWeight: 'bold' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {formatCurrency(product.unitPrice)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                          {formatCurrency(product.totalAmount)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={product.paymentStatus.toUpperCase()}
                          size="small"
                          sx={{
                            ...getPaymentStatusColor(product.paymentStatus),
                            fontWeight: 'bold'
                          }}
                        />
                        <Typography variant="caption" display="block" color="textSecondary">
                          {product.paymentMethod}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={product.deliveryStatus.toUpperCase()}
                          size="small"
                          sx={{
                            ...getDeliveryStatusColor(product.deliveryStatus),
                            fontWeight: 'bold'
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(product)}
                          title="View Details"
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, product)}
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

            {filteredProducts.length === 0 && (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                  No sold products found matching your filters
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Product Details Dialog */}
          <Dialog 
            open={openDialog} 
            onClose={() => setOpenDialog(false)}
            maxWidth="md"
            fullWidth
          >
            {selectedProduct && (
              <>
                <DialogTitle>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ReceiptIcon sx={{ color: '#1976d2' }} />
                    <Box>
                      <Typography variant="h6">Sale Details - {selectedProduct.invoiceNo}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Complete sale information
                      </Typography>
                    </Box>
                  </Box>
                </DialogTitle>
                <DialogContent dividers>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom color="textSecondary">
                        Product Information
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {selectedProduct.productName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Product Code: {selectedProduct.productCode}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ShoppingCartIcon color="action" />
                          <Typography variant="body2">
                            Category: {selectedProduct.category}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <InventoryIcon color="action" />
                          <Typography variant="body2">
                            Quantity: {selectedProduct.quantity}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom color="textSecondary">
                        Customer Information
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon color="action" />
                          <Typography variant="body2">
                            {selectedProduct.customerName}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            Sale Date: {formatDate(selectedProduct.saleDate)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom color="textSecondary">
                        Financial Details
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="body2" color="textSecondary">
                              Unit Price
                            </Typography>
                            <Typography variant="h6" color="primary">
                              {formatCurrency(selectedProduct.unitPrice)}
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="body2" color="textSecondary">
                              Total Amount
                            </Typography>
                            <Typography variant="h6" color="success">
                              {formatCurrency(selectedProduct.totalAmount)}
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="body2" color="textSecondary">
                              Commission
                            </Typography>
                            <Typography variant="h6" color="warning">
                              {formatCurrency(selectedProduct.commission)}
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="body2" color="textSecondary">
                              Net Amount
                            </Typography>
                            <Typography variant="h6" color="info">
                              {formatCurrency(selectedProduct.totalAmount - selectedProduct.commission)}
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom color="textSecondary">
                        Status Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Chip
                              label={selectedProduct.paymentStatus.toUpperCase()}
                              sx={{
                                ...getPaymentStatusColor(selectedProduct.paymentStatus),
                                fontWeight: 'bold'
                              }}
                            />
                            <Typography variant="body2">
                              Payment Method: {selectedProduct.paymentMethod}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Chip
                              label={selectedProduct.deliveryStatus.toUpperCase()}
                              sx={{
                                ...getDeliveryStatusColor(selectedProduct.deliveryStatus),
                                fontWeight: 'bold'
                              }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenDialog(false)}>Close</Button>
                  <Button 
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={() => handleAction('print')}
                  >
                    Print Invoice
                  </Button>
                  <Button 
                    variant="contained"
                    startIcon={<EmailIcon />}
                    onClick={() => handleAction('email')}
                  >
                    Send Invoice
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
            <MenuItem onClick={() => handleAction('invoice')}>
              <ReceiptIcon fontSize="small" sx={{ mr: 1 }} />
              Generate Invoice
            </MenuItem>
            <MenuItem onClick={() => handleAction('email')}>
              <EmailIcon fontSize="small" sx={{ mr: 1 }} />
              Send Invoice
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => handleAction('print')}>
              <PrintIcon fontSize="small" sx={{ mr: 1 }} />
              Print
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
      </LocalizationProvider>
    </Box>
  );
};

export default SoldProducts;