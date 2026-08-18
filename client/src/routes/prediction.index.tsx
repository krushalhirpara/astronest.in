import { createFileRoute } from "@tanstack/react-router";
import Prediction from "@/pages/Prediction";

export const Route = createFileRoute("/prediction/")({
  component: Prediction,
});
