import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import lang from "../utils/Lang";
import { API_option } from "../utils/constants";
import { addGptMovieResult } from "../Slices/GptSlice";

const GptSearchBar = () => {
  const [loading, setLoading] = useState(false);
  const langkey = useSelector((store: any) => store.lang?.lang);
  const searchtext = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie: string) => {
    const response = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) +
        "&include_adult=false&page=1",
      API_option,
    );

    if (!response.ok) {
      throw new Error(`TMDB search failed: ${response.status}`);
    }

    const data = await response.json();
    return data?.results ?? [];
  };

  const callGroq = async (query: string) => {
    const response = await fetch("/api/groq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Groq request failed");
    }

    return data?.content || "";
  };

  const handleGPTsearch = async () => {
    const userQuery = searchtext.current?.value?.trim();

    if (!userQuery) {
      window.alert("Please enter search value!");
      return;
    }

    try {
      setLoading(true);

      const gptQuery = `
Return exactly 5 movie names related to "${userQuery}".

Return only one comma-separated line:
Movie1, Movie2, Movie3, Movie4, Movie5

No numbering.
No explanation.
No reasoning.
No extra text.
`;

      const aiText = await callGroq(gptQuery);

      const gptMovies = aiText
        .replace(/\n/g, ",")
        .split(",")
        .map((movie) => movie.replace(/^\s*[-*\d.)]+\s*/, "").trim())
        .filter(Boolean)
        .slice(0, 5);

      if (gptMovies.length === 0) {
        throw new Error("Groq returned no movie names");
      }

      const tmdbResults = await Promise.all(
        gptMovies.map((movie) => searchMovieTMDB(movie)),
      );

      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        }),
      );
    } catch (error) {
      console.error("GPT Search failed:", error);
      window.alert(
        error instanceof Error
          ? error.message
          : "Something went wrong with GPT Search",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!langkey || !lang?.[langkey]) return null;

  return (
    <div className="pt-[40%] sm:pt-[25%] md:pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGPTsearch();
        }}
        className="w-[90%] sm:w-[70%] md:w-1/2 m-4 p-4 sm:p-6 bg-black/80 grid grid-cols-12 rounded-md"
      >
        <input
          ref={searchtext}
          className="col-span-9 mx-2 px-3 py-2 rounded-sm text-sm sm:text-base outline-none border border-gray-300 focus:border-red-500 focus:outline-hidden"
          type="text"
          placeholder={lang[langkey]?.gptSearchPlaceholder}
        />
        <button
          type="submit"
          disabled={loading}
          className={`col-span-3 mx-2 py-2 text-sm sm:text-base font-bold text-white rounded-sm ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Finding Movies..." : "🔍 Search"}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
