import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { instance } from "../utils/useRequest";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { heartObj } from "../constants/iconsData";
import Card from "../components/card";
import LoadingGlass from "../components/loading";
import Lottie from "react-lottie";

function WishList({ handleLikeBtnClick }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await instance.get("/user");
    setData(data.data?.user?.wishlist);
    setLoading(false);
  };

  const click = async (id) => {
    await handleLikeBtnClick(id);
    await getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-28">
      {loading ? (
        <div className="flex items-center justify-center w-full mt-80">
          <LoadingGlass />
        </div>
      ) : (
        <>
          <h1 className="text-center my-5 text-3xl text-black">
            {data?.length} items in Wishlist!
          </h1>
          <div className="flex  mt-5 flex-wrap gap-10">
            {data?.length ? (
              data.map((wishItem) => (
                <Card
                  key={wishItem._id}
                  {...wishItem}
                  handleLikeBtnClick={click}
                />
              ))
            ) : (
              <>
                <Lottie
                  options={heartObj}
                  height={150}
                  width={150}
                  isStopped={false}
                  isPaused={false}
                />
                <h1 className="flex items-center justify-center text-4xl w-full text-red-500">
                  Your Wishlist is Empty!
                </h1>
                <div className="flex items-center justify-center w-full">
                  <Button className="bg-red-500 hover:bg-red-700">
                    <Link to={"/shop"}>Go to Shop</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default WishList;

WishList.propTypes = {
  handleLikeBtnClick: PropTypes.func,
};
