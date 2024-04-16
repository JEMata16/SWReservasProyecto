import { useAuth } from "@clerk/nextjs";
import { Container, Grid, ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import PageTitleWrapper from "~/components/PageTitleWrapper";
import AffiliateSidebarLayout from "~/layouts/AffiliateSidebarLayout";
import SidebarLayout from "~/layouts/SidebarLayout";
import { api } from "~/utils/api";
import PageHeader from "../admin/PageHeader";
import { PureLightTheme } from "~/styles/schemes/PureLightTheme";
import Graphics from "./Graphics";
const theme = PureLightTheme;

const AffiliationPage = () => {
    const { userId } = useAuth();
    const { data: userAffiliation } = api.affiliation.getByUserId.useQuery({ id: userId ?? '' });
    

    return (
        <>
            <AffiliateSidebarLayout>
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
                                <Graphics/>
                            </Grid>
                            <Grid item lg={8} xs={12}>

                            </Grid>

                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Container>

                </ThemeProvider>


            </AffiliateSidebarLayout>

        </>
    )
}




export default AffiliationPage;