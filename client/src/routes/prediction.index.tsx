import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/prediction/")({
  component: lazyRouteComponent(() => import("@/pages/Prediction")),
});
