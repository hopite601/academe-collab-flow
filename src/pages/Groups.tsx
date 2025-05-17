
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GroupsHeader } from "@/components/groups/GroupsHeader";
import { GroupsContent } from "@/components/groups/GroupsContent";
import { ProjectFormDialog } from "@/components/groups/ProjectFormDialog";
import { useAuth } from "@/contexts/AuthContext";
import { getProjects } from "@/services/projectService";
import { Project } from "@/types/group";

const Groups = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  
  // Fetch projects for project selection
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    
    fetchProjects();
  }, []);

  // Handle project selection
  const handleProjectSelect = (projectId: string) => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <GroupsHeader 
          onCreateGroup={() => setIsProjectFormOpen(true)}
          userRole={user?.role || "student"}
        />
        
        {/* Groups content with search, filter, and list */}
        <GroupsContent />
        
        {/* Project selection dialog */}
        <ProjectFormDialog 
          open={isProjectFormOpen}
          onOpenChange={setIsProjectFormOpen}
          projects={projects}
          onProjectSelect={handleProjectSelect}
        />
      </div>
    </DashboardLayout>
  );
};

export default Groups;
