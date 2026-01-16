import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, Trash2, Plus } from 'lucide-react';

const Projects = () => {
    // Sample project data (removed priority, startDate, endDate, teamSize, budget from display)
    const initialProjects = [
        {
            id: 1,
            projectName: 'E-Commerce Platform',
            projectCode: 'ECP-2024-001',
            client: 'TechCorp Inc.',
            status: 'Active',
            progress: 75,
            technology: ['React', 'Node.js', 'MongoDB'],
            projectManager: 'John Doe'
        },
        {
            id: 2,
            projectName: 'Mobile Banking App',
            projectCode: 'MBA-2024-002',
            client: 'Global Bank',
            status: 'Completed',
            progress: 100,
            technology: ['React Native', 'Python', 'PostgreSQL'],
            projectManager: 'Jane Smith'
        },
        {
            id: 3,
            projectName: 'Inventory Management',
            projectCode: 'IMS-2024-003',
            client: 'Retail Pro',
            status: 'Active',
            progress: 40,
            technology: ['Vue.js', 'Express', 'MySQL'],
            projectManager: 'Robert Brown'
        },
        {
            id: 4,
            projectName: 'CRM System',
            projectCode: 'CRM-2024-004',
            client: 'SalesForce Pro',
            status: 'On Hold',
            progress: 20,
            technology: ['Angular', 'Java', 'Oracle'],
            projectManager: 'Sarah Wilson'
        },
        {
            id: 5,
            projectName: 'Analytics Dashboard',
            projectCode: 'ADB-2024-005',
            client: 'Data Insights Ltd',
            status: 'Planning',
            progress: 10,
            technology: ['React', 'D3.js', 'Firebase'],
            projectManager: 'Mike Johnson'
        },
        {
            id: 6,
            projectName: 'Healthcare Portal',
            projectCode: 'HCP-2024-006',
            client: 'MediCare Solutions',
            status: 'Active',
            progress: 65,
            technology: ['React', 'TypeScript', 'AWS'],
            projectManager: 'Emily Davis'
        },
        {
            id: 7,
            projectName: 'Learning Management',
            projectCode: 'LMS-2024-007',
            client: 'EduTech Inc.',
            status: 'Completed',
            progress: 100,
            technology: ['Next.js', 'NestJS', 'MongoDB'],
            projectManager: 'David Lee'
        },
        {
            id: 8,
            projectName: 'IoT Monitoring',
            projectCode: 'IOT-2024-008',
            client: 'Smart Systems',
            status: 'Delayed',
            progress: 85,
            technology: ['Python', 'Django', 'PostgreSQL'],
            projectManager: 'Lisa Wang'
        }
    ];

    const [projects, setProjects] = useState(initialProjects);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    // Status options
    const statusOptions = ['All', 'Active', 'Completed', 'On Hold', 'Planning', 'Delayed'];

    // Filter and search projects
    const filteredProjects = projects.filter(project => {
        const matchesSearch = 
            project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.projectManager.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'All' || project.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Sorting function
    const sortedProjects = [...filteredProjects].sort((a, b) => {
        if (!sortConfig.key) return 0;
        
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    // Handle sort
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return '#10b981';
            case 'Completed': return '#3b82f6';
            case 'On Hold': return '#f59e0b';
            case 'Planning': return '#8b5cf6';
            case 'Delayed': return '#ef4444';
            default: return '#6b7280';
        }
    };

    // Handle delete project
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            setProjects(projects.filter(project => project.id !== id));
        }
    };

    return (
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '24px'
        }}>
            {/* Header Section */}
            <div style={{
                marginBottom: '30px',
                paddingBottom: '20px',
                borderBottom: '1px solid #e2e8f0'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <div>
                        <h1 style={{
                            margin: 0,
                            fontSize: '28px',
                            fontWeight: '700',
                            color: '#1e293b',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <span style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '20px'
                            }}>
                                📋
                            </span>
                            Projects
                        </h1>
                        <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: '#64748b' }}>
                            Manage and track all your projects in one place
                        </p>
                    </div>

                    <button style={{
                        padding: '12px 24px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#2563eb'}
                    onMouseOut={(e) => e.target.style.background = '#3b82f6'}>
                        <Plus size={18} />
                        Add New Project
                    </button>
                </div>

                {/* Stats Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                    marginTop: '30px'
                }}>
                    {[
                        { label: 'Total Projects', value: projects.length, color: '#3b82f6', icon: '📊' },
                        { label: 'Active', value: projects.filter(p => p.status === 'Active').length, color: '#10b981', icon: '🚀' },
                        { label: 'Completed', value: projects.filter(p => p.status === 'Completed').length, color: '#8b5cf6', icon: '✅' }
                    ].map((stat, index) => (
                        <div key={index} style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                                        {stat.label}
                                    </div>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '4px' }}>
                                        {stat.value}
                                    </div>
                                </div>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: `${stat.color}20`,
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    color: stat.color
                                }}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Filters and Search Section */}
            <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr auto',
                    gap: '16px',
                    alignItems: 'end'
                }}>
                    {/* Search Input */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '8px'
                        }}>
                            Search Projects
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#9ca3af'
                            }} />
                            <input
                                type="text"
                                placeholder="Search by project name, code, client..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '60%',
                                    padding: '12px 12px 12px 40px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    transition: 'border-color 0.2s ease'
                                }}
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '8px'
                        }}>
                            Status
                        </label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '14px',
                                background: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            {statusOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Projects Table */}
            <div style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{
                    overflowX: 'auto',
                    maxHeight: '600px',
                    overflowY: 'auto'
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        minWidth: '900px'
                    }}>
                        <thead style={{
                            background: '#f8fafc',
                            borderBottom: '2px solid #e2e8f0',
                            position: 'sticky',
                            top: 0,
                            zIndex: 10
                        }}>
                            <tr>
                                {[
                                    { key: 'projectName', label: 'Project Name', width: '250px' },
                                    { key: 'projectCode', label: 'Project Code', width: '120px' },
                                    { key: 'client', label: 'Client', width: '150px' },
                                    { key: 'status', label: 'Status', width: '120px' },
                                    { key: 'progress', label: 'Progress', width: '200px' },
                                    { key: 'projectManager', label: 'Manager', width: '150px' },
                                    { key: 'actions', label: 'Actions', width: '120px' }
                                ].map((column) => (
                                    <th key={column.key} style={{
                                        padding: '16px',
                                        textAlign: 'left',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: '#64748b',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        borderRight: '1px solid #e2e8f0',
                                        width: column.width,
                                        cursor: column.key !== 'actions' ? 'pointer' : 'default'
                                    }}
                                    onClick={() => column.key !== 'actions' && requestSort(column.key)}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {column.label}
                                            {sortConfig.key === column.key && (
                                                <span style={{ fontSize: '10px' }}>
                                                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProjects.map((project) => (
                                <tr key={project.id} style={{
                                    borderBottom: '1px solid #e2e8f0',
                                    transition: 'background 0.2s ease'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
                                    {/* Project Name */}
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: '600', color: '#1e293b' }}>
                                            {project.projectName}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                {project.technology.map((tech, index) => (
                                                    <span key={index} style={{
                                                        padding: '2px 8px',
                                                        background: '#f3f4f6',
                                                        borderRadius: '4px',
                                                        fontSize: '11px'
                                                    }}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Project Code */}
                                    <td style={{ padding: '16px' }}>
                                        <div style={{
                                            padding: '4px 8px',
                                            background: '#f0f9ff',
                                            color: '#0369a1',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            display: 'inline-block'
                                        }}>
                                            {project.projectCode}
                                        </div>
                                    </td>

                                    {/* Client */}
                                    <td style={{ padding: '16px', fontWeight: '500', color: '#1e293b' }}>
                                        {project.client}
                                    </td>

                                    {/* Status */}
                                    <td style={{ padding: '16px' }}>
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            padding: '6px 12px',
                                            background: `${getStatusColor(project.status)}20`,
                                            color: getStatusColor(project.status),
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: '600'
                                        }}>
                                            <div style={{
                                                width: '6px',
                                                height: '6px',
                                                background: getStatusColor(project.status),
                                                borderRadius: '50%',
                                                marginRight: '6px'
                                            }} />
                                            {project.status}
                                        </div>
                                    </td>

                                    {/* Progress */}
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ marginBottom: '6px' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                fontSize: '12px',
                                                color: '#64748b',
                                                marginBottom: '4px'
                                            }}>
                                                <span>Progress</span>
                                                <span style={{ fontWeight: '600' }}>{project.progress}%</span>
                                            </div>
                                            <div style={{
                                                height: '8px',
                                                background: '#e2e8f0',
                                                borderRadius: '4px',
                                                overflow: 'hidden'
                                            }}>
                                                <div style={{
                                                    height: '100%',
                                                    width: `${project.progress}%`,
                                                    background: project.progress >= 100 ? '#10b981' : 
                                                              project.progress >= 50 ? '#3b82f6' : 
                                                              project.progress >= 25 ? '#f59e0b' : '#ef4444',
                                                    borderRadius: '4px',
                                                    transition: 'width 0.3s ease'
                                                }} />
                                            </div>
                                        </div>
                                    </td>

                                    {/* Project Manager */}
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{
                                                width: '36px',
                                                height: '36px',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontWeight: '600',
                                                fontSize: '14px'
                                            }}>
                                                {project.projectManager.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span style={{ fontWeight: '500', color: '#1e293b' }}>
                                                {project.projectManager}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button style={{
                                                padding: '8px',
                                                background: '#f0f9ff',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                color: '#0369a1',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseOver={(e) => e.target.style.background = '#e0f2fe'}
                                            onMouseOut={(e) => e.target.style.background = '#f0f9ff'}
                                            title="View Details">
                                                <Eye size={16} />
                                            </button>
                                            <button style={{
                                                padding: '8px',
                                                background: '#fef3c7',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                color: '#d97706',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseOver={(e) => e.target.style.background = '#fde68a'}
                                            onMouseOut={(e) => e.target.style.background = '#fef3c7'}
                                            title="Edit Project">
                                                <Edit size={16} />
                                            </button>
                                            <button style={{
                                                padding: '8px',
                                                background: '#fee2e2',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                color: '#dc2626',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseOver={(e) => e.target.style.background = '#fecaca'}
                                            onMouseOut={(e) => e.target.style.background = '#fee2e2'}
                                            onClick={() => handleDelete(project.id)}
                                            title="Delete Project">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div style={{
                    padding: '16px 24px',
                    background: '#f8fafc',
                    borderTop: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>
                        Showing <span style={{ fontWeight: '600', color: '#1e293b' }}>
                            {filteredProjects.length}
                        </span> of <span style={{ fontWeight: '600', color: '#1e293b' }}>
                            {projects.length}
                        </span> projects
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{
                            padding: '8px 12px',
                            background: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            color: '#374151'
                        }}>
                            Previous
                        </button>
                        <button style={{
                            padding: '8px 12px',
                            background: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            color: '#374151'
                        }}>
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Add CSS for scrollbar styling */}
            <style>
                {`
                /* Custom scrollbar for table */
                div[style*="overflow-x: auto"]::-webkit-scrollbar {
                    height: 8px;
                }
                
                div[style*="overflow-x: auto"]::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }
                
                div[style*="overflow-x: auto"]::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 4px;
                }
                
                div[style*="overflow-x: auto"]::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
                
                div[style*="overflow-y: auto"]::-webkit-scrollbar {
                    width: 8px;
                }
                
                div[style*="overflow-y: auto"]::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }
                
                div[style*="overflow-y: auto"]::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 4px;
                }
                
                div[style*="overflow-y: auto"]::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
                `}
            </style>
        </div>
    );
};

export default Projects;