import { createFileRoute } from "@tanstack/react-router";
import AstrologersPage from "@/pages/Astrologers";

export const Route = createFileRoute("/astrologers")({
  component: AstrologersPage,
});
