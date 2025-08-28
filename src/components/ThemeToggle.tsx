import React, { useEffect, useState } from 'react';

const THEME_KEY = 'pg-theme';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light'|'dark'>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(THEME_KEY) : null;
    return (saved === 'dark' || saved === 'light') ? (saved as 'light'|'dark') : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      className="menu__trigger"
      style={{ width: 90 }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};

export default ThemeToggle;


