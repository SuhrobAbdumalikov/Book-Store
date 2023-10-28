import PropTypes from "prop-types";
import Genres from "../components/genres";
import NewArrivals from "../components/new-arrivals";

function Home({
  selectedGenres,
  setSelectedGenres,
  wishList,
  setWishList,
  isLogged,
  isloading,
}) {
  return (
    <div className="mt-3 mb-10">
      <div className="mb-10 relative rounded-sm">
        <img
          src="/assets/mainImg.jpg"
          alt="img"
          className="rounded-sm w-full"
        />
        <div className="absolute top-[230px] left-10 z-10 text-white">
          <h1 className="text-8xl font-bold">Book Store!</h1>
          <p className="text-3xl w-[500px] mt-10">
            You can buy any kind of books here, we think it would be helpful for
            you!
          </p>
          <p className="text-3xl w-[480px] mt-10">
            if you login registering, you can not order any kind books or you
            can not like any kind of books!
          </p>
        </div>
      </div>
      <h1 className="text-center mb-8 text-3xl text-gray-500">Genres</h1>
      <Genres
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <NewArrivals
        isloading={isloading}
        isLogged={isLogged}
        setWishList={setWishList}
        wishList={wishList}
      />
    </div>
  );
}
export default Home;

Home.propTypes = {
  selectedGenres: PropTypes.array,
  setSelectedGenres: PropTypes.func,
  wishList: PropTypes.array,
  setWishList: PropTypes.func,
  handleLikeBtnClick: PropTypes.func,
  isLogged: PropTypes.any,
  isloading: PropTypes.bool,
};
