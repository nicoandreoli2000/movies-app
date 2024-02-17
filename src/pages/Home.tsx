import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { Movie, TvShow } from "../types";
import { Carousel } from "../components/Carousel";

function Home() {
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

  return (
    <div className="flex flex-col items-center gap-10 pt-10">
      <Carousel title="Movies" data={movies} />
      <Carousel title="Series" data={series} />
    </div>
  );
}

export default Home;
