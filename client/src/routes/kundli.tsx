import { createFileRoute } from "@tanstack/react-router";
import Kundli from "@/pages/Kundli";

export const Route = createFileRoute("/kundli")({
  component: Kundli,
});
