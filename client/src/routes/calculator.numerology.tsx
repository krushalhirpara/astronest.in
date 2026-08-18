import { createFileRoute } from "@tanstack/react-router";
import Numerology from "@/pages/calculators/Numerology";

export const Route = createFileRoute("/calculator/numerology")({
  component: Numerology,
});
