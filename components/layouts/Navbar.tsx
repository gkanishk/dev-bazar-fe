import { Input, Button, Menu, Dropdown, Tooltip } from 'antd';
import { UserOutlined, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import Link from 'next/link'
import React from 'react';
const { Search } = Input;

export default function Navbar() {
    const menu = (
        <Menu>
        <div className="flex flex-col items-start p-3 justify-items-start">
        <strong>Welcome!</strong>
        <span className="mb-2">In order to access you need to login.</span>
        <Button>Login/Signup</Button>
        </div>
          <Menu.Item>
            Wish List
          </Menu.Item>
          <Menu.Item>
            Cart
          </Menu.Item>
        </Menu>
        )

    return (
        <nav className="fixed top-0 z-50 flex items-center justify-between w-full px-16 py-4 mb-1 font-medium bg-white nav-bar">
            <h1 className="text-2xl">Dev Bazar</h1>
            <div className="flex items-center justify-between font-medium w-28">
            <Link href="/">
                <span className="mx-2 text-base text-gray-800 cursor-pointer hover:underline">
                    HOME
                </span>
            </Link>
            <Link href="/products">
                <span className="mx-2 text-base cursor-pointer hover:underline">
                    PRODUCTS
                </span>
                </Link>
            </div>
            <div className="w-5/12">
                <Search placeholder="Search Product" onSearch={() => console.log("searched")} />
            </div>
            <div className="flex w-36 justify-evenly">
            <Dropdown overlay={menu} placement="bottomCenter">
                <Button shape="circle" icon={<UserOutlined />} />
            </Dropdown>
                <Tooltip placement="bottom" title={"Cart"}>
                <Button shape="circle" icon={<ShoppingCartOutlined />} />
                </Tooltip>
                <Tooltip placement="bottom" title={"WishList"}>
                <Button shape="circle" icon={<HeartOutlined />} />
                </Tooltip>
            </div>
        </nav>
    )
}