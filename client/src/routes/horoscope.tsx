import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/horoscope")({
  component: lazyRouteComponent(() => import("@/pages/Horoscope")),
});
