import { Button } from "antd";
import Link from "next/link";
import React from "react";
import { useUser } from "../../context/userContext"

export default function UserCart() {
    const {cart} = useUser();
    return (<div className="h-full pt-12 p-14">
        {
            cart.length>0?"Cart"
            :
            <div className="grid place-items-center">
            <img src="/emptyCart.svg" alt="Empty Wishlist" className="w-96" />
            There is nothing in your cart, let's add some items.
                <Link href="/wishlist">
                    <Button className="m-2" type="primary" ghost>Add Items from Wishlist</Button>
                </Link>
        </div>
        }
        </div>
    )
}