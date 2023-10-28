import PropTypes from "prop-types";
import { Slider } from "../components/ui/slider";
import { useEffect, useState } from "react";
import Card from "../components/card";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { genres } from "../constants/genre";
import { Button } from "../components/ui/button";
import LoadingGlass from "../components/loading";

function Shop({
  products,
  selectedGenres,
  setSelectedGenres,
  handleLikeBtnClick,
  wishList,
}) {
  const [sliderValues, setSliderValues] = useState({
    min: 0,
    max: 0,
  });
  const [range, setRange] = useState([sliderValues?.min, sliderValues?.max]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleRangeChange = (value) => {
    setRange(value);
  };

  useEffect(() => {
    if (!selectedGenres.length) {
      setSelectedGenres([...genres]);
    }
  }, []);
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (products.length) {
      setSliderValues(
        products.reduce(
          (acc, curr) =>
            curr.originalPrice > acc.max
              ? { ...acc, max: curr.originalPrice }
              : acc,
          { min: 0, max: 0 }
        )
      );
    }
  }, [products]);

  useEffect(() => {
    let newProducts = products.filter(
      (product) =>
        (product.discountedPrice >= range[0] ||
          product.originalPrice >= range[0]) &&
        (product.discountedPrice <= range[1] ||
          product.originalPrice <= range[1])
    );

    newProducts = newProducts.filter(
      (pr) =>
        selectedGenres.findIndex(
          (gr) => gr.title.toUpperCase() == pr.genre.toUpperCase()
        ) !== -1
    );

    setFilteredProducts([...newProducts]);
  }, [range, selectedGenres]);

  useEffect(() => {
    setRange([sliderValues.min, sliderValues.max]);
  }, [sliderValues]);

  const handleGenreChange = (title) => {
    const currentGrIdx = selectedGenres.findIndex((gr) => gr.title == title);
    if (currentGrIdx === -1) {
      setSelectedGenres((prev) => [...prev, { title }]);
    } else {
      selectedGenres.splice(currentGrIdx, 1);
      setSelectedGenres([...selectedGenres]);
    }
  };
  const onClear = () => {
    setSelectedGenres([...genres]);
    setRange([0, sliderValues.max]);
  };

  const sortHightToLow = async () => {
    const newSortData = await products.sort(
      (a, b) => b.discountedPrice - a.discountedPrice
    );
    setFilteredProducts([...newSortData]);
  };

  const sortLowToHight = async () => {
    const newSortData2 = await products.sort(
      (a, b) => a.discountedPrice - b.discountedPrice
    );
    setFilteredProducts([...newSortData2]);
  };

  const FourStars = async () => {
    const fourStar = await products.filter((star) => star.rating >= 4);
    setFilteredProducts([...fourStar]);
  };

  const ThreeStars = async () => {
    const threeStar = await products.filter((star) => star.rating >= 3);
    setFilteredProducts([...threeStar]);
  };

  const TwoStars = async () => {
    const twoStar = await products.filter((star) => star.rating >= 2);
    setFilteredProducts([...twoStar]);
  };

  const OneStars = async () => {
    const oneStar = await products.filter((star) => star.rating >= 1);
    setFilteredProducts([...oneStar]);
  };

  return (
    <div className="px-16 flex flex-col my-10 mt-28">
      <h1 className="text-3xl text-center text-black my-5">
        Showing {filteredProducts.length} products
      </h1>
      <div className="flex gap-10">
        <div className="flex flex-col w-5/3">
          <div className="mt-8">
            <Button
              onClick={onClear}
              className="mb-5 bg-blue-500 hover:bg-blue-600"
            >
              Clear Filter
            </Button>
            <Slider
              defaultValue={[sliderValues.min, sliderValues.max]}
              max={sliderValues?.max}
              min={0}
              step={0.5}
              value={range}
              onValueChange={handleRangeChange}
              formatLabel={(value) => `${value} `}
            />
            <div>
              <h3 className="mt-8 text-lg">Categories</h3>
              <div className="mt-2">
                {genres.map((genre) => (
                  <div
                    className="flex items-center space-x-2 mt-2"
                    key={genre.title}
                  >
                    <Checkbox
                      id={genre.title}
                      checked={
                        selectedGenres.findIndex(
                          (gr) => gr.title == genre.title
                        ) !== -1
                      }
                      onCheckedChange={() => handleGenreChange(genre.title)}
                    />
                    <Label
                      htmlFor={genre.title}
                      className="text-sm font-medium text-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {genre.title}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 text-lg">Sort By</h3>
            <div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="A-Z"
                  id="r1"
                  name="radio"
                  onChange={() => sortLowToHight()}
                />
                <label htmlFor="r1">Price - Low to High</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Z-A"
                  id="r2"
                  name="radio"
                  onChange={() => sortHightToLow()}
                />
                <label htmlFor="r2">Price - High to Low</label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 text-lg">Rating</h3>
            <div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="r1"
                  name="stars"
                  onChange={() => FourStars()}
                />
                <label htmlFor="r1">4 stars or above</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="r2"
                  name="stars"
                  onChange={() => ThreeStars()}
                />
                <label htmlFor="r2">3 stars or above</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="r1"
                  name="stars"
                  onChange={() => TwoStars()}
                />
                <label htmlFor="r1">2 stars or above</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="r2"
                  name="stars"
                  onChange={() => OneStars()}
                />
                <label htmlFor="r2">1 stars or above</label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-8 gap-5 flex-wrap w-5/6">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <Card
                key={product._id}
                {...product}
                handleLikeBtnClick={handleLikeBtnClick}
                isLiked={
                  wishList?.findIndex(
                    (wishItem) => wishItem._id === product._id
                  ) === -1
                }
              />
            ))
          ) : (
            <div className="my-28">
              <LoadingGlass />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Shop;

Shop.propTypes = {
  sliderValues: PropTypes.object,
  setSliderValues: PropTypes.func,
  products: PropTypes.array,
  selectedGenres: PropTypes.array,
  setSelectedGenres: PropTypes.func,
  handleLikeBtnClick: PropTypes.func,
  wishList: PropTypes.array,
};
