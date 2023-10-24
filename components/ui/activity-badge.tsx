import { Badge } from "./badge";

export default function ActivityBadge({ active }: { active: boolean }) {
  return active ? (
    <Badge variant="outline" className="border-green-300">
      Active
    </Badge>
  ) : (
    <Badge variant="outline" className="border-orange-300">
      Inactive
    </Badge>
  );
}
