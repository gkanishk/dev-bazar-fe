import Navbar from "../components/layouts/Navbar";
import '../styles/main.css';
import axios from "axios";
import { ProductsProvider } from "../context/productContext";
axios.defaults.baseURL='https://devbazar.herokuapp.com';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <ProductsProvider>
      <Navbar />
      <div className="mt-28">
        <Component {...pageProps} />
      </div>
      </ProductsProvider>
    </>
  )
}

export default MyApp
