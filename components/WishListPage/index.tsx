import { Spin } from "antd";
import React from "react";
import { useUser } from "../../context/userContext";
import EmptyLoginScreen from "../common/EmptyLoginScreen";
import UserWishList from "./UserWishList";

function WishListPage() {
    const { isLoginned, isUserDataLoading } = useUser();
    return (
        <div className="h-full p-2">{
            isLoginned && !isUserDataLoading ? <UserWishList /> :
                isUserDataLoading ?
                    <div className="grid w-full h-screen place-content-center">
                        <Spin className="self-center" size="large" />
                    </div>
                    :
                    <EmptyLoginScreen pageName="wishlist" img="/login.svg" />
        }</div>
    )
}

export default WishListPage;