import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import Footer from "~/components/Footer";
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <ClerkLoading>
        <span className="loading loading-spinner loading-md"></span>
      </ClerkLoading>
      <ClerkLoaded>
        <Component {...pageProps} />
        <Footer />
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
