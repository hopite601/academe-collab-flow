
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ProjectsHeaderProps {
  onCreateClick: () => void;
}

export function ProjectsHeader({ onCreateClick }: ProjectsHeaderProps) {
  const { user } = useAuth();
  
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          {user?.role === "mentor" 
            ? "Create and manage academic projects" 
            : user?.role === "leader"
              ? "Lead and organize your project teams"
              : "Browse and join academic projects"}
        </p>
      </div>
      
      {user?.role === "mentor" && (
        <Button onClick={onCreateClick}>
          <Plus className="h-4 w-4 mr-2" />
          Create Project
        </Button>
      )}
    </div>
  );
}
