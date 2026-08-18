import { createFileRoute } from "@tanstack/react-router";
import Vastu from "@/pages/calculators/Vastu";

export const Route = createFileRoute("/calculator/vastu")({
  component: Vastu,
});
