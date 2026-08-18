import { createFileRoute } from "@tanstack/react-router";
import { Chat } from "@/pages/Chat";

export const Route = createFileRoute("/chat/$name")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      paid: (search.paid as boolean) || false,
    };
  },
  component: Chat,
});
