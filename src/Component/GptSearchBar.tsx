import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import lang from "../utils/Lang";
import { useRef } from "react";
import { API_option } from "../utils/constants";
import { addGptMovieResult } from "../Slices/GptSlice";

const GptSearchBar = () => {
  const [loading, setLoading] = useState(false);
  const langkey = useSelector((store: any) => store.lang?.lang);
  const searchtext = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie: string) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&page=1",
      API_option,
    );
    const json = await data.json();
    return json.results;
  };

  const callGroq = async (query: string) => {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: query,
          },
        ],
        temperature: 0.3,
      }),
    });

    const data = await res.json();

    console.log(data);

    return data?.choices?.[0]?.message?.content;
  };
  const handleGPTsearch = async () => {
    const userQuery = searchtext.current?.value;
    if(!userQuery){
      window.alert("Please enter search value!")
    }
 
    if (!userQuery?.trim()) return;

    try {
      setLoading(true);

      const gptQuery = `
Return exactly 5 movie names related to "${userQuery}".

Return only:
Movie1, Movie2, Movie3, Movie4, Movie5

No explanation.
No reasoning.
No extra text.
`;

      const aiText = await callGroq(gptQuery);

      console.log("GROQ RESPONSE:", aiText);

      if (!aiText) {
        alert("No response received");
        return;
      }

      const gptMovies = aiText
        .split(",")
        .map((movie) => movie.trim())
        .filter(Boolean)
        .slice(0, 5);

      console.log("Movies:", gptMovies);

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        }),
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!langkey || !lang?.[langkey]) return null;

  return (
    <div className="pt-[40%] sm:pt-[25%] md:pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[90%] sm:w-[70%] md:w-1/2 m-4 p-4 sm:p-6 bg-black/80 grid grid-cols-12 rounded-md"
      >
        <input
          ref={searchtext}
          className="col-span-9 mx-2 px-3 py-2 rounded-sm text-sm sm:text-base outline-none border border-gray-300 focus:border-red-500 focus:outline-hidden"
          type="text"
          placeholder={lang[langkey]?.gptSearchPlaceholder}
        />
        <button
          type="button"
          disabled={loading}
          onClick={handleGPTsearch}
          className={`
    col-span-3 mx-2 py-2 text-sm sm:text-base font-bold text-white rounded-sm
    ${
      loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
    }
  `}
        >
          {loading ? "Finding Movies..." : "🔍 Search"}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
