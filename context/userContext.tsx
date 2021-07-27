import axios from "axios";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { baseUrl } from "../hooks/useAxios";
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
        setAccessToken(token)
    },[]);

    useEffect(()=>{
            (async()=>{
                if(accessToken.length>0){
                const cartResponse = await axios.get(baseUrl+"/user/cart",{headers:{Authorization: `Bearer ${accessToken}`}});
                const wishListResponse = await axios.get(baseUrl+"/user/wishList",{headers:{Authorization: `Bearer ${accessToken}`}});
                console.log(cartResponse,wishListResponse)
                setCart(cartResponse.data?.response?.cart?.cartItems??[])
                setWishList(cartResponse.data?.response?.wishList?.wishListems??[])
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