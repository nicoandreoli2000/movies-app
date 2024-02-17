import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { Input } from "@/components/ui/input";
import { apiClient } from "./apiClient";
import { Movie } from "./types";
import { Button } from "./components/ui/button";
import { useState } from "react";

function App() {
  const { data: movies = [] } = useQuery({
    queryKey: ["movies"],
    queryFn: async (): Promise<Movie[]> => {
      return apiClient.get("/movie/popular").then(({ data }) => data.results);
    },
  });

  const [page, setPage] = useState(0);

  return (
    <div className="flex flex-col items-center gap-10">
      <Input className="w-60" placeholder="Search movies..." />

      <div className="flex overflow-hidden max-w-full relative">
        <div
          className="flex gap-2"
          style={{
            transform: `translateX(-${page * 15}%)`,
            transition: "transform 0.6s",
          }}
        >
          {movies.map((movie) => (
            <div
              className="h-[120px] min-w-[230px] bg-black flex items-center justify-center text-white"
              key={movie.id}
            >
              <img
                src={`https://api.themoviedb.org/3/movie/{movie_id}/images
`}
                alt={movie.title}
              />
              {movie.title}
            </div>
          ))}
        </div>

        {page > 0 && (
          <Button
            className="absolute left-0 h-full w-10 bg-transparent"
            onClick={() => setPage((page) => page - 1)}
          >
            {"<"}
          </Button>
        )}

        {page < 5 && (
          <Button
            className="absolute right-0 h-full w-10"
            onClick={() => setPage((page) => page + 1)}
          >
            {">"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default App;
