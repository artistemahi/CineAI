import { CineAIbg } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        {" "}
        {/* Background image */}
        <img
          src={CineAIbg}
          alt="CineAIBg"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearch;
