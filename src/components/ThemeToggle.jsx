//MODO OSCURO
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', isDark);
    document.body.style.background = isDark 
      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      background: isDark ? '#1a1a2e' : '#667eea',
      cardBg: isDark ? '#2d2d44' : 'rgba(255,255,255,0.95)',
      text: isDark ? '#e0e0e0' : '#333',
      textSecondary: isDark ? '#a0a0a0' : '#666',
      primary: isDark ? '#bb86fc' : '#667eea',
      secondary: isDark ? '#03dac6' : '#764ba2',
      success: '#48bb78',
      error: '#f56565',
      warning: '#ed8936'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: isDark 
          ? 'linear-gradient(135deg, #bb86fc, #6200ea)' 
          : 'linear-gradient(135deg, #ffd89b, #19547b)',
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        fontSize: '28px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => e.target.style.transform = 'scale(1.1) rotate(180deg)'}
      onMouseOut={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}