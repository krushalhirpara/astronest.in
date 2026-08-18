import { createFileRoute } from "@tanstack/react-router";
import Horoscope from "@/pages/Horoscope";

export const Route = createFileRoute("/horoscope")({
  component: Horoscope,
});
