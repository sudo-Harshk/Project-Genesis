import React, { useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  useEffect(() => {
    // Always set dark theme
    const root = document.documentElement;
    root.classList.add('theme-dark');
    localStorage.setItem('pg-theme', 'dark');
  }, []);

  return (
    <button
      aria-label="Dark theme active"
      className="menu__trigger"
      style={{ width: 90 }}
      disabled
    >
      Dark
    </button>
  );
};

export default ThemeToggle;


