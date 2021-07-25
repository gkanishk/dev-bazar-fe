import Navbar from "../components/layouts/Navbar";
import '../styles/main.css';
import { ProductsProvider } from "../context/productContext";
import { UserProvider } from "../context/userContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
