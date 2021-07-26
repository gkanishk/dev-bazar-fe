import LoginPage from "../components/LoginPage";
import {useUser} from "../context/userContext";
import {useRouter} from "next/router";
import { useEffect } from "react";
export default function Login() {
    const router = useRouter();
    const {isLoginned}=useUser();
    useEffect(()=>{
        if(isLoginned){
            router.push("/")
        }
    },[])
    return (<LoginPage/>)
}