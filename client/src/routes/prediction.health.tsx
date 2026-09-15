import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/prediction/health")({
  component: lazyRouteComponent(() => import("@/pages/predictions/HealthPrediction")),
});
