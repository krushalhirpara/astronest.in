import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/calculator/numerology")({
  component: lazyRouteComponent(() => import("@/pages/calculators/Numerology")),
});
