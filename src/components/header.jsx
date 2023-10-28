import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faShop,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

function Header({ isLogged, setIsLogged, wishList, cardItem }) {
  const onLogout = () => {
    localStorage.removeItem("access_token");
    setIsLogged(false);
  };

  return (
    <header className="flex justify-between py-6 border-b-2 border-blue-500 fixed z-50 bg-white w-full left-0 top-0 px-10">
      <Link to={"/"} className="text-3xl font-bold text-blue-700">
        Bookztron
      </Link>
      <div className="flex gap-3">
        {isLogged ? (
          <>
            <Link
              to={"/shop"}
              className="rounded-full bg-blue-600 hover:bg-blue-800 w-10 flex items-center justify-center text-white transition-all"
            >
              <FontAwesomeIcon icon={faShop} />
            </Link>
            <Link
              to={"/wishlist"}
              className="rounded-full bg-blue-600 hover:bg-blue-800 w-10 relative flex items-center justify-center text-white transition-all"
            >
              <FontAwesomeIcon icon={faHeart} />
              {wishList?.length ? (
                <span className="absolute right-[-5px] top-[-10px] bg-red-500 w-6 p-1 text-xs flex items-center justify-center rounded-full">
                  {wishList?.length}
                </span>
              ) : null}
            </Link>
            <Link
              to={"/cards"}
              className="rounded-full bg-blue-600 hover:bg-blue-800 w-10 relative flex items-center justify-center text-white transition-all"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {cardItem?.length ? (
                <span className="absolute right-[-5px] top-[-10px] bg-red-500 w-6 p-1 text-xs flex items-center justify-center rounded-full">
                  {cardItem?.length}
                </span>
              ) : null}
            </Link>
            <Link
              to={"/order"}
              className="rounded-full bg-blue-600 hover:bg-blue-800 w-10 flex items-center justify-center text-white transition-all"
            >
              <FontAwesomeIcon icon={faShoppingBag} />
            </Link>
            <Button
              onClick={() => {
                toast({
                  className: "bg-yellow-400 text-black",
                  title: "Warning❗",
                  description: "Do you Want to logout?",
                  action: (
                    <ToastAction
                      altText="Yes"
                      className="hover:text-black"
                      onClick={onLogout}
                    >
                      Yes
                    </ToastAction>
                  ),
                });
              }}
              className="bg-red-600 hover:bg-red-800"
            >
              Logout
            </Button>
          </>
        ) : (
          <div className="flex gap-4">
            <Link
              to={"/login"}
              className="p-2 bg-green-600 rounded-sm text-white"
            >
              Login
            </Link>
            <Link
              to={"/signUp"}
              className="p-2 bg-green-600 rounded-sm text-white"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;

Header.propTypes = {
  isLogged: PropTypes.any,
  setIsLogged: PropTypes.func,
  setCardItem: PropTypes.func,
  getCardData: PropTypes.func,
  wishList: PropTypes.array,
  cardItem: PropTypes.array,
};
