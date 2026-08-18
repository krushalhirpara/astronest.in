import { createFileRoute } from "@tanstack/react-router";
import LoveCalculator from "@/pages/calculators/LoveCalculator";

export const Route = createFileRoute("/calculator/love")({
  component: LoveCalculator,
});
