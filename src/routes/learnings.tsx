import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/learnings")({
  component: LearningsLayout,
});

function LearningsLayout() {
  return <Outlet />;
}
