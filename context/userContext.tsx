import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { getAxiosClient } from "../hooks/useAxios";
import { delete_cookie, getCookie } from "../hooks/useCookie";

type UserContextType = {
    isLoginned: boolean,
    setLoginned: Function,
    accessToken: string,
    wishList: Array<any>,
    setWishList:Function,
    cart: Array<any>
    setCart: Function,
    setAccessToken: Function,
    logoutUser:Function
};

const UserContextDefaultValues: UserContextType = {
    isLoginned: false,
    setLoginned:()=>{},
    accessToken: "",
    wishList: [],
    setWishList:()=>{},
    cart: [],
    setCart:()=>{},
    setAccessToken:()=>{},
    logoutUser:()=>{}
};

const UserContext = createContext<UserContextType>(UserContextDefaultValues);

export function useUser() {
    return useContext(UserContext);
}

type Props = {
    children: ReactNode;
};

export function UserProvider({ children }: Props) {
    const [isLoginned,setLoginned] = useState(false);
    const [wishList,setWishList] = useState([]);
    const [cart,setCart] = useState([]);
    const [accessToken,setAccessToken] = useState("");

    const logoutUser=()=>{
        setAccessToken("");
        setLoginned(false);
        setWishList([]);
        setCart([]);
        localStorage.clear();
        delete_cookie("accessToken");
    }

    useEffect(()=>{
        const token = getCookie("accessToken");
        if(token){
            setAccessToken(token);
            setLoginned(true);
        }
    },[]);

    useEffect(()=>{
            (async()=>{
                if(accessToken.length>0){
                const cartResponse = await getAxiosClient(accessToken).get("/user/cart");
                const wishListResponse = await getAxiosClient(accessToken).get("/user/wishList");
                console.log(cartResponse,wishListResponse)
                setCart(cartResponse.data?.response?.cart?.cartItems??[])
                setWishList(wishListResponse.data?.response?.wishList?.wishListems??[])
            }
            })()
    },[accessToken])

    const value = {
        isLoginned,
        setLoginned,
        wishList,
        setWishList,
        accessToken,
        setAccessToken,
        cart,
        setCart,
        logoutUser
    };

    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    );
}