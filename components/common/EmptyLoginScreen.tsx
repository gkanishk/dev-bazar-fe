import { Button } from "antd";
import React from "react";
import Link from "next/link"

function EmptyLoginScreen({pageName,img}){
    return (
        <div className="grid p-4 place-items-center">
            <span className="text-lg font-medium">PLEASE LOGIN</span>
            <span className="text-gray-400 uppercase">TO VIEW ITEMS IN {pageName}</span>
            <div className="h-80">
            <img className="mt-4 ml-4 max-h-80" src={`${img}`} alt="Login Image"/>
            </div>
            <Link href={`/login?referer=${pageName}`}>
                <Button className="px-10 m-8" type="primary" ghost>
                    Login
                </Button>
            </Link>
        </div>
    )
}

export default EmptyLoginScreen;