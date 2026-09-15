import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/prediction/love")({
  component: lazyRouteComponent(() => import("@/pages/predictions/LovePrediction")),
});
