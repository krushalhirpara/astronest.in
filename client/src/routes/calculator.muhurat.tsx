import { createFileRoute } from "@tanstack/react-router";
import Muhurat from "@/pages/calculators/Muhurat";

export const Route = createFileRoute("/calculator/muhurat")({
  component: Muhurat,
});
