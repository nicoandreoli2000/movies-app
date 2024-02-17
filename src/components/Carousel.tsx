import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../utils";

type CarouselItemProps = {
  title: string;
  image: string;
  id: number;
};
export const Carousel = ({
  title,
  data,
}: {
  title: string;
  data: CarouselItemProps[];
}) => {
  const [page, setPage] = useState(0);

  return (
    <div className="flex flex-col gap-2 max-w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-white font-semibold">{title}</h2>
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Button
              key={`popular-pagination-${i}`}
              className={cn(
                "h-[5px] rounded-full bg-white p-0 w-5 ",
                page === i && "bg-blue-500"
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
          {data.map((movie) => (
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
  );
};

const CarsouselItem = ({ movie }: { movie: CarouselItemProps }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="h-[360px] min-w-[230px] bg-black flex items-center justify-center text-white relative overflow-hidden cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <img
        className={cn("w-full h-full object-cover", isHovered && "opacity-50")}
        src={`https://image.tmdb.org/t/p/original${movie.image}`}
        alt={movie.title}
      />
      <div
        className="absolute w-full h-20 bg-black bottom-0 flex flex-col items-center justify-center gap-2"
        style={{
          transform: isHovered ? "unset" : "translateY(100%)",
        }}
      >
        <h4
          className={cn(
            "text-xl text-white",
            isHovered ? "opactiy-100" : "opacity-0"
          )}
        >
          {movie.title}
        </h4>
      </div>
    </div>
  );
};
