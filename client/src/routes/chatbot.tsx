import { createFileRoute } from "@tanstack/react-router";
import Chatbot from "@/pages/Chatbot";

export const Route = createFileRoute("/chatbot")({
  component: Chatbot,
});
