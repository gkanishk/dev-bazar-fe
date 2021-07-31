import { Input, Button, Menu, Dropdown, Tooltip, notification, Badge } from 'antd';
import { UserOutlined, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Link from 'next/link'
import React from 'react';
import { useUser } from '../../context/userContext';
import { useProductItems } from '../../hooks/useProductItems';
const { Search } = Input;

export default function Navbar() {
    const {isLoginned,logoutUser, cart, username}=useUser();
    const {getPriceDetails} = useProductItems();
    const router=useRouter();
    const logout=()=>{
        router.push("/");
        logoutUser();
        notification.success({
            message: "Logged Out!"
        })
    }
    const menu = (
        <Menu>
            <div className="flex flex-col items-start p-3 justify-items-start">
                <strong>Welcome {isLoginned&&(username||"User")}!</strong>
                {
                    !isLoginned&&
                    <>
                    <span className="mb-2">In order to access you need to login.</span>
                    <Link href="/login">
                    <Button>Login/Signup</Button>
                    </Link>
                    </>
                }
            </div>
            <Menu.Item key="wishlist-item-dropdown">
            <Link href="/wishlist">
                Wish List
            </Link>
            </Menu.Item>
            <Menu.Item key="cart-item-dropdown">
            <Link href="/cart">
                Cart
            </Link>
            </Menu.Item>
            {
                isLoginned&&
                <Menu.Item key="cart-item-dropdown" onClick={logout}>
                Logout
                </Menu.Item>
            }
        </Menu>
    )

    return (
        <nav className="fixed top-0 z-50 flex items-center justify-between w-full px-16 py-4 mb-1 font-medium bg-white nav-bar sm:px-2">
            <h1 className="my-auto text-2xl sm:text-base">Dev Bazar</h1>
            <div className="flex items-center justify-between font-medium w-28 sm:ml-1">
                <Link href="/">
                    <span className="mx-2 text-base text-gray-800 cursor-pointer hover:underline sm:text-xs">
                        HOME
                    </span>
                </Link>
                <Link href="/products">
                    <span className="mx-2 text-base cursor-pointer hover:underline sm:text-xs">
                        PRODUCTS
                    </span>
                </Link>
            </div>
            {/* <div className="w-5/12">
                <Search placeholder="Search Product" onSearch={() => console.log("searched")} />
            </div> */}
            <div className="flex justify-end space-x-4 w-36 sm:space-x-2">
                {
                    router.pathname!=="/login"
                    &&
                    <>
                    <Dropdown overlay={menu} placement="bottomCenter" trigger={["hover","click"]}>
                    <Button shape="circle" className="sm:hidden" icon={<UserOutlined />} />
                    </Dropdown>
                    <Dropdown overlay={menu} placement="bottomCenter" trigger={["hover","click"]}>
                    <Button shape="circle" className="sl:hidden" size="small" icon={<UserOutlined />} />
                    </Dropdown>
                    </>
                }
                <Link href="/wishlist">
                <Tooltip placement="bottom" title={"WishList"}>               
                    <Button shape="circle" className="sl:hidden" size="small" icon={<HeartOutlined />} />
                    <Button shape="circle" className="sm:hidden" icon={<HeartOutlined />} />
                </Tooltip>
                </Link>
                <Link href="/cart">
                <Tooltip placement="bottom" title={"Cart"}>
                    <Badge count={cart.length?getPriceDetails().itemCount:0} dot={false}>
                    <Button shape="circle" size="small" className="sl:hidden" icon={<ShoppingCartOutlined />} />
                    <Button shape="circle" className="sm:hidden" icon={<ShoppingCartOutlined />} />
                    </Badge>             
                </Tooltip>
                </Link>
            </div>
        </nav>
    )
}