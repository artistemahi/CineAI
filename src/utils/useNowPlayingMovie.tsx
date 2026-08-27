import { NowPlayingMovieAPI, API_option } from "./constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlaying } from "../Slices/MovieSlice";

const useNowPlayingMovie = () => {
  const dispatch = useDispatch();
  const NowPlaying = useSelector(
    (store: any) => store.movie?.NowPlayingMovie
  );

  const fetchNowPlaying = async () => {
    try {
      const data = await fetch(NowPlayingMovieAPI, API_option);
      if (!data.ok) throw new Error(`TMDB request failed: ${data.status}`);
      const json = await data.json();
      dispatch(addNowPlaying(json.results ?? []));
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
    }
  };

  useEffect(() => {
    if (!NowPlaying) fetchNowPlaying();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNowPlayingMovie;
