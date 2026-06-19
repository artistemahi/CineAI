import { signOut } from "firebase/auth"; 
import { auth } from "../utils/firebase";
import Header from "./Header";
import useNowPlayingMovie from '../utils/useNowPlayingMovie'
import usePopularMovies from '../utils/usePopularMovies'
import useTopRatedMovie from '../utils/useTopRatedMovie'
import useUpcomingMovie from '../utils/useUpcomingMovie'
import MainComponent from "./MainComponent";
import SecondaryComponent from "./SecondaryComponent";
import {useSelector} from "react-redux"
import GptSearch from "./GptSearch";
import MovieModal from "./MovieModal";
const Browse = () => {
  useNowPlayingMovie();
  usePopularMovies();
  useTopRatedMovie();
  useUpcomingMovie();
  const SignOutClickHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };
  const showGptSearch = useSelector((store:any)=>store.gptStore?.ShowGptSearch)
  return (
    <div>
      <Header  signinHandler={SignOutClickHandler} />
      {showGptSearch ? <><GptSearch/></>:<><MainComponent/>
      <SecondaryComponent/></>}
      <div >
      <MovieModal />
       </div>
    </div>
  );
};
export default Browse;
