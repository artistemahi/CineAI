import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainComponent = () => {
  const movies = useSelector((store: any) => store.movie?.NowPlayingMovie);
  if (!movies) return;

  const mainMovie = movies[Math.floor(Math.random() * movies.length)];
  const { title, overview, id } = mainMovie;

  return (
    <div className="relative h-[70vh] sm:h-[85vh] w-full">
      <VideoTitle title={title} Overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainComponent;
