import Navbar from "../components/layouts/Navbar";
import '../styles/main.css';
import { ProductsProvider } from "../context/productContext";
import { UserProvider } from "../context/userContext";
import React from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Dev Bazar</title>
      </Head>
      <UserProvider>
        <ProductsProvider>
          <Navbar />
          <div className="h-full pt-16">
            <Component {...pageProps} />
          </div>
        </ProductsProvider>
      </UserProvider>
    </>
  )
}

export default MyApp
