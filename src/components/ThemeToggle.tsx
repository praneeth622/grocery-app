import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-300 theme-hover theme-active"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon 
          size={24} 
          className="text-gray-800 dark:text-gray-200 transition-colors duration-300" 
        />
      ) : (
        <Sun 
          size={24} 
          className="text-yellow-300 dark:text-yellow-200 transition-colors duration-300" 
        />
      )}
    </button>
  );
};

export default ThemeToggle;