import { notification } from "antd";
import { useRouter } from "next/router";
import { useUser } from "../context/userContext"
import { getAxiosClient } from "./useAxios";
import React from "react";


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

    const getDeliveryDate=()=> {
        const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date();
        const date = new Date(currentDate.setDate(currentDate.getDate() + (Math.floor(Math.random() * (10- 5 + 1)) + 5))).toLocaleString(undefined,options);
        return date;
    }

    const addToCartWishList = async (productId:string, type: 'addToCart' | 'addToWishList') => {
        if (!isLoginned)
            return router.push(`/login?referer=products&productId=${productId}&action=${type}`)
        try {
            const { data } = await getAxiosClient(accessToken).post(`/user/${type}`, { productId })
            if (type === "addToCart") {
                const btn =( React.createElement("a", { href: "/cart" },"Go To Cart"));
                setCart(data?.response?.wishList ?? []);
                notification.success({
                    message: "Added to Cart",
                    btn,
                    duration: 2
                })
            } else {    
                const btn =( React.createElement("a", { href: "/wishlist" },"Go To WishList"));    
                setWishList(data?.response?.wishList ?? []);
                notification.success({
                    message: "Added to Wishlist",
                    btn,
                    duration: 2
                })
            }
        } catch (error){
            if(error.response?.data?.statusCode===422){
                notification.info({
                    message: error.response?.data?.message??"Operation failed",
                    duration: 2
                })
            }else {
                notification.error({
                    message: error.response?.data?.message??"Operation failed",
                    duration: 2
                })
            }
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
        await getAxiosClient(accessToken).post("/user/updateWishList",getwishListBody(productId));
        setWishList([...wishListItems]);
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

    const updateItemCount = async(count:number,productId:string, index: number)=> {
        cart[index].count=count;
        setCart([...cart])
    }

    const removeFromCart = async(index:number,showNotification: boolean) =>{
        try {
            const arr= [...cart];
            arr.splice(index, 1);
            console.log(arr,index);
            setCart(arr);
            const cartBody = []
            arr.forEach(({item,count})=>{
                cartBody.push({productId: item.id,count})
            })
            await getAxiosClient(accessToken).post("/user/updateCart",cartBody);
            if(showNotification) {
                notification.success({
                    message: "Item removed!"
                })
            }
        }catch (err) {
            notification.success({
                message: "Operation Failed"
            })
        }

    }

    const moveToWishList = async(id,index)=> {
        removeFromCart(index,false);
        await addToCartWishList(id,"addToWishList");
    }

    const getPriceDetails = () =>{
        const amount = {
            mrp: 0,
            totalDiscount: 0,
            shippingCost: 0,
            finalAmount: 0,
            itemCount: 0
        }
        cart.forEach(({item,count})=>{
            amount.mrp += item.price * count;
            amount.itemCount += count;
        })
        cart.forEach(({item:{price,discount}})=>{
            amount.totalDiscount += Math.floor((price*discount)/100)
        });
        amount.finalAmount = amount.mrp - amount.totalDiscount;
        if(amount.finalAmount<500){
            amount.finalAmount += 99;
            amount.shippingCost = 99;
        }

        return amount;
    }

    const placeOrder = async() =>{
        notification.success({
            message: "Order placed",
            description: "Details will be mailed shortly."
        });
        setCart([]);
        await getAxiosClient(accessToken).post("/user/updateCart",[]);
    }

    return {
        isItemInCart,
        isItemInWishList,
        getDiscounterPrice,
        addToCartWishList,
        moveToCart,
        removeFromWishList,
        getDeliveryDate,
        getPriceDetails,
        removeFromCart,
        moveToWishList,
        updateItemCount,
        placeOrder
    }
}