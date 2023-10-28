import PropTypes from "prop-types";
import React, { useState } from "react";
import { instance } from "../utils/useRequest";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { cartObj } from "../constants/iconsData";
import Cards from "./cards";
import LoadingGlass from "../components/loading";
import Lottie from "react-lottie";

function MainCard() {
  const [dataCard, setDataCard] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoding] = useState(false);

  const getData = async () => {
    setLoding(true);
    const data = await instance.get("/user");
    setDataCard(data.data?.user?.cart);
    setLoding(false);
  };

  useEffect(() => {
    const totalDis = dataCard?.reduce(
      (acc, curr) =>
        acc + (curr.originalPrice - curr.discountedPrice) * curr.quantity,
      0
    );
    setDiscount(totalDis);

    const sum = dataCard?.reduce(
      (acc, curr) => acc + curr.discountedPrice * curr.quantity,
      0
    );
    setTotalAmount(sum);
  }, [dataCard]);

  const click = async (id) => {
    await instance.delete("/cart/" + id);
    getData();
  };

  const handleChangeInputValue = (id, value) => {
    const newValue = dataCard.map((el) => {
      if (el._id === id) {
        el.quantity = value;
      }
      return el;
    });
    setDataCard(newValue);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-28 mb-5 text-black">
      {!loading ? (
        <>
          <h1 className="text-center my-7 text-3xl text-black">
            {dataCard?.length} items in Cards
          </h1>
          <React.Fragment>
            {dataCard?.length ? (
              <div className="flex gap-20">
                <div className="flex flex-col">
                  {dataCard?.map((card) => (
                    <Cards
                      key={card._id}
                      {...card}
                      click={click}
                      handleChangeInputValue={handleChangeInputValue}
                    />
                  ))}
                </div>
                <div className="border rounded-md w-[550px] h-fit p-6 shadow-md shadow-gray-400">
                  <h3 className="text-3xl border-b-4 text-center pb-4">
                    Bill Details
                  </h3>
                  <div className="flex flex-col p-6 gap-3 border-b-4">
                    {dataCard?.map((el) => {
                      return (
                        <div
                          key={el._id}
                          className="flex items-center justify-between text-lg"
                        >
                          <h4>{el.bookName}</h4>
                          <p>X{el.quantity}</p>
                          <span>R.S {el.quantity * el.discountedPrice}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-b-4 p-6">
                    <div className="pb-3 flex justify-between items-center text-lg">
                      <h4>Discount</h4>
                      <span>R.S {discount}</span>
                    </div>
                    <div className="pt-3 flex justify-between text-lg">
                      <h4>Delivery Charges</h4>
                      <span>R.S 50</span>
                    </div>
                  </div>
                  <div className="border-b-4 p-6 flex justify-between items-center font-[600] text-lg">
                    <h4>Total Charges</h4>
                    <span>R.S {totalAmount}</span>
                  </div>
                  <Button className="mt-5 w-full bg-green-500 hover:bg-green-700 active:scale-95 transition-all">
                    Place Order
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <Lottie
                  options={cartObj}
                  height={160}
                  width={160}
                  isStopped={false}
                  isPaused={false}
                />
                <h1 className="flex items-center justify-center text-4xl mt-5 w-full text-red-500">
                  Your Card is Empty!
                </h1>
                <div className="flex items-center justify-center mt-5 w-full">
                  <Button className="bg-red-500 hover:bg-red-700">
                    <Link to={"/shop"}>Go to Shop</Link>
                  </Button>
                </div>
              </div>
            )}
          </React.Fragment>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full mt-80">
          <LoadingGlass />
        </div>
      )}
    </div>
  );
}

export default MainCard;

MainCard.propTypes = {
  handleLikeBtnClick: PropTypes.func,
  isLiked: PropTypes.any,
  wishList: PropTypes.array,
  products: PropTypes.array,
};
