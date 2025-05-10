
import { useAuth } from "@/contexts/AuthContext";
import { ProjectFormDialog } from "@/components/groups/ProjectFormDialog";

type GroupsHeaderProps = {
  onCreateProject: (projectData: any) => void;
};

export function GroupsHeader({ onCreateProject }: GroupsHeaderProps) {
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
      
      {(user?.role === "mentor" || user?.role === "leader") && (
        <ProjectFormDialog onCreateProject={onCreateProject} />
      )}
    </div>
  );
}
