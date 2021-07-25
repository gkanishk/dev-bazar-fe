import {useUser} from "../../context/userContext";
import EmptyLoginScreen from "../common/EmptyLoginScreen";

function WishListPage(){
    const {isLoginned }= useUser();
    return (
        <div className="h-full p-2">{
            isLoginned?"Wishlist":<EmptyLoginScreen pageName="wishlist" img="/login.svg" />
        }</div>
    )
}

export default WishListPage;