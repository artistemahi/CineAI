import { UpcomingMoviesAPI, API_option } from "./constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovie } from "../Slices/MovieSlice";

const useUpcomingMovie = () => {
  const dispatch = useDispatch();
  const UpcomingMovie = useSelector(
    (store: any) => store.upcoming?.UpcomingMovie
  );

  const fetchUpcomingMovie = async () => {
    try {
      const data = await fetch(UpcomingMoviesAPI, API_option);
      if (!data.ok) throw new Error(`TMDB request failed: ${data.status}`);
      const json = await data.json();
      dispatch(addUpcomingMovie(json.results ?? []));
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
    }
  };

  useEffect(() => {
    if (!UpcomingMovie) fetchUpcomingMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useUpcomingMovie;
