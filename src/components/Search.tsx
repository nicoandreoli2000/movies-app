import { apiClient } from "@/apiClient";
import { Movie } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { FormEvent, useEffect, useRef } from "react";

function Search({
  type,
  initialSearchTerm,
}: {
  initialSearchTerm: string;
  type: "movie" | "tv";
}) {
  const searchTermRef = useRef<HTMLInputElement>(null);

  const {
    data: movies = [],
    mutate: queryMovies,
    isPending,
  } = useMutation({
    mutationKey: ["movies"],
    mutationFn: async (query: string) => {
      return apiClient
        .get(`/3/search/${type}?query=${query}`)
        .then(({ data }) => data.results as any[])
        .then((data) =>
          data.map(({ id, title, name, backdrop_path }) => ({
            id,
            title: title || name,
            image: backdrop_path,
          }))
        );
    },
  });

  useEffect(() => {
    queryMovies(initialSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTermRef.current?.value) return;

    queryMovies(searchTermRef.current?.value);
  };

  return (
    <div className="flex flex-col gap-6 pt-28 pb-12 px-10 min-h-[86vh]">
      <div className="flex flex-col gap-3 md:flex-row justify-between items-center">
        <h1 className="text-3xl">
          Search for movies{" "}
          <span className="opacity-50">| {movies.length} result(s)</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            leftIcon={<SearchIcon color="action" />}
            ref={searchTermRef}
            className="w-80 opacity-80"
            placeholder="Search for movies..."
          />
        </form>
      </div>

      {isPending && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-400 animate-spin dark:text-gray-600 fill-blue-800"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {!isPending && movies.length === 0 && (
        <p className="text-start text-gray-400">
          No movies found
          {searchTermRef.current?.value
            ? `for "${searchTermRef.current?.value}"`
            : ""}
        </p>
      )}

      <div className="grid grid-cols-5 gap-y-6 gap-x-3">
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="flex flex-col gap-2">
              <img
                className="h-36 object-cover"
                src={`https://image.tmdb.org/t/p/w1280${movie.image}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.png";
                }}
              />
              <h3 className="text-start text-md font-semibold px-2">
                {movie.title}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
