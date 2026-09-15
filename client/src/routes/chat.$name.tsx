import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/$name")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      paid: (search.paid as boolean) || false,
    };
  },
  component: lazyRouteComponent(() => import("@/pages/Chat").then(m => ({ default: m.Chat }))),
});
