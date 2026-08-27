import { TopRatedMoviesAPI, API_option } from "./constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovie } from "../Slices/MovieSlice";

const useTopRatedMovie = () => {
  const dispatch = useDispatch();
  const TopRatedMovie = useSelector(
    (store: any) => store.topRated?.TopRatedMovie
  );

  const fetchTopRatedMovie = async () => {
    try {
      const data = await fetch(TopRatedMoviesAPI, API_option);
      if (!data.ok) throw new Error(`TMDB request failed: ${data.status}`);
      const json = await data.json();
      dispatch(addTopRatedMovie(json.results ?? []));
    } catch (error) {
      console.error("Failed to fetch top rated movies:", error);
    }
  };

  useEffect(() => {
    if (!TopRatedMovie) fetchTopRatedMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTopRatedMovie;
