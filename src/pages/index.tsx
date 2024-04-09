

import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import Head from "next/head";
import Hero from "~/components/Hero";
import Places from "~/components/Recommendations";
import Tours from "~/components/Tours";


const Home: NextPage = () => {

  
  return (
    <>
      <Head>
        <title>MKConnection</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero/>
      <main className="bg-white-500">
        <Places/>
        <Tours/>
      </main>
    </>
  );
}

export default Home;
