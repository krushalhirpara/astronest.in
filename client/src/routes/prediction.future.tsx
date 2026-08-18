import { createFileRoute } from "@tanstack/react-router";
import FutureTrends from "@/pages/predictions/FutureTrends";

export const Route = createFileRoute("/prediction/future")({
  component: FutureTrends,
});
