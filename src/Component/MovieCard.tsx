import { CDN_API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../Slices/MovieSlice";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(setSelectedMovie(movie))}
      className="
        min-w-[150px]
        md:min-w-[180px]
        cursor-pointer
        transition-transform
        duration-300
        hover:scale-105
      "
    >
      <img
        className="rounded-lg w-full"
        src={CDN_API + movie.poster_path}
        alt={movie.title}
      />
    </div>
  );
};

export default MovieCard;