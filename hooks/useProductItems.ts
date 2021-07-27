import { notification } from "antd";
import { useRouter } from "next/router";
import { useUser } from "../context/userContext"
import { getAxiosClient } from "./useAxios";


export const useProductItems=()=>{
    const router = useRouter();
    const {cart,wishList,setWishList,setCart,isLoginned,accessToken}=useUser();

    const isItemInCart=(id:string)=>{
        return cart.some(({item:{id:productId}})=>id===productId);
    }

    const isItemInWishList=(id:string)=>{
        return wishList.some(({item:{id:productId}})=>id===productId);
    }

    const getDiscounterPrice = (price, disc) => {
        return Math.round(price - ((disc / 100) * price));
    }

    const addToCartWishList = async (productId:string, type: string) => {
        if (!isLoginned)
            return router.push(`/login?referer=products&productId=${productId}&action=${type}`)
        try {
            const { data } = await getAxiosClient(accessToken).post(`/user/${type}`, { productId })
            if (type === "addToCart") {
                setCart(data?.response?.wishList ?? []);
                notification.success({
                    message: "Added to Cart",
                    duration: 2
                })
            } else {
                setWishList(data?.response?.wishList ?? []);
                notification.success({
                    message: "Added to Wishlist",
                    duration: 2
                })
            }
        } catch (error){
            notification.error({
                message: "Operation failed",
                duration: 2
            })
        }
    }

    const getwishListBody=(productId)=>{
        const wishListBody:{productId:string}[] =[];
        wishList.forEach(({item})=>{
            if(item?.id!==productId)
            wishListBody.push({productId: item.id})
        });
        return wishListBody;
    }

    const removeFromWishList=async(productId,showNotification=false)=>{
        const wishListItems = wishList.filter(({item})=>item.id!==productId);
        setWishList([...wishListItems]);
        await getAxiosClient(accessToken).post("/user/updateWishList",getwishListBody(productId));
        if(showNotification) {
            notification.success({
                message: "Removes from Wishlist",
                duration: 2
            })
        }
    }

    const moveToCart=async(productId:string)=>{
        // Remove from WishList
        await removeFromWishList(productId);
        await addToCartWishList(productId,"addToCart");
    }

    return {
        isItemInCart,
        isItemInWishList,
        getDiscounterPrice,
        addToCartWishList,
        moveToCart,
        removeFromWishList
    }
}