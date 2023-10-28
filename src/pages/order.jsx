import { Button } from "../components/ui/button";
import { guyWithBookObj } from "../constants/iconsData";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";

function Order() {
  return (
    <div className="container mt-32">
      <h1 className="text-center text-3xl text-black">
        Your Order List Empty Now!
      </h1>
      <Lottie
        options={guyWithBookObj}
        height={350}
        width={350}
        isStopped={false}
        isPaused={false}
      />
      <h1 className="text-center text-3xl text-black">
        You have not placed any orders
      </h1>
      <div className="flex items-center mt-5 justify-center w-full">
        <Button className="bg-red-500 hover:bg-red-700">
          <Link to={"/shop"}>Go to Shop</Link>
        </Button>
      </div>
    </div>
  );
}

export default Order;
