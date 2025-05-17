
import { useState, forwardRef, useImperativeHandle } from "react";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { TaskForm } from "@/components/tasks/TaskForm";
import { Task, TaskInput, createTask, updateTask, deleteTask } from "@/services/taskService";

interface TaskActionsProps {
  onTaskCreated: (task: Task) => void;
  onTaskUpdated: (updatedTask: Task) => void;
  onTaskDeleted: (taskId: string) => void;
}

export interface TaskActionsRef {
  openCreateDialog: () => void;
  openEditDialog: (task: Task) => void;
  openDeleteDialog: (task: Task) => void;
}

export const TaskActions = forwardRef<TaskActionsRef, TaskActionsProps>(
  function TaskActions({ onTaskCreated, onTaskUpdated, onTaskDeleted }, ref) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => ({
      openCreateDialog: () => setIsCreateDialogOpen(true),
      openEditDialog: (task: Task) => {
        setSelectedTask(task);
        setIsEditDialogOpen(true);
      },
      openDeleteDialog: (task: Task) => {
        setSelectedTask(task);
        setIsDeleteDialogOpen(true);
      }
    }));

    // Handle task creation
    const handleCreateTask = async (taskData: TaskInput) => {
      try {
        setLoading(true);
        const newTask = await createTask(taskData);
        
        onTaskCreated(newTask);
        setIsCreateDialogOpen(false);
        toast.success("Task created successfully");
      } catch (error) {
        toast.error("Failed to create task");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Handle task update
    const handleEditTask = async (taskData: TaskInput) => {
      if (!selectedTask) return;
      
      try {
        setLoading(true);
        const updatedTask = await updateTask(selectedTask.id, taskData);
        
        onTaskUpdated(updatedTask);
        setIsEditDialogOpen(false);
        setSelectedTask(null);
        toast.success("Task updated successfully");
      } catch (error) {
        toast.error("Failed to update task");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Handle task deletion
    const handleDeleteTask = async () => {
      if (!selectedTask) return;
      
      try {
        setLoading(true);
        await deleteTask(selectedTask.id);
        
        onTaskDeleted(selectedTask.id);
        setIsDeleteDialogOpen(false);
        setSelectedTask(null);
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Failed to delete task");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <>
        {/* Create Task Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <TaskForm 
              onSubmit={handleCreateTask}
              onCancel={() => setIsCreateDialogOpen(false)}
              isSubmitting={loading}
            />
          </DialogContent>
        </Dialog>
        
        {/* Edit Task Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            {selectedTask && (
              <TaskForm 
                initialData={selectedTask}
                onSubmit={handleEditTask}
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
                This action cannot be undone. This will permanently delete the task.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteTask}
                className="bg-destructive text-destructive-foreground"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }
);
