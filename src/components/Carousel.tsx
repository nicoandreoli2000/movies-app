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
    <div className="flex flex-col gap-4 max-w-full">
      <h2 className="pl-10 text-start text-xl opacity-90 text-white font-semibold">
        {title}
      </h2>

      <div className="flex overflow-hidden max-w-full relative">
        <div
          className="flex"
          style={{
            transform: `translateX(-${page * 230 * 3}px)`,
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

        {page < 4 && (
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
      {/* <div
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
      </div> */}
    </div>
  );
};
