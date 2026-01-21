import React, { useState, useEffect } from 'react';
import {
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment
} from '@mui/material';
import TextField from '@mui/material/TextField';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    CheckCircle as CheckCircleIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoImage from "../src/assets/logo0.svg"
import urls from './Urls/Urls';
import axios from 'axios';

const LoginSignup = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [formData, setFormData] = useState({
        // Common fields
        username: "",
        password: "",
        
        // Registration specific fields
        fullName: "",
        confirmPassword: "",
        
        // Other fields
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        address: "",
        image: "",
        rememberMe: false,
    });

    // State to track focused fields
    const [focusedFields, setFocusedFields] = useState({
        fullName: false,
        username: false,
        password: false,
        confirmPassword: false,
    });

    // State for field errors
    const [fieldErrors, setFieldErrors] = useState({});

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        
        // Clear error for this field when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors({
                ...fieldErrors,
                [name]: null
            });
        }
    };

    const handleFocus = (fieldName) => {
        setFocusedFields(prev => ({
            ...prev,
            [fieldName]: true
        }));
    };

    const handleBlur = (fieldName) => {
        const fieldValue = formData[fieldName];
        if (!fieldValue) {
            setFocusedFields(prev => ({
                ...prev,
                [fieldName]: false
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        
        // Registration validation
        if (!isLogin) {
            if (!formData.fullName.trim()) {
                errors.fullName = ['Full name is required'];
            }
        }

        if (!formData.username.trim()) {
            errors.username = ['Username is required'];
        }

        if (!formData.password) {
            errors.password = ['Password is required'];
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            errors.confirmPassword = ['Passwords do not match'];
        }

        setFieldErrors(errors);
        
        // Show first error as toast
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey) {
            toast.error(errors[firstErrorKey][0]);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            if (isLogin) {
                // Login logic
                console.log("🔐 LOGIN API CALLED");

                const response = await axios.post(
                    urls.login,
                    {
                        username: formData.username,
                        password: formData.password,
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                        timeout: 15000,
                    }
                );

                console.log("✅ LOGIN SUCCESS");
                console.log("📦 Full Response:", response.data);

                const { access, refresh, user } = response.data;

                // ✅ Save tokens
                if (access) {
                    localStorage.setItem("access_token", access);
                    console.log("🔑 Access token saved");
                }

                if (refresh) {
                    localStorage.setItem("refresh_token", refresh);
                    console.log("🔁 Refresh token saved");
                }

                if (user) {
                    const userData = {
                        ...user,
                        role: user.role || null,
                    };
                    localStorage.setItem("user", JSON.stringify(userData));
                    console.log("👤 User saved:", userData);

                    const userRole = user.role;

                    console.log("🎯 User role:", userRole);

                    if (userRole === 'admin') {
                        toast.success("Welcome Admin! Redirecting to Admin Dashboard...");
                        setTimeout(() => {
                            navigate("/adminDashboard");
                        }, 1500);
                    } else if (userRole === 'client') { 
                        toast.success("Welcome Client! Redirecting to Client Dashboard...");
                        setTimeout(() => {
                            navigate("/clientDashboard");
                        }, 1500);
                    } else {
                        toast.success("Welcome Super Admin! Redirecting to Super Admin Dashboard...");
                        setTimeout(() => {
                            navigate("/superAdminDashboard");
                        }, 1500);
                    }
                }
            } else {
                // Registration logic
                console.log("📝 REGISTRATION API CALLED");
                
                // Extract first and last name from full name
                const nameParts = formData.fullName.split(' ');
                const first_name = nameParts[0] || '';
                const last_name = nameParts.slice(1).join(' ') || '';
                
                const registrationData = {
                    username: formData.username,
                    password: formData.password,
                    email: formData.username, // Using username as email
                    first_name: first_name,
                    last_name: last_name,
                    phone_number: "", // Empty as per requirements
                    address: "", // Empty as per requirements
                    image: "profile.png", // Default value
                    client_code: "" // Empty as per requirements
                };

                console.log("Registration Data:", registrationData);

                // Call your registration API endpoint
                // Note: You need to update this with your actual registration endpoint
                const response = await axios.post(
                    urls.register || '/api/register/', // Update with your actual endpoint
                    registrationData,
                    {
                        headers: { "Content-Type": "application/json" },
                        timeout: 10000,
                    }
                );

                console.log("✅ REGISTRATION SUCCESS");
                console.log("📦 Response:", response.data);

                toast.success("Registration successful! Please login.");
                
                // Clear registration form data
                setFormData({
                    ...formData,
                    fullName: "",
                    confirmPassword: "",
                });
                
                // Clear focused fields
                setFocusedFields({
                    ...focusedFields,
                    fullName: false,
                    confirmPassword: false,
                });
                
                // Switch to login mode
                setIsLogin(true);
            }

        } catch (error) {
            console.error("❌ ERROR:", isLogin ? "Login" : "Registration");
            console.error({
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });

            // Handle API validation errors
            if (error.response?.data) {
                const apiErrors = error.response.data;
                setFieldErrors(apiErrors);
                
                // Show first error as toast
                const firstErrorKey = Object.keys(apiErrors)[0];
                if (firstErrorKey && apiErrors[firstErrorKey]) {
                    toast.error(Array.isArray(apiErrors[firstErrorKey]) 
                        ? apiErrors[firstErrorKey][0] 
                        : apiErrors[firstErrorKey]
                    );
                } else {
                    toast.error(error.response?.data?.detail || 
                               error.response?.data?.message || 
                               (isLogin ? "Login failed" : "Registration failed"));
                }
            } else {
                toast.error(isLogin ? "Login failed" : "Registration failed");
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        // Clear errors when switching modes
        setFieldErrors({});
    };

    const handleForgotPassword = () => {
        toast.info('Password reset link would be sent to your email');
    };

    // Custom style function for text fields
    const getTextFieldStyles = (fieldName, hasIcon = true) => ({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.4)',
                borderRadius: '8px',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.6)',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#f0f0f0',
            },
            '&.Mui-error fieldset': {
                borderColor: '#ff6b6b',
            },
            background: 'transparent',
            '& .MuiInputAdornment-positionStart': {
                marginRight: '12px',
            }
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-focused': {
                color: '#f0f0f0',
            },
            '&.Mui-error': {
                color: '#ff6b6b',
            },
            transform: `translate(${hasIcon ? '48px' : '14px'}, 16px) scale(1)`,
            '&.MuiInputLabel-shrink': {
                transform: `translate(${hasIcon ? '18px' : '14px'}, -10px) scale(0.75)`,
            },
        },
        '& .MuiInputBase-input': {
            color: '#f0f0f0',
            padding: isMobile
                ? (hasIcon ? '14px 12px 14px 6px' : '14px 12px')
                : (hasIcon ? '16px 12px 16px 6px' : '16px 12px'),
            fontSize: isMobile ? '0.95rem' : '1rem',
            '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 1,
            },
        },
        '& .MuiInputBase-input[type="password"]': {
            letterSpacing: '1px',
        },
        '& .MuiFormHelperText-root': {
            color: '#ff6b6b',
            marginLeft: 0,
        },
        marginBottom: isMobile ? '15px' : '20px',
    });

    // CSS keyframes for animations
    const floatingAnimation = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        @keyframes logo-enter {
            0% {
                opacity: 0;
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        @keyframes bounce {
            0%, 80%, 100% { 
                transform: scale(0);
            } 
            40% { 
                transform: scale(1);
            }
        }
    `;

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f0f0f0',
            padding: isMobile ? '0' : '20px',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        }}>
            <style>{floatingAnimation}</style>

            {/* Animated Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
            }}>
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: '3px',
                            height: '3px',
                            background: 'rgba(0, 124, 186, 0.1)',
                            borderRadius: '50%',
                            animation: `float ${25 + Math.random() * 15}s infinite linear`,
                            animationDelay: `${i * 0.3}s`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>

            <div style={{
                display: 'flex',
                width: '100%',
                maxWidth: isMobile ? '100%' : '1000px',
                minHeight: isMobile ? '100vh' : '600px',
                background: 'white',
                borderRadius: isMobile ? 0 : '15px',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 2,
                boxShadow: isMobile ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.1)',
                flexDirection: isMobile ? 'column' : 'row'
            }}>
                {/* Left Side - Logo */}
                <div style={{
                    flex: 1,
                    background: isMobile ? 'white' : '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: isMobile ? '40px 20px' : '40px',
                    minHeight: isMobile ? '30vh' : 'auto',
                    borderRadius: isMobile ? 0 : '0 0 0 15px'
                }}>
                    <div style={{
                        textAlign: 'center',
                        position: 'relative',
                        width: '100%'
                    }}>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: isMobile ? '200px' : '300px',
                            margin: '0 auto',
                            animation: 'logo-enter 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}>
                            <img
                                src={logoImage}
                                alt="MexemAI MC1 Logo"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side - Form with Blue Background */}
                <div style={{
                    flex: 1,
                    padding: isMobile ? '30px 20px 40px' : '60px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#007cba', // Blue background
                    position: 'relative',
                    overflow: isLogin ? 'hidden' : 'auto',
                    borderRadius: isMobile ? '20px 20px 0 0' : '0 15px 15px 0',
                    marginTop: isMobile ? '-30px' : 0,
                    minHeight: isMobile ? '70vh' : 'auto'
                }}>
                    {/* Background gradients */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                                   radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`
                    }}></div>

                    {/* Mobile decorative line */}
                    {isMobile && (
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '60px',
                            height: '4px',
                            background: 'rgba(255, 255, 255, 0.3)',
                            borderRadius: '2px'
                        }}></div>
                    )}

                    <div style={{
                        width: '100%',
                        maxWidth: '400px',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        {/* Mode Toggle */}
                        <div style={{
                            position: 'relative',
                            background: 'rgba(255, 255, 255, 0.15)',
                            borderRadius: '12px',
                            padding: '4px',
                            marginBottom: isMobile ? '30px' : '40px',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <div style={{
                                display: 'flex',
                                position: 'relative',
                                zIndex: 2
                            }}>
                                <button
                                    style={{
                                        flex: 1,
                                        padding: isMobile ? '12px 16px' : '14px 20px',
                                        border: 'none',
                                        background: 'transparent',
                                        color: isLogin ? '#007cba' : '#f0f0f0',
                                        fontWeight: 600,
                                        fontSize: isMobile ? '0.95rem' : '1rem',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px'
                                    }}
                                    onClick={() => setIsLogin(true)}
                                >
                                    <span style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg style={{
                                            width: '18px',
                                            height: '18px',
                                            stroke: 'currentColor',
                                            strokeWidth: '2',
                                            fill: 'none'
                                        }} viewBox="0 0 24 24">
                                            <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z" />
                                            <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" />
                                        </svg>
                                    </span>
                                    Sign In
                                </button>
                                <button
                                    style={{
                                        flex: 1,
                                        padding: isMobile ? '12px 16px' : '14px 20px',
                                        border: 'none',
                                        background: 'transparent',
                                        color: !isLogin ? '#007cba' : '#f0f0f0',
                                        fontWeight: 600,
                                        fontSize: isMobile ? '0.95rem' : '1rem',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px'
                                    }}
                                    onClick={() => setIsLogin(false)}
                                >
                                    <span style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg style={{
                                            width: '18px',
                                            height: '18px',
                                            stroke: 'currentColor',
                                            strokeWidth: '2',
                                            fill: 'none'
                                        }} viewBox="0 0 24 24">
                                            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
                                            <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" />
                                        </svg>
                                    </span>
                                    Sign Up
                                </button>
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '4px',
                                left: isLogin ? '0' : '50%',
                                width: '50%',
                                height: 'calc(100% - 8px)',
                                background: '#f0f0f0',
                                borderRadius: '10px',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                zIndex: 1
                            }}></div>
                        </div>

                        <h2 style={{
                            fontSize: isMobile ? '1.6rem' : '2rem',
                            fontWeight: 700,
                            color: '#f0f0f0',
                            marginBottom: isMobile ? '15px' : '20px',
                            textAlign: 'center'
                        }}>
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            {/* Full Name Field - Only for Registration */}
                            {!isLogin && (
                                <div>
                                    <TextField
                                        fullWidth
                                        name="fullName"
                                        label="Full Name"
                                        variant="outlined"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        error={!!fieldErrors.fullName}
                                        helperText={fieldErrors.fullName?.[0]}
                                        onFocus={() => handleFocus('fullName')}
                                        onBlur={() => handleBlur('fullName')}
                                        InputLabelProps={{
                                            shrink: focusedFields.fullName || !!formData.fullName,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start" sx={{ marginRight: '12px' }}>
                                                    <PersonIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                                                </InputAdornment>
                                            ),
                                            placeholder: !focusedFields.fullName && !formData.fullName ? 'Full Name' : '',
                                        }}
                                        sx={getTextFieldStyles('fullName', true)}
                                    />
                                </div>
                            )}

                            {/* Username Field */}
                            <div>
                                <TextField
                                    fullWidth
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    error={!!fieldErrors.username}
                                    helperText={fieldErrors.username?.[0]}
                                    onFocus={() => handleFocus('username')}
                                    onBlur={() => handleBlur('username')}
                                    InputLabelProps={{
                                        shrink: focusedFields.username || !!formData.username,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ marginRight: '12px' }}>
                                                <EmailIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                                            </InputAdornment>
                                        ),
                                        placeholder: !focusedFields.username && !formData.username ? 'Username' : '',
                                    }}
                                    sx={getTextFieldStyles('username', true)}
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    error={!!fieldErrors.password}
                                    helperText={fieldErrors.password?.[0]}
                                    onFocus={() => handleFocus('password')}
                                    onBlur={() => handleBlur('password')}
                                    InputLabelProps={{
                                        shrink: focusedFields.password || !!formData.password,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ marginRight: '12px' }}>
                                                <LockIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                                >
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        placeholder: !focusedFields.password && !formData.password ? 'Password' : '',
                                    }}
                                    sx={getTextFieldStyles('password', true)}
                                />
                            </div>

                            {/* Confirm Password Field - Only for Registration */}
                            {!isLogin && (
                                <div>
                                    <TextField
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        variant="outlined"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        error={!!fieldErrors.confirmPassword}
                                        helperText={fieldErrors.confirmPassword?.[0]}
                                        onFocus={() => handleFocus('confirmPassword')}
                                        onBlur={() => handleBlur('confirmPassword')}
                                        InputLabelProps={{
                                            shrink: focusedFields.confirmPassword || !!formData.confirmPassword,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start" sx={{ marginRight: '12px' }}>
                                                    <CheckCircleIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        edge="end"
                                                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                                    >
                                                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            placeholder: !focusedFields.confirmPassword && !formData.confirmPassword ? 'Confirm Password' : '',
                                        }}
                                        sx={getTextFieldStyles('confirmPassword', true)}
                                    />
                                </div>
                            )}

                            {/* Remember Me - Only for Login */}
                            {isLogin && (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    margin: isMobile ? '20px 0' : '25px 0',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    gap: isMobile ? '15px' : '0'
                                }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="rememberMe"
                                                checked={formData.rememberMe}
                                                onChange={handleInputChange}
                                                sx={{
                                                    color: 'rgba(255, 255, 255, 0.4)',
                                                    '&.Mui-checked': {
                                                        color: '#f0f0f0',
                                                    },
                                                }}
                                            />
                                        }
                                        label={
                                            <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem' }}>
                                                Remember me
                                            </span>
                                        }
                                    />

                                    <Button
                                        type="button"
                                        onClick={handleForgotPassword}
                                        sx={{
                                            color: '#f0f0f0',
                                            fontSize: '0.95rem',
                                            fontWeight: 500,
                                            textTransform: 'none',
                                            textDecoration: 'underline',
                                            '&:hover': {
                                                background: 'transparent',
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        Forgot password?
                                    </Button>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    padding: isMobile ? '16px' : '18px',
                                    background: '#ffffff',
                                    color: '#007cba',
                                    borderRadius: '8px',
                                    fontSize: isMobile ? '1rem' : '1.1rem',
                                    fontWeight: 600,
                                    marginBottom: isMobile ? '25px' : '30px',
                                    textTransform: 'none',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                                    '&:hover': {
                                        background: '#f0f0f0',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                                    },
                                    '&.Mui-disabled': {
                                        background: 'rgba(255, 255, 255, 0.7)',
                                        color: '#007cba',
                                    },
                                }}
                            >
                                {loading ? (
                                    <span style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}>
                                        <span style={{
                                            width: '6px',
                                            height: '6px',
                                            background: '#007cba',
                                            borderRadius: '50%',
                                            animation: 'bounce 1.4s infinite ease-in-out both'
                                        }}></span>
                                        <span style={{
                                            width: '6px',
                                            height: '6px',
                                            background: '#007cba',
                                            borderRadius: '50%',
                                            animation: 'bounce 1.4s infinite ease-in-out both',
                                            animationDelay: '-0.16s'
                                        }}></span>
                                        <span style={{
                                            width: '6px',
                                            height: '6px',
                                            background: '#007cba',
                                            borderRadius: '50%',
                                            animation: 'bounce 1.4s infinite ease-in-out both',
                                            animationDelay: '-0.32s'
                                        }}></span>
                                    </span>
                                ) : (
                                    isLogin ? 'Sign In' : 'Create Account'
                                )}
                            </Button>

                            {/* Switch Mode */}
                            <div style={{
                                textAlign: 'center',
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '0.95rem',
                                margin: isMobile ? '15px 0' : '20px 0'
                            }}>
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <Button
                                    type="button"
                                    onClick={toggleMode}
                                    sx={{
                                        color: '#f0f0f0',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        fontSize: 'inherit',
                                        padding: '0 4px',
                                        minWidth: 'auto',
                                        textDecoration: 'underline',
                                        '&:hover': {
                                            background: 'transparent',
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    {isLogin ? 'Sign up now' : 'Sign in'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default LoginSignup;