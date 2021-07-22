import axios from "axios";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

type ProductsContextType = {
    products: Array<any>,
    productLoading: boolean
};

const ProductsContextDefaultValues: ProductsContextType = {
    products:[],
    productLoading: false
};

const ProductsContext = createContext<ProductsContextType>(ProductsContextDefaultValues);

export function useProducts() {
    return useContext(ProductsContext);
}

type Props = {
    children: ReactNode;
};

export function ProductsProvider({ children }: Props) {
    const [products, setProducts] = useState([]);
    const [productLoading,setProductLoading] = useState(false);
    useEffect(()=>{
        (async ()=>{
            setProductLoading(true);
            const {data} = await axios.get("/products");
            setProducts(data?.response??[]);
            setProductLoading(false);
        })()
    },[])

    const value = {
        products,
        productLoading
    };

    return (
        <>
            <ProductsContext.Provider value={value}>
                {children}
            </ProductsContext.Provider>
        </>
    );
}