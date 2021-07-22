import { HeartOutlined } from "@ant-design/icons";
import { Button, Card, Spin, Tooltip } from "antd";
import React from "react";
import { useProducts } from "../../context/productContext"

export default function ProductPage() {
    const { products, productLoading } = useProducts();
    const getDiscounterPrice = (price, disc) => {
        return Math.round(price - ((disc / 100) * price));
    }
    return <>
        {productLoading ? <div className="grid w-full h-screen place-content-center">
            <Spin className="self-center" size="large" />
        </div> :
            <div className="grid w-full h-full grid-cols-4">
                <div className="col-span-1 p-2">
                    Side bar
                </div>
                <div className="flex flex-wrap w-full h-full col-span-3 space-x-4">
                    {!productLoading && products.map(({ name, price, discount, quantity, attributes: { img } }) => {
                        return <Card
                            hoverable
                            style={{ width: 240, cursor: "default" }}
                            cover={<img alt="example" src={img} />}
                        >
                            <div className="flex flex-col p-2">
                                <strong className="flex justify-between">{name} <Tooltip placement="bottom" title={"Add to WishList"}>
                                    <Button shape="circle" icon={<HeartOutlined />} />
                                </Tooltip></strong>
                                <p>
                                    <span className="mr-1 text-base font-medium text-gray-900">Rs. {getDiscounterPrice(price, discount)}</span>
                                    <span className="mr-1 text-xs font-light text-gray-400 line-through">Rs. {price}</span>
                                    <span className="text-xs font-light text-yellow-500">{`(${discount}% OFF)`}</span>
                                </p>

                                <Button>Add to Cart</Button>

                                <div className="grid grid-cols-2 py-2 place-items-center">
                                    <span className="text-xs font-normal text-red-500">{quantity < 3 && "Only Few left!"}</span>
                                    <span className="px-2 text-sm bg-pink-400 rounded text-yellow-50">{quantity !== 0 && "Out of stock"}</span>
                                </div>
                            </div>
                        </Card>
                    })}
                </div>
            </div>}
    </>
}