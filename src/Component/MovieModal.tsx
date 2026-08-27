import { useDispatch, useSelector } from "react-redux";
import { setSelectedMovie } from "../Slices/MovieSlice";
import { CDN_API } from "../utils/constants";

const MovieModal = () => {
  const dispatch = useDispatch();

  const movie = useSelector((store: any) => store.movie.selectedMovie);

  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[999] flex justify-center items-center"
    >
      <div className=" bg-zinc-900 p-6 rounded-xl w-[90%] max-w-3xl border border-zinc-700 shadow-2xl"
      >
        <button
          onClick={() => dispatch(setSelectedMovie(null))}
          className="float-right text-white"
        >
          ✕
        </button>

        <img
          src={CDN_API + movie.poster_path}
          className="w-56 rounded-lg"
          alt=""
        />

        <h1 className="text-3xl text-white font-bold mt-4">{movie.title}</h1>

        <p className="text-yellow-400">⭐ {movie.vote_average}</p>

        <p className="text-gray-300 mt-2">📅 {movie.release_date}</p>

        <p className="text-white mt-4">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieModal;
