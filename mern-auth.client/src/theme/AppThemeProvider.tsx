import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Themes import
import { typographyStyles } from "./typography/typography";
import { lightPalette } from "./colorPalettes/lightColorPalette";
import { darkPalette } from "./colorPalettes/darkColorPalette";

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

const lightTheme = createTheme({
  palette: lightPalette,
  typography: typographyStyles,
});

const darkTheme = createTheme({
  palette: darkPalette,
  typography: typographyStyles,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const getSystemTheme = () =>
      window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const updateSystemTheme = () => {
      if (mode === 'system') {
        setResolvedMode(getSystemTheme());
      }
    };

    updateSystemTheme(); // set initially
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', updateSystemTheme);

    return () => {
      mq.removeEventListener?.('change', updateSystemTheme);
    };
  }, [mode]);

  const currentTheme = mode === 'system'
    ? (resolvedMode === 'dark' ? darkTheme : lightTheme)
    : (mode === 'dark' ? darkTheme : lightTheme);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
