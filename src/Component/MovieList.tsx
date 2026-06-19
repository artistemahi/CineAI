import MovieCard from "./MovieCard";

const MovieList = ({ title, Movies }) => {
  return (
    <div className="px-4 sm:px-6 py-3 sm:py-4">
      <h1 className="mb-2 sm:mb-3 text-base sm:text-xl md:text-3xl font-bold text-white">
        {title}
      </h1>

      <div className="flex gap-3 sm:gap-4 overflow-x-scroll scrollbar-hide">
        {Movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
