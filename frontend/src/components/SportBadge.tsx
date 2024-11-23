import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function SportBadge({ id, name}: { id: string, name: string }) {
  return (
    <Button
      asChild
      className="flex items-center gap-2 px-4 py-2"
      variant="outline"
    >
      <Link to="/sports/$sportId" params={{ sportId: id }}>
        {name}
      </Link>
    </Button>
  );
}
