import React from "react";
import {useUser} from "../../context/userContext";
import EmptyLoginScreen from "../common/EmptyLoginScreen";
import UserCart from "./UserCart";

function CartPage(){
    const {isLoginned }= useUser();
    return (
        <div className="h-full p-2">{
            isLoginned?<UserCart/>:<EmptyLoginScreen pageName="cart" img="/cart.svg"/>
        }</div>
    )
}

export default CartPage;