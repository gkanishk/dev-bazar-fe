import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { useUser } from "../../context/userContext";
import { getAxiosClient } from "../../hooks/useAxios";
import { set_cookie } from "../../hooks/useCookie";

export default function SignUpForm({redirectPage,changePage}) {
    const [form] = Form.useForm();
    const {setLoginned,setAccessToken,setUserName}=useUser();
    const [isSignUpLoading,setIsSignUpLoading]=useState<boolean>(false);
    const signUpUser=async (value)=>{
        try {
            const response=await SignUpUser(value);
            if(response.data?.statusCode===200){
            setLoginned(true);
            localStorage.setItem("accessToken",response.data.response.accessToken);
            localStorage.setItem("userName",response.data?.response?.user?.name || "User");
            setUserName(response.data?.response?.user?.name||"User")
            set_cookie("accessToken",response.data.response.accessToken);
            setAccessToken(response.data.response.accessToken);
            notification.success({
                message: "SignUp Successful!",
                duration: 2
            });
            redirectPage();
            }else {
                notification.error({
                    message: "SignUp Failed!"
                })
            }
            setIsSignUpLoading(false);
        }catch (error) {
            notification.error({
                message: "SignUp Failed!"
            })
            setIsSignUpLoading(false);
        }
    }
    return (
        <Form layout="vertical" form={form} onFinish={signUpUser}>
                <span className="block mb-8 text-2xl font-bold text-center">
                    Login
                </span>
                <Form.Item label="Name :" name="name" required>
                    <Input placeholder="Enter Name" />
                </Form.Item>
                <Form.Item label="Email :" name="email" required>
                    <Input placeholder="Enter Email" />
                </Form.Item>
                <Form.Item label="Password :" name="password" required>
                    <Input placeholder="Enter Password" type="password"/>
                </Form.Item>
                <div className="flex justify-center mt-8 mb-4">
                <Button type="primary" htmlType="submit" loading={isSignUpLoading}>SignUp</Button>
                </div>
                <div className="flex items-center justify-center">
                Already have an account? <Button type="link" className="p-0 ml-1" onClick={changePage}>Login</Button>
                </div>
        </Form>
    )
}

async function SignUpUser(userDetails:{name:string,email:string,password:string}){ 
    return await getAxiosClient("").post("/user/signup",userDetails);
}