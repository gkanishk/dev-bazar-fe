import { Spin } from "antd";
import React from "react";
import { useUser } from "../../context/userContext";
import EmptyLoginScreen from "../common/EmptyLoginScreen";
import UserCart from "./UserCart";

function CartPage() {
    const { isLoginned, isUserDataLoading } = useUser();
    return (
        <div className="w-screen h-full p-2">{
            isLoginned && !isUserDataLoading ? <UserCart /> : isUserDataLoading ? 
            <div className="grid w-full h-screen place-content-center">
                <Spin className="self-center" size="large" />
            </div> : <EmptyLoginScreen pageName="cart" img="/cart.svg" />
        }</div>
    )
}

export default CartPage;