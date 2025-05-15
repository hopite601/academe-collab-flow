
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProjectList } from "@/components/projects/ProjectList";
import { Project } from "@/types/group";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { getProjects } from "@/services/projectService";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { ProjectActions, ProjectActionsRef } from "@/components/projects/ProjectActions";

const Projects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const projectActionsRef = useRef<ProjectActionsRef>(null);
  
  // Fetch projects from API on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        toast.error("Failed to load projects");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const handleProjectClick = (project: Project) => {
    navigate(`/dashboard/projects/${project.id}`);
  };

  const handleProjectCreated = (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
  };

  const handleProjectUpdated = (updatedProject: Project) => {
    setProjects(prev => 
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
  };

  const handleProjectDeleted = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const handleCreateClick = () => {
    projectActionsRef.current?.openCreateDialog();
  };

  const handleEditClick = (project: Project) => {
    projectActionsRef.current?.openEditDialog(project);
  };

  const handleDeleteClick = (project: Project) => {
    projectActionsRef.current?.openDeleteDialog(project);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ProjectsHeader onCreateClick={handleCreateClick} />
        
        <ProjectList 
          projects={projects}
          onProjectClick={handleProjectClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          userRole={user?.role || "student"}
          userId={user?.id || ""}
          loading={loading}
        />
        
        <ProjectActions
          ref={projectActionsRef}
          onProjectCreated={handleProjectCreated}
          onProjectUpdated={handleProjectUpdated}
          onProjectDeleted={handleProjectDeleted}
        />
      </div>
    </DashboardLayout>
  );
};

export default Projects;
