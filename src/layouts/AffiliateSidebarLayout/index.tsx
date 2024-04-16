import { FC, ReactNode } from 'react';
import { Box, ThemeProvider, alpha, lighten, useTheme } from '@mui/material';
// import { Outlet } from 'react-router-dom';


import Header from './Header';
import { PureLightTheme } from '~/styles/schemes/PureLightTheme';
import { SidebarProvider } from '~/contexts/SidebarContext';
import AffiliateSidebar from './Sidebar';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const AffiliateSidebarLayout: FC<SidebarLayoutProps> = ({children}) => {
  const theme = PureLightTheme

  return (
    <>
    <ThemeProvider theme={theme} >
      <Box
        sx={{
          flex: 1,
          height: '100%',

          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05
                  )}`
          }
        }}
      >
        <Header />
        <AffiliateSidebar/>
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`
            }
          }}
        >
          <Box display="block">
            {children}
          </Box>
        </Box>
      </Box>
      </ThemeProvider>
    </>
  );
};


export default AffiliateSidebarLayout;
