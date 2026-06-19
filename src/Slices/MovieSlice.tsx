import { createSlice } from "@reduxjs/toolkit";
const MovieSlice = createSlice({
  name: "NowPlayingMovie",
  initialState: {
    NowPlayingMovie: null,
    PopularMovie: null,
    TopRatedMovie: null,
    UpcomingMovie: null,
    trailerVideo: null,
    selectedMovie: null,
  },
  reducers: {
    addNowPlaying: (state, action) => {
      state.NowPlayingMovie = action.payload;
    },
    addPopularMovie: (state, action) => {
      state.PopularMovie = action.payload;
    },
    addTopRatedMovie: (state, action) => {
      state.TopRatedMovie = action.payload;
    },
    addUpcomingMovie: (state, action) => {
      state.UpcomingMovie = action.payload;
    },
    addtrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const {
  addNowPlaying,
  addtrailerVideo,
  addPopularMovie,
  addTopRatedMovie,
  addUpcomingMovie,
  setSelectedMovie,
} = MovieSlice.actions;
export default MovieSlice.reducer;
