import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/astrologers")({
  component: lazyRouteComponent(() => import("@/pages/Astrologers")),
});
