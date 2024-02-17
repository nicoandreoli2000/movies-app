import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { Input } from "@/components/ui/input";
import { apiClient } from "./apiClient";
import { Movie } from "./types";

function App() {
  const { data: movies = [] } = useQuery({
    queryKey: ["movies"],
    queryFn: async (): Promise<Movie[]> => {
      return apiClient.get("/movie/popular").then(({ data }) => data.results);
    },
  });

  return (
    <div className="flex flex-col items-center gap-10">
      <Input className="w-60" placeholder="Search here..." />
      <div className="flex gap-2 overflow-hidden max-w-full">
        {movies.map((movie) => (
          <div
            className="h-[120px] min-w-[230px] bg-black rounded-xl flex items-center justify-center text-white"
            key={movie.id}
          >
            {movie.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
