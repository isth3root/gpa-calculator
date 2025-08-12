import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Button from './common/Button';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      className="bg-primary text-white p-2 rounded"
      value={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      disabled={false}
    />
  );
};

export default ThemeToggle;
