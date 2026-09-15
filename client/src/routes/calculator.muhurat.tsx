import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/calculator/muhurat")({
  component: lazyRouteComponent(() => import("@/pages/calculators/Muhurat")),
});
