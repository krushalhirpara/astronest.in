import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/kundli-matching")({
  component: lazyRouteComponent(() => import("@/pages/KundliMatching")),
});
