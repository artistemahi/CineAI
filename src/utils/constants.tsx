
export const CineAILogo =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-01-09/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/CineAI_Logo_PMS.png";
export const CineAIbg =
  "https://assets.nflxext.com/ffe/siteui/vlv3/e393bb3f-261f-43d1-99bb-16a157885615/web/IN-en-20260105-TRIFECTA-perspective_2802b120-4b8c-44a5-8fb9-617a728f4ec6_small.jpg";
export const API_option = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
  },
};
export const NowPlayingMovieAPI =
  "https://api.themoviedb.org/3/movie/now_playing?page=1";
export const PopularMoviesAPI =
  "https://api.themoviedb.org/3/movie/popular?&page=1";
export const TopRatedMoviesAPI =
  "https://api.themoviedb.org/3/movie/top_rated?&page=1";
export const UpcomingMoviesAPI =
  "https://api.themoviedb.org/3/movie/upcoming?&page=1";
export const Video_API =
  "https://api.themoviedb.org/3/movie/83533/videos?language=en-US"; // yaha video id aayegi 4 digit ki
export const CDN_API = "https://image.tmdb.org/t/p/w200/";

export const SupportedLanguages = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
  { identifier: "french", name: "French" },
];
