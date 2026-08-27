import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMovie } from "../Slices/MovieSlice";
import { API_option, CDN_API } from "../utils/constants";

const MovieModal = () => {
  const dispatch = useDispatch();
  const movie = useSelector((store: any) => store.movie.selectedMovie);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  useEffect(() => {
    if (!movie?.id) {
      setTrailerKey(null);
      return;
    }

    const fetchTrailer = async () => {
      try {
        setLoadingTrailer(true);
        setTrailerKey(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
          API_option,
        );

        if (!response.ok) throw new Error("Unable to load movie videos");

        const data = await response.json();
        const videos = data?.results ?? [];

        const trailer =
          videos.find(
            (video: any) =>
              video.site === "YouTube" &&
              video.type === "Trailer" &&
              video.official === true,
          ) ??
          videos.find(
            (video: any) => video.site === "YouTube" && video.type === "Trailer",
          ) ??
          videos.find((video: any) => video.site === "YouTube");

        setTrailerKey(trailer?.key ?? null);
      } catch (error) {
        console.error("Trailer fetch failed:", error);
        setTrailerKey(null);
      } finally {
        setLoadingTrailer(false);
      }
    };

    fetchTrailer();
  }, [movie?.id]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[999] flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 p-5 sm:p-6 rounded-xl w-[95%] max-w-4xl border border-zinc-700 shadow-2xl max-h-[95vh] overflow-y-auto">
        <button
          onClick={() => dispatch(setSelectedMovie(null))}
          className="float-right text-white text-xl hover:text-red-500"
          aria-label="Close movie details"
        >
          ✕
        </button>

        <h1 className="text-2xl sm:text-3xl text-white font-bold mb-4 pr-8">
          {movie.title}
        </h1>

        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden mb-5">
          {loadingTrailer ? (
            <div className="h-full flex items-center justify-center text-white">
              Loading trailer...
            </div>
          ) : trailerKey ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title={`${movie.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 px-4 text-center">
              No official trailer is available for this movie.
            </div>
          )}
        </div>

        <div className="flex gap-5 flex-col sm:flex-row">
          <img
            src={CDN_API + movie.poster_path}
            className="w-40 sm:w-48 rounded-lg mx-auto sm:mx-0"
            alt={movie.title}
          />

          <div>
            <p className="text-yellow-400">⭐ {movie.vote_average}</p>
            <p className="text-gray-300 mt-2">📅 {movie.release_date}</p>
            <p className="text-white mt-4 leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
