import PropTypes from "prop-types";
import { badgeVariants } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";

function Cards({
  bookName,
  originalPrice,
  author,
  discountedPrice,
  imgSrc,
  imgAlt,
  badgeText,
  discountPercent,
  genre,
  click,
  _id,
  handleChangeInputValue,
  quantity,
}) {
  const [InputRef, setInputRef] = useState(quantity);

  const handleMinus = () => {
    setInputRef((prev) => --prev);
  };

  const handlePlus = () => {
    setInputRef((prev) => ++prev);
  };

  const handleDeleteCard = () => {
    click(_id);
  };

  useEffect(() => {
    handleChangeInputValue(_id, InputRef);
  }, [InputRef]);

  return (
    <div>
      <div className="w-[600px] my-3 border border-gray-300 cursor-pointer p-6 relative flex">
        <div>
          <span
            className={`${badgeVariants({
              variant: "destructive",
            })} absolute top-0 left-0 rounded-none w-[100px] h-[30px]`}
          >
            {badgeText}
          </span>

          <img
            src={imgSrc}
            alt={imgAlt}
            className="w-[180px] mx-auto mt-5 h-[250px] object-contain shadow-lg shadow-gray-500"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-xl font-semibold">{bookName}</h3>
          <div className="my-4 text-lg">- By {author}</div>
          <div className="flex gap-5 items-center font-semibold">
            <p>R.S {discountedPrice}</p>
            <del>R.S {originalPrice}</del>
            <span className="text-red-500 text-[12px]">
              ({discountPercent}%)
            </span>
          </div>
          <h4 className="text-green-500">Genre: {genre}</h4>
          <div className="text-2xl flex items-center gap-2">
            Quantity:
            <Button
              variant="outline"
              className="rounded-full text-black font-extrabold"
              onClick={() => handleMinus()}
            >
              -
            </Button>
            <Input
              type="number"
              value={InputRef}
              onChange={(e) => {
                setInputRef(Number(e.target.value));
              }}
              className="text-black"
            />
            <Button
              variant="outline"
              className="rounded-full text-black font-extrabold"
              onClick={() => handlePlus()}
            >
              +
            </Button>
          </div>
          <div className="flex flex-col gap-2 mt-10">
            <Button
              className="bg-red-500 hover:bg-red-800"
              onClick={() => {
                toast({
                  className: "bg-yellow-400 text-black",
                  title: "Warning❗",
                  description: "Do you Want to delete item ?",
                  action: (
                    <ToastAction
                      altText="Yes"
                      className="hover:text-black"
                      onClick={handleDeleteCard}
                    >
                      Yes
                    </ToastAction>
                  ),
                });
              }}
            >
              Remove Card
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cards;

Cards.propTypes = {
  bookName: PropTypes.string,
  originalPrice: PropTypes.number,
  author: PropTypes.string,
  discountedPrice: PropTypes.number,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  badgeText: PropTypes.string,
  discountPercent: PropTypes.number,
  quantity: PropTypes.number,
  _id: PropTypes.string,
  genre: PropTypes.string,
  click: PropTypes.func,
  handleChangeInputValue: PropTypes.func,
};
