import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProjectList } from "@/components/projects/ProjectList";
import { Project } from "@/components/projects/ProjectCard";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  ProjectInput 
} from "@/services/projectService";

const Projects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
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

  // Handle project creation
  const handleCreateProject = async (projectData: ProjectInput) => {
    try {
      setLoading(true);
      const newProject = await createProject({
        title: projectData.title,
        description: projectData.description,
        tags: projectData.tags,
        mentorName: user?.role === "mentor" ? user.name : undefined,
        teamLeaderName: projectData.teamLeaderName
      });
      
      setProjects(prev => [...prev, newProject]);
      setIsCreateDialogOpen(false);
      toast.success("Project created successfully");
    } catch (error) {
      toast.error("Failed to create project");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = async (projectData: ProjectInput) => {
    if (!selectedProject) return;
    
    try {
      setLoading(true);
      const updatedProject = await updateProject(selectedProject.id, {
        title: projectData.title,
        description: projectData.description,
        tags: projectData.tags,
        teamLeaderName: projectData.teamLeaderName
      });
      
      setProjects(prev => 
        prev.map(p => p.id === selectedProject.id ? updatedProject : p)
      );
      
      setIsEditDialogOpen(false);
      setSelectedProject(null);
      toast.success("Project updated successfully");
    } catch (error) {
      toast.error("Failed to update project");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!selectedProject) return;
    
    try {
      setLoading(true);
      await deleteProject(selectedProject.id);
      
      setProjects(prev => prev.filter(p => p.id !== selectedProject.id));
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
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
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          )}
        </div>
        
        <ProjectList 
          projects={projects}
          onProjectClick={handleProjectClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          userRole={user?.role || "student"}
          userId={user?.id || ""}
          loading={loading}
        />
      </div>
      
      {/* Create Project Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <ProjectForm 
            onSubmit={handleCreateProject}
            onCancel={() => setIsCreateDialogOpen(false)}
            isSubmitting={loading}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <ProjectForm 
              initialData={selectedProject}
              onSubmit={handleEditProject}
              onCancel={() => setIsEditDialogOpen(false)}
              isSubmitting={loading}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              and all associated tasks and groups.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteProject}
              className="bg-destructive text-destructive-foreground"
              disabled={loading}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Projects;
