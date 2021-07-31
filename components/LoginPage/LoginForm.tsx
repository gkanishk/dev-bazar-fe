import { Button, Form, Input, notification } from "antd";
import React,{useState} from "react";
import { useUser } from "../../context/userContext";
import { getAxiosClient } from "../../hooks/useAxios";
import { set_cookie } from "../../hooks/useCookie";

function LoginForm({redirectPage,changePage}) {
    const [form] = Form.useForm();
    const {setLoginned,setAccessToken,setUserName}=useUser();
    const [isLoginLoading,setIsLoginLoading]=useState<boolean>(false);
    const [isGuestLoginLoading,setIsGuestLoginLoading]=useState<boolean>(false);

    const loginUser=async (value)=>{
        try {
            const response=await LoginUser(value);
            if(response.data?.statusCode===200){
            setLoginned(true);
            localStorage.setItem("accessToken",response.data.response.accessToken)
            localStorage.setItem("userName",response.data?.response?.user?.name || "User");
            setUserName(response.data?.response?.user?.name||"User")
            set_cookie("accessToken",response.data.response.accessToken)
            setAccessToken(response.data.response.accessToken);
            notification.success({
                message: "Login Successful",
                duration: 2
            });
            redirectPage();
            }else {
                notification.error({
                    message: "Login Failed!"
                })
            }
            setIsGuestLoginLoading(false);
            setIsLoginLoading(false);
        }catch (error) {
            notification.error({
                message: "Login Failed!"
            })
            setIsGuestLoginLoading(false);
            setIsLoginLoading(false);
        }
    }

    const guestLogin=async()=>{
        setIsGuestLoginLoading(true);
        await loginUser({email:"kanishk@hotmail.com",password:"123456"})
    }
    
    return (
        <Form layout="vertical" onFinish={()=>{loginUser;setIsLoginLoading(true);}} form={form}>
                <span className="block mb-8 text-2xl font-bold text-center">
                    Login
                </span>
                <Form.Item name="email" label="Email :" required>
                    <Input placeholder="Enter Email" />
                </Form.Item>
                <Form.Item name="password" label="Password :" required>
                    <Input placeholder="Enter Password" type="password" />
                </Form.Item>
                <div className="flex justify-center mt-8 mb-4">
                <Button className="mr-2" type="primary" htmlType="submit" loading={isLoginLoading}>Login</Button><Button loading={isGuestLoginLoading} type="primary" ghost onClick={guestLogin}>Guest Login</Button>
                </div>
                <div className="flex items-center justify-center">
                Don't have an account? <Button type="link" className="p-0 ml-1" onClick={changePage}>Sign-Up</Button>
                </div>
        </Form>
    )
}

async function LoginUser(userDetails:{email:string,password:string}){
    return await getAxiosClient("").post("/user/login",userDetails);
}

export default LoginForm;