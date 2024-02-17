import { apiClient } from "@/apiClient";
import StarIcon from "@mui/icons-material/Star";
import { Movie } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { FormEvent, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Search() {
  const searchTermRef = useRef<HTMLInputElement>(null);

  const {
    data: movies = [],
    mutate: queryMovies,
    isPending,
  } = useMutation({
    mutationKey: ["movies"],
    mutationFn: async (query: string) => {
      return apiClient
        .get(`/3/search/movie?query=${query}`)
        .then(({ data }) => data.results as Movie[]);
    },
  });

  useEffect(() => {
    queryMovies("star wars");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTermRef.current?.value) return;

    queryMovies(searchTermRef.current?.value);
  };

  return (
    <div className="flex flex-col gap-6 py-10">
      <div className="flex flex-col gap-3 md:flex-row justify-between items-center">
        <h1 className="text-2xl">
          Search for movies{" "}
          <span className="text-[#999999]">| {movies.length} result(s)</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            leftIcon={<SearchIcon color="action" />}
            ref={searchTermRef}
            className="w-80"
            placeholder="Search for movies..."
          />
        </form>
      </div>

      {isPending && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={`search-skeleton-${i}`}
              className="min-w-full rounded"
              style={{ width: "300px", height: "180px" }}
            />
          ))}
        </>
      )}

      {!isPending && movies.length === 0 && (
        <p className="text-start text-gray-400">
          No movies found
          {searchTermRef.current?.value
            ? `for "${searchTermRef.current?.value}"`
            : ""}
        </p>
      )}

      {movies.map((movie) => {
        const rating = Math.round(movie.vote_average / 2);
        return (
          <div
            key={movie.id}
            className="rounded bg-[#404040] flex gap-4 p-4 h-50 max-h-[180px]"
          >
            <img
              className="h-36 object-cover rounded"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/300x450";
              }}
            />
            <div className="flex flex-col items-start justify-between text-start">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-2xl font-bold  w-[280px] md:w-[500px] lg:w-[1000px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {movie.title}
                  </h3>
                  <p className="text-lg text-[#999999]">
                    {movie.release_date || "Unknown"}
                  </p>
                </div>

                <div className="flex gap-3 items-center">
                  <div>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={`rating-star-${movie.poster_path}-${i}`}
                        style={{
                          color: rating > i ? "rgb(59 130 246)" : "disabled",
                        }}
                      />
                    ))}
                  </div>
                  <p>{rating} / 5</p>
                </div>
              </div>
              <div>
                <Link to="/" className="font-semibold text-[#B6B6B6]">
                  View details
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Search;
