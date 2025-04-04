import React, { createContext, useContext, useState, ReactNode } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Themes import
import { typographyStyles } from "./typography/typography";
import { lightPalette } from "./colorPalettes/lightColorPalette";
import { darkPalette } from "./colorPalettes/darkColorPalette";

export type ThemeMode = "light" | "dark";

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

const themes: Record<ThemeMode, any> = {
  light: createTheme({
    palette: lightPalette,
    typography: typographyStyles,
  }),
  dark: createTheme({
    palette: darkPalette,
    typography: typographyStyles,
  }),
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  const currentTheme = themes[mode];

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
