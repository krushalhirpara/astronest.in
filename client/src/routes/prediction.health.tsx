import { createFileRoute } from "@tanstack/react-router";
import HealthPrediction from "@/pages/predictions/HealthPrediction";

export const Route = createFileRoute("/prediction/health")({
  component: HealthPrediction,
});
