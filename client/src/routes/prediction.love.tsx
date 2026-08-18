import { createFileRoute } from "@tanstack/react-router";
import LovePrediction from "@/pages/predictions/LovePrediction";

export const Route = createFileRoute("/prediction/love")({
  component: LovePrediction,
});
