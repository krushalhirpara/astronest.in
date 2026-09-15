import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/calculator/")({
  component: lazyRouteComponent(() => import("@/pages/Calculator")),
});
