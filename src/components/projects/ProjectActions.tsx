
import { useState, forwardRef, useImperativeHandle } from "react";
import { Project } from "@/types/group";
import { ProjectInput, createProject, updateProject, deleteProject } from "@/services/projectService";
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
import { useAuth } from "@/contexts/AuthContext";

interface ProjectActionsProps {
  onProjectCreated: (project: Project) => void;
  onProjectUpdated: (updatedProject: Project) => void;
  onProjectDeleted: (projectId: string) => void;
}

export interface ProjectActionsRef {
  openCreateDialog: () => void;
  openEditDialog: (project: Project) => void;
  openDeleteDialog: (project: Project) => void;
}

export const ProjectActions = forwardRef<ProjectActionsRef, ProjectActionsProps>(
  function ProjectActions({ onProjectCreated, onProjectUpdated, onProjectDeleted }, ref) {
    const { user } = useAuth();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => ({
      openCreateDialog: () => setIsCreateDialogOpen(true),
      openEditDialog: (project: Project) => {
        setSelectedProject(project);
        setIsEditDialogOpen(true);
      },
      openDeleteDialog: (project: Project) => {
        setSelectedProject(project);
        setIsDeleteDialogOpen(true);
      }
    }));

    // Handle project creation
    const handleCreateProject = async (projectData: ProjectInput) => {
      try {
        setLoading(true);
        const newProject = await createProject({
          ...projectData,
          mentorName: user?.role === "mentor" ? user.name : undefined,
        });
        
        onProjectCreated(newProject);
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
        const updatedProject = await updateProject(selectedProject.id, projectData);
        
        onProjectUpdated(updatedProject);
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
        
        onProjectDeleted(selectedProject.id);
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

    return (
      <>
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
      </>
    );
  }
);
