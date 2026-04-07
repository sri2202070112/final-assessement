import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import type { ReactNode } from 'react';
import { COLORS } from './color';

interface Props {
  children: ReactNode;
}

export default function ThemeCustomization({ children }: Props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: COLORS.PRIMARY,
        light: COLORS.SECONDARY, // using secondary for light variants since it's a lighter alpha version
      },
      secondary: {
        main: COLORS.SECONDARY,
      },
      success: {
        main: COLORS.SUCCESS,
      },
      error: {
        main: COLORS.ERROR,
      },
      background: {
        default: '#f4f6f8',
        paper: '#ffffff',
      },
    },
    typography: {
      fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 14px 0 rgba(32, 40, 45, 0.08)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
