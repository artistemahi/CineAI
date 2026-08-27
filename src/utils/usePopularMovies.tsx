import { PopularMoviesAPI, API_option } from "./constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovie } from "../Slices/MovieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const PopularMovie = useSelector(
    (store: any) => store.popular?.PopularMovie
  );

  const fetchPopularMovie = async () => {
    try {
      const data = await fetch(PopularMoviesAPI, API_option);
      if (!data.ok) throw new Error(`TMDB request failed: ${data.status}`);
      const json = await data.json();
      dispatch(addPopularMovie(json.results ?? []));
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
    }
  };

  useEffect(() => {
    if (!PopularMovie) fetchPopularMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default usePopularMovies;
