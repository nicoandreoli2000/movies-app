import Search from "@/pages/Search";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/search")({
  component: Search,
});
