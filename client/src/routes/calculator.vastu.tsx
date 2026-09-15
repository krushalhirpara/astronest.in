import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/calculator/vastu")({
  component: lazyRouteComponent(() => import("@/pages/calculators/Vastu")),
});
