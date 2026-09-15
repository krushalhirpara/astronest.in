import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/calculator/love")({
  component: lazyRouteComponent(() => import("@/pages/calculators/LoveCalculator")),
});
