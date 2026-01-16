import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import SuperAdminDashBoard from './SuperAdminDashBoard/SuperAdminDashboard';
import CreateAdminComponent from './SuperAdminDashBoard/CreateAdmin';
import AdminDashBoard from './AdminDashboard/AdminDashboard';
import CreateUserComponent from './AdminDashboard/CreateSubAdmin';
import ManageSubAdmins from './AdminDashboard/ManageSubAdmins';
import Warehouse from './AdminDashboard/Warehouse';
import Inventory from './AdminDashboard/Inventory';
import Products from './AdminDashboard/Products';
import Subscription from './AdminDashboard/Subscription';
import BusinessModule from './AdminDashboard/BusinessModule';
import DevicesCams from './AdminDashboard/DevicesCams';
import Invoices from './AdminDashboard/Invoices';
import Payments from './AdminDashboard/Payments';
import Clients from './AdminDashboard/Clients';
import ClientDashboard from './ClientDashboard/ClientDashboard';
import ManageCustomers from './ClientDashboard/ManageCustomers';
import SoldProducts from './ClientDashboard/SoldProducts';

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false); // Close sidebar when resizing to desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={handleCloseSidebar}
      />

      {/* MAIN WRAPPER */}
      <div
        className="main-content"
        style={{
          flex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s ease",
          width: '100%',
        }}
      >
        {/* HEADER */}
        <Header
          isMobile={isMobile}
          onToggleSidebar={handleToggleSidebar}
        />

        {/* PAGE CONTENT */}
        <div
          style={{
            flex: 1,
            padding: isMobile ? "20px" : "30px",
          }}
        >
          <Routes>
            {/* Admin and Superadmin routes */}
            <Route path="/" element={<SuperAdminDashBoard />} />
            <Route path="/superAdminDashboard" element={<SuperAdminDashBoard />} />
            <Route path="/adminDashboard" element={<AdminDashBoard />} />
            <Route path="/createAdmin" element={<CreateAdminComponent />} />
            <Route path="/createSubAdmin" element={<CreateUserComponent />} />
            <Route path="/manageSubAdmin" element={<ManageSubAdmins />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/businessModule" element={<BusinessModule />} />
            <Route path="/products" element={<Products />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/devices" element={<DevicesCams />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/payments" element={<Payments />} />
            {/* Client Routes */}
            <Route path="/clientDashboard" element={<ClientDashboard />} />
            <Route path="/manageCustomers" element={<ManageCustomers />} />
            <Route path="/soldProducts" element={<SoldProducts />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;