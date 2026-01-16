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
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        address: "",
        image: "",
        rememberMe: false,
    });


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
    };

    const validateForm = () => {
        if (!isLogin && !formData.name.trim()) {
            toast.error('Name is required');
            return false;
        }

        if (!formData.username.trim()) {
            toast.error('username is required');
            return false;
        }

        else if (!formData.username) {
            toast.error('Please enter a valid username address');
            return false;
        }

        if (!formData.password) {
            toast.error('Password is required');
            return false;
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            console.log("🔐 LOGIN API CALLED");

            const response = await axios.post(
                urls.login,
                {
                    username: formData.username,
                    password: formData.password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 10000,
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

        } catch (error) {
            console.error("❌ LOGIN ERROR");

            console.error({
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });

            toast.error(
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };



    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    const handleForgotPassword = () => {
        toast.info('Password reset link would be sent to your username');
    };

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
            {/* Add CSS animations */}
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

                {/* Right Side - Form */}
                <div style={{
                    flex: 1,
                    padding: isMobile ? '30px 20px 40px' : '60px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#007cba',
                    position: 'relative',
                    overflow: 'hidden',
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
                            marginBottom: isMobile ? '15px' : '10px',
                            textAlign: 'center'
                        }}>
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            {/* Name Field - Only for Signup */}
                            {!isLogin && (
                                <div style={{ marginBottom: isMobile ? '15px' : '20px' }}>
                                    <div style={{
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <span style={{
                                            padding: '0 16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <svg style={{
                                                width: '18px',
                                                height: '18px',
                                                stroke: 'rgba(255, 255, 255, 0.8)',
                                                strokeWidth: '2',
                                                fill: 'none'
                                            }} viewBox="0 0 24 24">
                                                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" />
                                                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Full Name"
                                            style={{
                                                flex: 1,
                                                padding: isMobile ? '14px 16px' : '16px 20px',
                                                border: 'none',
                                                background: 'transparent',
                                                color: '#f0f0f0',
                                                fontSize: isMobile ? '0.95rem' : '1rem',
                                                outline: 'none',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* username Field */}
                            <div style={{ marginBottom: isMobile ? '15px' : '20px' }}>
                                <div style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <span style={{
                                        padding: '0 16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg style={{
                                            width: '18px',
                                            height: '18px',
                                            stroke: 'rgba(255, 255, 255, 0.8)',
                                            strokeWidth: '2',
                                            fill: 'none'
                                        }} viewBox="0 0 24 24">
                                            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" />
                                            <path d="M22 6L12 13L2 6" />
                                        </svg>
                                    </span>
                                    <input
                                        type="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="username Address"
                                        style={{
                                            flex: 1,
                                            padding: isMobile ? '14px 16px' : '16px 20px',
                                            border: 'none',
                                            background: 'transparent',
                                            color: '#f0f0f0',
                                            fontSize: isMobile ? '0.95rem' : '1rem',
                                            outline: 'none',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div style={{ marginBottom: isMobile ? '15px' : '20px' }}>
                                <div style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <span style={{
                                        padding: '0 16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg style={{
                                            width: '18px',
                                            height: '18px',
                                            stroke: 'rgba(255, 255, 255, 0.8)',
                                            strokeWidth: '2',
                                            fill: 'none'
                                        }} viewBox="0 0 24 24">
                                            <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" />
                                            <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" />
                                        </svg>
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Password"
                                        style={{
                                            flex: 1,
                                            padding: isMobile ? '14px 16px' : '16px 20px',
                                            border: 'none',
                                            background: 'transparent',
                                            color: '#f0f0f0',
                                            fontSize: isMobile ? '0.95rem' : '1rem',
                                            outline: 'none',
                                            fontFamily: 'inherit',
                                            letterSpacing: '1px'
                                        }}
                                    />
                                    <button
                                        type="button"
                                        style={{
                                            padding: isMobile ? '0 16px' : '0 20px',
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#f0f0f0',
                                            cursor: 'pointer',
                                            transition: 'color 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg style={{
                                                width: '18px',
                                                height: '18px',
                                                stroke: 'currentColor',
                                                strokeWidth: '2',
                                                fill: 'none'
                                            }} viewBox="0 0 24 24">
                                                <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
                                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
                                            </svg>
                                        ) : (
                                            <svg style={{
                                                width: '18px',
                                                height: '18px',
                                                stroke: 'currentColor',
                                                strokeWidth: '2',
                                                fill: 'none'
                                            }} viewBox="0 0 24 24">
                                                <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
                                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
                                                <path d="M2 2L22 22" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field - Only for Signup */}
                            {!isLogin && (
                                <div style={{ marginBottom: isMobile ? '15px' : '20px' }}>
                                    <div style={{
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <span style={{
                                            padding: '0 16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <svg style={{
                                                width: '18px',
                                                height: '18px',
                                                stroke: 'rgba(255, 255, 255, 0.8)',
                                                strokeWidth: '2',
                                                fill: 'none'
                                            }} viewBox="0 0 24 24">
                                                <path d="M9 12L11 14L15 10M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" />
                                            </svg>
                                        </span>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Confirm Password"
                                            style={{
                                                flex: 1,
                                                padding: isMobile ? '14px 16px' : '16px 20px',
                                                border: 'none',
                                                background: 'transparent',
                                                color: '#f0f0f0',
                                                fontSize: isMobile ? '0.95rem' : '1rem',
                                                outline: 'none',
                                                fontFamily: 'inherit',
                                                letterSpacing: '1px'
                                            }}
                                        />
                                        <button
                                            type="button"
                                            style={{
                                                padding: isMobile ? '0 16px' : '0 20px',
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#f0f0f0',
                                                cursor: 'pointer',
                                                transition: 'color 0.3s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <svg style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    stroke: 'currentColor',
                                                    strokeWidth: '2',
                                                    fill: 'none'
                                                }} viewBox="0 0 24 24">
                                                    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
                                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
                                                </svg>
                                            ) : (
                                                <svg style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    stroke: 'currentColor',
                                                    strokeWidth: '2',
                                                    fill: 'none'
                                                }} viewBox="0 0 24 24">
                                                    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
                                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
                                                    <path d="M2 2L22 22" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Options */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                margin: isMobile ? '20px 0' : '25px 0',
                                flexDirection: isMobile ? 'column' : 'row',
                                gap: isMobile ? '15px' : '0'
                            }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#f0f0f0',
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}>
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        style={{ display: 'none' }}
                                    />
                                    <span style={{
                                        width: '18px',
                                        height: '18px',
                                        border: '2px solid rgba(255, 255, 255, 0.4)',
                                        borderRadius: '4px',
                                        marginRight: '10px',
                                        position: 'relative',
                                        transition: 'all 0.3s ease'
                                    }}></span>
                                    Remember me
                                </label>

                                {isLogin && (
                                    <button
                                        type="button"
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#f0f0f0',
                                            fontSize: '0.95rem',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            transition: 'color 0.3s ease'
                                        }}
                                        onClick={handleForgotPassword}
                                    >
                                        Forgot password?
                                    </button>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: isMobile ? '16px' : '18px',
                                    background: 'white',
                                    color: '#007cba',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: isMobile ? '1rem' : '1.1rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    marginBottom: isMobile ? '25px' : '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px'
                                }}
                                disabled={loading}
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
                            </button>

                            {/* Switch Mode */}
                            <div style={{
                                textAlign: 'center',
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '0.95rem',
                                margin: isMobile ? '15px 0' : '20px 0'
                            }}>
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    type="button"
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#f0f0f0',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        padding: 0,
                                        fontSize: 'inherit'
                                    }}
                                    onClick={toggleMode}
                                >
                                    {isLogin ? 'Sign up now' : 'Sign in'}
                                </button>
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