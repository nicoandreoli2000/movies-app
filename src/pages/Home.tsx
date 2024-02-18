import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { Movie, TvShow } from "../types";
import { Carousel } from "../components/Carousel";

function Home() {
  const { data: topRatedMovies = [] } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: async () => {
      return apiClient
        .get("/3/movie/now_playing")
        .then(({ data }) => data.results as Movie[])
        .then((data) =>
          data.map(({ id, title, poster_path, overview }) => ({
            id,
            title,
            image: `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${poster_path}`,
            description: overview,
          }))
        );
    },
  });

  const { data: movies = [] } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      return apiClient
        .get("/3/trending/movie/day")
        .then(({ data }) => data.results as Movie[])
        .then((data) =>
          data.map(({ id, title, poster_path }) => ({
            id,
            title,
            image: poster_path,
          }))
        );
    },
  });

  const { data: series = [] } = useQuery({
    queryKey: ["series"],
    queryFn: async () => {
      return apiClient
        .get("/3/trending/tv/day")
        .then(({ data }) => data.results as TvShow[])
        .then((data) =>
          data.map(({ id, name, poster_path }) => ({
            id,
            title: name,
            image: poster_path,
          }))
        );
    },
  });

  const hero = topRatedMovies.length > 0 ? topRatedMovies[0] : null;

  if (!hero) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10 relative w-[100vw]">
      <div className="absolute w-full">
        <img src={hero.image} className="top-0 left-0 object-cover w-full" />
        <div
          className="absolute bottom-0 w-full h-[500px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(27, 27, 27, 0) 0%, #1b1b1b 100%)",
          }}
        />
      </div>

      <div className="px-10 pt-[380px] z-10 pb-[120px]">
        <h1 className="text-start text-white text-5xl font-semibold mb-3">
          {hero.title}
        </h1>
        <p className="text-start text-white opacity-80 w-[350px]">
          {hero.description}
        </p>
      </div>

      <div className="flex flex-col gap-20 pb-10">
        <Carousel title="Movies" data={movies} />
        <Carousel title="Series" data={series} />
      </div>
    </div>
  );
}

export default Home;
