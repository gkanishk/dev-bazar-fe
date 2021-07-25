import {useUser} from "../../context/userContext";
import EmptyLoginScreen from "../common/EmptyLoginScreen";

function CartPage(){
    const {isLoginned }= useUser();
    return (
        <div className="h-full p-2">{
            isLoginned?"Cart":<EmptyLoginScreen pageName="cart" img="/cart.svg"/>
        }</div>
    )
}

export default CartPage;