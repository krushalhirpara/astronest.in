import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/vedic-astrology")({
  component: lazyRouteComponent(() => import("@/pages/VedicAstrology")),
});
