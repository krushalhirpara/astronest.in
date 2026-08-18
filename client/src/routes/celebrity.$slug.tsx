import { createFileRoute } from "@tanstack/react-router";
import CelebrityDetail from "@/pages/CelebrityDetail";

export const Route = createFileRoute("/celebrity/$slug")({
  component: CelebrityDetail,
});
