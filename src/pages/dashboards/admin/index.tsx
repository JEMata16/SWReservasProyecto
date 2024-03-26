
import PageHeader from './PageHeader';

import { Container, Grid, NoSsr, ThemeProvider } from '@mui/material';



import { PureLightTheme } from '~/styles/schemes/PureLightTheme';
import PageTitleWrapper from '~/components/PageTitleWrapper';
import SidebarLayout from '~/layouts/SidebarLayout/';
import Graphics from './Graphics';


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
                <Graphics />
              </Grid>
              <Grid item lg={8} xs={12}>

              </Grid>

            </Grid>
            <Grid item xs={12}>

            </Grid>
          </Container>

        </ThemeProvider>
      </SidebarLayout>
    </>
  );
}

export default DashboardAdmin;
