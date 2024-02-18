import Movies from "@/pages/Movies";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/movies")({
  component: Movies,
});
