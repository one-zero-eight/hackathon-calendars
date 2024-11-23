import { TopBar } from "@/components/TopBar.tsx";
import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col">
      <TopBar />
      <Outlet />
      <ScrollRestoration />
    </div>
  ),
});
