import React, { useState, useEffect } from 'react';
import Card from '../Components/Cards';
import WorldMap from '../Components/WorldMap';
import { useTheme } from '../Theme/ThemeContext';
import { useThemeValues } from '../Theme/Theme';

const SuperAdminDashBoard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { mode, color } = useTheme();
  const theme = useThemeValues();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample table data
  const initialTableData = [
    { id: 1, user: 'John Smith', email: 'john@example.com', status: 'Active', role: 'Admin', lastLogin: '2 hours ago' },
    { id: 2, user: 'Sarah Johnson', email: 'sarah@example.com', status: 'Active', role: 'Manager', lastLogin: '1 day ago' },
    { id: 3, user: 'Mike Chen', email: 'mike@example.com', status: 'Inactive', role: 'Developer', lastLogin: '3 days ago' },
    { id: 4, user: 'Emily Davis', email: 'emily@example.com', status: 'Active', role: 'Designer', lastLogin: '5 hours ago' },
    { id: 5, user: 'Alex Brown', email: 'alex@example.com', status: 'Active', role: 'Manager', lastLogin: '12 hours ago' },
    { id: 6, user: 'David Wilson', email: 'david@example.com', status: 'Active', role: 'Admin', lastLogin: '6 hours ago' },
    { id: 7, user: 'Lisa Anderson', email: 'lisa@example.com', status: 'Inactive', role: 'Developer', lastLogin: '1 week ago' },
    { id: 8, user: 'Robert Taylor', email: 'robert@example.com', status: 'Active', role: 'Analyst', lastLogin: '4 hours ago' }
  ];

  // Filter table data based on search term
  const filteredTableData = initialTableData.filter(user =>
    user.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status colors based on theme
  const statusColors = {
    light: {
      active: { bg: '#dcfce7', text: '#166534' },
      inactive: { bg: '#fef2f2', text: '#dc2626' }
    },
    dark: {
      active: { bg: 'rgba(21, 128, 61, 0.3)', text: '#86efac' },
      inactive: { bg: 'rgba(220, 38, 38, 0.3)', text: '#fca5a5' }
    }
  };

  // Button colors based on theme mode AND color selection
  const getButtonColors = () => {
    const primaryColor = theme.palette.primary;
    
    // Generate hover color (darker version of primary)
    const hoverColor = mode === 'light' 
      ? theme.palette.primary.replace(/[^,]+(?=\))/, match => {
          const num = parseInt(match);
          return Math.max(0, num - 40);
        })
      : theme.palette.primary;
    
    const secondaryColor = mode === 'light' ? '#f1f5f9' : '#334155';
    const secondaryHover = mode === 'light' ? '#e2e8f0' : '#475569';
    
    const dangerColor = mode === 'light' ? '#ef4444' : '#f87171';
    const dangerHover = mode === 'light' ? '#dc2626' : '#ef4444';

    return {
      primary: { normal: primaryColor, hover: hoverColor },
      secondary: { normal: secondaryColor, hover: secondaryHover },
      danger: { normal: dangerColor, hover: dangerHover }
    };
  };

  const buttonColors = getButtonColors();

  // Quick action colors using theme primary color
  const quickActionColors = [
    { icon: '👥', label: 'Add User', desc: 'Add new user to system' },
    { icon: '📊', label: 'Generate Report', desc: 'Create analytics report' },
    { icon: '⚙️', label: 'System Settings', desc: 'Configure system settings' },
    { icon: '🛡️', label: 'Security Scan', desc: 'Run security audit' }
  ];

  return (
    <div style={{
      padding: '0',
      backgroundColor: theme.palette.bg.body,
      minHeight: '100vh',
      transition: 'background-color 0.3s ease'
    }}>
      {/* Welcome Header - Using theme gradient */}
      <div style={{
        background: theme.palette.bg.cardGradient,
        padding: isMobile ? '20px' : '30px',
        borderRadius: '12px',
        marginBottom: '30px',
        color: theme.palette.text.onCard,
        transition: 'all 0.3s ease'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: isMobile ? '20px' : '28px',
          color: theme.palette.text.onCard,
          transition: 'color 0.3s ease'
        }}>
          Welcome back, Super Admin! 👋
        </h1>

        <p style={{
          marginTop: '8px',
          fontSize: isMobile ? '14px' : '16px',
          color: theme.palette.text.onCard,
          opacity: 0.9,
          transition: 'color 0.3s ease'
        }}>
          Here's what's happening with your platform today.
        </p>
      </div>

      {/* Search Bar */}
      <div style={{
        marginBottom: '30px',
        padding: '0 10px'
      }}>
        <input
          type="text"
          placeholder="Search users by name, email, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '14px 20px',
            border: `1px solid ${theme.palette.border}`,
            borderRadius: '8px',
            fontSize: '14px',
            background: theme.palette.bg.card,
            color: theme.palette.text.primary,
            boxShadow: theme.palette.shadow,
            transition: 'all 0.3s ease',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = theme.palette.primary;
            e.target.style.boxShadow = `0 0 0 3px ${mode === 'light' ? theme.palette.primaryLight : theme.palette.primary}20`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = theme.palette.border;
            e.target.style.boxShadow = theme.palette.shadow;
          }}
        />
      </div>

      {/* Stats Cards Grid */}
      <div style={{
        padding: "0 10px 20px 10px",
        display: "grid",
        gridTemplateColumns: isMobile
          ? "1fr"
          : isTablet
            ? "repeat(2, 1fr)"
            : "repeat(4, 1fr)",
        gap: "20px",
      }}>
        <Card
          text="Total Users"
          heading="2,489"
          image="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
        />

        <Card
          text="Active Projects"
          heading="156"
          image="https://cdn-icons-png.flaticon.com/512/942/942748.png"
        />

        <Card
          text="Revenue"
          heading="$89,887"
          image="https://cdn-icons-png.flaticon.com/512/1827/1827301.png"
        />

        <Card
          text="Growth Rate"
          heading="24.5%"
          image="https://cdn-icons-png.flaticon.com/512/3079/3079195.png"
        />
      </div>

      {/* Full Width Map Container */}
      <div
        style={{
          background: theme.palette.bg.card,
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: theme.palette.shadow,
          border: `1px solid ${theme.palette.border}`,
          margin: "0 10px",
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <h3 style={{
            margin: 0,
            color: theme.palette.text.primary,
            transition: 'color 0.3s ease'
          }}>
            Global User Distribution Map
          </h3>
          <div style={{
            fontSize: '14px',
            color: theme.palette.text.muted,
            display: 'flex',
            gap: '20px',
            transition: 'color 0.3s ease'
          }}>
            <span>🌍 Total Users: 2,489</span>
            <span>📍 Active Regions: 42</span>
          </div>
        </div>
        <WorldMap />
      </div>

      {/* Table Section */}
      <div style={{
        background: theme.palette.bg.card,
        borderRadius: '12px',
        padding: '24px',
        boxShadow: theme.palette.shadow,
        border: `1px solid ${theme.palette.border}`,
        margin: '0 10px',
        marginTop: '30px',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div>
            <h3 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '600',
              color: theme.palette.text.primary,
              transition: 'color 0.3s ease'
            }}>
              User Management
            </h3>
            {searchTerm && (
              <p style={{
                margin: '5px 0 0 0',
                fontSize: '14px',
                color: theme.palette.text.muted,
                fontStyle: 'italic',
                transition: 'color 0.3s ease'
              }}>
                Showing results for: <strong style={{ color: theme.palette.primary }}>"{searchTerm}"</strong>
              </p>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '14px',
                color: theme.palette.text.secondary,
                transition: 'color 0.3s ease'
              }}>
                Show:
              </span>
              <select style={{
                padding: '6px 12px',
                border: `1px solid ${theme.palette.border}`,
                borderRadius: '6px',
                fontSize: '14px',
                background: theme.palette.bg.card,
                color: theme.palette.text.primary,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.palette.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${mode === 'light' ? theme.palette.primaryLight : theme.palette.primary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.palette.border;
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option>All Users</option>
                <option>Active Only</option>
                <option>Admins</option>
              </select>
            </div>
            <button style={{
              padding: '10px 20px',
              background: buttonColors.primary.normal,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
              onMouseOver={(e) => e.target.style.background = buttonColors.primary.hover}
              onMouseOut={((e) => e.target.style.background = buttonColors.primary.normal)}
            >
              <span>👥</span>
              <span>Add New User</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '800px'
          }}>
            <thead>
              <tr style={{
                borderBottom: `2px solid ${theme.palette.border}`,
                background: mode === 'light' ? '#f8fafc' : '#1e293b',
                transition: 'background 0.3s ease'
              }}>
                {['User', 'Status', 'Role', 'Last Login', 'Actions'].map((header, index) => (
                  <th 
                    key={index}
                    style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: theme.palette.text.secondary,
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTableData.length > 0 ? (
                filteredTableData.map((row) => (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: `1px solid ${theme.palette.border}`,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = mode === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          background: theme.palette.bg.cardGradient,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px'
                        }}>
                          {row.user.charAt(0)}
                        </div>
                        <div>
                          <div style={{
                            fontWeight: '600',
                            color: theme.palette.text.primary,
                            transition: 'color 0.3s ease'
                          }}>
                            {row.user}
                          </div>
                          <div style={{
                            fontSize: '13px',
                            color: theme.palette.text.muted,
                            transition: 'color 0.3s ease'
                          }}>
                            {row.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: statusColors[mode][row.status === 'Active' ? 'active' : 'inactive'].bg,
                        color: statusColors[mode][row.status === 'Active' ? 'active' : 'inactive'].text,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.3s ease'
                      }}>
                        {row.status === 'Active' ? '●' : '○'}
                        {row.status}
                      </span>
                    </td>
                    <td style={{
                      padding: '16px',
                      color: theme.palette.text.secondary,
                      fontWeight: '500',
                      transition: 'color 0.3s ease'
                    }}>
                      {row.role}
                    </td>
                    <td style={{
                      padding: '16px',
                      color: theme.palette.text.muted,
                      fontSize: '14px',
                      transition: 'color 0.3s ease'
                    }}>
                      {row.lastLogin}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{
                          padding: '6px 12px',
                          background: buttonColors.secondary.normal,
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: theme.palette.text.primary,
                          transition: 'all 0.2s ease'
                        }}
                          onMouseOver={(e) => {
                            e.target.style.background = buttonColors.secondary.hover;
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background = buttonColors.secondary.normal;
                          }}
                        >
                          Edit
                        </button>
                        <button style={{
                          padding: '6px 12px',
                          background: buttonColors.danger.normal,
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: 'white',
                          transition: 'all 0.2s ease'
                        }}
                          onMouseOver={(e) => {
                            e.target.style.background = buttonColors.danger.hover;
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background = buttonColors.danger.normal;
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: theme.palette.text.muted,
                    transition: 'color 0.3s ease'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔍</div>
                    <p style={{ fontSize: '16px', margin: '0 0 8px 0', color: theme.palette.text.primary }}>
                      No users found for "{searchTerm}"
                    </p>
                    <p style={{ fontSize: '14px', opacity: 0.7, color: theme.palette.text.muted }}>
                      Try a different search term
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredTableData.length > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: '15px',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: `1px solid ${theme.palette.border}`
          }}>
            <div style={{
              fontSize: '14px',
              color: theme.palette.text.muted,
              transition: 'color 0.3s ease'
            }}>
              Showing {filteredTableData.length} of {initialTableData.length} users
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '8px 12px',
                background: buttonColors.secondary.normal,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                color: theme.palette.text.primary,
                transition: 'all 0.2s ease'
              }}
                onMouseOver={(e) => {
                  e.target.style.background = buttonColors.secondary.hover;
                }}
                onMouseOut={(e) => {
                  e.target.style.background = buttonColors.secondary.normal;
                }}
              >
                Previous
              </button>
              <button style={{
                padding: '8px 12px',
                background: buttonColors.primary.normal,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
                onMouseOver={(e) => {
                  e.target.style.background = buttonColors.primary.hover;
                }}
                onMouseOut={(e) => {
                  e.target.style.background = buttonColors.primary.normal;
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions - Using theme colors */}
      <div style={{
        background: theme.palette.bg.card,
        borderRadius: '12px',
        padding: '24px',
        boxShadow: theme.palette.shadow,
        border: `1px solid ${theme.palette.border}`,
        margin: '30px 10px',
        transition: 'all 0.3s ease'
      }}>
        <h3 style={{
          margin: '0 0 20px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: theme.palette.text.primary,
          transition: 'color 0.3s ease'
        }}>
          Quick Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          {quickActionColors.map((action, index) => {
            const bgColor = mode === 'light' ? `${theme.palette.primary}10` : `${theme.palette.primary}20`;
            const borderColor = mode === 'light' ? `${theme.palette.primary}30` : `${theme.palette.primary}40`;
            const textColor = mode === 'light' ? theme.palette.primary : '#ffffff';
            const hoverBgColor = theme.palette.primary;
            
            return (
              <button
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '20px',
                  background: bgColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  color: textColor,
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = hoverBgColor;
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = theme.palette.shadowLg;
                }}
                onMouseOut={(e) => {
                  e.target.style.background = bgColor;
                  e.target.style.color = textColor;
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '24px', marginBottom: '10px' }}>{action.icon}</span>
                <span style={{ marginBottom: '5px' }}>{action.label}</span>
                <span style={{
                  fontSize: '12px',
                  opacity: 0.7,
                  fontWeight: 'normal'
                }}>
                  {action.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashBoard;