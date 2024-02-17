import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { Input } from "@/components/ui/input";
import { apiClient } from "./apiClient";
import { Movie } from "./types";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { cn } from "./utils";

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

      <div className="flex flex-col gap-2 max-w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Popular</h2>
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Button
                key={`popular-pagination-${i}`}
                className={cn(
                  "h-2 rounded-full bg-white p-0 w-6",
                  page === i && "bg-gray-500"
                )}
                onClick={() => setPage(i)}
              />
            ))}
          </div>
        </div>

        <div className="flex overflow-hidden max-w-full relative">
          <div
            className="flex"
            style={{
              transform: `translateX(-${page * 14.7}%)`,
              transition: "transform 0.7s",
            }}
          >
            {movies.map((movie) => (
              <CarsouselItem key={movie.id} movie={movie} />
            ))}
          </div>

          {page > 0 && (
            <Button
              className="absolute left- h-full w-10 text-3xl opacity-60"
              onClick={() => setPage((page) => page - 1)}
            >
              {"<"}
            </Button>
          )}

          {page < 5 && (
            <Button
              className="absolute right-0 h-full w-10 text-3xl opacity-60"
              onClick={() => setPage((page) => page + 1)}
            >
              {">"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

const CarsouselItem = ({ movie }: { movie: Movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "h-[360px] min-w-[230px] bg-black flex items-center justify-center text-white relative overflow-hidden",
        isHovered && "opacity-60"
      )}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <img
        className="w-full h-full object-cover"
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="absolute"></div>
    </div>
  );
};

export default App;
