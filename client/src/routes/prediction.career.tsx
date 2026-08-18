import { createFileRoute } from "@tanstack/react-router";
import CareerPrediction from "@/pages/predictions/CareerPrediction";

export const Route = createFileRoute("/prediction/career")({
  component: CareerPrediction,
});
