import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { THEME_COLORS } from './ThemeContext';

const ColorPicker = () => {
  const { color, setThemeColor, themeColors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const colorOptions = Object.keys(THEME_COLORS);

  const handleColorSelect = (colorName) => {
    setThemeColor(colorName);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'transparent',
          border: '1px solid var(--border-color)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        title="Change Theme Color"
      >
        <div style={{
          width: '24px',
          height: '24px',
          background: themeColors[color].primary,
          borderRadius: '50%',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }} />
        <span style={{
          position: 'absolute',
          bottom: '2px',
          right: '2px',
          fontSize: '12px',
          color: '#ffffff',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '50%',
          width: '14px',
          height: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          🎨
        </span>
      </button>

      {isOpen && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
            onClick={() => setIsOpen(false)}
          />
          <div style={{
            position: 'absolute',
            top: '50px',
            right: 0,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 1000,
            width: '180px',
            animation: 'slideDown 0.2s ease'
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--text-muted)',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Theme Colors
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px'
            }}>
              {colorOptions.map((colorName) => (
                <button
                  key={colorName}
                  onClick={() => handleColorSelect(colorName)}
                  style={{
                    width: '40px',
                    height: '40px',
                    background: THEME_COLORS[colorName].primary,
                    border: `2px solid ${color === colorName ? 'var(--text-primary)' : 'transparent'}`,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                  title={colorName.charAt(0).toUpperCase() + colorName.slice(1)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {color === colorName && (
                    <span style={{
                      color: '#fff',
                      fontSize: '16px',
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}>
                      ✓
                    </span>
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    background: 'var(--bg-card)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    display: 'none'
                  }}>
                    {colorName}
                  </div>
                </button>
              ))}
            </div>

            <div style={{
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-color)',
              fontSize: '11px',
              color: 'var(--text-muted)',
              textAlign: 'center'
            }}>
              Click to apply
            </div>
          </div>
        </>
      )}

      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ColorPicker;