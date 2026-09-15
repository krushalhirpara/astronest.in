import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/celebrity/$slug")({
  component: lazyRouteComponent(() => import("@/pages/CelebrityDetail")),
});
