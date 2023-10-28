import { genres } from "../constants/genre";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Genres({ setSelectedGenres }) {
  const navigate = useNavigate();
  const handleClick = (item) => {
    setSelectedGenres(item);
    navigate("/shop");
  };
  return (
    <div className="container flex justify-around mb-12">
      {genres.map((genre) => (
        <div
          onClick={() => handleClick([genre])}
          key={genre.title}
          className="bg-blue-600 w-[120px] h-[100px] flex justify-center items-center text-lg cursor-pointer text-white rounded-sm shadow-lg shadow-gray-400"
        >
          {genre.title}
        </div>
      ))}
    </div>
  );
}
export default Genres;

Genres.propTypes = {
  selectedGenres: PropTypes.array,
  setSelectedGenres: PropTypes.func,
};
