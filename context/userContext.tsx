import { createContext, useContext, ReactNode, useState, useEffect } from "react";

type UserContextType = {
    isLoginned: boolean,
    setLoginned: Function,
    accessToken: string,
    wishList: Array<any>,
    setWishList:Function,
    cart: Array<any>
    setCart: Function,
    setAccessToken: Function
};

const UserContextDefaultValues: UserContextType = {
    isLoginned: false,
    setLoginned:()=>{},
    accessToken: "",
    wishList: [],
    setWishList:()=>{},
    cart: [],
    setCart:()=>{},
    setAccessToken:()=>{}
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

    useEffect(()=>{
        const accessToken=localStorage.getItem("accessToken");
        if(accessToken){
            setAccessToken(accessToken);
            setLoginned(true);
        }
    },[])

    const value = {
        isLoginned,
        setLoginned,
        wishList,
        setWishList,
        accessToken,
        setAccessToken,
        cart,
        setCart
    };

    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    );
}