import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import urls from '../Urls/Urls';
import { useTheme } from '../Theme/ThemeContext';
import { useThemeValues } from '../Theme/Theme';

const CreateSubAdmin = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);
    const { mode } = useTheme();
    const theme = useThemeValues();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    // Role options based on your API - now using theme primary color variations
    const getRoleOptions = () => {
        const primaryColor = theme.palette.primary;

        // Generate color variations based on theme primary color
        const generateColorVariation = (hueShift, saturationMod, lightnessMod) => {
            // This is a simplified version - in production you'd want to use a proper color library
            return [
                { value: 'logistics_admin', label: 'Logistics Admin', icon: '📦', description: 'Manages inventory and logistics' },
                { value: 'finance_admin', label: 'Finance Admin', icon: '💰', description: 'Handles financial operations' },
                { value: 'tech_admin', label: 'Tech Admin', icon: '💻', description: 'Manages technical infrastructure' },
                { value: 'support_admin', label: 'Support Admin', icon: '🛠️', description: 'Provides customer support' },
                { value: 'client', label: 'Client', icon: '👤', description: 'External client access' },
            ].map((role, index) => {
                // Generate different colors for each role based on primary color
                const colors = [
                    primaryColor,
                    mode === 'light' ? '#10b981' : '#34d399', // green
                    mode === 'light' ? '#8b5cf6' : '#a78bfa', // purple
                    mode === 'light' ? '#f59e0b' : '#fbbf24', // orange
                    mode === 'light' ? '#64748b' : '#94a3b8', // gray
                ];

                return {
                    ...role,
                    color: colors[index] || primaryColor
                };
            });
        };

        return generateColorVariation();
    };

    const roleOptions = getRoleOptions();

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        address: '',
        image: null,
        created_by: userId,
        role: 'logistics_admin',
    });

    // Dynamic button colors using theme primary color
    const getButtonColors = () => {
        const primaryColor = theme.palette.primary;

        const hoverColor = mode === 'light'
            ? theme.palette.primary.replace(/[^,]+(?=\))/, match => {
                const num = parseInt(match);
                return Math.max(0, num - 40);
            })
            : theme.palette.primary;

        const secondaryColor = mode === 'light' ? '#f1f5f9' : '#334155';
        const secondaryHover = mode === 'light' ? '#e2e8f0' : '#475569';
        const secondaryText = mode === 'light' ? '#374151' : '#e5e7eb';

        const dangerColor = mode === 'light' ? '#ef4444' : '#f87171';
        const dangerHover = mode === 'light' ? '#dc2626' : '#ef4444';

        return {
            primary: { normal: primaryColor, hover: hoverColor },
            secondary: { normal: secondaryColor, hover: secondaryHover, text: secondaryText },
            danger: { normal: dangerColor, hover: dangerHover }
        };
    };

    const buttonColors = getButtonColors();

    // Status colors based on theme mode
    const statusColors = {
        light: {
            success: { bg: '#dcfce7', border: '#86efac', text: '#166534' },
            error: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' },
            info: { bg: '#f0f9ff', border: '#bae6fd', text: '#0369a1' }
        },
        dark: {
            success: { bg: 'rgba(21, 128, 61, 0.3)', border: 'rgba(21, 128, 61, 0.6)', text: '#86efac' },
            error: { bg: 'rgba(220, 38, 38, 0.3)', border: 'rgba(220, 38, 38, 0.6)', text: '#fca5a5' },
            info: { bg: 'rgba(3, 105, 161, 0.3)', border: 'rgba(3, 105, 161, 0.6)', text: '#7dd3fc' }
        }
    };

    const currentStatusColors = statusColors[mode];

    // Get selected role details
    const selectedRole = roleOptions.find(role => role.value === userData.role) || roleOptions[0];

    // Image upload area background based on theme
    const getUploadAreaBackground = () => {
        if (imagePreview) return `url(${imagePreview}) center/cover no-repeat`;
        return mode === 'light' ? '#f8fafc' : 'rgba(255, 255, 255, 0.05)';
    };

    // Hover background for upload area
    const getUploadAreaHoverBackground = () => {
        return mode === 'light' ? '#f0f9ff' : 'rgba(96, 165, 250, 0.1)';
    };

    // Password field background
    const getPasswordFieldBackground = () => {
        if (userData.password) {
            return mode === 'light' ? '#f0f9ff' : 'rgba(96, 165, 250, 0.1)';
        }
        return theme.palette.bg.card;
    };

    // Loading button background
    const getLoadingButtonBackground = () => {
        return loading
            ? (mode === 'light' ? '#93c5fd' : '#60a5fa80')
            : selectedRole.color;
    };

    // Add a function to remove the image
    const removeImage = () => {
        setProfileImage(null);
        setImagePreview(null);
        setUserData({
            ...userData,
            image: null
        });
        setErrors({ ...errors, image: '' });
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, image: 'Image size should be less than 5MB' });
                return;
            }

            if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
                setErrors({ ...errors, image: 'Only JPEG, PNG, JPG, GIF images are allowed' });
                return;
            }

            setProfileImage(file);
            setUserData({
                ...userData,
                image: file
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setErrors({ ...errors, image: '' });
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Handle drag and drop for image
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file) {
            handleImageUpload({ target: { files: [file] } });
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!userData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!userData.password) {
            newErrors.password = 'Password is required';
        } else if (userData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!userData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!userData.first_name.trim()) {
            newErrors.first_name = 'First name is required';
        }

        if (!userData.last_name.trim()) {
            newErrors.last_name = 'Last name is required';
        }

        if (!userData.role) {
            newErrors.role = 'Role is required';
        } else if (!roleOptions.find(r => r.value === userData.role)) {
            newErrors.role = 'Invalid role selected';
        }

        return newErrors;
    };

    // Handle form submission
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const validationErrors = validateForm();
    //     if (Object.keys(validationErrors).length > 0) {
    //         setErrors(validationErrors);
    //         Object.values(validationErrors).forEach(error => toast.error(error));
    //         return;
    //     }

    //     setLoading(true);

    //     try {
    //         const formData = new FormData();

    //         formData.append("username", userData.username);
    //         formData.append("password", userData.password);
    //         formData.append("email", userData.email);
    //         formData.append("first_name", userData.first_name);
    //         formData.append("last_name", userData.last_name);
    //         formData.append("role", userData.role);
    //         formData.append("created_by", userData.created_by);

    //         if (userData.phone_number) {
    //             formData.append("phone_number", userData.phone_number);
    //         }
    //         if (userData.address) {
    //             formData.append("address", userData.address);
    //         }

    //         if (userData.image) {
    //             formData.append("image", userData.image);
    //         } else {
    //             formData.append("image", "profile.png");
    //         }

    //         const token = localStorage.getItem("access_token");
    //         if (!token) {
    //             toast.error("Please login first");
    //             setLoading(false);
    //             return;
    //         }

    //         const response = await axios.post(
    //             urls.create_sub_admin,
    //             formData,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     'Authorization': `Bearer ${token}`
    //                 },
    //                 timeout: 15000,
    //             }

    //         );
    //         console.log("created", response.data);

    //         toast.success("Sub-admin created successfully!");
    //         setSuccess(true);

    //         setTimeout(() => {
    //             setSuccess(false);
    //             resetForm();
    //         }, 3000);

    //     } catch (error) {
    //         console.error("❌ CREATE SUB-ADMIN ERROR:", error);

    //         let errorMessage = "Failed to create sub-admin";
    //         if (error.response) {
    //             if (error.response.data?.detail) {
    //                 errorMessage = error.response.data.detail;
    //             } else if (error.response.data?.message) {
    //                 errorMessage = error.response.data.message;
    //             } else if (typeof error.response.data === 'object') {
    //                 const errors = Object.values(error.response.data).flat();
    //                 errorMessage = errors.join(', ');
    //             }
    //         } else if (error.request) {
    //             errorMessage = "No response from server. Please check your connection.";
    //         }

    //         toast.error(errorMessage);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            Object.values(validationErrors).forEach(error => toast.error(error));
            return;
        }

        setLoading(true);

        try {
            const payload = {
                username: userData.username,
                password: userData.password,
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name,
                role: userData.role,
                created_by: userData.created_by,
                phone_number: userData.phone_number || "",
                address: userData.address || "",
                image: "profile.png"
            };

            console.log("📤 Sending JSON payload:", payload);

            const token = localStorage.getItem("access_token");
            if (!token) {
                toast.error("Please login first");
                setLoading(false);
                return;
            }

            const response = await axios.post(
                urls.create_sub_admin,
                payload, // Send as JSON
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    timeout: 15000,
                }
            );

            console.log("✅ SUCCESS Response:", response.data);

            toast.success("User created successfully!");
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
                resetForm();
            }, 3000);

        } catch (error) {
            console.error("❌ CREATE ERROR:", error);

            let errorMessage = "Failed to create user";

            // Check for specific backend error responses
            if (error.response?.data) {
                console.error("Backend error response:", error.response.data);

                if (error.response.data.detail) {
                    errorMessage = error.response.data.detail;
                } else if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (typeof error.response.data === 'object') {
                    // Handle field validation errors
                    const errors = [];
                    for (const [field, messages] of Object.entries(error.response.data)) {
                        if (Array.isArray(messages)) {
                            errors.push(`${field}: ${messages.join(', ')}`);
                        } else {
                            errors.push(`${field}: ${messages}`);
                        }
                    }
                    if (errors.length > 0) {
                        errorMessage = errors.join(' | ');
                    }
                }
            } else if (error.request) {
                errorMessage = "No response from server. Please check your connection.";
            }

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Reset form
    const resetForm = () => {
        setUserData({
            username: '',
            password: '',
            email: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            address: '',
            image: null,
            role: 'logistics_admin',
            created_by: userId,
        });
        setProfileImage(null);
        setImagePreview(null);
        setErrors({});
    };

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: theme.palette.bg.body,
            minHeight: '100vh',
            transition: 'background-color 0.3s ease'
        }}>
            {/* Header */}
            <div style={{
                marginBottom: '30px',
                paddingBottom: '20px',
                borderBottom: `1px solid ${theme.palette.border}`,
                transition: 'border-color 0.3s ease'
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: '28px',
                    fontWeight: '700',
                    color: theme.palette.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'color 0.3s ease'
                }}>
                    <span style={{
                        background: theme.palette.bg.cardGradient,
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px',
                        transition: 'background 0.3s ease'
                    }}>
                        👥
                    </span>
                    Create New Sub-Admin
                </h1>
                <p style={{
                    margin: '8px 0 0 0',
                    fontSize: '16px',
                    color: theme.palette.text.muted,
                    transition: 'color 0.3s ease'
                }}>
                    Add a new sub-admin user with specific role and permissions
                </p>
            </div>

            {/* Success Message */}
            {success && (
                <div style={{
                    background: currentStatusColors.success.bg,
                    border: `1px solid ${currentStatusColors.success.border}`,
                    color: currentStatusColors.success.text,
                    padding: '16px 20px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    animation: 'slideIn 0.3s ease',
                    transition: 'all 0.3s ease'
                }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '16px' }}>
                            Sub-Admin Created Successfully!
                        </div>
                        <div style={{ fontSize: '14px', opacity: 0.9 }}>
                            The new {selectedRole.label} has been added to the system.
                        </div>
                    </div>
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: '350px 1fr',
                gap: '30px',
                alignItems: 'start'
            }}>
                {/* Left Column - Profile Image & Role Info */}
                <div>
                    {/* Profile Image Upload */}
                    <div style={{
                        background: theme.palette.bg.card,
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: theme.palette.shadow,
                        border: `1px solid ${theme.palette.border}`,
                        marginBottom: '24px',
                        transition: 'all 0.3s ease'
                    }}>
                        <h3 style={{
                            margin: '0 0 20px 0',
                            fontSize: '18px',
                            fontWeight: '600',
                            color: theme.palette.text.primary,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'color 0.3s ease'
                        }}>
                            <span>📸</span>
                            Profile Image
                        </h3>

                        {/* Image Upload Area */}
                        <div
                            style={{
                                border: `2px dashed ${errors.image ? buttonColors.danger.normal : theme.palette.border}`,
                                borderRadius: '10px',
                                padding: '40px 20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                background: getUploadAreaBackground(),
                                position: 'relative',
                                minHeight: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => !imagePreview && fileInputRef.current.click()}
                            onMouseOver={(e) => {
                                if (!imagePreview) {
                                    e.target.style.borderColor = buttonColors.primary.normal;
                                    e.target.style.background = getUploadAreaHoverBackground();
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!imagePreview) {
                                    e.target.style.borderColor = errors.image ? buttonColors.danger.normal : theme.palette.border;
                                    e.target.style.background = getUploadAreaBackground();
                                }
                            }}
                        >
                            {imagePreview ? (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeImage();
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            width: '30px',
                                            height: '30px',
                                            background: 'rgba(0, 0, 0, 0.7)',
                                            border: 'none',
                                            borderRadius: '50%',
                                            color: 'white',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.2s ease',
                                            zIndex: 10
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.background = 'rgba(239, 68, 68, 0.9)';
                                            e.target.style.transform = 'scale(1.1)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.background = 'rgba(0, 0, 0, 0.7)';
                                            e.target.style.transform = 'scale(1)';
                                        }}
                                        title="Remove image"
                                    >
                                        ✕
                                    </button>

                                    <div style={{
                                        background: 'rgba(0, 0, 0, 0.7)',
                                        padding: '10px 20px',
                                        borderRadius: '6px',
                                        color: 'white',
                                        fontSize: '14px',
                                        backdropFilter: 'blur(4px)',
                                        textAlign: 'center'
                                    }}>
                                        <div>Click to change image</div>
                                        <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
                                            or click X to remove
                                        </div>
                                    </div>

                                    {profileImage && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '10px',
                                            left: '10px',
                                            right: '10px',
                                            background: 'rgba(0, 0, 0, 0.6)',
                                            color: 'white',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            textAlign: 'center',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {profileImage.name} ({(profileImage.size / 1024).toFixed(1)} KB)
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div style={{
                                        fontSize: '48px',
                                        marginBottom: '16px',
                                        opacity: 0.6,
                                        color: theme.palette.text.muted,
                                        transition: 'color 0.3s ease'
                                    }}>
                                        📷
                                    </div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: theme.palette.text.primary,
                                        marginBottom: '8px',
                                        transition: 'color 0.3s ease'
                                    }}>
                                        Drop image here or click to upload
                                    </div>
                                    <div style={{
                                        fontSize: '14px',
                                        color: theme.palette.text.muted,
                                        marginBottom: '16px',
                                        transition: 'color 0.3s ease'
                                    }}>
                                        PNG, JPG, GIF up to 5MB
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        style={{
                                            padding: '10px 20px',
                                            background: buttonColors.primary.normal,
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseOver={(e) => e.target.style.background = buttonColors.primary.hover}
                                        onMouseOut={((e) => e.target.style.background = buttonColors.primary.normal)}
                                    >
                                        Browse Files
                                    </button>
                                </>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                        </div>

                        {errors.image && (
                            <div style={{
                                color: buttonColors.danger.normal,
                                fontSize: '14px',
                                marginTop: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                ⚠️ {errors.image}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Sub-Admin Details Form */}
                <div>
                    <div style={{
                        background: theme.palette.bg.card,
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: theme.palette.shadow,
                        border: `1px solid ${theme.palette.border}`,
                        transition: 'all 0.3s ease'
                    }}>
                        <h3 style={{
                            margin: '0 0 24px 0',
                            fontSize: '18px',
                            fontWeight: '600',
                            color: theme.palette.text.primary,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'color 0.3s ease'
                        }}>
                            <span>📝</span>
                            Sub-Admin Information
                        </h3>

                        <form onSubmit={handleSubmit}>
                            {/* Role Selection */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: theme.palette.text.secondary,
                                    marginBottom: '12px',
                                    transition: 'color 0.3s ease'
                                }}>
                                    Role *
                                </label>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                    gap: '12px'
                                }}>
                                    {roleOptions.map((role) => (
                                        <label
                                            key={role.value}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '12px',
                                                border: `1px solid ${userData.role === role.value ? role.color : theme.palette.border}`,
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                background: userData.role === role.value ? `${role.color}10` : theme.palette.bg.card
                                            }}
                                            onMouseOver={(e) => {
                                                if (userData.role !== role.value) {
                                                    e.target.style.borderColor = role.color;
                                                    e.target.style.background = mode === 'light' ? `${role.color}10` : `${role.color}20`;
                                                }
                                            }}
                                            onMouseOut={(e) => {
                                                if (userData.role !== role.value) {
                                                    e.target.style.borderColor = theme.palette.border;
                                                    e.target.style.background = theme.palette.bg.card;
                                                }
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="role"
                                                value={role.value}
                                                checked={userData.role === role.value}
                                                onChange={handleInputChange}
                                                style={{
                                                    marginRight: '10px',
                                                    accentColor: role.color
                                                }}
                                            />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    background: role.color,
                                                    borderRadius: '6px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontSize: '12px'
                                                }}>
                                                    {role.icon}
                                                </div>
                                                <div>
                                                    <div style={{
                                                        fontWeight: userData.role === role.value ? '600' : '400',
                                                        color: userData.role === role.value ? role.color : theme.palette.text.primary,
                                                        fontSize: '13px',
                                                        transition: 'color 0.3s ease'
                                                    }}>
                                                        {role.label}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '11px',
                                                        color: theme.palette.text.muted,
                                                        marginTop: '2px'
                                                    }}>
                                                        {role.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.role && (
                                    <div style={{
                                        color: buttonColors.danger.normal,
                                        fontSize: '12px',
                                        marginTop: '4px'
                                    }}>
                                        {errors.role}
                                    </div>
                                )}
                            </div>

                            {/* Username */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: theme.palette.text.secondary,
                                    marginBottom: '8px',
                                    transition: 'color 0.3s ease'
                                }}>
                                    Username *
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleInputChange}
                                    placeholder="Enter username"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: `1px solid ${errors.username ? buttonColors.danger.normal : theme.palette.border}`,
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        background: theme.palette.bg.card,
                                        color: theme.palette.text.primary,
                                        transition: 'all 0.2s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = buttonColors.primary.normal;
                                        e.target.style.boxShadow = `0 0 0 3px ${mode === 'light' ? buttonColors.primary.normal + '20' : buttonColors.primary.normal + '30'}`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = errors.username ? buttonColors.danger.normal : theme.palette.border;
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                                {errors.username && (
                                    <div style={{
                                        color: buttonColors.danger.normal,
                                        fontSize: '12px',
                                        marginTop: '4px'
                                    }}>
                                        {errors.username}
                                    </div>
                                )}
                            </div>

                            {/* Two-column grid for name fields */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '20px',
                                marginBottom: '20px'
                            }}>
                                {/* First Name */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: theme.palette.text.secondary,
                                        marginBottom: '8px',
                                        transition: 'color 0.3s ease'
                                    }}>
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={userData.first_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter first name"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: `1px solid ${errors.first_name ? buttonColors.danger.normal : theme.palette.border}`,
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            background: theme.palette.bg.card,
                                            color: theme.palette.text.primary,
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = buttonColors.primary.normal;
                                            e.target.style.boxShadow = `0 0 0 3px ${mode === 'light' ? buttonColors.primary.normal + '20' : buttonColors.primary.normal + '30'}`;
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = errors.first_name ? buttonColors.danger.normal : theme.palette.border;
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    {errors.first_name && (
                                        <div style={{
                                            color: buttonColors.danger.normal,
                                            fontSize: '12px',
                                            marginTop: '4px'
                                        }}>
                                            {errors.first_name}
                                        </div>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: theme.palette.text.secondary,
                                        marginBottom: '8px',
                                        transition: 'color 0.3s ease'
                                    }}>
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={userData.last_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter last name"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: `1px solid ${errors.last_name ? buttonColors.danger.normal : theme.palette.border}`,
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            background: theme.palette.bg.card,
                                            color: theme.palette.text.primary,
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = buttonColors.primary.normal;
                                            e.target.style.boxShadow = `0 0 0 3px ${mode === 'light' ? buttonColors.primary.normal + '20' : buttonColors.primary.normal + '30'}`;
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = errors.last_name ? buttonColors.danger.normal : theme.palette.border;
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    {errors.last_name && (
                                        <div style={{
                                            color: buttonColors.danger.normal,
                                            fontSize: '12px',
                                            marginTop: '4px'
                                        }}>
                                            {errors.last_name}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Email and Phone */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '20px',
                                marginBottom: '20px'
                            }}>
                                {/* Email */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: theme.palette.text.secondary,
                                        marginBottom: '8px',
                                        transition: 'color 0.3s ease'
                                    }}>
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        placeholder="subadmin@example.com"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: `1px solid ${errors.email ? buttonColors.danger.normal : theme.palette.border}`,
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            background: theme.palette.bg.card,
                                            color: theme.palette.text.primary,
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = buttonColors.primary.normal;
                                            e.target.style.boxShadow = `0 0 0 3px ${mode === 'light' ? buttonColors.primary.normal + '20' : buttonColors.primary.normal + '30'}`;
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = errors.email ? buttonColors.danger.normal : theme.palette.border;
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    {errors.email && (
                                        <div style={{
                                            color: buttonColors.danger.normal,
                                            fontSize: '12px',
                                            marginTop: '4px'
                                        }}>
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: theme.palette.text.secondary,
                                        marginBottom: '8px',
                                        transition: 'color 0.3s ease'
                                    }}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        value={userData.phone_number}
                                        onChange={handleInputChange}
                                        placeholder="+1 (555) 123-4567"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: `1px solid ${errors.phone_number ? buttonColors.danger.normal : theme.palette.border}`,
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            background: theme.palette.bg.card,
                                            color: theme.palette.text.primary,
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = buttonColors.primary.normal;
                                            e.target.style.boxShadow = `0 0 0 3px ${mode === 'light' ? buttonColors.primary.normal + '20' : buttonColors.primary.normal + '30'}`;
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = errors.phone_number ? buttonColors.danger.normal : theme.palette.border;
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    {errors.phone_number && (
                                        <div style={{
                                            color: buttonColors.danger.normal,
                                            fontSize: '12px',
                                            marginTop: '4px'
                                        }}>
                                            {errors.phone_number}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Address */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: theme.palette.text.secondary,
                                    marginBottom: '8px',
                                    transition: 'color 0.3s ease'
                                }}>
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={userData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter address"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: `1px solid ${errors.address ? buttonColors.danger.normal : theme.palette.border}`,
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        background: theme.palette.bg.card,
                                        color: theme.palette.text.primary,
                                        transition: 'all 0.2s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = buttonColors.primary.normal;
                                        e.target.style.boxShadow = `0 0 0 3px ${mode === 'light' ? buttonColors.primary.normal + '20' : buttonColors.primary.normal + '30'}`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = errors.address ? buttonColors.danger.normal : theme.palette.border;
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                                {errors.address && (
                                    <div style={{
                                        color: buttonColors.danger.normal,
                                        fontSize: '12px',
                                        marginTop: '4px'
                                    }}>
                                        {errors.address}
                                    </div>
                                )}
                            </div>

                            {/* Password */}
                            <div style={{ marginBottom: '30px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: theme.palette.text.secondary,
                                    marginBottom: '8px',
                                    transition: 'color 0.3s ease'
                                }}>
                                    Password *
                                </label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="text"
                                        name="password"
                                        value={userData.password || ''}
                                        onChange={handleInputChange}
                                        placeholder="Enter password"
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            border: `1px solid ${errors.password ? buttonColors.danger.normal : theme.palette.border}`,
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            background: getPasswordFieldBackground(),
                                            color: theme.palette.text.primary,
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = buttonColors.primary.normal;
                                            e.target.style.boxShadow = `0 0 0 3px ${mode === 'light' ? buttonColors.primary.normal + '20' : buttonColors.primary.normal + '30'}`;
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = errors.password ? buttonColors.danger.normal : theme.palette.border;
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                                {errors.password && (
                                    <div style={{
                                        color: buttonColors.danger.normal,
                                        fontSize: '12px',
                                        marginTop: '4px'
                                    }}>
                                        {errors.password}
                                    </div>
                                )}
                                <div style={{
                                    fontSize: '12px',
                                    color: theme.palette.text.muted,
                                    marginTop: '4px',
                                    transition: 'color 0.3s ease'
                                }}>
                                    {userData.password ? 'Password has been generated' : 'Minimum 6 characters required'}
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: '24px',
                                borderTop: `1px solid ${theme.palette.border}`,
                                transition: 'border-color 0.3s ease'
                            }}>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    style={{
                                        padding: '12px 24px',
                                        background: buttonColors.secondary.normal,
                                        color: buttonColors.secondary.text,
                                        border: `1px solid ${theme.palette.border}`,
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.background = buttonColors.secondary.hover;
                                        e.target.style.borderColor = theme.palette.text.muted;
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = buttonColors.secondary.normal;
                                        e.target.style.borderColor = theme.palette.border;
                                    }}
                                >
                                    <span>↺</span>
                                    Reset Form
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        padding: '12px 32px',
                                        background: getLoadingButtonBackground(),
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                    onMouseOver={(e) => {
                                        if (!loading) {
                                            e.target.style.background = selectedRole.color.replace(')', ', 0.9)').replace('rgb', 'rgba');
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (!loading) {
                                            e.target.style.background = selectedRole.color;
                                        }
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
                                            Creating {selectedRole.label}...
                                        </>
                                    ) : (
                                        <>
                                            <span>{selectedRole.icon}</span>
                                            Create {selectedRole.label}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Add some CSS for animations */}
            <style>
                {`
          @keyframes slideIn {
            from {
              transform: translateY(-10px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          input::placeholder {
            color: ${theme.palette.text.muted};
          }

          input:focus {
            outline: none;
            border-color: ${buttonColors.primary.normal} !important;
            box-shadow: 0 0 0 3px ${mode === 'light' ? buttonColors.primary.normal + '20' : buttonColors.primary.normal + '30'} !important;
          }

          select {
            background: ${theme.palette.bg.card};
            color: ${theme.palette.text.primary};
            border: 1px solid ${theme.palette.border};
          }

          select:focus {
            outline: none;
            border-color: ${buttonColors.primary.normal};
          }
        `}
            </style>
        </div>
    );
};

export default CreateSubAdmin;