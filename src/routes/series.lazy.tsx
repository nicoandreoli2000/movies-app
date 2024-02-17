import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/series")({
  component: () => <>Series here</>,
});
