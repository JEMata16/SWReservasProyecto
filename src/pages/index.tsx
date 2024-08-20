import { NextPage } from "next";
import Head from "next/head";
import Footer from "~/components/Footer";
import Hero from "~/components/Hero";
import Places from "~/components/Recommendations";
import Tours from "~/components/Tours";


const Home: NextPage = () => {

  
  return (
    <>
      <Head>
        <title>MKConnection</title>
        <meta name="description" content="Tourism" />
        <link rel="icon" href="/logo.webp" />
      </Head>
      <Hero/>
      <main className="bg-white-500">
        <Places/>
        <Tours/>
        <Footer/>
      </main>
    </>
  );
}

export default Home;
