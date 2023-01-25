import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
function LoginPage() {
    const [refererPage, setReferPage] = useState<string | string[]>("");
    const [productId, setProductId] = useState<string | string[]>("");
    const [actionType, setActionType] = useState<string | string[]>("");
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const urlParam = router.query;
        setReferPage(urlParam?.referer ?? "");
        setActionType(urlParam?.action ?? "");
        setProductId(urlParam?.productId ?? "");
    }, [])

    const redirectPage = () => {
        switch (refererPage) {
            case "products":
            case "cart":
            case "wishlist":
                router.push(`/${refererPage}`);
                break;
            default:
                router.push("/products");
                break;

        }

    }

    return (<div className="grid h-full place-items-center bg-red-50">
        <div className="p-4 bg-white rounded min-h-100 max-width-container">
            {isLogin ? <LoginForm redirectPage={redirectPage} changePage={() => setIsLogin(!isLogin)} /> : <SignUpForm redirectPage={redirectPage} changePage={() => setIsLogin(!isLogin)} />}
        </div>
    </div>)
}

export default LoginPage;