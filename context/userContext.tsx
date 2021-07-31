import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { getAxiosClient } from "../hooks/useAxios";
import { delete_cookie, getCookie } from "../hooks/useCookie";

type UserContextType = {
    isLoginned: boolean,
    setLoginned: Function,
    accessToken: string,
    wishList: {item: any}[],
    setWishList:Function,
    cart: {item: any,count: number}[]
    setCart: Function,
    setAccessToken: Function,
    logoutUser:Function,
    isUserDataLoading: boolean,
    username: string,
    setUserName: Function
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
    logoutUser:()=>{},
    isUserDataLoading: false,
    username: "User",
    setUserName:()=>{}
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
    const [isUserDataLoading, setUserDataLoading] = useState(false);
    const [username,setUserName] = useState<string>();

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
        const userData= localStorage.getItem("userName");
        setUserName(userData)
        if(token){
            setAccessToken(token);
            setLoginned(true);
        }
    },[]);

    useEffect(()=>{
            (async()=>{
                if(accessToken.length>0){
                setUserDataLoading(true);
                try {
                    const cartResponse = await getAxiosClient(accessToken).get("/user/cart");
                    const wishListResponse = await getAxiosClient(accessToken).get("/user/wishList");
                    setCart(cartResponse.data?.response?.cart?.cartItems??[]);
                    setWishList(wishListResponse.data?.response?.wishList?.wishListems??[]);
                } catch(error) {
                    logoutUser();
                }
                setUserDataLoading(false);
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
        logoutUser,
        isUserDataLoading,
        username,
        setUserName
    };

    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    );
}