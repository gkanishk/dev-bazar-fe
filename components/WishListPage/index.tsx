import {useUser} from "../../context/userContext";
import EmptyLoginScreen from "../common/EmptyLoginScreen";
import UserWishList from "./UserWishList";

function WishListPage(){
    const {isLoginned }= useUser();
    return (
        <div className="h-full p-2">{
            isLoginned?<UserWishList/>:<EmptyLoginScreen pageName="wishlist" img="/login.svg" />
        }</div>
    )
}

export default WishListPage;