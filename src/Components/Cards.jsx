import React from 'react';
import { useThemeValues } from '../Theme/theme';

const Card = ({ text, heading, image }) => {
  const theme = useThemeValues();

  return (
    <div style={{
      background: theme.palette.bg.card,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: theme.palette.shadow,
      border: `1px solid ${theme.palette.border}`,
      transition: 'all 0.3s ease',
      height: '100%'
    }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = theme.palette.shadowLg;
        e.currentTarget.style.borderColor = theme.palette.primary;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = theme.palette.shadow;
        e.currentTarget.style.borderColor = theme.palette.border;
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <div>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: theme.palette.text.muted,
            marginBottom: '8px'
          }}>
            {text}
          </p>
          <h3 style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: '700',
            color: theme.palette.text.primary
          }}>
            {heading}
          </h3>
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: theme.palette.bg.cardGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={image} 
            alt={text}
            style={{ 
              width: '24px', 
              height: '24px',
              filter: 'brightness(0) invert(1)' 
            }} 
          />
        </div>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        color: theme.palette.text.secondary
      }}>
        <span style={{ color: theme.palette.primary, fontWeight: '600' }}>↗ 12%</span>
        <span>from last month</span>
      </div>
    </div>
  );
};

export default Card;