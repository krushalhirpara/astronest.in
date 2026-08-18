import { createFileRoute } from "@tanstack/react-router";
import Calculator from "@/pages/Calculator";

export const Route = createFileRoute("/calculator/")({
  component: Calculator,
});
