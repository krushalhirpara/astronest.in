import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/prediction/future")({
  component: lazyRouteComponent(() => import("@/pages/predictions/FutureTrends")),
});
