import { useEffect, useState } from 'react';
import logoLight from '../../assets/images/header/logo.svg';
import logoDark from '../../assets/images/header/logo-white.svg';

interface Theme {
  name: string;
  bg: string;
  logo?: string;
}

interface DarkModeProps {
  children: (theme: Theme, nextTheme: () => void) => React.ReactNode;
}

export default function DarkMode({ children }: DarkModeProps) {
  const themes: Theme[] = [
    {
      name: 'Light',
      bg: 'bg-gradient-to-r from-white to-[#c0cfe7]',
      logo: logoLight,
    },
    {
      name: 'Dark',
      bg: 'bg-gradient-to-b from-[#7C7C7C] to-[#313235]',
      logo: logoDark,
    },
  ];

  const getTheme = () => {
    const storeTheme = localStorage.getItem('themeIndex');
    return storeTheme ? Number(storeTheme) : 0;
  };

  const [themeIndex, setThemeIndex] = useState(getTheme);

  useEffect(() => {
    localStorage.setItem('themeIndex', String(themeIndex));
  }, [themeIndex]);

  const theme = themes[themeIndex];

  const nextTheme = () => {
    setThemeIndex((currentTheme) => (currentTheme + 1) % themes.length);
  };

  return (
    <div
      className={`min-h-screen ${theme.bg} transition-colors duration-300 flex flex-col relative`}
    >
      <main>{children(theme, nextTheme)}</main>
    </div>
  );
}
