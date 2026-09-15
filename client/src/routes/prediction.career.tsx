import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/prediction/career")({
  component: lazyRouteComponent(() => import("@/pages/predictions/CareerPrediction")),
});
