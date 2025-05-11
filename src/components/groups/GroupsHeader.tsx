
import { useAuth } from "@/contexts/AuthContext";

export function GroupsHeader() {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
        <p className="text-muted-foreground">
          {user?.role === "mentor" 
            ? "Supervise and monitor project groups" 
            : user?.role === "leader"
              ? "Lead and manage your teams"
              : "Collaborate with your project teams"}
        </p>
      </div>
    </div>
  );
}
