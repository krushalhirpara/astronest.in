import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/chatbot")({
  component: lazyRouteComponent(() => import("@/pages/Chatbot")),
});
