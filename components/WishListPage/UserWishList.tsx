import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Tooltip } from "antd";
import Link from "next/link";
import React from "react";
import { useUser } from "../../context/userContext"
import { useProductItems } from "../../hooks/useProductItems";

export default function UserWishList() {
    const {wishList} = useUser();
    const {getDiscounterPrice, moveToCart,removeFromWishList} = useProductItems();
    return (
        <div className="pt-12 p-14">
            {
                wishList.length>0?<>
                    <span className="mb-8 text-lg font-medium">My Wishlist ({wishList.length})</span>
                    <div className="flex flex-row flex-wrap">
                    {wishList.map(({item:{id,quantity,discount,name,price,attributes:{img, brand}}})=>(
                        <Card
                            hoverable
                            style={{ width: 230, height: 475, cursor: "default", margin: "1rem" }}
                            cover={<img alt="example" src={img} />}
                            key={id}
                        >
                            <div className="flex flex-col p-2">
                            <strong className="flex items-center justify-between">
                                    {name} 
                                    <Tooltip placement="bottom" title={"Remove from WishList"}>
                                        <Button shape="circle" icon={<DeleteOutlined />} onClick={()=>removeFromWishList(id,true)} />
                                    </Tooltip>
                            </strong>
                                <span>{brand}</span>
                                <p className="mt-1">
                                    <span className="mr-1 text-base font-medium text-gray-900">Rs. {getDiscounterPrice(price, discount)}</span>
                                    <span className="mr-1 text-xs font-light text-gray-400 line-through">Rs. {price}</span>
                                    <span className="text-xs font-light text-yellow-500">{`(${discount}% OFF)`}</span>
                                </p>
                                    <Button onClick={()=>moveToCart(id)}>Move To Cart</Button>
                                <div className="grid grid-cols-2 py-2 place-content-between">
                                    <span className="text-xs font-normal text-red-500">{(quantity < 3 && quantity > 0) && "Only Few left!"}</span>
                                </div>
                            </div>
                        </Card>
                    ))}</div>
                </>:
                <div className="grid h-full place-items-center">
                    <img src="/empty.svg" alt="Empty Wishlist" className="mb-2 w-96" />
                    It's so lonaly here :(
                        <Link href="/products">
                            <Button className="m-2" type="primary" ghost>Explore Products</Button>
                        </Link>
                </div>
            }
        </div>
    )
}