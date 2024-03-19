
import PageHeader from './PageHeader';

import { Container, Grid, ThemeProvider } from '@mui/material';


import AccountBalance from './AccountBalance';
import Wallets from './Wallets';
import WatchList from './WatchList';
import { PureLightTheme } from '~/styles/schemes/PureLightTheme';
import PageTitleWrapper from '~/components/PageTitleWrapper';
import SidebarLayout from '~/layouts/SidebarLayout/';


const theme = PureLightTheme

function DashboardAdmin() {
  
  return (
    <>
    
    <SidebarLayout>
      <ThemeProvider theme={theme}>
          <PageTitleWrapper>
            <PageHeader />
          </PageTitleWrapper>
          <Container maxWidth="lg">
            <Grid
              container
              direction={"row"}
              justifyContent={"center"}
              alignItems={"stretch"}
              spacing={4}>
              <Grid item xs={12}>
                <AccountBalance />
              </Grid>
              <Grid item lg={8} xs={12}>
                <Wallets />
              </Grid>
              {/* <Grid item lg={4} xs={12}>
                <AccountSecurity/>
              </Grid> */}
            </Grid>
            <Grid item xs={12}>
              <WatchList />
            </Grid>
          </Container>
          
      </ThemeProvider>
      </SidebarLayout>
    </>
  );
}

export default DashboardAdmin;
