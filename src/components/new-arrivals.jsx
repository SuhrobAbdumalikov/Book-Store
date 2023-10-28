import PropTypes from "prop-types";
import { instance } from "../utils/useRequest";
import { useEffect, useState } from "react";
import Card from "./card";
import { toast } from "./ui/use-toast";
import LoadingGlass from "./loading";

function NewArrivals({ wishList, setWishList, isLogged }) {
  const [arrivals, setArrivals] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    (async () => {
      setIsLoading(true);
      const data = await instance.get("/home/newarrivals");
      setArrivals(data.data?.newArrivalList);
      setIsLoading(false);
    })();
  }, []);

  const handleLikeBtnClick = async (id) => {
    if (!isLogged) {
      toast({
        variant: "destructive",
        title: "You are not registering yet!",
        description: "Please registering!",
      });
    } else {
      const el = wishList?.find((wishItem) => wishItem._id === id);

      if (!el) {
        const product = arrivals.find((arr) => arr._id === id);
        setWishList((prev) => [...prev, product]);
        await instance.patch("/wishlist", {
          productdetails: product,
        });
      } else {
        setWishList((prev) => prev.filter((wishItem) => wishItem._id !== id));
        await instance.delete("/wishlist/" + id);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-8 text-3xl text-gray-500">New Arrivals</h1>
      {isloading ? (
        <div className="flex items-center justify-center w-full my-36">
          <LoadingGlass />
        </div>
      ) : (
        <div className="flex justify-between">
          {arrivals?.map((arrival) => (
            <Card
              key={arrival._id}
              {...arrival}
              isLiked={
                wishList?.findIndex(
                  (wishItem) => wishItem._id === arrival?._id
                ) === -1
              }
              handleLikeBtnClick={handleLikeBtnClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default NewArrivals;

NewArrivals.propTypes = {
  wishList: PropTypes.array,
  setWishList: PropTypes.func,
  isLogged: PropTypes.any,
  isloading: PropTypes.bool,
};
