import { Button, Card, Divider, Select } from "antd";
import Link from "next/link";
import React from "react";
import { useUser } from "../../context/userContext"
import { useProductItems } from "../../hooks/useProductItems";

export default function UserCart() {
    const {cart} = useUser();
    const {getDiscounterPrice, getDeliveryDate, getPriceDetails, removeFromCart, moveToWishList, updateItemCount, placeOrder} = useProductItems();
    return (<div className="w-screen h-full pt-12 p-14 sm:p-0">
        {cart.length>0&&<strong className="block pb-4 text-base text-center">My Shopping Cart({getPriceDetails().itemCount} Item)</strong>}
        {
            cart.length>0?
            <div className="grid grid-cols-5 sm:grid-cols-1 sm:px-2">
                <div className="col-span-3">
                {cart.map(({item:{id,quantity,discount,name,price,attributes:{img, brand, sizes}},count},index, arr)=>{
                return <Card
                            hoverable
                            className="p-4 m-2 mt-0 ml-auto cursor-default sm:mx-auto sm:w-full"
                            style={{ width: 560 }}
                            key={id}
                        >
                            <div className="grid grid-cols-8">
                            <img className="col-span-2 w-28 sm:w-20" src={img} alt="product image" />
                            <div className="col-span-6">
                            <strong className="flex justify-between text-justify">
                                <span>{name}</span>
                                <span className="ml-auto">Rs. {getDiscounterPrice(price,discount)}</span>
                            </strong>
                            <span className="flex justify-between">
                                <span>By: {brand || "Levis"}</span>
                                <span>
                                <span className="text-gray-400 line-through">Rs. {price}</span>
                                <span className="ml-2 text-red-400">{discount}%</span>
                                </span>
                            </span>
                            <span className="block mb-2">
                                Delivery by <b className="font-medium">{getDeliveryDate()}</b>
                            </span>
                            <Select defaultValue={sizes[0]} className="mr-2">
                                {
                                    sizes.map((value:string)=> <Select.Option value={value}>Size: {value.toUpperCase()}</Select.Option>)
                                }
                            </Select>
                            <Select defaultValue={count} onSelect={(value)=>updateItemCount(value,id, index)}>
                                {
                                    [1,2,3,4].map((value)=> value<=quantity&&<Select.Option value={value}>{value}</Select.Option>)
                                }
                            </Select>
                            <div className="mt-4 sm:mt-2">
                                <Button type="link" onClick={()=>removeFromCart(index,true)}>Remove</Button>
                                <Button type="link" onClick={()=>moveToWishList(id,index)}>Move to WishList</Button>
                            </div>
                            </div>
                            </div>
                        </Card>
                })}
                </div>
                <div className="col-span-2 sm:mx-auto">
                    <Card
                        className="p-4 ml-2"
                        style={{width: 300 }}
                        >
                            <span className="block mb-4 font-bold text-gray-600 uppercase">
                                Price Details ({cart.length} Item)
                            </span>
                            <span className="flex justify-between">
                                <span>
                                    Total MRP
                                </span>
                                <span>
                                   Rs. {getPriceDetails().mrp}
                                </span>
                            </span>
                            <span className="flex justify-between">
                                <span>
                                    Discount on MRP
                                </span>
                                <span className="text-green-500">
                                  - Rs. {getPriceDetails().totalDiscount}
                                </span>
                            </span>
                            <span className="flex justify-between">
                                <span>
                                    Shipping Charge
                                </span>
                                <span>
                                  {getPriceDetails().shippingCost ===0?"FREE":`Rs. ${getPriceDetails().shippingCost}`}
                                </span>
                            </span>
                            <Divider/>
                            <span className="flex justify-between">
                                <span>
                                    Total Amount
                                </span>
                                <b>
                                  Rs. {getPriceDetails().finalAmount}
                                </b>
                            </span>
                            <Button className="w-full my-4" type="primary" danger onClick={placeOrder}>Place Order</Button>
                        </Card>
                </div>
            </div>
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