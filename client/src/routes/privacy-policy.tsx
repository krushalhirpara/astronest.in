import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: lazyRouteComponent(() => import("@/pages/PrivacyPolicy")),
});
