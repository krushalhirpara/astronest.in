import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/kundli")({
  component: lazyRouteComponent(() => import("@/pages/Kundli")),
});

