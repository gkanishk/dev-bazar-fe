import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Card, Spin, Tooltip } from "antd";
import React from "react";
import Link from "next/link";
import { useProducts } from "../../context/productContext";
import { useProductItems } from "../../hooks/useProductItems";
import Filters from "./Filters";

export default function ProductPage() {
    const { filteredProducts, productLoading } = useProducts();
    const { isItemInCart, isItemInWishList, getDiscounterPrice, addToCartWishList } = useProductItems();

    
    return <>
        {productLoading ? <div className="grid w-full h-screen place-content-center">
            <Spin className="self-center" size="large" />
        </div> :
            <div className="grid w-full h-full grid-cols-4 pt-8">
                <div className="col-span-1 p-2">
                    <Filters />
                </div>
                <div className="flex flex-wrap items-start justify-start w-full h-full col-span-3">
                    {!productLoading && filteredProducts.length > 0 ? filteredProducts.map(({ id, name, price, discount, quantity, attributes: { img, brand } }) => {
                        return <Card
                            hoverable
                            style={{ width: 230, height: 475, cursor: "default", margin: "1rem" }}
                            cover={<img alt="example" src={img} />}
                            key={id}
                        >
                            <div className="flex flex-col p-2">
                                <strong className="flex items-center justify-between">{name} <Tooltip placement="bottom" title={isItemInWishList(id) ? "Wishlisted" : "Add to WishList"}>
                                    {!isItemInWishList(id) ? 
                                    <Button shape="circle" icon={<HeartOutlined />} onClick={() => addToCartWishList(id, "addToWishList")} /> 
                                    :
                                    <Button shape="circle" icon={<HeartFilled />} />
                                    }
                                </Tooltip></strong>
                                <span>{brand}</span>
                                <p>
                                    <span className="mr-1 text-base font-medium text-gray-900">Rs. {getDiscounterPrice(price, discount)}</span>
                                    <span className="mr-1 text-xs font-light text-gray-400 line-through">Rs. {price}</span>
                                    <span className="text-xs font-light text-yellow-500">{`(${discount}% OFF)`}</span>
                                </p>

                                {!isItemInCart(id)
                                    ?
                                    <Button disabled={quantity === 0} onClick={() => addToCartWishList(id, "addToCart")}>Add to Cart</Button>
                                    :
                                    <Link href="/cart">
                                        <Button>Go to Cart</Button>
                                    </Link>
                                }

                                <div className="grid grid-cols-2 py-2 place-content-between">
                                    <span className="text-xs font-normal text-red-500">{(quantity < 3 && quantity > 0) && "Only Few left!"}</span>
                                    <span>{quantity === 0 && <span className="px-2 text-sm bg-pink-400 rounded text-yellow-50">Out of stock</span>}</span>
                                </div>
                            </div>
                        </Card>
                    }) : "No Products"}
                </div>
            </div>}
    </>
}