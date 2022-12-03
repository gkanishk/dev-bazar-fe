import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

type ProductsContextType = {
    products: Array<any>,
    filteredProducts: Array<any>,
    productLoading: boolean,
    filterProducts: Function,
    setFilteredProducts: Function
};

const ProductsContextDefaultValues: ProductsContextType = {
    products: [],
    filteredProducts: [],
    productLoading: false,
    filterProducts: () => { },
    setFilteredProducts: () => { }
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
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productLoading, setProductLoading] = useState(false);
    const { response, isLoading } = useAxios("GET", "/products", {}, {});
    useEffect(() => {
        setProducts(response?.data?.response ?? []);
        setProductLoading(isLoading);
    }, [response, isLoading])

    useEffect(() => {
        setFilteredProducts(products);
    }, [products])

    const filterProducts = (sortBy: string, brandFilters: Array<string>, idealFor: Array<string>, sizes: Array<string>, discounts: Array<number>, inStock: boolean, search: string) => {
        let tempProducts = [...products];
        if (!inStock) {
            tempProducts = tempProducts.filter(({ quantity }) => (quantity > 0))
        }
        if (brandFilters.length > 0)
            tempProducts = tempProducts.filter(({ attributes }) => (brandFilters.includes(attributes.brand)))
        if (idealFor.length > 0)
            tempProducts = tempProducts.filter(({ attributes }) => (idealFor.includes(attributes.for)))
        if (discounts.length > 0)
            tempProducts = tempProducts.filter(({ discount }) => (discounts.includes(Number(discount))))
        if (sizes.length > 0)
            tempProducts = tempProducts.filter(({ attributes }) => ((sizes.filter(element => attributes.sizes.includes(element))).length > 0))
        if (sortBy === "low")
            tempProducts = tempProducts.sort((a, b) => a.price - b.price);
        else if (sortBy === "high")
            tempProducts = tempProducts.sort((a, b) => b.price - a.price);
        if (search.length > 0) {
            tempProducts = tempProducts.filter((value) => value.name.toLowerCase().includes(search.toLowerCase().trim()));
        }
        setFilteredProducts(tempProducts);
    }

    const value = {
        products,
        filteredProducts,
        productLoading,
        filterProducts: filterProducts,
        setFilteredProducts
    };

    return (
        <>
            <ProductsContext.Provider value={value}>
                {children}
            </ProductsContext.Provider>
        </>
    );
}